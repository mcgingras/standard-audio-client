import { routes } from '@redwoodjs/router'
import TapeCard from '../TapeCard/'

export const beforeQuery = (props) => {
  return { variables: props }
}

export const QUERY = gql`
  query TAPES($isClaimed: Boolean) {
    tapes(isClaimed: $isClaimed) {
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
  return <div className="rw-text-center">{'No tapes yet. '}</div>
}

export const Success = ({ tapes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 px-4 sm:px-0">
      {tapes.map((tape) => {
        return (
          <TapeCard
            key={tape.id}
            id={tape.id}
            link={routes.tape({ id: tape.id })}
            name={tape.name}
          />
        )
      })}
    </div>
  )
}
