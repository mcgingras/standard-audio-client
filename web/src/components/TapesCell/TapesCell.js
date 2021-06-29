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
    <div class="grid grid-cols-4 gap-8">
      {tapes.map((tape) => {
        return <TapeCard link={routes.tape({ id: tape.id })} name={tape.name} />
      })}
    </div>
  )
}
