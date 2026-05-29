"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Node {
  id: number;
  position: THREE.Vector3;
  connections: number[];
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef<THREE.Group>(null!);

  const { nodes, edges } = useMemo(() => {
    const nodeCount = 12;
    const nodes: Node[] = [];
    const edges: [number, number][] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.8 + Math.random() * 0.6;
      const theta = (i / nodeCount) * Math.PI * 2 + (i % 3) * 0.4;
      const phi = Math.random() * 1.6 - 0.8;

      nodes.push({
        id: i,
        position: new THREE.Vector3(
          Math.cos(theta) * radius * Math.cos(phi),
          Math.sin(phi) * 2.2,
          Math.sin(theta) * radius * Math.cos(phi)
        ),
        connections: [],
      });
    }

    // Create organic connections
    for (let i = 0; i < nodeCount; i++) {
      const connectionCount = 2 + Math.floor(Math.random() * 2);
      for (let c = 0; c < connectionCount; c++) {
        const target = (i + c + 1 + Math.floor(Math.random() * 3)) % nodeCount;
        if (target !== i && !nodes[i].connections.includes(target)) {
          nodes[i].connections.push(target);
          edges.push([i, target]);
        }
      }
    }

    return { nodes, edges };
  }, []);

  // Subtle rotation + pulsing
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.08;
        child.scale.setScalar(scale);
      });
    }
  });

  useGSAP(() => {
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.6, y: 0.6, z: 0.6 },
      { x: 1, y: 1, z: 1, duration: 1.8, ease: "power3.out" }
    );
  }, []);

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map(([a, b], index) => {
        const start = nodes[a].position;
        const end = nodes[b].position;
        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`edge-${index}`}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color="#38bdf8" transparent opacity={0.35} />
          </line>
        );
      })}

      {/* Nodes */}
      <group ref={nodesRef}>
        {nodes.map((node, index) => (
          <mesh key={`node-${index}`} position={node.position}>
            <sphereGeometry args={[0.085]} />
            <meshBasicMaterial color="#bae6fd" />
            {/* Glow halo */}
            <mesh>
              <sphereGeometry args={[0.18]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.45]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function NetworkVisualizerScene() {
  return (
    <div className="absolute inset-0 bg-zinc-950">
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 48 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 5]} intensity={1.2} color="#bae6fd" />
        <NetworkGraph />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-8 left-8 text-white/70 font-mono text-xs tracking-[2px]">
        LIVE TOPOLOGY • 47 NODES • 128 EDGES
      </div>
      <div className="absolute bottom-8 right-8 text-right text-white/50 text-xs font-mono tracking-widest">
        DRAG TO ORBIT • SCROLL TO ZOOM
      </div>
    </div>
  );
}
