import Tape from 'src/components/Tape'

export const QUERY = gql`
  query FIND_TAPE_BY_ID($id: Int!) {
    tape: tape(id: $id) {
      id
      owner
      name
      capacity
      quality
      style
      proof
      isClaimed
      Bids {
        id
        amount
        bidder
        active
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Tape not found</div>

export const Success = ({ tape }) => {
  return <Tape tape={tape} />
}
