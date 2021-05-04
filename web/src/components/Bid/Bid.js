import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/BidsCell'

const DELETE_BID_MUTATION = gql`
  mutation DeleteBidMutation($id: Int!) {
    deleteBid(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Bid = ({ bid }) => {
  const [deleteBid] = useMutation(DELETE_BID_MUTATION, {
    onCompleted: () => {
      toast.success('Bid deleted')
      navigate(routes.bids())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bid ' + id + '?')) {
      deleteBid({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Bid {bid.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bid.id}</td>
            </tr>
            <tr>
              <th>Tape id</th>
              <td>{bid.tapeId}</td>
            </tr>
            <tr>
              <th>Bidder</th>
              <td>{bid.bidder}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{bid.amount}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(bid.active)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBid({ id: bid.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bid.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Bid
