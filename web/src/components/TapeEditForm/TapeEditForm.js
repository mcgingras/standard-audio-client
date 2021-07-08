import { useEffect, useState, useContext, useRef } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useQuery, useMutation } from '@redwoodjs/web'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useSpotify from '../../hooks/useSpotify'
import useDebounce from '../../hooks/useDebounce'
import useOnClickOutside from '../../hooks/useClickOutside'
import { ContractContext } from '../../contexts/contractContext'
import { pinJSONToIPFS } from '../../utils/pinata'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const TapeEditForm = ({ id, isClaim }) => {
  const { contract, address } = useContext(ContractContext)
  const [isLoggedIn, token] = useSpotify()
  const spotifySearchRef = useRef()

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

  useOnClickOutside(spotifySearchRef, () => {
    setQuery('')
    setIsSearching(false)
  })

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const orderedSongs = reorder(
      songs,
      result.source.index,
      result.destination.index
    )
    setSongs(orderedSongs)
  }

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
        SongsOnTapes {
          song {
            id
            name
            artist
            uri
          }
        }
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
      setTitle(data.tape.name)
      const songs = data.tape.SongsOnTapes.map((song) => {
        return song.song
      })
      setSongs(songs)
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

  const UPDATE_TAPE_MUTATION = gql`
    mutation UpdateTapeMutation($id: Int!, $input: UpdateTapeWithSongsInput!) {
      updateTapeWithExistingSongs(id: $id, input: $input) {
        id
      }
    }
  `

  const [claimTapeEvent] = useMutation(UPDATE_TAPE_MUTATION)
  const updateClaimDb = (ipfsHash) => {
    let params = {
      name: title,
      owner: address,
      isClaimed: true,
      ipfsHash,
    }
    claimTapeEvent({ variables: { id: tape.id, input: params } })
  }

  const editTape = () => {
    // tapes coming from spotify have an ID field that we want to get rid of
    // and tapes coming from gql have __typefield that we want to get rid of
    // return only the good stuff

    let existingSongs = tape.SongsOnTapes.map((song) => {
      return song.song
    })

    let newSongs = songs
      .filter((song) => !existingSongs.includes(song))
      .map((song) => {
        return {
          name: song.name,
          artist: song.artist,
          uri: song.uri,
        }
      })

    console.log(existingSongs)
    console.log(newSongs)

    existingSongs = existingSongs.map((song) => {
      return {
        id: song.id,
        name: song.name,
        artist: song.artist,
        uri: song.uri,
      }
    })

    let params = {
      name: title,
      existingSongs: existingSongs,
      newSongs: newSongs,
    }

    let r = claimTapeEvent({ variables: { id: tape.id, input: params } })
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
    let songData = {
      id: song.id,
      name: song.name,
      uri: song.uri,
      artist: song.artists.map((artist) => artist.name).join(', '),
    }
    setSongs([...songs, songData])
  }

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto min-h-screen">
        {!isLoggedIn ? (
          <>
            <div className="pt-16 mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Configure Cassette</h1>
              <a href={routes.tape({ id: id })} className="uppercase text-sm">
                Back to Tape
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
              <a href={routes.tape({ id: id })} className="uppercase text-sm">
                Back to Tape
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
                    value={title}
                    className="rounded-md px-4 py-4 text-gray-900"
                    placeholder="title"
                  />
                </div>

                <div>
                  <label className="mb-2 block">Tracklist</label>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          // style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {songs.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={String(item.id)}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className="grid grid-cols-8 gap-4 mb-4"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={`p-4 rounded col-span-7 ${
                                      snapshot.isDragging
                                        ? 'bg-gray-500'
                                        : 'bg-gray-700'
                                    }`}
                                  >
                                    {item.name}
                                  </div>
                                  <div className="rounded-full bg-gray-500 h-14 w-14 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>

              <div>
                <div className="flex flex-col" ref={spotifySearchRef}>
                  <label className="mb-2">Add Songs</label>
                  <input
                    type="text"
                    className="rounded-lg px-4 py-4 text-gray-900"
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
                        isClaim ? claimTape() : editTape()
                      }}
                    >
                      {isClaim ? 'Claim Cassette' : 'Edit Cassette'}
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
