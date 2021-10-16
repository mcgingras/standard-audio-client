import { Link } from '@redwoodjs/router'
// the "side profile" view of the tape

const TapeFloat = ({ id, link, name }) => {
  return (
    <Link to={link} className="cursor-pointer block">
      <div className="w-full">
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
