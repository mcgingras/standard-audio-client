import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/BidsCell'

const DELETE_BID_MUTATION = gql`
  mutation DeleteBidMutation($id: Int!) {
    deleteBid(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const BidsList = ({ bids }) => {
  const [deleteBid] = useMutation(DELETE_BID_MUTATION, {
    onCompleted: () => {
      toast.success('Bid deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bid ' + id + '?')) {
      deleteBid({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tape id</th>
            <th>Bidder</th>
            <th>Amount</th>
            <th>Active</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td>{truncate(bid.id)}</td>
              <td>{truncate(bid.tapeId)}</td>
              <td>{truncate(bid.bidder)}</td>
              <td>{truncate(bid.amount)}</td>
              <td>{checkboxInputTag(bid.active)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bid({ id: bid.id })}
                    title={'Show bid ' + bid.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBid({ id: bid.id })}
                    title={'Edit bid ' + bid.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete bid ' + bid.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bid.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BidsList
