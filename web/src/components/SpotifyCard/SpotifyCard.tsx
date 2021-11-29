import { Transition } from '@headlessui/react'
import { useState, useEffect, Fragment } from 'react'

const SpotifyCard = ({ isShowing }) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [showing, setShowing] = useState<boolean>(false)

  return (
    <div>
      <Transition
        appear={true}
        as={Fragment}
        show={isShowing}
        enter="transform transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95 translate-y-full"
        enterTo="transform opacity-100 scale-100 rotate-0 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 translate-y-full"
      >
        <div className="bg-gray-900 shadow-2xl p-3 fixed bottom-5 left-5 rounded-xl">
          <div className="flex flex-row justify-between">
            <div className="h-20 w-20 bg-gray-400 rounded-lg"></div>
            <div className="flex flex-col ml-4 text-center p-2">
              <p className="text-white opacity-90 text-xs">Title of the song</p>
              <p className="text-white opacity-50 text-xs">Artists</p>
              <div className="flex justify-between text-white opacity-90 mt-auto">
                <svg
                  width=".75em"
                  height=".75em"
                  viewBox="0 0 128 128"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M29.09 53.749V5.819H5.819v116.363h23.273v-47.93L122.18 128V0z"
                    fill="currentColor"
                  />
                </svg>
                {!playing ? (
                  <svg
                    width=".75em"
                    height=".75em"
                    viewBox="0 0 128 128"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path d="M119.351 64L8.65 0v128z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg
                    width=".75em"
                    height=".75em"
                    viewBox="0 0 128 128"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M41.86 128V0H8.648v128h33.21zm77.491 0V0h-33.21v128h33.21z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                <svg
                  width=".75em"
                  height=".75em"
                  viewBox="0 0 128 128"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M98.91 53.749L5.817 0v128L98.91 74.251v47.93h23.273V5.819H98.909z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default SpotifyCard
