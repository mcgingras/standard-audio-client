import {useContext, useEffect, useState} from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { ContractContext } from '../../contexts/contractContext';
import { ethers } from "ethers";

// UI Components
import Slideover from '../Tailwind/Slideover';
import BidItem from '../BidItem/BidItem';
import TapeStats from '../TapeStats/TapeStats';
import CassetteScene from '../Three/Scenes/CassetteScene';


const CREATE_BID_MUTATION = gql`
  mutation CreateBidMutation($input: CreateBidInput!) {
    createBid(input: $input) {
      id
    }
  }
`

const Tape = ({ tape }) => {
  const {contract, address} = useContext(ContractContext);
  const [isOwner, setIsOwner] = useState(false);
  const [bidSlideOpen, setBidSlideOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [txHash, setTxHash] = useState(undefined);
  const [txError, setTxError] = useState(undefined);
  const [txBeingSent, setTxBeingSent] = useState(undefined);
  const [bidValue, setBidValue] = useState(undefined);
  const [bid, setBid] = useState({amount: 0, activeBid: false})
  const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

  useEffect(() => {
    const getBid = async () => {
      if (contract != "") {
        const bid = await contract.cassetteBids(tape.id);
        const claimed = await contract.isClaimed(tape.id);
        setBid(bid);
        setIsClaimed(claimed);
      }
    }
    getBid();
  }, [contract]);

  useEffect(() => {
    if (address != "") {
      setIsOwner(address === tape.owner)
    }
  }, [address]);


  const claimTape = async () => {
    try {
      const tx = await contract.claim(tape.id, tape.quality, tape.capacity, tape.style, tape.proof, "testuri")
      setTxHash(tx.hash);

      const receipt = await tx.wait();
      if (receipt.status === 0) {
          throw new Error("Transaction failed");
      }
    } catch (error) {
      console.log(error);
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) { return }
      setTxError(error);
    } finally {
      setTxBeingSent(undefined);
    }
  }

  // make sure this is a number
  const submitBid = async () => {
    const eth = ethers.utils.parseEther(bidValue);
    const tx = await contract.bid(tape.id, {value: eth});
    createBid({ variables: { input: {amount: parseInt(bidValue), bidder: address, active: true, tapeId: tape.id} } })
  }

  const [createBid, { loading, error }] = useMutation(CREATE_BID_MUTATION, {
    onCompleted: () => {
      // toast.success('Bid created')
      // navigate(routes.bids())
      console.log("completed bid")
    }
  })


  const acceptBid = async () => {
    const tx = await contract.acceptBid(tape.id);
  }

  return (
    <>
      <Slideover open={bidSlideOpen} setOpen={setBidSlideOpen}>
        { isOwner
        ? <>
            <section className="flex flex-col">
              <h6 className="uppercase text-center text-xs font-bold mb-1">Current For Sale Price</h6>
              <span className="text-3xl text-center font-book">{ethers.utils.formatEther(bid.amount.toString())} ETH</span>
              <p className="text-sm text-center mt-12">This MX tape will always be for sale at this price unless you adjust it below.</p>
            </section>
            <section className="flex flex-col mt-12">
              <label className="text-sm font-bold mb-4">Edit Sale Price</label>
              <div class="flex">
                <input onChange={(e) => {setBidValue(e.target.value)}}type="text" className="rounded-lg text-sm flex-grow mt-2 p-2 outline-none focus:shadow-lg" placeholder="Sale amount (in ETH)" />
                <button onClick={() => {submitBid()}} className="rounded-full bg-black text-white uppercase text-xs font-bold px-20 hover:bg-gray-800 mt-2 -ml-8 shadow-lg">bid</button>
              </div>
            </section>
            <section className="mt-12">
              <h6 className="text-sm font-bold mb-4">Current Highest Bid</h6>
              { bid.activeBid
                ? <div className="w-full">
                    <BidItem bid={bid} />
                    <button onClick={() => acceptBid()} className="mt-4 block mx-auto rounded-full bg-black text-white uppercase text-xs font-bold py-3 px-4 hover:bg-gray-800 mt-2">Accept Bid</button>
                  </div>
                : <div>
                  No bids yet.
                </div>
              }
            </section>
            {/* { bid.activeBid &&
              <section className="mt-12">
                <h6 className="text-sm font-bold mb-4">Bid and Ownership History</h6>
                { tape.Bids.map(bid => {
                  return (
                    <BidItem bid={bid} />
                  )
                })}
              </section>
            } */}
          </>
        : <>
            <section className="flex flex-col">
              <h6 className="uppercase text-center text-xs font-bold mb-1">Current Bid</h6>
              <span className="text-3xl text-center font-book">{ethers.utils.formatEther(bid.amount.toString())} ETH</span>
            </section>
            <section className="flex mt-8">
              <input onChange={(e) => {setBidValue(e.target.value)}}type="text" className="rounded-lg text-sm flex-grow mt-2 p-2 outline-none focus:shadow-lg" placeholder="Bid amount (in ETH)" />
              <button onClick={() => {submitBid()}} className="rounded-full bg-black text-white uppercase text-xs font-bold px-20 hover:bg-gray-800 mt-2 -ml-8 shadow-lg">bid</button>
            </section>
            {/* <section className="mt-20">
              <h6 className="text-sm font-bold mb-1">Bid and Ownership History</h6>
              { tape.Bids.map(bid => {
                  return (
                    <BidItem bid={bid} />
                  )
              })}
            </section> */}
          </>
        }
      </Slideover>

      <div className="min-h-screen h-screen relative">
      <header className="flex items-end p-8 fixed top-0 w-full z-10">
        <h1 className="text-4xl font-semibold">{tape.name}</h1>
        <h3 className="rounded-full border border-gray-900 px-3 py-1 ml-4 text-sm">Owner</h3>
        <h3 className="ml-4 text-sm font-semibold">{tape.owner}</h3>
        <Link
          to={routes.tapes()}
          className="rounded-full bg-white text-gray-900 text-sm font-bold flex-end ml-auto px-3 py-1"
        >
          Back
        </Link>
      </header>

      <CassetteScene />

      <TapeStats
        isOwner={isOwner}
        tape={tape}
        isClaimed={isClaimed}
        claimTape={claimTape}
        bid={bid}
        setBidSlideOpen={setBidSlideOpen} />
      </div>
    </>
  )
}

export default Tape
