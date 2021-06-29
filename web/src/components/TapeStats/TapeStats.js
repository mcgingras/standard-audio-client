import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { ethers } from 'ethers'
import { Link, routes } from '@redwoodjs/router'
import useSpotify from '../../hooks/useSpotify'

const demoStats = {
  Duration: '60 Min',
  Shader: 'Holo',
  Rarity: '96.9',
  Edition: '1',
  Aisle: '6',
  Bay: '12',
  Core: 'Bright',
  Quality: 'Bitty',
}
const Stat = ({ k, v }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="mr-2 text-xs">{k}</span>
      <span className="w-1/2 bg-gray-900 text-xs text-blue-200 p-1 font-semibold">
        {v}
      </span>
    </div>
  )
}

const bidPrice = (bid) => {
  if (bid.activeBid) {
    return (
      <span className="text-3xl text-center font-book">
        {ethers.utils.formatEther(bid.amount.toString())} ETH
      </span>
    )
  } else {
    return <span className="text-4xl text-center font-bold">NO BIDS</span>
  }
}

const TapeStats = ({
  address,
  isOwner,
  isClaimed,
  tape,
  bid,
  setBidSlideOpen,
}) => {
  const [spotifyLoggedIn, token] = useSpotify()
  const [isUp, setUp] = useState(false)

  return (
    <>
      {!isUp && (
        <button
          class="bg-blue-400 w-full fixed bottom-0 text-center font-bold p-4"
          onClick={() => {
            setUp(true)
          }}
        >
          click for stats
        </button>
      )}
      <Transition.Root show={isUp} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden z-10"
          open={isUp}
          onClose={setUp}
        >
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div
              className={
                !isUp
                  ? 'hidden sm:block'
                  : 'p-0 sm:p-8 box-border fixed bottom-0 w-full'
              }
            >
              <div className="p-4 sm:p-8 bg-blue-400 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-4">
                  <div
                    onClick={() => {
                      setUp(false)
                    }}
                    className="flex flex-col text-sm pr-8 border-b sm:border-b-0 sm:border-r border-black"
                  >
                    <p className="font-bold pb-2 sm:pb-0">Tape #{tape.id}</p>
                  </div>
                  <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-black px-0 sm:px-8 py-4 sm:py-0">
                    <p className="font-bold mb-2 text-sm">Tape Stats</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(demoStats).map(([key, value]) => {
                        return <Stat k={key} v={value} />
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between px-0 sm:px-8 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-black">
                    {isOwner ? (
                      <>
                        <p className="text-sm text-center">
                          Edit this cassette.
                        </p>
                        <button className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">
                          <Link to={`/tapes/${1}/edit`}>Edit Cassette</Link>
                        </button>
                      </>
                    ) : (
                      <>
                        {!spotifyLoggedIn && (
                          <>
                            <p className="text-sm text-center">
                              You need a Spotify Premium account to interact
                              with this cassette. Please connect your account.
                            </p>
                            <button className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">
                              <a
                                href={`http://localhost:8888/login?redirect=/tapes/${1}`}
                              >
                                Log into Spotify
                              </a>
                            </button>
                          </>
                        )}
                        <button onClick={() => testUpdate()}>claim</button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col justify-between pl-0 sm:pl-8 py-4 sm:py-0">
                    {isClaimed ? (
                      <>
                        <span className="uppercase text-center text-xs font-bold">
                          Current Bid
                        </span>
                        {bidPrice(bid)}
                        <button
                          onClick={() => {
                            setBidSlideOpen(true)
                          }}
                          className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full"
                        >
                          {isOwner ? 'View Bids' : 'Bid'}
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="uppercase text-center text-xs">
                          Tape Status:
                        </span>
                        <span className="text-4xl text-center font-bold">
                          UNCLAIMED
                        </span>
                        <Link
                          to={`/tapes/${tape.id}/claim`}
                          className="block text-center bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full"
                        >
                          Claim
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default TapeStats
