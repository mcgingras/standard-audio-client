import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TapeForm from 'src/components/TapeForm'

export const QUERY = gql`
  query FIND_TAPE_BY_ID($id: Int!) {
    tape: tape(id: $id) {
      id
      owner
      name
      capacity
      quality
      style
    }
  }
`
const UPDATE_TAPE_MUTATION = gql`
  mutation UpdateTapeMutation($id: Int!, $input: UpdateTapeInput!) {
    updateTape(id: $id, input: $input) {
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

export const Success = ({ tape }) => {
  const [updateTape, { loading, error }] = useMutation(UPDATE_TAPE_MUTATION, {
    onCompleted: () => {
      toast.success('Tape updated')
      navigate(routes.tapes())
    },
  })

  const onSave = (input, id) => {
    updateTape({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Tape {tape.id}</h2>
      </header>
      <div className="rw-segment-main">
        <TapeForm tape={tape} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
