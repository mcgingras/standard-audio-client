import { Transition } from '@headlessui/react'
import { useState, useEffect, Fragment, useRef } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { play, next, previous, pause, seek } from '../../utils/spotify'

// extending window delcaration so TS does not complain
declare global {
  interface Window {
    Spotify: any
    onSpotifyWebPlaybackSDKReady: any
  }
}

interface Artist {
  name: string
}

interface Track {
  name: string
  artists: Artist[]
  albumImage: string
}

const SpotifyCard = ({ isShowing, uris }) => {
  const [_isLoading, token] = useSpotify()
  const [deviceId, setDeviceId] = useState(undefined)
  const [_initializing, setInitializing] = useState(true)
  const [_error, setError] = useState(null)
  const [load, setLoad] = useState(false)
  const [activeTrack, setActiveTrack] = useState<Track>()
  let playerRef = useRef(null)

  /**
   * something about the slider
   */
  let [count, setCount] = useState({
    progress: 0,
    total_time: 0,
    play: false,
  })

  useEffect(() => {
    loadScript()
  }, [])

  const loadScript = () => {
    const script = document.createElement('script')

    script.id = 'spotify-player'
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = 'https://sdk.scdn.co/spotify-player.js'

    document.body.appendChild(script)
  }

  /**
   * When the player is creates a "Device ID"
   * A device ID is the name of a device capable of using spotify.
   * An iPhone could be a device, or a laptop. In this case, we
   * get a deviceID for the browser session. We need this device ID
   * for future API calls, so we store it as state.
   *
   * With that, the initialization is complete, so we set another
   * piece of state letting the rest of the view know it is
   * okay to continue.
   */
  const handlePlayerStatus = async (device_id) => {
    console.log('Setting device ID - initialization complete...')
    setDeviceId(device_id)
    setInitializing(false)
  }

  /**
   * Initializes the Spotify SDK.
   * When the WebPlaybackSDK is ready we call initializePlayer
   * initializePlayer is the entry to the app.
   */
  useEffect(() => {
    if (token) {
      if (!window.onSpotifyWebPlaybackSDKReady) {
        window.onSpotifyWebPlaybackSDKReady = initializePlayer
      } else {
        initializePlayer()
      }
    }
  }, [token])

  /**
   * initializePlayer creates a new spotify player
   * and adds a variety of event listeners.
   */
  const initializePlayer = () => {
    console.log('Initializing player...')
    const player = new window.Spotify.Player({
      getOAuthToken: (cb) => {
        cb(token)
      },
    })

    player.addListener('initialization_error', ({ message }) => {
      setError(message)
    })
    player.addListener('authentication_error', ({ message }) => {
      setError(message)
    })
    player.addListener('account_error', ({ message }) => {
      setError(message)
    })
    player.addListener('playback_error', ({ message }) => {
      setError(message)
    })

    player.addListener('player_state_changed', (player_state) => {
      // setActiveTrack(player_state.track_window.current_track)
      // setPlayback(player_state.position / player_state.duration)
      console.log(player_state)
      if (player_state) {
        let current_track = player_state.track_window.current_track

        setActiveTrack({
          name: current_track.name,
          artists: current_track.artists,
          albumImage: current_track.album.images[0].url,
        })

        setCount((m) => ({
          ...m,
          play: !player_state.paused,
          progress: player_state.position,
          total_time: player_state.duration,
        }))
      }
    })

    player.addListener('ready', ({ device_id }) => {
      handlePlayerStatus(device_id)
    })
    player.addListener('not_ready', ({ device_id }) => {
      setError('player has gone offline')
    })

    player.connect()
    playerRef.current = player
  }

  const togglePrevious = async () => {
    const response = await previous(token)
    // setCurrentTrackIndex((index) => index + -1)

    if (response.status !== 204) {
      setError('Beginning of tape - no previous songs.')
    }
  }

  const toggleNext = async () => {
    const response = await next(token)
    // setCurrentTrackIndex((index) => index + 1)

    if (response.status !== 204) {
      setError('End of tape - no songs remain.')
    }
  }

  const togglePlay = async () => {
    if (!load) {
      play(uris, deviceId, token)
      setLoad(true)
    } else {
      const response = await playerRef.current.togglePlay()
      setCount((m) => ({ ...m, play: !m.play }))

      if (response.status !== 204) {
        setError('cannot play')
      }
    }
  }

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
        <div className="bg-blurred shadow-2xl p-3 fixed bottom-5 left-5 rounded-xl z-50">
          <div className="flex flex-row justify-between">
            {activeTrack ? (
              <img
                className="h-20 w-20 rounded-lg"
                src={activeTrack.albumImage}
              />
            ) : (
              <div className="h-20 w-20 bg-gray-400 rounded-lg"></div>
            )}
            <div className="flex flex-col ml-4 text-center p-2 w-36">
              <p className="text-black opacity-90 text-xs overflow-ellipsis whitespace-nowrap overflow-x-hidden">
                {activeTrack ? activeTrack.name : 'loading'}
              </p>
              <p className="text-black opacity-50 text-xs overflow-ellipsis whitespace-nowrap overflow-x-hidden">
                {activeTrack
                  ? activeTrack.artists.map((artist) => artist.name).join(', ')
                  : ''}
              </p>
              <div className="flex justify-between text-black opacity-90 mt-auto">
                <button
                  onClick={() => {
                    togglePrevious()
                  }}
                >
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
                </button>
                {!count.play ? (
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      togglePlay()
                    }}
                  >
                    <svg
                      width=".75em"
                      height=".75em"
                      viewBox="0 0 128 128"
                      preserveAspectRatio="xMidYMid"
                    >
                      <path d="M119.351 64L8.65 0v128z" fill="currentColor" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      togglePlay()
                    }}
                  >
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
                  </button>
                )}
                <button
                  onClick={() => {
                    toggleNext()
                  }}
                >
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default SpotifyCard
