import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/TapesCell'

const DELETE_TAPE_MUTATION = gql`
  mutation DeleteTapeMutation($id: Int!) {
    deleteTape(id: $id) {
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

const Tape = ({ tape }) => {
  const [deleteTape] = useMutation(DELETE_TAPE_MUTATION, {
    onCompleted: () => {
      toast.success('Tape deleted')
      navigate(routes.tapes())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete tape ' + id + '?')) {
      deleteTape({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Tape {tape.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{tape.id}</td>
            </tr>
            <tr>
              <th>Owner</th>
              <td>{tape.owner}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{tape.name}</td>
            </tr>
            <tr>
              <th>Capacity</th>
              <td>{tape.capacity}</td>
            </tr>
            <tr>
              <th>Quality</th>
              <td>{tape.quality}</td>
            </tr>
            <tr>
              <th>Style</th>
              <td>{tape.style}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTape({ id: tape.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(tape.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Tape
