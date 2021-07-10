import { useState, useEffect, Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
import { Canvas } from '@react-three/fiber'

const CassetteScene = ({ style }) => {
  const [colorMap, setColorMap] = useState({})

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
    let bin = style.toString(2).padStart(51, '0')
    console.log(bin)
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
  }, [])

  const colorProp = {}
  // const colorProp = {
  //   screw: 'red',
  //   label_small: '#023e8a',
  //   sticker_large: '#0077b6',
  //   front_canal: '#0096c7',
  //   front_top_plate: '#00b4d8',
  //   front_middle_layer: '#48cae4',
  //   middle_main: '#90e0ef',
  //   film_roll: '#ade8f4',
  //   teeth: '#F367E0',
  //   teeth_ring: '#caf0f8',
  //   film_middle_connector: '#023e8a',
  //   inner_post_left: '#ade8f4',
  //   inner_post_right: '#48cae4',
  //   film_main_wiggle: '#023e8a',
  //   back_middle_layer: '#48cae4',
  //   back_canal: '#ade8f4',
  //   back_top_plate: '#0077b6',
  // }

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} />
      <Suspense fallback={null}>
        <CassetteModel colors={colorMap} />
      </Suspense>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export default CassetteScene
