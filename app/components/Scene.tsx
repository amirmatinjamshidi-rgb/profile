/** @format */

"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow rotation based on time
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#006466"
          speed={2}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 10]}
          intensity={1}
          color="#4d194d"
        />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          color="#006466"
        />
        <FloatingShape />
      </Canvas>
    </div>
  );
}
