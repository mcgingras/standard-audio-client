import React, { useRef } from 'react'
import { OrthographicCamera } from '@react-three/drei'
import { useGLTF } from '@react-three/drei/core/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/casette_player.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-16.77, -132.03, 160.96]} scale={[0.32, 0.32, 0.32]}>
        <mesh
          geometry={nodes.screwbl.geometry}
          material={nodes.screwbl.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.screwbr.geometry}
          material={nodes.screwbr.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.screwul.geometry}
          material={nodes.screwul.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.screwur.geometry}
          material={nodes.screwur.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.Rectangle_1.geometry}
          material={nodes.Rectangle_1.material}
          position={[-0.5, 61.75, 35.35]}
        />
        <mesh
          geometry={nodes.Ellipse.geometry}
          material={nodes.Ellipse.material}
          position={[-176.5, 18.75, 36.35]}
        />
        <mesh
          geometry={nodes.Ellipse_2.geometry}
          material={nodes.Ellipse_2.material}
          position={[175.5, 18.75, 36.35]}
        />
        <mesh
          geometry={nodes.stickerback.geometry}
          material={nodes.stickerback.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.stickup.geometry}
          material={nodes.stickup.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.front_canal.geometry}
          material={nodes.front_canal.material}
          position={[0, 0.25, 173.6]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
        />
        <mesh
          geometry={nodes.middle_front_panel.geometry}
          material={nodes.middle_front_panel.material}
          position={[0, 0.25, 173.81]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
        />
        <mesh
          geometry={nodes.front_panel.geometry}
          material={nodes.front_panel.material}
          position={[0, 0.25, 173.81]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
        />
        <mesh
          geometry={nodes.main_film_wiggle.geometry}
          material={nodes.main_film_wiggle.material}
          position={[0, 0.25, -154.75]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.88, 1]}
        />
        <mesh
          geometry={nodes.left_film_roll.geometry}
          material={nodes.left_film_roll.material}
          position={[0, 0.25, -154.75]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.88, 1]}
        />
        <mesh
          geometry={nodes.right_film_roll.geometry}
          material={nodes.right_film_roll.material}
          position={[0, 0.25, -154.75]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.88, 1]}
        />
        <mesh
          geometry={nodes.middle_film_line.geometry}
          material={nodes.middle_film_line.material}
          position={[0, 0.25, -154.75]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.88, 1]}
        />
        <mesh
          geometry={nodes.middle_extrusion_casing.geometry}
          material={nodes.middle_extrusion_casing.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.back_panel.geometry}
          material={nodes.back_panel.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.middle_back_penel.geometry}
          material={nodes.middle_back_penel.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.back_canal.geometry}
          material={nodes.back_canal.material}
          position={[0, 0.25, -173.73]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      <group position={[-16.77, -16.14, 101.39]}>
        <mesh
          geometry={nodes.Path.geometry}
          material={nodes.Path.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Rectangle_2.geometry}
          material={nodes.Rectangle_2.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Circle.geometry}
          material={nodes.Circle.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Rectangle_3.geometry}
          material={nodes.Rectangle_3.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Rectangle_4.geometry}
          material={nodes.Rectangle_4.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Path_1.geometry}
          material={nodes.Path_1.material}
          position={[-85.69, 66, 9.8]}
          rotation={[2.04, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Path_2.geometry}
          material={nodes.Path_2.material}
          position={[-85.69, 31.62, -103.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 2.14]}
        />
        <mesh
          geometry={nodes.Path_3.geometry}
          material={nodes.Path_3.material}
          position={[-85.69, 31.62, -103.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 2.14]}
        />
        <mesh
          geometry={nodes.Path_4.geometry}
          material={nodes.Path_4.material}
          position={[-85.69, 31.62, -103.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 2.14]}
        />
        <mesh
          geometry={nodes.Path_5.geometry}
          material={nodes.Path_5.material}
          position={[-85.69, 31.62, -103.34]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 2.14]}
        />
        <mesh
          geometry={nodes.Rectangle_5.geometry}
          material={nodes.Rectangle_5.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Rectangle_6.geometry}
          material={nodes.Rectangle_6.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.Rectangle_7.geometry}
          material={nodes.Rectangle_7.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={nodes.speed_knob.geometry}
          material={nodes.speed_knob.material}
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
        <mesh
          geometry={
            nodes['Polygon_&_button_cutter_&_casette_bay_cutter_-_baked']
              .geometry
          }
          material={
            nodes['Polygon_&_button_cutter_&_casette_bay_cutter_-_baked']
              .material
          }
          position={[-85.69, 7.36, -101.39]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.95, 1.95, 1.95]}
        />
      </group>
      {/* <directionalLight
        intensity={0.6}
        decay={2}
        position={[-1195.38, 69.36, -906.62]}
        rotation={[-3.07, -0.92, -1.47]}
      />
      <directionalLight
        intensity={0.6}
        decay={2}
        position={[121, 645.55, 1213.79]}
        rotation={[-0.49, 0.09, -0.16]}
      />
      <directionalLight
        intensity={0.75}
        decay={2}
        position={[850000, 1300000, 1000000]}
        rotation={[-0.92, 0.48, -0.34]}
      /> */}
      <mesh
        geometry={nodes.Rectangle.geometry}
        material={nodes.Rectangle.material}
        position={[-429.01, -490.56, 1266.94]}
        rotation={[-1.6, 0.01, -0.26]}
      />
    </group>
  )
}

useGLTF.preload('/casette_player.gltf')
