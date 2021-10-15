import { useContext, useEffect, useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import useAPI from '../../hooks/useAPI'
import { Toaster } from '@redwoodjs/web/toast'
import { ContractContext } from '../../contexts/contractContext'

// UI Components
import TapeStats from '../TapeStats/TapeStats'
import CassetteScene from '../Three/Scenes/CassetteScene'
import { styleDecoder } from '../../utils/decoder'

const Tape = ({ tape }) => {
  const { contract, address } = useContext(ContractContext)
  const [isOwner, setIsOwner] = useState(false)
  const [activeIdx, setActiveIdx] = useState(tape.id)
  /**
   * isClaimed --
   * boolean for if the tape is available or not.
   * set after reading contract state.
   * maybe think about duplicating this state in postgres?
   * probably not going to update right away.
   */
  const [isClaimed, setIsClaimed] = useState(false)
  const [color, setColor] = useState(tape.style)

  const tempStyle = {
    screw: 'white',
    label_small: 'white',
    sticker_large: 'white',
    front_canal: 'white',
    front_top_plate: 'white',
    front_middle_layer: 'white',
    middle_main: 'white',
    film_roll: 'white',
    teeth: 'white',
    teeth_ring: 'white',
    film_middle_connector: 'white',
    inner_post_left: 'white',
    inner_post_right: 'white',
    film_main_wiggle: 'white',
    back_middle_layer: 'white',
    back_canal: 'white',
    back_top_plate: 'white',
  }

  // Graphql API methods
  const { update } = useAPI()

  const testUpdate = () => {
    update(tape, { owner: '0x456' })
  }

  useEffect(() => {
    const getBid = async () => {
      if (contract != '') {
        const claimed = await contract.isClaimed(tape.id)
        setIsClaimed(claimed)
      }
    }
    getBid()
  }, [contract, tape.id])

  useEffect(() => {
    if (address != '') {
      setIsOwner(address === tape.owner)
    }
  }, [address])

  const clamp = (val, target) => {
    if (Math.abs(target - val) > 5) {
      return 40
    }

    return (10 - Math.abs(target - val)) * (10 - Math.abs(target - val)) + 3
  }

  return (
    <>
      <div className="min-h-screen h-screen relative bg-gray-400">
        <Toaster />
        <header className="flex justify-between p-8 fixed top-0 w-full z-10">
          <div className="flex flex-row">
            <h1 className="text-4xl font-semibold text-white">{tape.name}</h1>
            <h3 className="self-center rounded-full border border-white text-white px-3 py-1 ml-4 text-sm">
              Owner
            </h3>
            <h3 className="ml-4 text-sm font-semibold text-white self-center">
              {tape.owner}
            </h3>
          </div>
          <div className="flex self-center">
            <Link
              to={routes.listeningRoom({ id: tape.id })}
              className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1 mr-2"
            >
              Claim Tape
            </Link>
            <Link
              to={routes.listeningRoom({ id: tape.id })}
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
            <button onClick={() => setColor(1496618076026003)}>
              change color
            </button>
          </div>
        </header>

        <CassetteScene style={color} />

        <div className="fixed flex flex-col left-0 top-0">
          {Array.from(Array(100)).map((a, i) => (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <div
              key={i}
              onMouseOver={() => {
                setActiveIdx(i)
              }}
              onMouseLeave={() => {
                setActiveIdx(tape.id)
              }}
              // style={{ transform: `scaleX(${clamp(i, activeIdx)})` }}
              style={{ width: `${clamp(i, activeIdx)}px` }}
              className="group py-1 self-start bg-clip-content transition-all relative"
            >
              <span
                style={{ width: `${clamp(i, activeIdx)}px` }}
                className="w-1 h-0.5 bg-gray-400 group-hover:bg-gray-100 block transition-all"
              ></span>
              {activeIdx === i && (
                <span className="absolute right-0">{activeIdx}</span>
              )}
            </div>
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
