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
  
  // Create glowing edge lines material - thick neon with glow effect
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ 
      color: '#D946EF', // neon-primary magenta
      transparent: true,
      opacity: 1,
    }),
    []
  );

  // Create edges from geometry
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  // Glassy face material with REAL glassmorphism effect - transparent faces
  const glassMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: '#1a1a2e',
      transparent: true,
      opacity: 0.08, // Muy transparente para ver através
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transmission: 0.95, // Casi totalmente transparente como vidrio
      thickness: 0.5,
      side: THREE.DoubleSide,
      envMapIntensity: 1,
      reflectivity: 0.8,
      ior: 1.5, // Index of refraction para efecto vidrio real
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
      {/* Outer glow layer - creates neon glow effect */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial 
          color="#D946EF" 
          transparent 
          opacity={0.3}
          linewidth={1}
        />
      </lineSegments>
      
      {/* Middle glow layer */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial 
          color="#f9168f" 
          transparent 
          opacity={0.5}
          linewidth={1}
        />
      </lineSegments>
      
      {/* Main thick edge - bright neon core */}
      <lineSegments geometry={edges} material={lineMaterial} />
      
      {/* Glassmorphism faces - transparent */}
      <mesh geometry={geometry} material={glassMaterial} />
      
      {/* Inner glow core for extra depth */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#D946EF"
          transparent
          opacity={0.4}
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
