import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { ethers } from 'ethers'
import { Link } from '@redwoodjs/router'
import useSpotify from '../../hooks/useSpotify'
import {
  styleDecoder,
  capacityDecoder,
  qualityDecoder,
} from '../../utils/decoder'

const Stat = ({ k, v }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="p-1 text-xs border border-black w-1/2">{k}</span>
      <span className="w-1/2 border border-black bg-gray-900 text-xs text-blue-100 p-1 font-semibold">
        {v}
      </span>
    </div>
  )
}

const generateStats = (tape) => {
  const capacity = capacityDecoder(tape.capacity)
  const quality = qualityDecoder(tape.quality)
  const style = styleDecoder(tape.style)

  return {
    capacity,
    quality,
    ...style,
  }
}

const TapeStats = ({ isOwner, tape, color }) => {
  const [spotifyLoggedIn, token] = useSpotify()
  const [isUp, setUp] = useState(false)
  const [buttonUp, setButtonUp] = useState(true)
  const stats = generateStats(tape)

  return (
    <>
      <div className="absolute insert-0 overflow-hidden">
        <div className="fixed inset-x-0 bottom-0 max-w-full">
          <Transition
            show={buttonUp}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-0 sm:duration-0"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
            afterLeave={() => setUp(true)}
          >
            <button
              className={`bg-blue-400 text-center font-bold p-4 w-full`}
              onClick={() => {
                setButtonUp(false)
              }}
            >
              click for stats
            </button>
          </Transition>
          <Transition
            show={isUp}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
            afterLeave={() => setButtonUp(true)}
          >
            <div className="p-0 sm:p-8 box-border w-full">
              <div className="p-4 sm:p-8 bg-blue-400 w-full relative">
                <div className="grid grid-cols-1 sm:grid-cols-4 h-full">
                  <div className="flex flex-col justify-between text-sm pr-8 border-b sm:border-b-0 sm:border-r border-black">
                    <p className="font-bold pb-2 sm:pb-0">Tape #{tape.id}</p>
                    <button
                      onClick={() => {
                        setUp(false)
                      }}
                      className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full"
                    >
                      Hide Stats
                    </button>
                  </div>
                  <div className="flex flex-col col-span-2 border-b sm:border-b-0 sm:border-r border-black px-0 sm:px-8 py-4 sm:py-0">
                    <p className="font-bold mb-2 text-sm">Tape Stats</p>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(stats).map(([key, value]) => {
                        return <Stat key={key} k={key} v={value} />
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between pl-0 sm:pl-8 py-4 sm:py-0">
                    {tape.isClaimed ? (
                      <>
                        <div>claimed</div>
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
          </Transition>
        </div>
      </div>
    </>
  )
}

export default TapeStats
