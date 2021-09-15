import { Link } from '@redwoodjs/router'
import Wave from '../../assets/wave.svg'
import screenshot from '../../assets/screenshot48.png'
import Blank from '../../assets/blank_tape.svg'

const TapeFloat = ({ id, link, name }) => {
  return (
    <Link to={link} className="cursor-pointer block">
      <div className="w-full">
        {/* <img
          src={screenshot}
          // src={`https://nftapes.s3.amazonaws.com/screenshot${id}.png`}
          className="object-cover h-64 w-full"
          alt="a floating cassette tape"
        /> */}
        {/* <Blank className="" />
        <div className="flex justify-between px-4">
          <p className="text-sm text-gray-500">{name}</p>
          <p>{id}</p>
        </div> */}
        <div className="h-12 w-64 bg-gray-200 border-8 border-white">
          <div className="flex justify-between items-center px-4">
            <p className="">{name}</p>
            <p className="text-sm text-gray-500">{id}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TapeFloat
