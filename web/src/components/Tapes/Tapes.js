import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/TapesCell'

const DELETE_TAPE_MUTATION = gql`
  mutation DeleteTapeMutation($id: Int!) {
    deleteTape(id: $id) {
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

const TapesList = ({ tapes }) => {
  const [deleteTape] = useMutation(DELETE_TAPE_MUTATION, {
    onCompleted: () => {
      toast.success('Tape deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete tape ' + id + '?')) {
      deleteTape({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Quality</th>
            <th>Style</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tapes.map((tape) => (
            <tr key={tape.id}>
              <td>{truncate(tape.id)}</td>
              <td>{truncate(tape.owner)}</td>
              <td>{truncate(tape.name)}</td>
              <td>{truncate(tape.capacity)}</td>
              <td>{truncate(tape.quality)}</td>
              <td>{truncate(tape.style)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.tape({ id: tape.id })}
                    title={'Show tape ' + tape.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTape({ id: tape.id })}
                    title={'Edit tape ' + tape.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete tape ' + tape.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(tape.id)}
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

export default TapesList
