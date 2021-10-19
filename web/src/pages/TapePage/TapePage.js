import Tape from 'src/components/Tape/Tape.tsx'
import { useQuery } from '@redwoodjs/web'

const TapePage = ({ id }) => {
  const FIND_TAPE_QUERY = gql`
    query FIND_TAPE_BY_ID($id: Int!) {
      tape: tape(id: $id) {
        id
        owner
        name
        capacity
        quality
        style
        proof
        SongsOnTapes {
          id
          song {
            id
            name
            artist
            uri
          }
        }
      }
    }
  `
  const { loading, _error, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  return <Tape data={data} loading={loading} />
}

export default TapePage
