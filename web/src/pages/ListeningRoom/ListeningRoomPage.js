import { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { Link } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer'
import { getIPFSData } from '../../utils/pinata'

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
  const [songs, setSongs] = useState([])
  const [uris, setUris] = useState([])

  const FIND_TAPE_QUERY = gql`
    query FIND_TAPE_BY_ID($id: Int!) {
      tape: tape(id: $id) {
        id
        owner
        name
        capacity
        quality
        style
        proof
        ipfsHash
      }
    }
  `

  // doesnt this get run a bunch because of renders?
  // seems wasteful -- possible useMemo?
  const { loading, error, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  useEffect(() => {
    if (data) {
      console.log(data.tape)
      setTape(data.tape)
    }
  }, [data])

  /**
   * When the tape changes, we want to pull the uris from list tapes
   * song list so we can pass just those uris to the SpotifyPlayer.
   */
  useEffect(() => {
    if (tape) {
      getIPFSData(tape.ipfsHash).then((response) => {
        setSongs(response.data.songs)
        const uris = response.data.songs.map((song) => {
          return song.uri
        })
        setUris(uris)
      })
    }
  }, [tape])

  return (
    <div>
      <div className="grid grid-cols-4 h-screen">
        <div className="col-span-3 bg-yellow-500 relative">
          <iframe
            src="https://my.spline.design/casetteplayer-2f76656f134d14ea43d8295e8f61aec9/"
            frameBorder="0"
            width="100%"
            height="100%"
          ></iframe>

          <div className="absolute top-0 w-full">
            <div className="flex justify-between p-4">
              <h1 className="text-white text-3xl">
                {tape ? tape.name : 'loading tape...'}
              </h1>
              <div id="controls"></div>
              <Link
                to="/"
                className="bg-white rounded-full text-sm p-2 self-center"
              >
                BACK
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 w-full px-8 py-4">
            {!isLoggedIn && tape ? (
              <div className="flex items-center">
                <div className="text-white mr-4">
                  You need to be logged in with Spotify to listen.
                </div>
                <button className="bg-gray-900 px-4 py-2 text-white font-bold text-sm rounded-full">
                  <a
                    href={
                      process.env.NETLIFY_DEV === 'development'
                        ? `http://localhost:8911/login?return_url=den/${tape.id}`
                        : `https://nftapes.netlify.app/.netlify/functions/login?return_url=tapes/${tape.id}`
                    }
                  >
                    Log into Spotify
                  </a>
                </button>
              </div>
            ) : (
              <SpotifyPlayer
                uris={uris}
                setActiveTrack={setActiveTrack}
                setCurrentTrackIndex={setCurrentTrackIndex}
              />
            )}
          </div>
        </div>

        <div className="col-span-1 bg-gray-900 p-4">
          {tape && activeTrack && (
            <>
              {songs
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
              {songs.slice(currentTrackIndex + 1).map((tape) => {
                return (
                  <div className="p-4 bg-gray-700 text-white rounded mb-4">
                    <span className="font-bold text-sm">{tape.name}</span>
                    <span className="text-sm">- {tape.artist}</span>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListeningRoomPage
