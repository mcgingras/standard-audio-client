import * as THREE from 'three'
import React, { Suspense, useRef, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useAspect, Html } from '@react-three/drei'
import { Flex, Box } from '@react-three/flex'
import { a, config, useSpring } from '@react-spring/three'

const state = {
  top: 0,
}

function TestBox({ i }) {
  const [hovered, set] = useState(false)
  const hover = (e) => (e.stopPropagation(), set(true))
  const unhover = () => set(false)
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: config.stiff,
  })

  return (
    <a.mesh
      position={[0.5, -0.5, 0]}
      onPointerOver={hover}
      onPointerOut={unhover}
      scale={scale.to((s) => [s, s, 1])}
    >
      <planeBufferGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'][i % 4]}
      />
    </a.mesh>
  )
}

function Page({ onChangePages }) {
  const group = useRef()
  const { size } = useThree()
  const [vpWidth, vpHeight] = useAspect(size.width, size.height)
  const vec = new THREE.Vector3()
  useFrame(() =>
    group.current.position.lerp(vec.set(-3.4, state.top / 100 + 3.8, 0), 0.1)
  )
  const handleReflow = useCallback(
    (w, h) => {
      onChangePages(h / vpHeight)
      // console.log({ h, vpHeight, pages: h / vpHeight });
    },
    [onChangePages, vpHeight]
  )
  return (
    <group ref={group}>
      <Flex
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          // width="70%"
        >
          {new Array(16 * 4).fill(0).map((k, i) => (
            <Box margin={0.05} key={i}>
              <TestBox i={i} />
            </Box>
          ))}
        </Box>
      </Flex>
    </group>
  )
}

export default function App() {
  const scrollArea = useRef()
  const onScroll = (e) => (state.top = e.target.scrollTop)
  const [pages, setPages] = useState(0)
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        shadows
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 5], zoom: 1 }}
        onCreated={(state) => {
          state.events.connect(scrollArea.current)
        }}
        raycaster={{
          computeOffsets: ({ offsetX, offsetY }) => ({
            offsetX,
            offsetY: offsetY - state.top,
          }),
        }}
      >
        <pointLight position={[0, 1, 4]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[1, 1, 1]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={<Html center>loading..</Html>}>
          <Page onChangePages={setPages} />
          {/* <Cube /> */}
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  )
}
