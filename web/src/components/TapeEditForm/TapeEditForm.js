import { useEffect, useState, useContext, useRef } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { Link, routes } from '@redwoodjs/router'
import { useQuery, useMutation } from '@redwoodjs/web'
import useSpotify from '../../hooks/useSpotify'
import useOnClickOutside from '../../hooks/useClickOutside'
import { ContractContext } from '../../contexts/contractContext'
import { pinJSONToIPFS } from '../../utils/pinata'

const TapeEditForm = ({ id, isClaim }) => {
  const { contract, address } = useContext(ContractContext)
  const [isLoggedIn, token] = useSpotify()
  const spotifySearchRef = useRef()

  useOnClickOutside(spotifySearchRef, () => {
    setQuery('')
    setIsSearching(false)
  })

  // used for state of form
  const [tape, setTape] = useState({})
  const [title, setTitle] = useState('')
  const [tracks, setTracks] = useState([])
  const [songs, setSongs] = useState([])

  const [txHash, setTxHash] = useState(undefined)
  const [txError, setTxError] = useState(undefined)
  const [txBeingSent, setTxBeingSent] = useState(undefined)
  const ERROR_CODE_TX_REJECTED_BY_USER = 4001

  // used for debounced search
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [isSearching, setIsSearching] = useState(false)

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
      }
    }
  `

  // doesnt this get run a bunch because of renders?
  // seems wasteful
  const { loading, error, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  useEffect(() => {
    if (data) {
      setTape(data.tape)
    }
  }, [data])

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
          setIsSearching(false)
          setTracks(results.tracks.items)
        })
      } else {
        setTracks([])
      }
    },
    [debouncedQuery] // Only call effect if debounced search term changes
  )

  const CLAIM_TAPE_MUTATION = gql`
    mutation ClaimTapeMutation($id: Int!, $input: UpdateTapeInput!) {
      updateTape(id: $id, input: $input) {
        id
      }
    }
  `

  const [claimTapeEvent] = useMutation(CLAIM_TAPE_MUTATION)
  const updateClaimDb = (ipfsHash) => {
    let params = {
      name: title,
      owner: address,
      isClaimed: true,
      ipfsHash,
    }
    claimTapeEvent({ variables: { id: tape.id, input: params } })
  }

  const claimTape = async () => {
    let ipfs = await pinJSONToIPFS({
      songs: songs,
      title: title,
    })

    try {
      const tx = await contract.claim(
        tape.id,
        tape.quality,
        tape.capacity,
        tape.style,
        tape.proof,
        ipfs.data.IpfsHash
      )
      setTxHash(tx.hash)

      const receipt = await tx.wait()

      // succeeds -- update claim in db
      if (receipt.status) {
        updateClaimDb(ipfs.data.IpfsHash)
        window.location.href = routes.tape({ id: id })
      }
      if (receipt.status === 0) {
        throw new Error('Transaction failed')
      }
    } catch (error) {
      console.log(error)
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return
      }
      setTxError(error)
    } finally {
      setTxBeingSent(undefined)
    }
  }

  const addSong = (song) => {
    console.log(songs)
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
                MXTapes requires you have Spotify account to add and listen to
                songs from cassettes. Please login.
              </span>
              <button className="bg-green-300 hover:bg-green-400 text-gray-900 self-start px-4 py-2 rounded-full mx-auto mt-8">
                <a
                  href={
                    process.env.NETLIFY_DEV === 'development'
                      ? `http://localhost:8911/login?return_url=tapes/${
                          tape.id
                        }/${isClaim ? 'claim' : 'edit'}`
                      : `https://nftapes.netlify.app/.netlify/functions/login?return_url=tapes/${
                          tape.id
                        }/${isClaim ? 'claim' : 'edit'}`
                  }
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
                    value={tape.name}
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
                <div className="flex flex-col" ref={spotifySearchRef}>
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
                      onClick={() => {
                        claimTape()
                        updateClaimDb()
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

export default TapeEditForm
