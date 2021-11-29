import { useContext, useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { styleDecoder } from '../../utils/decoder'
import BareScene from '../../components/Three/Scenes/BareScene'
import useSpotify from '../../hooks/useSpotify'
import useContract from '../../hooks/useContract'
import { ContractContext } from '../../contexts/contractContext'
import SubtapeFactoryArtifact from '../../contracts/SubtapeFactory.json'
import { getIPFSData } from '../../utils/pinata'

const Underlay = ({ data }) => {
  return (
    <div className="absolute h-full w-full inline-flex flex-col p-10 items-start justify-start top-0 left-0 overflow-hidden">
      <div className="w-full p-0 inline-flex flex-row items-center justify-center">
        <p className="flex-1 h-8 text-xl">Your Tapes</p>
      </div>
      <div className="w-full p-0 inline-flex flex-row items-start justify-center">
        <p className="flex-1 h-full text-black">
          <b className="text-3xl font-normal">
            {data?.tape.name || 'loading...'}
          </b>
          <span className="blurred"></span>
        </p>
      </div>
    </div>
  )
}

const Special = ({ factoryAddress }) => {
  const [count, setCount] = useState(0)
  const factory = useContract(factoryAddress, SubtapeFactoryArtifact.abi)
  const burnTape = async () => {
    // await factory.mintSubtape(address)
    const c = await factory.ownerOf(0)
    console.log(c)
  }

  useEffect(() => {
    if (factory) {
      fetchDataFromContract()
    }
  }, [factory])

  const fetchDataFromContract = async () => {
    // setCount((await factory.totalSupply()).toNumber())
  }

  return (
    <>
      <p className="text-sm mb-4">{count} subtape(s) in circulation.</p>
      <button
        className="bg-black text-white px-4 py-4 rounded-full w-full"
        onClick={() => {
          burnTape()
        }}
      >
        Burn Tape
      </button>
    </>
  )
}

const TapeStats = ({ id, songs }) => {
  const { contracts, address } = useContext(ContractContext)
  const [spotifyLoggedIn, token] = useSpotify()
  const [claimed, setClaimed] = useState<boolean>()
  const [owner, setOwner] = useState()
  const [factoryAddress, setFactoryAddress] = useState()

  useEffect(() => {
    if (contracts) {
      fetchContractData()
    }
  }, [contracts])

  const fetchContractData = async () => {
    let claimed = await contracts?.mixtape?.isClaimed(id)
    setClaimed(claimed)
    if (claimed) {
      setOwner(await contracts?.mixtape?.ownerOf(id))
    }
    // going to be a problem if the id of the factory address does not match the id of the component
    // seems like the factories will be minted in order
    setFactoryAddress(await contracts?.mixtape?.getFactoryAtId(0))
  }

  return (
    <div className="bg-blurred p-8 h-full box-border overflow-scroll fit-4 rounded-md">
      <div className="pb-8 border-b border-black">
        <h3 className="font-bold mb-2">01. Core</h3>
        <p className="text-sm">You currently own this tape.</p>
        <p className="text-sm">
          This tape is normal mapped, a style that only 6% of all tapes.
        </p>
        <p className="text-sm">This is tape {id}/100.</p>
      </div>
      <div className="py-8 border-b border-black">
        <h3 className="font-bold mb-2">02. Tracklist</h3>
        <p className="text-sm pb-4">
          You can use this tape to host a spotify playlist inside the listening
          room. You need a spotify premium account to do this. The listening
          will support soundcloud and mp3 uploads soon (not now).
        </p>
        <ol className="list-decimal list-inside pb-4">
          {songs.map((song) => {
            return <li className="text-sm">{song.name}</li>
          })}
        </ol>
        {!spotifyLoggedIn && (
          <a
            href={
              process.env.NETLIFY_DEV === 'development'
                ? `http://localhost:8911/login?return_url=alt/${id}`
                : `https://nftapes.netlify.app/.netlify/functions/login?return_url=tapes/${id}`
            }
          >
            <button className="bg-black rounded-full text-white w-full px-4 py-4 hover:bg-gray-900 transition-colors">
              Connect to Spotify
            </button>
          </a>
        )}
        {spotifyLoggedIn && owner === address && (
          <Link to={routes.claims({ id: parseInt(id) })}>
            <button className="bg-black rounded-full text-white w-full px-4 py-4 hover:bg-gray-900 transition-colors">
              Edit Tape
            </button>
          </Link>
        )}
        {spotifyLoggedIn && owner !== address && (
          <Link to={routes.claims({ id: parseInt(id) })}>
            <button className="bg-black rounded-full text-white w-full px-4 py-4 hover:bg-gray-900 transition-colors">
              Listen to Tape
            </button>
          </Link>
        )}
      </div>
      <div className="py-8 border-b border-black">
        <h3 className="font-bold mb-2">03. Tape Stats</h3>
        <div className="grid grid-cols-4 gap-4">
          <p className="text-sm mr-2">Duration</p>
          <span className="bg-black text-white px-1 py-1 text-sm flex-1">
            60 mins.
          </span>
          <p className="text-sm mr-2">Shader</p>
          <span className="bg-black text-white px-1 py-1 text-sm flex-1">
            12
          </span>
          <p className="text-sm mr-2">Rarity</p>
          <span className="bg-black text-white px-1 py-1 text-sm flex-1">
            Halo
          </span>
          <p className="text-sm mr-2">Edition</p>
          <span className="bg-black text-white px-1 py-1 text-sm flex-1">
            99
          </span>
          <p className="text-sm mr-2">Duration</p>
          <span className="bg-black text-white px-1 py-1 text-sm flex-1">
            42
          </span>
          <p className="text-sm mr-2">Quality</p>
          <span className="bg-black text-white px-1 py-1 text-sm flex-1">
            4
          </span>
        </div>
      </div>
      <div className="py-8 border-b border-black">
        <h3 className="font-bold mb-2">04. Ownership</h3>
        {!claimed ? (
          <>
            <p className="text-sm mb-4">
              This tape is unclaimed. Mint it and it can be yours.
            </p>
            <Link to={routes.claims({ id: parseInt(id) })}>
              <button className="bg-black rounded-full text-white w-full px-4 py-4 hover:bg-gray-900 transition-colors">
                Claim Tape
              </button>
            </Link>
          </>
        ) : (
          <p className="text-sm">
            This tape is owned by: <span className="font-bold">{owner}</span>.
          </p>
        )}
      </div>
      <div className="pt-8">
        <h3 className="font-bold mb-2">05. Burning</h3>
        <p className="text-sm">Burning tapes stats.</p>
        {factoryAddress && <Special factoryAddress={factoryAddress} />}
      </div>
    </div>
  )
}

const AltPage = ({ id }) => {
  const FIND_TAPE_QUERY = gql`
    query FIND_TAPE_BY_ID($id: Int!) {
      tape: tape(id: $id) {
        id
        name
        style
        ipfsHash
      }
    }
  `

  const { loading, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  const [activeIdx, setActiveIdx] = useState<number>(-1)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [songs, setSongs] = useState([])

  const getIPFS = async () => {
    if (data) {
      let d = await getIPFSData(data.tape.ipfsHash)
      setSongs(d.data.songs)
    }
  }

  useEffect(() => {
    getIPFS()
  }, [data])

  const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

  function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t))
  }

  const clamp = (val, target) => {
    return sigmoid(map(50 - Math.abs(target - val), 0, 50, -10, 5)) * 100 + 20
  }

  return (
    <div id="root">
      <Underlay data={data} />
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2">
          {/* <div className="fixed flex flex-row bottom-0 mx-auto">
            {Array.from(Array(50)).map((a, i) => (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <Link
                to={routes.tape({ id: i })}
                href={`${i}`}
                key={i}
                onMouseOver={() => {
                  setIsHovered(true)
                  setActiveIdx(i)
                }}
                onMouseLeave={() => {
                  setIsHovered(false)
                  setActiveIdx(parseInt(data?.tape.id || '-1'))
                }}
                // style={{ transform: `scaleX(${clamp(i, activeIdx)})` }}
                className="group py-1 self-start bg-clip-content relative ml-2"
              >
                <span
                  style={{
                    height: `${isHovered ? clamp(i, activeIdx) : 20}px`,
                    transition: 'height .2s',
                    transitionProperty: 'height',
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: '0ms',
                  }}
                  className={`${
                    activeIdx === i ? 'bg-gray-300' : 'bg-gray-500'
                  } w-1 h-0.5 group-hover:bg-gray-300 block`}
                ></span>
                <span
                  style={{
                    top: '-5px',
                    right: '-40px',
                    transitionDuration: '0ms',
                  }}
                  className={`${
                    activeIdx === i && isHovered ? 'opacity-100' : 'opacity-0'
                  } absolute font-bold text-sm text-white transition-all`}
                >
                  {activeIdx}
                </span>
              </Link>
            ))}
          </div> */}
          <BareScene style={loading ? {} : styleDecoder(data.tape.style)} />
        </div>
        <div className="col-span-1 p-4 z-50">
          <TapeStats id={id} songs={songs} />
        </div>
      </div>
    </div>
  )
}

export default AltPage
