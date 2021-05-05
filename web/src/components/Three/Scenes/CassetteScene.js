import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
import { Canvas } from '@react-three/fiber'

const CassetteScene = () => {

  const colorProp = {
    "screw": "#03045e",
    "label_small": "#023e8a",
    "sticker_large": "#0077b6",
    "front_canal": "#0096c7",
    "front_top_plate": "#00b4d8",
    "front_middle_layer": "#48cae4",
    "middle_main": "#90e0ef",
    "film_roll": "#ade8f4",
    "teeth": "#F367E0",
    "teeth_ring": "#caf0f8",
    "film_middle_connector": "#023e8a",
    "inner_post_left": "#ade8f4",
    "inner_post_right": "#48cae4",
    "film_main_wiggle": "#023e8a",
    "back_middle_layer": "#48cae4",
    "back_canal": "#ade8f4",
    "back_top_plate": "#0077b6"
  }

  return (
        <Canvas>
          <ambientLight intensity={.5} />
          <directionalLight position={[5,10,7]} />
          <Suspense fallback={null}>
          <CassetteModel colors={colorProp} />
          </Suspense>
          <OrbitControls />
        </Canvas>
  )
}

export default CassetteScene;
