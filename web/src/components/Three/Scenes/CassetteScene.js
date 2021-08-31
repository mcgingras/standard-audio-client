import { useState, useEffect, Suspense } from 'react'
import { OrbitControls, OrthographicCamera, Plane } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
import PlayerModel from '../Models/PlayerModel'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'

const Ground = () => {
  return (
    <Plane
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      args={[1000, 1000]}
    >
      <meshStandardMaterial attach="material" color="white" />
    </Plane>
  )
}

const CassetteScene = ({ style }) => {
  // softShadows()
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

  const { fov, zoom, cameraX } = useControls({
    fov: 0,
    zoom: 125,
    cameraX: 0,
  })

  return (
    <Canvas shadows>
      <OrthographicCamera
        makeDefault
        position={[0, 2, 10]}
        // rotation={[0, 0, cameraX]}
        zoom={zoom}
      />
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={fov}
        position={[5, 3, 20]}
        castShadow
        shadow-mapSize-height={256}
        shadow-mapSize-width={256}
      />
      <directionalLight
        intensity={0.3}
        position={[-5, 3, 20]}
        castShadow
        shadow-mapSize-height={256}
        shadow-mapSize-width={256}
      />
      <Ground />
      <Suspense fallback={null}>
        <CassetteModel colors={colorMap} />
      </Suspense>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export default CassetteScene
