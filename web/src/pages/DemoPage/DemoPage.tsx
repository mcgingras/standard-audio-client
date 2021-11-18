import { useQuery } from '@redwoodjs/web'
import { styleDecoder } from '../../utils/decoder'
import BareScene from '../../components/Three/Scenes/BareScene'

export function Underlay() {
  return (
    <div className="absolute h-full w-full inline-flex flex-col p-10 items-start justify-start top-0 left-0">
      <div className="w-full p-0 inline-flex flex-row items-center justify-center">
        <p className="flex-1 h-8 text-3xl text-blac font-bold">
          MXTAPES
        </p>
      </div>
      <div className="h-14" />
      <div className="w-full p-0 inline-flex flex-row items-start justify-center">
        <p className="flex-1 h-full text-xs leading-4 text-black">
          <b>Dark Night Demo Tapes</b>
          <br />
          0x40e2a3cd2a924015fC13088dA1bD64999C2F5DD5
          <br />
          <b>—</b>
        </p>
        <div className="w-2.5" />
      </div>
      <div className="h-2.5" />
      <div className="w-full flex-1 p-0 inline-flex flex-row items-end justify-center" >
        <p
          className="flex-1 text-black m-0"
          style={{
            fontSize: 250,
            lineHeight: '1em',
            letterSpacing: -10,
          }}
        >
          III
        </p>
        <div className="w-2.5" />
        <p
          className="flex-1 text-black m-0 text-right"
          style={{
            fontSize: 250,
            lineHeight: '100%',
            letterSpacing: -10,
          }}
        >
          014
        </p>
      </div>
      <div className="h-14" />
      <div className="w-full p-0 inline-flex flex-row items-end justify-center">
        <p className="w-full whitespace-nowrap flex-1 text-xs leading-6 text-black">
          <b>Series III</b>
          <br />
          Color Mapped
        </p>
        <div className="w-2.5" />
        <p className="w-full flex-1 text-base font-bold leading-none text-center text-black whitespace-nowrap">
          HOVER FOR STATS
        </p>
        <div className="w-2.5" />
        <p className="w-full flex-1 text-xs leading-none text-right text-black"></p>
      </div>
    </div>
  )
}

// Demo component to act as a playground for testing the cassette in threejs
// since this thing is a pain the the ass to work with yikes man
const DemoPage = ({ id }) => {
  const FIND_TAPE_QUERY = gql`
    query FIND_TAPE_BY_ID($id: Int!) {
      tape: tape(id: $id) {
        id
        style
      }
    }
  `

  const { loading, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  return (
    <div id="root">
      <Underlay />
      <BareScene style={loading ? {} : styleDecoder(data.tape.style)} />
    </div>
  )
}

export default DemoPage
