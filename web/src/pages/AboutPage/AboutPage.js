import Logo from '../../assets/saclogobig.svg'

const AboutPage = ({ id }) => {
  return (
    <>
      <div class="bg-yellow-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-0">
          <div class="flex flex-row justify-between">
            <Logo className="self-start h-20 w-20 sm:h-36 sm:w-36" />
            <div class="py-4 sm:py-12 space-x-4 flex flex-row">
              <div class="bg-gray-100 rounded self-start shadow-lg text-sm sm:text-base hidden sm:block">
                <button class="px-3 py-2 hover:bg-purple-400">About</button>
                <button class="px-3 py-2 hover:bg-purple-400">All Tapes</button>
                <button class="px-3 py-2 hover:bg-purple-400">
                  Claim a Tape
                </button>
              </div>
              <button class="self-start bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-2 text-xs sm:text-base">
                My Tapes
              </button>
              <button class="self-start bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-2 text-xs sm:text-base">
                Listen in the Den
              </button>
            </div>
          </div>
          <div className="pt-12 pb-24">
            <h2 className="text-4xl sm:w-1/2 font-semibold">
              NFTapes is a revival of casette media for the digital age.
            </h2>
            <h3 className="text-lg sm:w-1/3 mt-6">
              Create a digital mixtape that is unique and rewriteable with songs
              served from Spotify.
            </h3>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-12">
        <div className="w-1/2">
          <h3 className="text-3xl font-bold mb-4">
            What's the point of these being NFTs? Aren't those just destroying
            the earth?
          </h3>
          <p className="mb-12">No.</p>
          <h3 className="text-xl font-bold mb-4">
            What happens to my NFT if you shut down?
          </h3>
          <p className="mb-12">You still have it.</p>
          <h3 className="text-xl font-bold mb-4">
            Do these tapes host copyrighted content?
          </h3>
          <p className="mb-12">
            No, its all on spotify and requires a premium membership. It's no
            different than listening on spotify.
          </p>
          <h3 className="text-xl font-bold mb-4">
            I'm an artist, what do I get out of this platform?
          </h3>
          <p className="mb-12">Free exposure, you're welcome.</p>
        </div>
      </div>
    </>
  )
}

export default AboutPage
