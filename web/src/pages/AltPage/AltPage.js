import { useRef, useEffect } from 'react'
import Logo from '../../assets/logo_bland.svg'

const AltPage = () => {
  const c = useRef(null)
  const tm = useRef(null)

  let canvas

  const col = (x, y, r, g, b) => {
    canvas.fillStyle = `rgb(${r},${g},${b})`
    canvas.fillRect(x, y, 1, 1)
  }
  const R = (x, y, t) => {
    return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t))
  }

  const G = (x, y, t) => {
    return Math.floor(
      192 +
        64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
    )
  }

  const B = (x, y, t) => {
    return Math.floor(
      192 +
        64 *
          Math.sin(
            5 * Math.sin(t / 9) +
              ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
          )
    )
  }

  let t = 0

  const run = function () {
    for (let x = 0; x <= 35; x++) {
      for (let y = 0; y <= 35; y++) {
        col(x, y, R(x, y, t), G(x, y, t), B(x, y, t))
      }
    }
    t = t + 0.12
    setTimeout(() => {
      run()
    }, 25)
  }

  const updateBackground = (value) => {
    let t = tm.current
    const percentage = value * 100
    console.log(t)

    t.style.backgroundPosition = percentage + '%'
  }

  const handleMouseMove = (event) => {
    console.log(event)
    const x = event.clientX
    const width = document.documentElement.clientWidth
    const value = x / width
    updateBackground(value)
  }
  const handleScroll = () => {
    const y = document.documentElement.scrollTop
    const height = document.documentElement.clientHeight
    const value = y / height
    updateBackground(value)
  }

  useEffect(() => {
    // canvas = c.current.getContext('2d')
    // run()
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white">
      <div className="max-w-screen-lg mx-auto">
        <div className="py-12 flex justify-end -mb-24">
          <Logo className="self-start h-20 w-20 sm:h-80 sm:w-80 fill-current text-gray-400" />
        </div>

        <div className="py-12 border-b-2">
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">
            From the Office of
          </h3>
          <h1 className="text-8xl font-bold holo" ref={tm}>
            The Standard <br /> Audio Company
          </h1>
        </div>
        <canvas
          id="iridescence"
          width="32"
          height="32"
          className="h-4 w-full hidden"
          ref={c}
        ></canvas>
        <div className="flex text-gray-600 mt-8 leading-5 pb-12">
          <p className="text-2xl flex-p7 px-2">
            Hello, and welcome to the Standard Audio Company. You'll be seeing
            quite a bit of us around here. We are a collective of designers,
            developers, and web3 enthusiasts focused on bringing a bit more
            interactivity and fun to the metaverse.
          </p>
          <div className="text-base flex-1 flex">
            <p className="flex-1 px-2">
              Our first drop - <span className="holo font-bold">MXTAPE</span> -
              is a revival of the great cassette mixtape medium, as an NFT.
              Create a mixtape. Send one to your friend. Send one to your secret
              crush. Keep it for yourself if you want! Create a mixtape. Send
              one to your friend. Send one to your secret crush. Keep it for
              yourself if you want!
            </p>
            <p className="flex-1 px-2">
              You can read a bit more about our plans for the future here. Join
              our discord. Create a mixtape. Send one to your friend. Send one
              to your secret crush. Keep it for yourself if you want! Create a
              mixtape. Send one to your friend. Send one to your secret crush.
              Keep it for yourself if you want!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center pb-20 flex-col">
          <button className="rounded-full px-4 py-4 text-white bg-gray-400 h text-2xl">
            Join our Discord
          </button>
        </div>
      </div>
    </div>
  )
}

export default AltPage
