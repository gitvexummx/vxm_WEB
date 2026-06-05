'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function NeonIcosahedron() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { camera } = useThree();
  
  // Icosahedron geometry: radius 1.5, detail 0 (true icosahedron with 20 faces)
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);
  
  // Create edges from geometry
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  // Dark glassy face material with LOW opacity - truly transparent dark faces
  const glassMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: '#0a0a0f',              // Very dark color (casi negro)
      transparent: true,
      opacity: 0.08,                  // Very low opacity for subtle effect
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 0.3,
      clearcoatRoughness: 0.05,
      transmission: 0.0,              // Cero transmisión para evitar blanco
      thickness: 0.5,
      side: THREE.DoubleSide,
      envMapIntensity: 0.0,           // Sin intensidad de envMap para evitar reflejos blancos
      reflectivity: 0.0,              // Cero reflectividad para evitar blanco
      ior: 1.0,                       // IOR neutro
      specularIntensity: 0.0,         // Sin especular para evitar highlights blancos
      attenuationColor: '#0a0a0f',    // Color de atenuación oscuro
      attenuationDistance: 1.0,
    }),
    []
  );

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto rotation animation with smooth parallax based on mouse position
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base auto rotation
      groupRef.current.rotation.x += delta * 0.15;
      groupRef.current.rotation.y += delta * 0.2;
      
      // Smooth parallax effect based on mouse position (subtle)
      const parallaxX = mousePosition.x * 0.3;
      const parallaxY = mousePosition.y * 0.3;
      
      // Lerp for smooth transition
      groupRef.current.rotation.x += THREE.MathUtils.lerp(
        groupRef.current.rotation.x % (Math.PI * 2),
        groupRef.current.rotation.x + parallaxY,
        delta * 2
      ) * delta;
      
      groupRef.current.rotation.y += THREE.MathUtils.lerp(
        groupRef.current.rotation.y % (Math.PI * 2),
        groupRef.current.rotation.y + parallaxX,
        delta * 2
      ) * delta;
      
      // Subtle camera movement for depth
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 0.5, delta * 2);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 0.5, delta * 2);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glassmorphism faces - dark and very transparent (NO WHITE) */}
      <mesh geometry={geometry} material={glassMaterial} />
      
      {/* THICK NEON EDGES - Multiple layered approach for real thickness */}
      
      {/* Layer 1: Wide outer glow - magenta bloom */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial 
          color="#D946EF" 
          transparent 
          opacity={0.3} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 2: Medium glow layer - pinkish bloom */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial 
          color="#f9168f" 
          transparent 
          opacity={0.5} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 3: Inner bright core - light magenta hot center for neon effect */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial 
          color="#ff88ff" 
          transparent 
          opacity={0.7} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 4: Main edge - solid bright magenta core */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial 
          color="#D946EF" 
          opacity={1} 
          linewidth={1}
        />
      </lineSegments>
      
      {/* Layer 5: Tube geometry for actual thickness - outer tube */}
      <mesh geometry={edges}>
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
      <mesh geometry={edges}>
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
      <mesh geometry={edges}>
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
