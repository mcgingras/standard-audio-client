import { useState, useEffect, Suspense } from 'react'
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
  ContactShadows,
} from '@react-three/drei'
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
      <meshStandardMaterial attach="material" color="#fff" />
    </Plane>
  )
}

const CassetteScene = ({ style }) => {
  // softShadows()
  const [colorMap, setColorMap] = useState({})

  useEffect(() => {
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
    let bin = style.toString(2).padStart(51, '0')
    let colorMap = {}
    for (let i = 0; i < 17; i++) {
      let binI = bin.substring(i * 3, i * 3 + 3)
      let index = parseInt(binI, 2)
      let color = colors[index]
      let component = tapeComponents[i]
      colorMap[component] = color
    }

    setColorMap(colorMap)
  }, [style])

  const { fov, zoom, shadowX, shadowY, shadowZ } = useControls({
    fov: 0.4,
    zoom: 100,
    shadowX: 0,
    shadowY: 4,
    shadowZ: 10,
  })

  return (
    <Canvas shadows>
      <OrthographicCamera
        makeDefault
        position={[-3, 2.5, 10]}
        rotation={[-0.1, -0.3, -0.01]}
        zoom={zoom}
      />
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={fov}
        position={[shadowX, shadowY, shadowZ]}
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
