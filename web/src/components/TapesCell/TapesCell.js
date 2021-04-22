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
    </div>
  )
}

export const Success = ({ tapes }) => {
  return (
      tapes.map((tape) => {
        return (
          <Link to={routes.tape({ id: tape.id })} className="cursor-pointer block">
            {tape.name}
          </Link>
        )
      })
  )
}
