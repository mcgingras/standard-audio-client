import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import BidForm from 'src/components/BidForm'

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
const UPDATE_BID_MUTATION = gql`
  mutation UpdateBidMutation($id: Int!, $input: UpdateBidInput!) {
    updateBid(id: $id, input: $input) {
      id
      tapeId
      bidder
      amount
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ bid }) => {
  const [updateBid, { loading, error }] = useMutation(UPDATE_BID_MUTATION, {
    onCompleted: () => {
      toast.success('Bid updated')
      navigate(routes.bids())
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { tapeId: parseInt(input.tapeId) })
    updateBid({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Bid {bid.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BidForm bid={bid} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
