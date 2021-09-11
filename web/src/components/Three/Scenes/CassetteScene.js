import { useState, useEffect, Suspense, useLayoutEffect } from 'react'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
import PlayerModel from '../Models/PlayerModel'
import { Canvas } from '@react-three/fiber'

function Model(props) {
  const { scene, nodes, materials } = useGLTF('/scene.gltf')

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    )
    // Object.assign(nodes.wheel003_020_2_Chrome_0.material, {
    //   metalness: 1,
    //   roughness: 0.4,
    //   color: new THREE.Color('black'),
    // })
    // Using the emissive colors is a nice trick to give textures a warm sheen
    // Object.assign(materials.WhiteCar, {
    //   roughness: 0,
    //   metalness: 0.25,
    //   emissive: new THREE.Color('#500000'),
    //   envMapIntensity: 0.5,
    // })
  }, [scene, nodes, materials])
  // <primitive> just puts an existing thing into the scene graph
  // For more control over the asset refer to https://github.com/pmndrs/gltfjsx

  return <primitive object={scene} {...props} />
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

  return (
    <Canvas dpr={[1, 2]} shadows>
      <color attach="background" args={['#101010']} />
      <fog attach="fog" args={['#101010', 10, 50]} />
      <Suspense fallback={null}>
        <Stage
          contactShadow={true}
          intensity={1}
          contactShadowOpacity={0.9}
          shadowBias={-0.0015}
        >
          <Model rotation-x={Math.PI / 2 - 0.2} />
          {/* <CassetteModel colors={colorMap} /> */}
        </Stage>
      </Suspense>
      <mesh rotation-x={-Math.PI / 2} scale={1000}>
        <planeGeometry />
        <meshStandardMaterial color="#333" transparent depthWrite={false} />
      </mesh>
      <OrbitControls
        // autoRotate
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.8}
      />
    </Canvas>
  )
}

export default CassetteScene
