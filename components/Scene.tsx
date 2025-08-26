"use client"
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Html, MeshReflectorMaterial, Stage } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from "three";
import { Model } from "./Model";



function MouseTracker({ rotateX }: { rotateX: number }) {

  const targetVec = useRef(new THREE.Vector3());
  const { camera, mouse } = useThree();

  useFrame(() => {
    
    const targetX = rotateX + mouse.x * 1.5;       
    const targetY = 3 + mouse.y * 1;       
    const targetZ = 14;                 


    targetVec.current.set(targetX, targetY, targetZ);
    

    camera.position.lerp(targetVec.current, 0.05);
    

    camera.lookAt(0, 0, 0);
  });

  return null; 
}

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
  );
}

interface SceneProps {
  rotateX: number;
}

const Scene = ({ rotateX }: SceneProps) => {

  return (
    <Canvas shadows="soft" gl={{ alpha: true }} camera={{ position: [0, 3, 14], fov: 15 }}>

      <MouseTracker rotateX={rotateX} />
      <Suspense fallback={
        <Html center className="text-white fixed">
            <div className="fixed w-full h-full top-0 left-0 z-0 flex items-center justify-center bg-black">
              Loading...
            </div>
        </Html>}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 15, 20]} />
        <group position={[0, 0.3, 0]} scale={0.65}>
          <Stage
            adjustCamera={false}
            intensity={0.4}
            shadows="accumulative"
            environment="city"
            position={[0, 0, 0]}
            preset="rembrandt"
          >
            <Model position={[0, 0, 0]} scale={0.9} />
            <Ground />
          </Stage>
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.01} bokehScale={0.5} height={800} />
          <Bloom luminanceThreshold={1.3} luminanceSmoothing={0.5} height={600} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default Scene;
