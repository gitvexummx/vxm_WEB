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
  
  // Create edges from geometry
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  // Glassy face material with REAL glassmorphism effect - transparent faces
  const glassMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: '#0f0f1a',
      transparent: true,
      opacity: 0.05,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      transmission: 0.98,
      thickness: 0.3,
      side: THREE.DoubleSide,
      envMapIntensity: 1.5,
      reflectivity: 0.9,
      ior: 1.6,
      attenuationColor: '#D946EF',
      attenuationDistance: 0.5,
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
      {/* Glassmorphism faces - transparent */}
      <mesh geometry={geometry} material={glassMaterial} />
      
      {/* Multiple layered tubes for thick neon edges effect */}
      {/* Outer glow layer - wide magenta glow */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#D946EF" transparent opacity={0.15} />
      </lineSegments>
      
      {/* Middle glow layer - pink glow */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#f9168f" transparent opacity={0.25} />
      </lineSegments>
      
      {/* Inner bright core - white-hot center */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </lineSegments>
      
      {/* Main edge - bright magenta core */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#D946EF" opacity={1} />
      </lineSegments>
      
      {/* Additional offset lines for thickness illusion */}
      <mesh geometry={edges}>
        <meshBasicMaterial 
          color="#D946EF" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Inner glow core for extra depth */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color="#D946EF"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Secondary inner core - white hot */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
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
        dpr={[1, 2]}
      >
        <NeonIcosahedron />
        
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
