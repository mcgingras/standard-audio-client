import { useState, useEffect, Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
import PlayerModel from '../Models/PlayerModel'
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

    setColorMap(colorMap)
  }, [])

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} />
      <Suspense fallback={null}>
        <CassetteModel colors={colorMap} />
        {/* <PlayerModel /> */}
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default CassetteScene
