"use client"
import { Canvas } from "@react-three/fiber"
import { Model } from "./Model"
import { Html, MeshReflectorMaterial, Stage } from "@react-three/drei"
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { Suspense } from "react"



function Ground() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={60}
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
    

    return (
      <Canvas shadows={"soft"} gl={{ alpha: true }} camera={{ position: [0, 3, 14], fov: 15 }} >
        <Suspense fallback={<Html center className="text-white">Loading...</Html>}>
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 15, 20]} />
          <group position={[0, 0.3, 0]} scale={0.6}>
            <Stage adjustCamera={false} intensity={0.4} shadows="accumulative" environment="city" position={[0, 0, 0]} preset="rembrandt">
              <Model position={[0, 0, 0]} scale={0.9} />
              <Ground />
            </Stage>
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          
          <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={0.01} bokehScale={0.5} height={500} />
            <Bloom luminanceThreshold={1.3} luminanceSmoothing={0.5} height={600} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    )
}

export default Scene