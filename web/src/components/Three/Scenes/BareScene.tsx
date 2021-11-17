import { Suspense } from 'react'
import { OrbitControls, Stage } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
import { Canvas } from '@react-three/fiber'

const BareScene = ({ style }) => {
  // softShadows()
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
      camera={{ position: [0, 0, 20], fov: 15, near: 10, far: 30 }}
    >
      <ambientLight intensity={0.75} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={4} />
      <directionalLight position={[0, -15, -0]} intensity={4} color="white" />
      <Suspense fallback={null}>

        <CassetteModel colors={style} />
      </Suspense>
      <OrbitControls
        // start annoying TS required props
        addEventListener={() => {}}
        hasEventListener={() => {}}
        removeEventListener={() => {}}
        dispatchEvent={() => {}}
        // end annoying TS required props
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.8}
      />
    </Canvas>
  )
}

export default BareScene
