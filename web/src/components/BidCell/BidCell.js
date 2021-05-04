import Bid from 'src/components/Bid'

export const QUERY = gql`
  query FIND_BID_BY_ID($id: Int!) {
    bid: bid(id: $id) {
      id
      tapeId
      bidder
      amount
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Bid not found</div>

export const Success = ({ bid }) => {
  return <Bid bid={bid} />
}
