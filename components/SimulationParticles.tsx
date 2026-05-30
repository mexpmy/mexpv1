'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
}

function Particles({ count = 80, color = '#10b981', speed = 0.4 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      // Spread particles in a 3D box
      pos[i] = (Math.random() - 0.5) * 2.2;
      pos[i + 1] = (Math.random() - 0.5) * 2.2;
      pos[i + 2] = (Math.random() - 0.5) * 2.2;

      vel[i] = (Math.random() - 0.5) * 0.008 * speed;
      vel[i + 1] = (Math.random() - 0.5) * 0.008 * speed;
      vel[i + 2] = (Math.random() - 0.5) * 0.008 * speed;
    }
    return [pos, vel];
  }, [count, speed]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count * 3; i += 3) {
      pos.array[i] += velocities[i];
      pos.array[i + 1] += velocities[i + 1];
      pos.array[i + 2] += velocities[i + 2];

      // Wrap around edges (toroidal)
      if (pos.array[i] > 1.1) pos.array[i] = -1.1;
      if (pos.array[i] < -1.1) pos.array[i] = 1.1;
      if (pos.array[i + 1] > 1.1) pos.array[i + 1] = -1.1;
      if (pos.array[i + 1] < -1.1) pos.array[i + 1] = 1.1;
      if (pos.array[i + 2] > 1.1) pos.array[i + 2] = -1.1;
      if (pos.array[i + 2] < -1.1) pos.array[i + 2] = 1.1;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        sizeAttenuation={true}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

interface SimulationParticlesProps {
  className?: string;
  particleCount?: number;
  color?: string;
}

export default function SimulationParticles({
  className = '',
  particleCount = 90,
  color = '#10b981',
}: SimulationParticlesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ 
          alpha: true, 
          antialias: false, 
          powerPreference: 'low-power',
          preserveDrawingBuffer: false 
        }}
      >
        <Particles count={particleCount} color={color} />
      </Canvas>
    </div>
  );
}
