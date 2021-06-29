import { useContext } from 'react'
import TapesCell from 'src/components/TapesCell'
import { ContractContext } from '../../contexts/contractContext'
import Logo from '../../assets/saclogobig.svg'

const HomePage = () => {
  const contract = useContext(ContractContext)

  return (
    <>
      <div class="bg-yellow-500">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-row justify-between">
            <Logo />
            <div class="py-12 space-x-4 flex flex-row">
              <div class="bg-gray-100 rounded self-start shadow-lg">
                <button class="px-3 py-2 hover:bg-purple-400">About</button>
                <button class="px-3 py-2 hover:bg-purple-400">All Tapes</button>
                <button class="px-3 py-2 hover:bg-purple-400">
                  Claim a Tape
                </button>
              </div>
              <button class="self-start bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-2">
                My Tapes
              </button>
              <button class="self-start bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-2">
                Listen in the Den
              </button>
            </div>
          </div>
          <div class="pt-12 pb-24">
            <h2 class="text-4xl w-1/2 font-semibold">
              NFTapes is a revival of casette media for the digital age.
            </h2>
            <h3 class="text-lg w-1/3 mt-6">
              Create a digital mixtape that is unique and rewriteable with songs
              served from Spotify.
            </h3>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto my-12">
        <TapesCell />
      </div>
    </>
  )
}

export default HomePage
