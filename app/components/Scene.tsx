"use client"
import React, { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { Model } from "./Model"
import { Environment, MeshReflectorMaterial, Stage } from "@react-three/drei"

function PreLoad({ start, set }: { start: boolean, set: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [vec] = useState(() => new THREE.Vector3())
    
    useEffect(() => {
      const timeout = setTimeout(() => {
        set(true)
      }, 500)
      return () => clearTimeout(timeout)
    }, [])
  
  
    return useFrame((state) => {
      if (start) {
        
        state.camera.position.lerp(vec.set(state.mouse.x * 4, 3 + state.mouse.y * 2, 14), 0.05)
        state.camera.lookAt(0, 0, 0)
      }
    })
  }

function Ground() {
    

    // const [floor, normal] = useTexture(['/SurfaceImperfections003_2K-PNG_Color.png', '/SurfaceImperfections003_1K_Normal.jpg'])
    return (
  
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[15, 15]} />
      <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
    </mesh>
    )
  }
  

const Scene = () => {
    const [ready, setReady] = useState(false)


  return (
    <Canvas shadows={"basic"} gl={{ alpha: false }} camera={{ position: [0, 5, 2], fov: 15 }}>
        <Suspense fallback={null} >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 15, 20]} />
        <group position={[0,0,-1.5]} scale={0.8}>
            <Stage adjustCamera={false} intensity={0.4} shadows="contact" environment="city" position={[0,0,0]} preset="rembrandt">
                <Model position={[0,0,0]}/>
                <Ground/>
            </Stage>
        </group>
        <pointLight position={[1.9, 0, 0]} intensity={2} color={'white'} />
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <Environment preset="city"/>
        <PreLoad start={ready} set={setReady} />
        </Suspense>
    </Canvas>
  )
}

export default Scene