'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Sphere args={[1, 20, 20]} ref={meshRef}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
    </Sphere>
  );
}

export default function GlassIcosahedron() {
  return (
    <div className="w-full h-[500px] md:h-[600px] bg-slate-900/30 rounded-xl overflow-hidden border border-cyan-500/20">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        
        <Icosahedron />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
