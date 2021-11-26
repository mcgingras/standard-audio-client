import { useContext, useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { styleDecoder } from '../../utils/decoder'
import BareScene from '../../components/Three/Scenes/BareScene'
import useSpotify from '../../hooks/useSpotify'
import useContract from '../../hooks/useContract'
import contractAddresses from '../../contracts/contract-address.json'
import { ContractContext } from '../../contexts/contractContext'
import SubtapeFactoryArtifact from '../../contracts/SubtapeFactory.json'

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

export const TapeStats = () => {}
// Demo component to act as a playground for testing the cassette in threejs
// since this thing is a pain the the ass to work with yikes man
const AltPage = ({ id }) => {
  const [spotifyLoggedIn, token] = useSpotify()
  const { contracts, address } = useContext(ContractContext)

  const [claimed, setClaimed] = useState<boolean>()
  const [owner, setOwner] = useState()
  const [factoryAddress, setFactoryAddress] = useState()

  const factory = useContract(
    '0xAC151DB2d400dB28554FEC978d48D91d6f55F9De',
    SubtapeFactoryArtifact.abi
  )

  useEffect(() => {
    if (contracts) {
      console.log(contracts)
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
    setFactoryAddress(await contracts?.subtapeFactoryCreator?.getFactoryAtId(0))
    // console.log(await contracts.subtapeFactoryCreator.ownerOf(0))
  }

  const FIND_TAPE_QUERY = gql`
    query FIND_TAPE_BY_ID($id: Int!) {
      tape: tape(id: $id) {
        id
        name
        style
      }
    }
  `

  const { loading, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  const burnTape = async () => {
    // factory.mintSubtape(address)
    const balance = await factory.owner()
    console.log(balance)
    // const c = await factory.ownerOf(0)
    // console.log(c)
  }

  return (
    <div id="root">
      <Underlay data={data} />
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="col-span-2">
          <BareScene style={loading ? {} : styleDecoder(data.tape.style)} />
        </div>
        <div className="col-span-1 p-4 z-50">
          <div className="bg-blurred p-8 h-full box-border overflow-scroll fit-4 rounded-md">
            <div className="pb-8 border-b border-black">
              <h3 className="font-bold mb-2">01. Core</h3>
              <p className="text-sm">You currently own this tape.</p>
              <p className="text-sm">
                This tape is normal mapped, a style that only 6% of all tapes.
              </p>
              <p className="text-sm">This is tape 24/500.</p>
            </div>
            <div className="py-8 border-b border-black">
              <h3 className="font-bold mb-2">02. Music</h3>
              <p className="text-sm pb-4">
                You can use this tape to host a spotify playlist inside the
                listening room. You need a spotify premium account to do this.
                The listening will support soundcloud and mp3 uploads soon (not
                now).
              </p>
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
                  This tape is owned by:{' '}
                  <span className="font-bold">{owner}</span>.
                </p>
              )}
            </div>
            <div className="pt-8">
              <h3 className="font-bold mb-2">05. Burning</h3>
              <p className="text-sm mb-4">Burning tapes stats.</p>
              <button
                className="bg-black text-white px-4 py-4 rounded-full w-full"
                onClick={() => {
                  burnTape()
                }}
              >
                Burn Tape
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AltPage
