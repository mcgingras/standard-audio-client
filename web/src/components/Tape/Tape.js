import {useContext, useEffect, useState} from 'react'
import { Link, routes } from '@redwoodjs/router'
import { ContractContext, useWeb3 } from '../../contexts/contractContext';
import { ethers, BigNumber } from "ethers";

// UI Components
import Slideover from '../Tailwind/Slideover';

const demoStats = {
  "Duration": "60 Min",
  "Shader": "Holo",
  "Rarity": "96.9",
  "Edition": "1",
  "Aisle": "6",
  "Bay": "12",
  "Core": "Bright",
  "Quality": "Bitty"
}
const Stat = ({k, v}) => {
  return (
    <div class="flex justify-between items-center">
      <span className="mr-2 text-xs">{k}</span>
      <span className="w-1/2 bg-gray-900 text-xs text-blue-200 p-1 font-semibold">{v}</span>
    </div>
  )
}

const Tape = ({ tape }) => {
  const {contract, address} = useContext(ContractContext);
  const [isOwner, setIsOwner] = useState(false);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [bidSlideOpen, setBidSlideOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [txHash, setTxHash] = useState(undefined);
  const [txError, setTxError] = useState(undefined);
  const [txBeingSent, setTxBeingSent] = useState(undefined);
  const [bidValue, setBidValue] = useState(undefined);
  const [bid, setBid] = useState({amount: 0})
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

  const checkStatus = async () => {
    const claimed = await contract.isClaimed(tape.id)
    console.log(claimed);
  }

  // make sure this is a number
  const submitBid = async () => {
    const eth = ethers.utils.parseEther(bidValue);
    const tx = await contract.bid(tape.id, {value: eth})
  }

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
              <label className="text-sm font-bold mb-1">Edit Sale Price</label>
              <div class="flex">
                <input onChange={(e) => {setBidValue(e.target.value)}}type="text" class="rounded-lg text-sm flex-grow mt-2 p-2 outline-none focus:shadow-lg" placeholder="Sale amount (in ETH)" />
                <button onClick={() => {submitBid()}} className="rounded-full bg-black text-white uppercase text-xs font-bold px-20 hover:bg-gray-800 mt-2 -ml-8 shadow-lg">bid</button>
              </div>
            </section>
            <section className="mt-12">
              <h6 className="text-sm font-bold mb-1">Current Highest Bid</h6>
            </section>
            <section className="mt-12">
              <h6 className="text-sm font-bold mb-1">Bid and Ownership History</h6>
            </section>
          </>
        : <>
            <section className="flex flex-col">
              <h6 className="uppercase text-center text-xs font-bold mb-1">Current Bid</h6>
              <span className="text-3xl text-center font-book">{ethers.utils.formatEther(bid.amount.toString())} ETH</span>
            </section>
            <section className="flex mt-8">
              <input onChange={(e) => {setBidValue(e.target.value)}}type="text" class="rounded-lg text-sm flex-grow mt-2 p-2 outline-none focus:shadow-lg" placeholder="Bid amount (in ETH)" />
              <button onClick={() => {submitBid()}} className="rounded-full bg-black text-white uppercase text-xs font-bold px-20 hover:bg-gray-800 mt-2 -ml-8 shadow-lg">bid</button>
            </section>
            <section className="mt-20">
              <h6 className="text-sm font-bold mb-1">Bid and Ownership History</h6>
            </section>
          </>
        }
      </Slideover>

      <header className="flex items-center mb-20 m-8">
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

      <div className="p-8 box-border fixed bottom-0 w-full">
      <div className="p-8 bg-blue-400 w-full">
        <div className="grid grid-cols-4">
          <div className="flex flex-col text-sm pr-8 border-r border-black">
            <p className="font-bold">Tape #{tape.id}</p>
          </div>
          <div className="flex flex-col border-r border-black px-8">
            <p className="font-bold mb-2 text-sm">Tape Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(demoStats).map(([key, value]) => {
                  return (
                    <Stat k={key} v={value} />
                  )
                })}
            </div>
          </div>
          <div className="flex flex-col justify-between px-8 border-r border-black">
            { isOwner
            ? <>
                <p className="text-sm text-center">Edit this cassette.</p>
                <button className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full"><Link to={`/tapes/${1}/edit`}>Edit Cassette</Link></button>
              </>
            : <>
                <p className="text-sm text-center">You need a Spotify Premium account to interact with this cassette. Please connect your account.</p>
                <button className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full"><a href={`http://localhost:8888/login?redirect=/tapes/${1}`}>Log into Spotify</a></button>
              </>
            }
          </div>
          <div className="flex flex-col justify-between pl-8">
            {isClaimed
              ? <>
                  { isOwner
                  ? <>
                      <span className="uppercase text-center text-xs font-bold">Current Bid</span>
                      <span className="text-3xl text-center font-book">{ethers.utils.formatEther(bid.amount.toString())} ETH</span>
                      <button onClick={() => {setBidSlideOpen(true)}} className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">View Bids</button>
                    </>
                  : <>
                      <span className="uppercase text-center text-xs font-bold">Current Bid</span>
                      <span className="text-3xl text-center font-book">{ethers.utils.formatEther(bid.amount.toString())} ETH</span>
                      <button onClick={() => {setBidSlideOpen(true)}} className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">Bid</button>
                    </>
                  }
                </>
              : <>
                  <span className="uppercase text-center text-xs">Tape Status:</span>
                  <span className="text-4xl text-center font-bold">UNCLAIMED</span>
                  {/* set is claimed in the db level */}
                  <button onClick={() => claimTape()} className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">Claim</button>
                </>
              }
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Tape
