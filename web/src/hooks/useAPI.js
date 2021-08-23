import { useMutation } from '@redwoodjs/web'

const UPDATE_TAPE_MUTATION = gql`
  mutation UpdateTapeMutation($id: Int!, $input: UpdateTapeWithSongsInput!) {
    updateTapeWithExistingSongs(id: $id, input: $input) {
      id
    }
  }
`

const useAPI = () => {
  const [updateTapeEvent] = useMutation(UPDATE_TAPE_MUTATION)

  const updateTape = (tape, params) => {
    // strange behavior where it is updating the songs
    let existingSongs = tape.SongsOnTapes.map((s) => {
      return {
        id: s.id,
      }
    })

    const updateParams = { existingSongs: existingSongs, ...params }
    updateTapeEvent({ variables: { id: tape.id, input: updateParams } })
  }

  return { updateTape }
}

export default useAPI
