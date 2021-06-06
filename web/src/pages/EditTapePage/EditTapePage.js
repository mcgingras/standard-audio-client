import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import useSpotify from '../../hooks/useSpotify'

const EditTapePage = ({ id }) => {
  const [isLoggedIn, token] = useSpotify()

  // used for state of form
  const [title, setTitle] = useState('')
  const [tracks, setTracks] = useState([])
  const [songs, setSongs] = useState([])

  // used for debounced search
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [isSearching, setIsSearching] = useState(false)

  const searchSpotify = (q) => {
    return fetch(`https://api.spotify.com/v1/search/?q=${q}&type=track`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    }).then((res) => res.json())
  }

  useEffect(
    () => {
      if (debouncedQuery) {
        setIsSearching(true)
        searchSpotify(debouncedQuery).then((results) => {
          console.log(results)
          setIsSearching(false)
          setTracks(results.tracks.items)
        })
      } else {
        setTracks([])
      }
    },
    [debouncedQuery] // Only call effect if debounced search term changes
  )

  const addSong = (song) => {
    let songData = {
      id: song.id,
      name: song.name,
      uri: song.uri,
      artists: song.artists.map((artist) => artist.name).join(', '),
    }
    setSongs([...songs, songData])
  }

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto min-h-screen">
        {!isLoggedIn ? (
          <>
            <div className="pt-16 mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Configure Cassette</h1>
              <a href="" className="uppercase text-sm">
                Back to Viewer
              </a>
            </div>
            <div className="flex flex-col">
              <span className="bg-gray-700 p-16 text-center rounded-md">
                NFTapes requires you have Spotify account to add and listen to
                songs from cassettes. Please login.
              </span>
              <button className="bg-green-300 hover:bg-green-400 text-gray-900 self-start px-4 py-2 rounded-full mx-auto mt-8">
                <a
                  href={`http://localhost:8911/login?return_url=tapes/${id}/edit`}
                >
                  Log into Spotify
                </a>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="pt-16 mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Configure Cassette</h1>
              <a href="" className="uppercase text-sm">
                Back to Viewer
              </a>
            </div>

            <section className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="flex flex-col mb-8">
                  <label className="mb-2">Cassette Title</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                    className="rounded-md px-4 py-2 text-gray-900"
                    placeholder="title"
                  />
                </div>

                <div>
                  <label className="mb-2 block">Tracklist</label>
                  <ul>
                    {songs.map((result, index) => (
                      <li
                        key={result.id}
                        className="bg-gray-700 p-4 rounded-md block mb-4"
                      >
                        {`${index + 1}. ${result.name} - ${result.artists}`}
                        <input
                          type="hidden"
                          name={`song-${index}`}
                          value={result.id}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <label className="mb-2">Add Songs</label>
                  <input
                    type="text"
                    className="rounded-lg px-4 py-2 text-gray-900"
                    placeholder="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {isSearching && <div className="bg-white">Searching ...</div>}
                  {query && (
                    <div className="bg-white border rounded-b-lg shadow-md max-h-96 overflow-scroll rounded-b-lg">
                      {tracks.map((result) => (
                        <div
                          key={result.id}
                          onClick={() => addSong(result)}
                          className="hover:bg-gray-200 w-full px-2 py-2 flex"
                        >
                          <img
                            src={result.album.images[2].url}
                            alt="album cover photo"
                          />
                          <div className="ml-2">
                            <h4 className="font-lg text-gray-500">
                              {result.name}
                            </h4>
                            <h4 className="text-gray-500">
                              {result.artists
                                .map((artist) => artist.name)
                                .join(', ')}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 self-end">
                    <button
                      className="bg-green-300 hover:bg-green-400 text-gray-900 px-4 py-2 rounded-full"
                      onClick={(e) => {
                        mintNFT(e)
                      }}
                    >
                      Create Cassette
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default EditTapePage
