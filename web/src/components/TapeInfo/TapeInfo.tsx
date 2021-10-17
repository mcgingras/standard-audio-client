// import { useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import {
  styleDecoder,
  capacityDecoder,
  qualityDecoder,
} from '../../utils/decoder'

const generateStats = (tape) => {
  const capacity = capacityDecoder(tape.capacity)
  const quality = qualityDecoder(tape.quality)
  const style = styleDecoder(tape.style)

  return {
    capacity,
    quality,
    ...style,
  }
}

const TapeInfo = ({ tape }) => {
  const [spotifyLoggedIn, _token] = useSpotify()
  const _stats = generateStats(tape)

  return (
    <div className="bg-white rounded-sm overflow-scroll">
      <div className="text-sm pt-8 px-8">
        <p className="">You currently own this tape.</p>
        <p className="pb-8 border-b">Tape #023 / 500</p>
      </div>

      <div className="text-sm pt-8 px-8">
        <p>Tape Stats</p>
        <p className="pb-8 border-b">tape stats</p>
      </div>

      <div className="text-sm pt-8 px-8">
        <p>Tape Contents</p>
        <p className="pb-8 border-b">songs... etc</p>
      </div>

      <div className="text-sm pt-8 px-8">
        <p className="mb-8">
          You can add songs to this tape to make it available for listening
          inside the listening room. You need a spotify premium account to for
          this. Support for soundcloud and mp3 uploads is on the roadmap.
        </p>
        <div className="pb-8">
          <button className="bg-gray-900 px-4 py-4 text-white font-bold text-sm rounded-full w-full">
            {spotifyLoggedIn && 'Login to Spotify'}
          </button>
        </div>
      </div>

      <div className="text-sm pt-8 px-8">
        <p className="mb-8">
          You can add songs to this tape to make it available for listening
          inside the listening room. You need a spotify premium account to for
          this. Support for soundcloud and mp3 uploads is on the roadmap.
        </p>
        <div className="pb-8">
          <button className="bg-gray-900 px-4 py-4 text-white font-bold text-sm rounded-full w-full">
            {spotifyLoggedIn && 'Login to Spotify'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TapeInfo
