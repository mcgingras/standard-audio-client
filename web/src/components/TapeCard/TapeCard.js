import { Link } from '@redwoodjs/router'
import Wave from '../../assets/wave.svg'
import placeholder from '../../assets/second.png'

const TapeCard = ({ link, name }) => {
  return (
    <Link to={link} className="cursor-pointer block hover:shadow-lg">
      <div className="w-full h-64 bg-red-500">
        <img src={placeholder} class="object-cover h-64 w-full" />
      </div>
      <div className="bg-gray-900 flex flex-row justify-between items-center py-2 px-2">
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
