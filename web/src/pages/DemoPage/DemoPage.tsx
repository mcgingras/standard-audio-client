import { useQuery } from '@redwoodjs/web'
import { styleDecoder } from '../../utils/decoder'
import BareScene from '../../components/Three/Scenes/BareScene'

export function Underlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 40,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: 0,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            flex: '1 1 0%',
            height: 12,
            fontSize: 12,
            lineHeight: '12px',
            textAlign: 'center',
            color: 'black',
          }}
        >
          DIVINE NAMES
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            flex: '1 1 0%',
            height: 12,
            fontSize: 12,
            lineHeight: '12px',
            textAlign: 'center',
            color: 'black',
          }}
        >
          CREATIONS
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            flex: '1 1 0%',
            height: 12,
            fontSize: 12,
            lineHeight: '12px',
            textAlign: 'center',
            color: 'black',
          }}
        >
          FORMATIONS
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            flex: '1 1 0%',
            height: 12,
            fontSize: 12,
            lineHeight: '12px',
            textAlign: 'center',
            color: 'black',
          }}
        >
          SUBSTANCES
        </p>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            flex: '1 1 0%',
            height: 12,
            fontSize: 12,
            lineHeight: '12px',
            textAlign: 'center',
            color: 'black',
          }}
        >
          MATTER
        </p>
        <div style={{ width: 10 }} />
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
        className="full"
        style={{
          fontFamily: "'Antonio', sans-serif",
          width: '100%',
          flex: '1 1 0%',
          padding: 0,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
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
          pointer: 'auto',
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

  const { loading, _error, data } = useQuery(FIND_TAPE_QUERY, {
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
