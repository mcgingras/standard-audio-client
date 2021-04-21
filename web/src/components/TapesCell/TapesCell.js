import { Link, routes } from '@redwoodjs/router'
import Tapes from 'src/components/Tapes'

export const QUERY = gql`
  query TAPES {
    tapes {
      id
      owner
      name
      capacity
      quality
      style
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tapes yet. '}
      <Link to={routes.newTape()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ tapes }) => {
  return (
      tapes.map((tape) => {
        return (
          <div>
            {tape.id}
            {tape.name}
          </div>
        )
      })
  )
}
