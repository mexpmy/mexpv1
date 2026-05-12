'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export function Scene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const [earthTexture, cloudTexture] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  useFrame((_state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.1;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.15;
  });

  // Theme-driven lighting values
  const ambientIntensity    = isDark ? 0.5  : 1.4;
  const sunIntensity        = isDark ? 3.0  : 4.5;
  const fillIntensity       = isDark ? 0.0  : 1.2;  // soft fill from opposite side in light mode
  const atmosphereColor     = isDark ? '#4ca6ff' : '#89c4ff';
  const atmosphereOpacity   = isDark ? 0.18 : 0.12;
  const cloudOpacity        = isDark ? 0.45 : 0.6;
  const earthRoughness      = isDark ? 0.8  : 0.65;
  const starCount           = isDark ? 250  : 60;   // fewer stars in light mode
  const starEmissive        = isDark ? 3    : 1.5;

  // Stable star positions — useMemo so they don't re-randomise on re-render
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        x: (Math.random() - 0.5) * 35,
        y: (Math.random() - 0.5) * 35,
        z: (Math.random() - 0.5) * 35,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDark]
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      {/* === Lighting === */}
      {/* Ambient — global fill */}
      <ambientLight intensity={ambientIntensity} />

      {/* Sun — main directional key light */}
      <pointLight position={[10, 10, 10]} intensity={sunIntensity} color="#fff8e7" />

      {/* Rim light for depth */}
      <pointLight position={[-8, -4, -6]} intensity={isDark ? 0.6 : 1.0} color="#a8d8ff" />

      {/* Light-mode fill from opposite side so the dark side isn't pitch black */}
      {!isDark && (
        <directionalLight position={[-5, 3, -5]} intensity={fillIntensity} color="#ffffff" />
      )}

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          {/* Earth surface */}
          <mesh ref={earthRef}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              map={earthTexture}
              roughness={earthRoughness}
              metalness={0.05}
              envMapIntensity={isDark ? 0.5 : 1.2}
            />
          </mesh>

          {/* Cloud layer */}
          <mesh ref={cloudsRef} scale={1.015}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshStandardMaterial
              map={cloudTexture}
              transparent
              opacity={cloudOpacity}
              depthWrite={false}
            />
          </mesh>

          {/* Atmosphere halo */}
          <mesh scale={1.04}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshPhongMaterial
              color={atmosphereColor}
              transparent
              opacity={atmosphereOpacity}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>

      {/* Stars */}
      {stars.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={starEmissive}
          />
        </mesh>
      ))}
    </>
  );
}