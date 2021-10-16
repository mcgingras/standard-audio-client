import { Link } from '@redwoodjs/router'
import Wave from '../../assets/wave.svg'
import screenshot from '../../assets/screenshot48.png'

const TapeCard = ({ _id, link, name }) => {
  return (
    <Link to={link} className="cursor-pointer block hover:shadow-lg">
      <div className="w-full h-64 bg-red-500">
        <img
          src={screenshot}
          // src={`https://nftapes.s3.amazonaws.com/screenshot${id}.png`}
          className="object-cover h-64 w-full"
          alt="a rendering of the tape"
        />
      </div>
      <div className="bg-gray-700 flex flex-row justify-between items-center py-2 px-2">
        <div>
          <Wave className="block" />
        </div>
        <span className="self-center text-white">{name}</span>
        <span className="self-center text-white">60min</span>
      </div>
    </Link>
  )
}

export default TapeCard
