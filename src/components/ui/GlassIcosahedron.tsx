'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function NeonIcosahedron() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Icosahedron geometry: radius 1.5, detail 0 (true icosahedron with 20 faces)
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  
  // Create glowing edge lines material - thicker and more neon
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ 
      color: '#D946EF', // neon-primary magenta
      transparent: true,
      opacity: 1,
      linewidth: 3,
    }),
    []
  );

  // Create edges from geometry
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  // Glassy face material with glassmorphism effect
  const glassMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: '#0a0a1a',
      transparent: true,
      opacity: 0.15,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      thickness: 0.8,
      side: THREE.DoubleSide,
      envMapIntensity: 1,
    }),
    []
  );

  // Auto rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing wireframe edges - thick neon lines */}
      <lineSegments geometry={edges} material={lineMaterial} />
      
      {/* Glassmorphism faces */}
      <mesh geometry={geometry} material={glassMaterial} />
      
      {/* Inner glow core for extra depth */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#D946EF"
          transparent
          opacity={0.3}
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
          autoRotate={false}
          minDistance={5}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}
