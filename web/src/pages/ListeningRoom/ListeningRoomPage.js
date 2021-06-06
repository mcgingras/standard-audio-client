import { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { Link } from '@redwoodjs/router'
import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'

const ListeningRoomPage = ({ id }) => {
  const [isLoggedIn, token] = useSpotify()
  /**
   * ActiveTrack:
   * Currently playing spotify track. Object with name,
   * artist, album, album image etc.
   *
   * CurrentTrackIndex:
   * Index of currently playing track within the array of tracks
   * pulled from the tape. Used to show which songs are up
   * next in the right hand view.
   */
  const [activeTrack, setActiveTrack] = useState(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [tape, setTape] = useState(undefined)
  const [uris, setUris] = useState([])

  const fetchTapes = (id) => {
    return fetch(`http://localhost:1234/tape/${id}`, {
      method: 'GET',
    }).then((res) => res.json())
  }

  useEffect(() => {
    fetchTapes(id).then((results) => {
      setTape(results)
    })
  }, [])

  /**
   * When the tape changes, we want to pull the uris from list tapes
   * song list so we can pass just those uris to the SpotifyPlayer.
   */
  useEffect(() => {
    if (tape) {
      const uris = tape.songs.map((song) => {
        return song.uri
      })
      setUris(uris)
    }
  }, [tape])

  return (
    <div>
      {!isLoggedIn ? (
        <div>you need to be logged in</div>
      ) : (
        <div className="grid grid-cols-4 h-screen">
          <div className="col-span-3 bg-yellow-500 relative">
            <div className="flex justify-between p-4">
              <h1 className="text-white text-3xl">Crystal Watermelon</h1>
              <Link
                to="/"
                className="bg-white rounded-full text-sm p-2 self-center"
              >
                BACK
              </Link>
            </div>
            <div className="absolute bottom-0 w-full px-8 py-4">
              <SpotifyPlayer
                uris={uris}
                setActiveTrack={setActiveTrack}
                setCurrentTrackIndex={setCurrentTrackIndex}
              />
            </div>
          </div>

          <div className="col-span-1 bg-gray-900 p-4">
            {tape && activeTrack && (
              <>
                {tape.songs
                  .slice(currentTrackIndex - 1, currentTrackIndex)
                  .map((tape) => {
                    return (
                      <div className="p-4 bg-gray-700 text-white rounded mb-4">
                        <span className="font-bold text-sm">{tape.name}</span>
                        <span className="text-sm">- {tape.artists}</span>
                      </div>
                    )
                  })}
                <h2 className="text-white text-2xl font-bold">
                  {activeTrack.name}
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <img src={activeTrack.album.images[0].url} />
                  <div className="flex flex-col">
                    <span className="text-white text-sm">
                      {activeTrack.artists[0].name}
                    </span>
                    <span className="text-white text-sm">
                      {activeTrack.album.name}
                    </span>
                  </div>
                </div>
                <p className="text-gray-200 font-bold mt-12 mb-4">Up Next</p>
                {tape.songs.slice(currentTrackIndex + 1).map((tape) => {
                  return (
                    <div className="p-4 bg-gray-700 text-white rounded mb-4">
                      <span className="font-bold text-sm">{tape.name}</span>
                      <span className="text-sm">- {tape.artists}</span>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ListeningRoomPage
