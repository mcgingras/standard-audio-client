import { Link } from '@redwoodjs/router'
import Wave from '../../assets/wave.svg'
import screenshot from '../../assets/screenshot48.png'
import Blank from '../../assets/blank_tape.svg'

const TapeFloat = ({ id, link, name }) => {
  return (
    <Link to={link} className="cursor-pointer block">
      <div className="w-full h-64">
        {/* <img
          src={screenshot}
          // src={`https://nftapes.s3.amazonaws.com/screenshot${id}.png`}
          className="object-cover h-64 w-full"
          alt="a floating cassette tape"
        /> */}
        <Blank className="" />
      </div>
    </Link>
  )
}

export default TapeFloat
