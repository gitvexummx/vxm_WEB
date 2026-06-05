'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function NeonIcosahedron() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Icosahedron geometry: radius 1.5, detail 0 (true icosahedron with 20 faces)
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  
  // Create edges from geometry
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  // Dark glassy face material with LOW opacity - ALL faces dark, NO white
  const glassMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: '#0a0a0a',              // Very dark gray (casi negro)
      transparent: true,
      opacity: 0.15,                  // Low opacity for subtle dark effect
      side: THREE.FrontSide,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NoBlending,
      toneMapped: false,
    }),
    []
  );

  // Auto rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base auto rotation
      groupRef.current.rotation.x += delta * 0.15;
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glassmorphism faces - dark and very transparent (NO WHITE) */}
      <mesh geometry={geometry} material={glassMaterial} renderOrder={1} />
      
      {/* THICK NEON EDGES - Multiple layered approach for real thickness */}
      
      {/* Layer 1: Wide outer glow - magenta bloom */}
      <lineSegments geometry={edges} renderOrder={2}>
        <lineBasicMaterial 
          color="#D946EF" 
          transparent 
          opacity={0.3} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 2: Medium glow layer - pinkish bloom */}
      <lineSegments geometry={edges} renderOrder={2}>
        <lineBasicMaterial 
          color="#f9168f" 
          transparent 
          opacity={0.5} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 3: Inner bright core - light magenta hot center for neon effect */}
      <lineSegments geometry={edges} renderOrder={2}>
        <lineBasicMaterial 
          color="#ff88ff" 
          transparent 
          opacity={0.7} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 4: Main edge - solid bright magenta core */}
      <lineSegments geometry={edges} renderOrder={2}>
        <lineBasicMaterial 
          color="#D946EF" 
          opacity={1} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 5: Tube geometry for actual thickness - outer tube */}
      <mesh geometry={edges} renderOrder={3}>
        <meshBasicMaterial 
          color="#D946EF" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Layer 6: Secondary tube - brighter inner core */}
      <mesh geometry={edges} renderOrder={3}>
        <meshBasicMaterial 
          color="#ff66ff" 
          transparent 
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Layer 7: Light magenta core tube for extra neon pop */}
      <mesh geometry={edges} renderOrder={3}>
        <meshBasicMaterial 
          color="#ff88ff" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Inner glow sphere for depth */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#D946EF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Secondary inner core - light magenta hot */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#ff88ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function GlassIcosahedron() {
  return (
    <div className="w-full h-full max-h-[650px] rounded-xl overflow-hidden">
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
