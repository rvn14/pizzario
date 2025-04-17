

import * as THREE from 'three'
import React, { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'


type GLTFResult = GLTF & {
  nodes: {
    Collider_Collider_0: THREE.Mesh
    PizzaBoard_Texture_buildings1_0: THREE.Mesh
    PizzaBuilding_Texture_buildings1_0: THREE.Mesh
    PizzaLight_Texture_buildings1_0: THREE.Mesh
    PizzaTables_Texture_buildings1_0: THREE.Mesh
    Text001: THREE.Mesh
  }
  materials: {
    ['Collider.002']: THREE.MeshStandardMaterial
    ['Texture_buildings1.002']: THREE.MeshStandardMaterial
  }
}



export function Model(props: JSX.IntrinsicElements['group']) {


    
    const { nodes, materials } = useGLTF('/1.glb') as unknown as GLTFResult


  return (
    <group {...props} dispose={null} >
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Collider_Collider_0.geometry}
            material={materials['Collider.002']}
            rotation={[-Math.PI / 2, 0, 0.012]}
            scale={[54.931, 54.931, 100]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PizzaBoard_Texture_buildings1_0.geometry}
            material={materials['Texture_buildings1.002']}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PizzaBuilding_Texture_buildings1_0.geometry}
            material={materials['Texture_buildings1.002']}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PizzaLight_Texture_buildings1_0.geometry}
            material={materials['Texture_buildings1.002']}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PizzaTables_Texture_buildings1_0.geometry}
            material={materials['Texture_buildings1.002']}
            scale={100}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={materials['Texture_buildings1.002']}
        position={[-0.912, 2.002, 1.271]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.549}
      />
    </group>
  )
}

useGLTF.preload('/1.glb')
