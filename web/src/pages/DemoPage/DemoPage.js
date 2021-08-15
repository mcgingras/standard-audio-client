import { useEffect, useState, Suspense } from 'react'
import { useQuery } from '@redwoodjs/web'
import DemoCassette from '../../components/Three/Models/DemoCassette'
import { Canvas } from '@react-three/fiber'

// demoing the tapes for screenshots
const DemoPage = ({ id }) => {
  const [colorMap, setColorMap] = useState({})
  const [tape, setTape] = useState(undefined)

  const FIND_TAPE_QUERY = gql`
    query FIND_TAPE_BY_ID($id: Int!) {
      tape: tape(id: $id) {
        id
        style
      }
    }
  `

  const { loading, error, data } = useQuery(FIND_TAPE_QUERY, {
    variables: { id: id },
  })

  useEffect(() => {
    if (data) {
      setTape(data.tape)
    }
  }, [data])

  let colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'white',
    'black',
  ]

  let tapeComponents = [
    'screw',
    'label_small',
    'sticker_large',
    'front_canal',
    'front_top_plate',
    'front_middle_layer',
    'middle_main',
    'film_roll',
    'teeth',
    'teeth_ring',
    'film_middle_connector',
    'inner_post_left',
    'inner_post_right',
    'film_main_wiggle',
    'back_middle_layer',
    'back_canal',
    'back_top_plate',
  ]

  useEffect(() => {
    if (tape != undefined) {
      console.log(tape)
      let bin = tape.style.toString(2).padStart(51, '0')
      let colorMap = {}
      for (let i = 0; i < 17; i++) {
        let bin_of_i = bin.substring(i * 3, i * 3 + 3)
        let index = parseInt(bin_of_i, 2)
        let color = colors[index]
        let component = tapeComponents[i]
        colorMap[component] = color
      }

      console.log(colorMap)
      setColorMap(colorMap)
    }
  }, [tape])

  return (
    <div className="min-h-screen h-screen relative bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} />
        <Suspense fallback={null}>
          <DemoCassette colors={colorMap} />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}

export default DemoPage
