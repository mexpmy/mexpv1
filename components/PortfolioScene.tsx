"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function SubtleSphere({ color, intensity = 1 }: { color: string; intensity?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const speed = 0.04 + intensity * 0.12;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * (0.2 + intensity * 0.3);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <icosahedronGeometry args={[3.8, 1]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.07 + intensity * 0.08} 
      />
    </mesh>
  );
}

// Very subtle floating particles for depth
function BackgroundParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 28;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.12}
        sizeAttenuation={true}
      />
    </points>
  );
}

export function PortfolioScene({ 
  accentColor = "#38bdf8", 
  intensity = 1 
}: { 
  accentColor?: string; 
  intensity?: number;   // 1 = normal, higher when pillar selected
}) {
  return (
    <div className="absolute inset-0 -z-10 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.1 + intensity * 0.15} />
        <SubtleSphere color={accentColor} />
        <BackgroundParticles count={intensity > 1 ? 120 : 80} />
        <Stars 
          radius={80} 
          depth={12} 
          count={90 + Math.floor(intensity * 40)} 
          factor={2 + intensity * 0.5} 
          saturation={0} 
          fade 
        />
      </Canvas>
    </div>
  );
}
