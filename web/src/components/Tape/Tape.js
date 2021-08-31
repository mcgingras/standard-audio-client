import { useContext, useEffect, useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import useAPI from '../../hooks/useAPI'
import { Toaster } from '@redwoodjs/web/toast'
import { ContractContext } from '../../contexts/contractContext'

// UI Components
import TapeStats from '../TapeStats/TapeStats'
import CassetteScene from '../Three/Scenes/CassetteScene'

const Tape = ({ tape }) => {
  const { contract, address } = useContext(ContractContext)
  const [isOwner, setIsOwner] = useState(false)
  /**
   * isClaimed --
   * boolean for if the tape is available or not.
   * set after reading contract state.
   * maybe think about duplicating this state in postgres?
   * probably not going to update right away.
   */
  const [isClaimed, setIsClaimed] = useState(false)

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

  return (
    <>
      <div className="min-h-screen h-screen relative bg-blue-900">
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
              Listen in Den
            </Link>
            <Link
              to={routes.home()}
              className="rounded-full bg-white text-gray-900 text-sm font-bold ml-auto px-3 py-1"
            >
              BACK
            </Link>
          </div>
        </header>

        <CassetteScene style={tape.style} />

        <TapeStats isOwner={isOwner} tape={tape} />
      </div>
    </>
  )
}

export default Tape
