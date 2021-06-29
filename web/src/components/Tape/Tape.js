import { useContext, useEffect, useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { ContractContext } from '../../contexts/contractContext'
import { ethers } from 'ethers'

// UI Components
import Slideover from '../Tailwind/Slideover'
import BidItem from '../BidItem/BidItem'
import TapeStats from '../TapeStats/TapeStats'
import CassetteScene from '../Three/Scenes/CassetteScene'

const CREATE_BID_MUTATION = gql`
  mutation CreateBidMutation($input: CreateBidInput!) {
    createBid(input: $input) {
      id
    }
  }
`

const Tape = ({ tape }) => {
  console.log(tape.id)
  const { contract, address } = useContext(ContractContext)
  const [isOwner, setIsOwner] = useState(false)
  const [bidSlideOpen, setBidSlideOpen] = useState(false)
  /**
   * isClaimed --
   * boolean for if the tape is available or not.
   * set after reading contract state.
   * maybe think about duplicating this state in postgres?
   * probably not going to update right away.
   */
  const [isClaimed, setIsClaimed] = useState(false)
  const [bidValue, setBidValue] = useState(undefined)
  const [bid, setBid] = useState({ amount: 0, activeBid: false })

  useEffect(() => {
    const getBid = async () => {
      if (contract != '') {
        console.log(contract)
        const bid = await contract.cassetteBids(tape.id)
        const claimed = await contract.isClaimed(tape.id)
        setBid(bid)
        setIsClaimed(claimed)
      }
    }
    getBid()
  }, [contract])

  useEffect(() => {
    if (address != '') {
      setIsOwner(address === tape.owner)
    }
  }, [address])

  // make sure this is a number
  const submitBid = async () => {
    const eth = ethers.utils.parseEther(bidValue)
    const tx = await contract.bid(tape.id, { value: eth })
    createBid({
      variables: {
        input: {
          amount: parseInt(bidValue),
          bidder: address,
          active: true,
          tapeId: tape.id,
        },
      },
    })
  }

  const [createBid, { loading, error }] = useMutation(CREATE_BID_MUTATION, {
    onCompleted: () => {
      // toast.success('Bid created')
      // navigate(routes.bids())
      console.log('completed bid')
    },
  })

  const acceptBid = async () => {
    const tx = await contract.acceptBid(tape.id)
  }

  return (
    <>
      <Slideover open={bidSlideOpen} setOpen={setBidSlideOpen}>
        {isOwner ? (
          <>
            <section className="flex flex-col">
              <h6 className="uppercase text-center text-xs font-bold mb-1">
                Current For Sale Price
              </h6>
              <span className="text-3xl text-center font-book">
                {ethers.utils.formatEther(bid.amount.toString())} ETH
              </span>
              <p className="text-sm text-center mt-12">
                This MX tape will always be for sale at this price unless you
                adjust it below.
              </p>
            </section>
            <section className="flex flex-col mt-12">
              <label className="text-sm font-bold mb-4">Edit Sale Price</label>
              <div class="flex">
                <input
                  onChange={(e) => {
                    setBidValue(e.target.value)
                  }}
                  type="text"
                  className="rounded-lg text-sm flex-grow mt-2 p-2 outline-none focus:shadow-lg"
                  placeholder="Sale amount (in ETH)"
                />
                <button
                  onClick={() => {
                    submitBid()
                  }}
                  className="rounded-full bg-black text-white uppercase text-xs font-bold px-20 hover:bg-gray-800 mt-2 -ml-8 shadow-lg"
                >
                  bid
                </button>
              </div>
            </section>
            <section className="mt-12">
              <h6 className="text-sm font-bold mb-4">Current Highest Bid</h6>
              {bid.activeBid ? (
                <div className="w-full">
                  <BidItem bid={bid} />
                  <button
                    onClick={() => acceptBid()}
                    className="mt-4 block mx-auto rounded-full bg-black text-white uppercase text-xs font-bold py-3 px-4 hover:bg-gray-800 mt-2"
                  >
                    Accept Bid
                  </button>
                </div>
              ) : (
                <div>No bids yet.</div>
              )}
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
        ) : (
          <>
            <section className="flex flex-col">
              <h6 className="uppercase text-center text-xs font-bold mb-1">
                Current Bid
              </h6>
              <span className="text-3xl text-center font-book">
                {ethers.utils.formatEther(bid.amount.toString())} ETH
              </span>
            </section>
            <section className="flex mt-8">
              <input
                onChange={(e) => {
                  setBidValue(e.target.value)
                }}
                type="text"
                className="rounded-lg text-sm flex-grow mt-2 p-2 outline-none focus:shadow-lg"
                placeholder="Bid amount (in ETH)"
              />
              <button
                onClick={() => {
                  submitBid()
                }}
                className="rounded-full bg-black text-white uppercase text-xs font-bold px-20 hover:bg-gray-800 mt-2 -ml-8 shadow-lg"
              >
                bid
              </button>
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
        )}
      </Slideover>

      <div className="min-h-screen h-screen relative bg-black">
        <header className="flex justify-between p-8 fixed top-0 w-full z-10">
          <div className="flex flex-row">
            <h1 className="text-4xl font-semibold text-white">{tape.name}</h1>
            <h3 className="self-center rounded-full border border-white text-white px-3 py-1 ml-4 text-sm">
              Owner
            </h3>
            <h3 className="ml-4 text-sm font-semibold text-white self-center">
              {tape.owner}
            </h3>
          </div>
          <div class="flex self-center">
            <Link
              to={routes.listeningRoom({ id: tape.id })}
              className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1 mr-2"
            >
              Listen in Den
            </Link>
            <Link
              to={routes.tapes()}
              className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1"
            >
              BACK
            </Link>
          </div>
        </header>

        <CassetteScene />

        <TapeStats
          address={address}
          isOwner={isOwner}
          tape={tape}
          isClaimed={isClaimed}
          bid={bid}
          setBidSlideOpen={setBidSlideOpen}
        />
      </div>
    </>
  )
}

export default Tape
