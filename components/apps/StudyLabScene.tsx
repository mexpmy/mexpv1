"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function KnowledgeOrb({ position, color, label, delay }: { 
  position: [number, number, number]; 
  color: string; 
  label: string;
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useGSAP(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.position, {
        y: position[1] - 3,
        duration: 1.4,
        delay,
        ease: "power3.out"
      });
      gsap.from(groupRef.current.scale, {
        x: 0.2, y: 0.2, z: 0.2,
        duration: 1.6,
        delay: delay + 0.1,
        ease: "back.out(1.7)"
      });
    }
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.08;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.65]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      
      {/* Glow */}
      <mesh>
        <icosahedronGeometry args={[0.95]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>

      <Html distanceFactor={8} position={[0, 1.4, 0]} style={{ pointerEvents: 'none' }}>
        <div className="text-center">
          <div className="font-mono text-[10px] tracking-[1.5px] text-white/60 mb-0.5">KNOWLEDGE NODE</div>
          <div className="text-xs font-semibold text-white tracking-tight" style={{ color }}>{label}</div>
        </div>
      </Html>
    </group>
  );
}

function DataStreams() {
  const linesRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const mat = (line as any).material;
        if (mat) mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.25;
      });
    }
  });

  const streams = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 6
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 6
      );
      arr.push({ start, end, id: i });
    }
    return arr;
  }, []);

  return (
    <group ref={linesRef}>
      {streams.map((s, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([s.start.x, s.start.y, s.start.z, s.end.x, s.end.y, s.end.z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#a3e635" transparent opacity={0.35} />
        </line>
      ))}
    </group>
  );
}

export default function StudyLabScene() {
  const orbs = [
    { pos: [-3.2, 1.5, 0] as [number,number,number], color: "#a3e635", label: "REINFORCEMENT LEARNING", delay: 0.1 },
    { pos: [3.1, 2.8, -1] as [number,number,number], color: "#67e8f9", label: "LLM FINE-TUNING", delay: 0.35 },
    { pos: [-2.8, -1.8, 2] as [number,number,number], color: "#c084fc", label: "MULTI-AGENT SYSTEMS", delay: 0.6 },
    { pos: [2.9, -0.9, -2.5] as [number,number,number], color: "#f472b6", label: "COMPUTER VISION", delay: 0.2 },
    { pos: [0, 3.2, 1.5] as [number,number,number], color: "#fb923c", label: "CAUSAL INFERENCE", delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 11], fov: 46 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, -5]} intensity={2} color="#a3e635" />
        
        <DataStreams />
        
        {orbs.map((orb, i) => (
          <KnowledgeOrb 
            key={i} 
            position={orb.pos} 
            color={orb.color} 
            label={orb.label} 
            delay={orb.delay} 
          />
        ))}

        {/* Central Core */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.1]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.35]} />
          <meshBasicMaterial color="#a3e635" transparent opacity={0.06} />
        </mesh>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={5} 
          maxDistance={18}
          autoRotate 
          autoRotateSpeed={0.08} 
        />
      </Canvas>

      <div className="absolute top-8 left-8 text-white/60 font-mono text-xs tracking-[3px]">
        STUDY LAB v0.9 • RESEARCH MODE
      </div>
      <div className="absolute bottom-8 right-8 text-right font-mono text-[10px] text-white/40 tracking-widest">
        DRAG • SCROLL • EXPLORE KNOWLEDGE GRAPH
      </div>
    </div>
  );
}
