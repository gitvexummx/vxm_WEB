'use client';

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

function NeonIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, mouse } = useThree();
  
  // Icosahedron geometry: radius 1.5, detail 0 (true icosahedron with 20 faces)
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  
  // Wireframe material with neon emissive effect (per info.md spec)
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#0a0a0a',
      wireframe: true,
      emissive: '#D946EF',
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    }),
    []
  );

  // Inner glow sphere for depth
  const innerGlowMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: '#D946EF',
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    }),
    []
  );

  // Mouse parallax rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base auto rotation
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.15;
      
      // Mouse parallax interpolation (smooth follow)
      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;
      
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
    }
    
    if (meshRef.current) {
      // Additional subtle rotation on the mesh itself
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main wireframe icosahedron */}
      <mesh ref={meshRef} geometry={geometry} material={material} />
      
      {/* Inner glow sphere for depth */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <primitive object={innerGlowMaterial} />
      </mesh>
      
      {/* Secondary inner core */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#ff88ff"
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
