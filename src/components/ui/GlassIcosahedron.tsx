'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

function NeonIcosahedron() {
  // Icosahedron geometry: radius 1.5, detail 0 (true icosahedron with 20 faces)
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  
  // Create glowing edge lines material
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ 
      color: '#D946EF', // neon-primary magenta
      transparent: true,
      opacity: 0.9,
    }),
    []
  );

  // Create edges from geometry
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group>
      {/* Glowing wireframe edges - self illuminated */}
      <lineSegments geometry={edges} material={lineMaterial} />
      
      {/* Subtle glassy faces for depth */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#0a0a1a"
          transparent
          opacity={0.03}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#D946EF"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function GlassIcosahedron() {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Performance: limit pixel ratio
      >
        {/* Self-illuminated: no external lights needed */}
        
        <NeonIcosahedron />
        
        {/* Controls: rotation only, no zoom, no pan */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={1}
          minDistance={5}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}
