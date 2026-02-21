import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // 1. Load Earth and Cloud textures
  const [earthTexture, cloudTexture] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state, delta) => {
    // Spin the Earth
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
    // Spin clouds slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
      
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          {/* 1. THE EARTH SURFACE */}
          <mesh ref={earthRef}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              map={earthTexture}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* 2. THE CLOUDS */}
          <mesh ref={cloudsRef} scale={1.015}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              map={cloudTexture}
              transparent={true}
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>

          {/* 3. THE ATMOSPHERE HALO */}
          <mesh scale={1.03}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshPhongMaterial
              color="#4ca6ff"
              transparent={true}
              opacity={0.15}
              side={THREE.BackSide} // Render on the inside of the sphere for a "glow" look
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>

      {/* Deep Space Stars */}
      {Array.from({ length: 200 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
          ]}
        >
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
        </mesh>
      ))}
    </>
  );
}