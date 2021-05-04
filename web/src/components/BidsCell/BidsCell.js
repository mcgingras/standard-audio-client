import { Link, routes } from '@redwoodjs/router'

import Bids from 'src/components/Bids'

export const QUERY = gql`
  query BIDS {
    bids {
      id
      tapeId
      bidder
      amount
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bids yet. '}
      <Link to={routes.newBid()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ bids }) => {
  return <Bids bids={bids} />
}
