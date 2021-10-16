import { useContext, useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
// import useAPI from '../../hooks/useAPI'
import { Toaster } from '@redwoodjs/web/toast'
import { ContractContext } from '../../contexts/contractContext'

// UI Components
// import TapeStats from '../TapeStats/TapeStats'
import CassetteScene from '../Three/Scenes/CassetteScene'
import { styleDecoder } from '../../utils/decoder'

const Tape = ({ data, loading }) => {
  const { _contract, _address } = useContext(ContractContext)
  const [_isOwner, _setIsOwner] = useState<boolean>(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  /**
   * isClaimed --
   * boolean for if the tape is available or not.
   * set after reading contract state.
   * maybe think about duplicating this state in postgres?
   * probably not going to update right away.
   */
  const [_isClaimed, _setIsClaimed] = useState(false)

  // Graphql API methods
  // const { update } = useAPI()
  // const testUpdate = () => {
  //   update(tape, { owner: '0x456' })
  // }

  // useEffect(() => {
  //   if (address != '') {
  //     setIsOwner(address === tape.owner)
  //   }
  // }, [address])

  const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

  function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t))
  }

  const clamp = (val, target) => {
    return sigmoid(map(50 - Math.abs(target - val), 0, 50, -10, 5)) * 100 + 20
  }

  // const clamp = (val, target) => {
  //   if (Math.abs(target - val) > 5) {
  //     return 40
  //   }

  //   return (10 - Math.abs(target - val)) * (10 - Math.abs(target - val)) + 20
  // }

  return (
    <>
      <div className="min-h-screen h-screen relative bg-gray-400">
        <Toaster />
        <header className="flex justify-between p-8 fixed top-0 w-full z-10">
          <div className="flex flex-row">
            <h1 className="text-4xl font-semibold text-white">
              {loading ? 'Loading' : data.tape.name}
            </h1>
            <h3 className="self-center rounded-full border border-white text-white px-3 py-1 ml-4 text-sm">
              Owner
            </h3>
            <h3 className="ml-4 text-sm font-semibold text-white self-center">
              {loading ? 'loading' : data.tape.owner}
            </h3>
          </div>
          {!loading && (
            <div className="flex self-center">
              <Link
                to={routes.claims({ id: data.tape.id })}
                className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1 mr-2"
              >
                Claim Tape
              </Link>
              <Link
                to={routes.listeningRoom({ id: data.tape.id })}
                className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1 mr-2"
              >
                Listen in Den
              </Link>
              <Link
                to={routes.home()}
                className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1"
              >
                BACK
              </Link>
            </div>
          )}
        </header>

        <CassetteScene style={loading ? {} : styleDecoder(data.tape.style)} />
        <div className="fixed flex flex-col left-0 top-0 pt-32">
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
                setActiveIdx(data.tape.id)
              }}
              // style={{ transform: `scaleX(${clamp(i, activeIdx)})` }}
              className="group py-1 self-start bg-clip-content relative ml-2"
            >
              <span
                style={{
                  width: `${isHovered ? clamp(i, activeIdx) : 20}px`,
                  transition: 'width .2s',
                  transitionProperty: 'width',
                  transitionTimingFunction: 'ease-in-out',
                  transitionDuration: '0ms',
                }}
                className={`${
                  activeIdx === i ? 'bg-gray-100' : 'bg-gray-400'
                } w-1 h-0.5 group-hover:bg-gray-100 block`}
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
        </div>

        {/* <TapeStats
          isOwner={isOwner}
          tape={tape}
          color={style.front_top_plate}
        /> */}
      </div>
    </>
  )
}

export default Tape
