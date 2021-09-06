import Logo from '../../assets/logo_bland.svg'

const AltPage = () => {
  return (
    <div className="bg-gray-100 bg-gradient-to-b from-red-50 to-indigo-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-12 flex justify-end -mb-24">
          <Logo className="self-start h-20 w-20 sm:h-80 sm:w-80 fill-current text-blue-900" />
        </div>

        <div className="py-12 border-b-2 border-blue-900">
          <h3 className="text-2xl font-semibold text-blue-900 mb-2">
            From the Office of
          </h3>
          <h1 className="text-8xl font-bold text-blue-900">
            The Standard <br /> Audio Company
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-2 text-blue-900 mt-4 leading-5 pb-24">
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
      </div>
    </div>
  )
}

export default AltPage
