import Logo from '../../assets/logo_bland.svg'

const AltPage = () => {
  return (
    <div className="bg-red-500">
      <div className="max-w-screen-lg mx-auto">
        <div className="py-12 flex justify-end -mb-24">
          <Logo className="self-start h-20 w-20 sm:h-80 sm:w-80 fill-current text-red-700" />
        </div>

        <div className="py-12 border-b-2 border-red-700">
          <h3 className="text-2xl font-semibold text-red-700 mb-2">
            From the Office of
          </h3>
          <h1 className="text-8xl font-bold text-gray-800">
            The Standard <br /> Audio Company
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-2 text-gray-800 opacity-50 mt-4 leading-5 pb-12">
          <p>
            Hello, and welcome to your first taste of the Standard Audio
            Company. You will be seeing quite a bit of us around here. We are a
            collective of designers, developers, and web3 enthusiasts focused on
            bringing a bit more interactivity and fun to the metaverse.
          </p>
          <p>
            Our first drop is <span className="font-bold">MXTAPE</span>- of
            revival of the great cassette mixtape as an NFT. Create a mixtape.
            Send one to your friend. Send one to your secret crush. Keep it for
            yourself if you want!
          </p>
          <p>
            You can read a bit more about our plans for the future here. Join
            our discord.
          </p>
        </div>
        <div className="flex items-center justify-center pb-24 flex-col">
          <div className="flex items-start justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                <span className="flex items-center space-x-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600 -rotate-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span className="pr-6 text-gray-100">
                    MXTapes Release 11.2021
                  </span>
                </span>
                <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                  claim early &rarr;
                </span>
              </button>
            </div>
          </div>
          <p className="text-sm underline mt-2 text-blue-900 cursor-pointer">
            Join our Discord
          </p>
        </div>
      </div>
    </div>
  )
}

export default AltPage
