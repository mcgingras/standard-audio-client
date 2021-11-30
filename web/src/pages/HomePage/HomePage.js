import Logo from '../../assets/saclogobig.svg'

const HomePage = () => {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-0 pb-12">
          <div className="flex flex-row justify-between">
            <Logo className="self-start h-20 w-20 sm:h-36 sm:w-36" />
            <div className="py-4 sm:py-12 space-x-4 flex flex-row">
              <div className="bg-gray-100 rounded self-start shadow-lg text-sm sm:text-base hidden sm:block">
                <button className="px-3 py-2 hover:bg-purple-400">About</button>
                <button className="px-3 py-2 hover:bg-purple-400">
                  All Tapes
                </button>
              </div>
              <button className="self-start bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-2 text-xs sm:text-base">
                My Tapes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
