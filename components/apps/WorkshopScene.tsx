"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function RotatingAssembly({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const rimRef = useRef<THREE.Group>(null!);

  useGSAP(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 18,
        repeat: -1,
        ease: "none"
      });
    }
    if (rimRef.current) {
      gsap.to(rimRef.current.rotation, {
        z: Math.PI * 2,
        duration: 6,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main rotor / wheel */}
      <mesh>
        <cylinderGeometry args={[2.2, 2.2, 0.4, 48, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner hub */}
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 0.55, 32]} />
        <meshBasicMaterial color="#111" />
      </mesh>

      {/* Spokes */}
      {Array.from({ length: 7 }).map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 7, 0]}>
          <mesh position={[1.35, 0, 0]}>
            <boxGeometry args={[1.9, 0.09, 0.09]} />
            <meshBasicMaterial color="#222" />
          </mesh>
        </group>
      ))}

      {/* Outer glowing rim */}
      <group ref={rimRef}>
        <mesh>
          <torusGeometry args={[2.55, 0.06, 12, 64]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Spec labels */}
      <Html position={[0, 3.2, 0]} style={{ pointerEvents: 'none' }}>
        <div className="text-center">
          <div className="font-mono text-[10px] tracking-[2px] text-pink-400/70">MOTO SPEC 01</div>
          <div className="text-xl font-semibold text-white tracking-[-1px] mt-1">KTM 890 • 2025</div>
        </div>
      </Html>
    </group>
  );
}

function FloatingParts() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* Brake caliper representation */}
      <mesh position={[4.5, -0.8, 1]} rotation={[0.8, 0.4, 0]}>
        <boxGeometry args={[1.1, 0.6, 1.6]} />
        <meshBasicMaterial color="#222" />
      </mesh>

      {/* Suspension fork */}
      <mesh position={[-4.2, 1.2, -2]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.13, 0.13, 3.8, 5]} />
        <meshBasicMaterial color="#333" />
      </mesh>
    </group>
  );
}

export default function WorkshopScene() {
  return (
    <div className="absolute inset-0 bg-black">
      <Canvas camera={{ position: [0, 1.5, 9], fov: 48 }}>
        <ambientLight intensity={0.15} />
        <pointLight position={[-8, 6, -4]} intensity={2.5} color="#f472b6" />
        <pointLight position={[8, -3, 5]} intensity={1.8} color="#bae6fd" />

        <RotatingAssembly color="#f472b6" />
        <FloatingParts />

        <OrbitControls 
          enablePan={false} 
          minDistance={4.5} 
          maxDistance={15} 
          enableDamping 
          dampingFactor={0.08}
        />
      </Canvas>

      <div className="absolute top-8 left-8 font-mono text-xs tracking-[3px] text-white/50">
        WORKSHOP • CINEMATIC MODE
      </div>
      <div className="absolute bottom-8 right-8 text-right">
        <div className="font-mono text-[10px] text-white/40 tracking-widest">DRAG TO INSPECT • SCROLL TO ZOOM</div>
        <div className="text-[10px] text-pink-400/60 mt-1">PRECISION ENGINEERING • 2026</div>
      </div>
    </div>
  );
}
