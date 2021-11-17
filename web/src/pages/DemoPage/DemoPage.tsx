import { useQuery } from '@redwoodjs/web'
import { styleDecoder } from '../../utils/decoder'
import BareScene from '../../components/Three/Scenes/BareScene'

export function Underlay() {
  return (
    <div
      className="absolute h-full w-full inline-flex flex-col p-10"
      style={{
        top: 0,
        left: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        pointerEvents: 'none',
      }}
    >
      <div
        className="w-full p-0 inline-flex flex-row items-center justify-center"
      >
        <p
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: '1 1 0%',
            height: 30,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: '30px',
            color: 'black',
            letterSpacing: -2,
          }}
        >
          MXTAPES
        </p>
        <div className="w-2.5" />
        <p
          className="full text-black text-center text-xs h-3"
          style={{
            flex: '1 1 0%',
            lineHeight: '12px',
          }}
        >
          DIVINE NAMES
        </p>
        <div className="w-2.5" />
        <p
          className="full text-black text-center text-xs h-3"
          style={{
            flex: '1 1 0%',
          }}
        >
          CREATIONS
        </p>
        <div className="w-2.5" />
        <p
          className="full text-black text-center text-xs h-3"
          style={{
            flex: '1 1 0%',
            lineHeight: '12px',
          }}
        >
          FORMATIONS
        </p>
        <div className="w-2.5" />
        <p
          className="full text-black text-center text-xs h-3"
          style={{
            flex: '1 1 0%',
            lineHeight: '12px',
          }}
        >
          SUBSTANCES
        </p>
        <div className="w-2.5" />
        <p
          className="full text-black text-center text-xs h-3"
          style={{
            flex: '1 1 0%',
            lineHeight: '12px',
          }}
        >
          MATTER
        </p>
        <div className="w-2.5" />
        <p
          style={{
            flex: '1 1 0%',
            height: 30,
            fontSize: 30,
            lineHeight: '30px',
            textAlign: 'right',
            color: 'black',
          }}
        >
          ⎑
        </p>
      </div>
      <div style={{ height: 60 }} />
      <div
        style={{
          width: '100%',
          padding: 0,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            flex: '1 1 0%',
            height: '100%',
            fontSize: 12,
            lineHeight: '1.5em',
            color: 'black',
          }}
        >
          <b>Dark Night Demo Tapes</b>
          <br />
          0x40e2a3cd2a924015fC13088dA1bD64999C2F5DD5
          <br />
          <b>—</b>
        </p>
        <div style={{ width: 10 }} />
        <p
          style={{
            transform: 'rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)',
            transformOrigin: 'right',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: '100%',
            textAlign: 'right',
            color: 'black',
            whiteSpace: 'nowrap',
          }}
        >
          DRAG POINTER &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ●
        </p>
      </div>
      <div style={{ height: 10 }} />
      <div
        className="w-full p-0 inline-flex flex-row items-end justify-center"
        style={{
          fontFamily: "'Antonio', sans-serif",
          flex: '1 1 0%',
        }}
      >
        <p
          style={{
            flex: '1 1 0%',
            fontSize: 250,
            lineHeight: '1em',
            color: 'black',
            margin: 0,
            letterSpacing: -10,
          }}
        >
          III
        </p>
        <div style={{ width: 10 }} />
        <p
          style={{
            flex: '1 1 0%',
            fontSize: 250,
            lineHeight: '100%',
            textAlign: 'right',
            color: 'black',
            margin: 0,
            letterSpacing: -10,
          }}
        >
          014
        </p>
      </div>
      <div style={{ height: 60 }} />
      <div
        style={{
          pointerEvents: 'all',
          width: '100%',
          padding: 0,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <p
          className="full"
          style={{
            whiteSpace: 'nowrap',
            flex: '1 1 0%',
            fontSize: 12,
            lineHeight: '1.5em',
            color: 'black',
          }}
        >
          <b>Series III</b>
          <br />
          Color Mapped
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: '1 1 0%',
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '1em',
            textAlign: 'center',
            color: 'black',
            letterSpacing: -0.5,
            whiteSpace: 'nowrap',
          }}
        >
          HOVER FOR STATS
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            flex: '1 1 0%',
            fontSize: 12,
            lineHeight: '1em',
            textAlign: 'right',
            color: 'black',
          }}
        ></p>
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
