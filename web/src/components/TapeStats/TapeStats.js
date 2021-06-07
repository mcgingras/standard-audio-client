import { ethers } from 'ethers'
import { Link, routes } from '@redwoodjs/router'
import useSpotify from '../../hooks/useSpotify'

const demoStats = {
  Duration: '60 Min',
  Shader: 'Holo',
  Rarity: '96.9',
  Edition: '1',
  Aisle: '6',
  Bay: '12',
  Core: 'Bright',
  Quality: 'Bitty',
}
const Stat = ({ k, v }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="mr-2 text-xs">{k}</span>
      <span className="w-1/2 bg-gray-900 text-xs text-blue-200 p-1 font-semibold">
        {v}
      </span>
    </div>
  )
}

const bidPrice = (bid) => {
  if (bid.activeBid) {
    return (
      <span className="text-3xl text-center font-book">
        {ethers.utils.formatEther(bid.amount.toString())} ETH
      </span>
    )
  } else {
    return <span className="text-4xl text-center font-bold">NO BIDS</span>
  }
}

const TapeStats = ({
  address,
  isOwner,
  isClaimed,
  tape,
  bid,
  setBidSlideOpen,
}) => {
  const [spotifyLoggedIn, token] = useSpotify()

  return (
    <div className="p-8 box-border fixed bottom-0 w-full">
      <div className="p-8 bg-blue-400 w-full">
        <div className="grid grid-cols-4">
          <div className="flex flex-col text-sm pr-8 border-r border-black">
            <p className="font-bold">Tape #{tape.id}</p>
          </div>
          <div className="flex flex-col border-r border-black px-8">
            <p className="font-bold mb-2 text-sm">Tape Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(demoStats).map(([key, value]) => {
                return <Stat k={key} v={value} />
              })}
            </div>
          </div>
          <div className="flex flex-col justify-between px-8 border-r border-black">
            {isOwner ? (
              <>
                <p className="text-sm text-center">Edit this cassette.</p>
                <button className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">
                  <Link to={`/tapes/${1}/edit`}>Edit Cassette</Link>
                </button>
              </>
            ) : (
              <>
                {!spotifyLoggedIn && (
                  <>
                    <p className="text-sm text-center">
                      You need a Spotify Premium account to interact with this
                      cassette. Please connect your account.
                    </p>
                    <button className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full">
                      <a
                        href={`http://localhost:8888/login?redirect=/tapes/${1}`}
                      >
                        Log into Spotify
                      </a>
                    </button>
                  </>
                )}
                <button onClick={() => testUpdate()}>claim</button>
              </>
            )}
          </div>
          <div className="flex flex-col justify-between pl-8">
            {isClaimed ? (
              <>
                <span className="uppercase text-center text-xs font-bold">
                  Current Bid
                </span>
                {bidPrice(bid)}
                <button
                  onClick={() => {
                    setBidSlideOpen(true)
                  }}
                  className="bg-gray-900 px-4 py-2 text-blue-200 font-bold text-sm rounded-full"
                >
                  {isOwner ? 'View Bids' : 'Bid'}
                </button>
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
                  to={`/tapes/${1}/claim`}
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
  )
}

export default TapeStats
