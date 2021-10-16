import { Suspense } from 'react'
import { OrbitControls, Stage } from '@react-three/drei'
import CassetteModel from '../Models/CassetteModal'
// import PlayerModel from '../Models/PlayerModel'
import { Canvas } from '@react-three/fiber'

const CassetteScene = ({ style }) => {
  // softShadows()
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
          {/* <Model colors={colorMap} rotation-x={Math.PI / 2 - 0.2} /> */}
          <CassetteModel colors={style} />
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
