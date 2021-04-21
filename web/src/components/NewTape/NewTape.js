import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TapeForm from 'src/components/TapeForm'

import { QUERY } from 'src/components/TapesCell'

const CREATE_TAPE_MUTATION = gql`
  mutation CreateTapeMutation($input: CreateTapeInput!) {
    createTape(input: $input) {
      id
    }
  }
`

const NewTape = () => {
  const [createTape, { loading, error }] = useMutation(CREATE_TAPE_MUTATION, {
    onCompleted: () => {
      toast.success('Tape created')
      navigate(routes.tapes())
    },
  })

  const onSave = (input) => {
    createTape({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Tape</h2>
      </header>
      <div className="rw-segment-main">
        <TapeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTape
