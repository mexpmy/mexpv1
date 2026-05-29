'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei';
import { EffectComposer, SelectiveBloom, DepthOfField } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);
useGLTF.preload('/models/semi-sub.glb');

// Cinematic camera path for scroll experience (semi-sub model)
export const CINEMATIC_PATH = [
  { position: [95, 65, 155],  lookAt: [0, 35, 0],   label: "Overview" },     // Wide hero shot
  { position: [18, 52, 38],   lookAt: [3, 46, 8],   label: "Helideck" },     // Approaching helideck
  { position: [-48, 88, 52],  lookAt: [12, 68, 18], label: "Crane" },        // Crane hero
  { position: [15, 28, 48],   lookAt: [5, 15, 12],  label: "Moonpool" },     // Looking into moonpool
  { position: [-28, 18, 25],  lookAt: [2, 10, 5],   label: "BOP Stack" },    // Dramatic BOP
  { position: [42, 42, 95],   lookAt: [0, 30, 0],   label: "Final Reveal" }, // Pull back beauty
];

function RigModel({ onBloomReady }: { onBloomReady: (objs: THREE.Object3D[]) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/semi-sub.glb');

  React.useEffect(() => {
    if (!groupRef.current) return;
    const bloomList: THREE.Object3D[] = [];

    groupRef.current.traverse((child: any) => {
      if (!child.isMesh) return;
      const name = child.name.toLowerCase();
      if (
        name.includes('light') || name.includes('beacon') ||
        name.includes('lamp') || name.includes('helipad')
      ) {
        if (child.material) {
          child.material.emissive = new THREE.Color('#ffaa33');
          child.material.emissiveIntensity = 4;
        }
        bloomList.push(child);
      }
    });
    onBloomReady(bloomList);
  }, [onBloomReady]);

  return <primitive ref={groupRef} object={scene} dispose={null} />;
}

function CinematicScene({ 
  target, 
  lightweight = false,
  progress,
  quality = 'medium',
  bloomIntensity = 1.8
}: { 
  target: keyof typeof CAMERA_TARGETS; 
  lightweight?: boolean;
  progress?: number;
  quality?: 'high' | 'medium' | 'low';
  bloomIntensity?: number;
}) {
  const { camera } = useThree();
  const [bloomObjects, setBloomObjects] = useState<THREE.Object3D[]>([]);
  const bloomRef = useRef<any>(null);

  // Scroll-scrubbed cinematic path (smooth camera movement)
  useGSAP(() => {
    if (progress !== undefined) {
      const path = CINEMATIC_PATH;
      const numPoints = path.length - 1;
      const p = Math.max(0, Math.min(1, progress)) * numPoints;
      const i = Math.floor(p);
      let t = p - i;

      // Apply smoothstep for much smoother, more cinematic camera motion
      t = t * t * (3 - 2 * t);

      const current = path[Math.min(i, numPoints)];
      const next = path[Math.min(i + 1, numPoints)];

      const x = current.position[0] + (next.position[0] - current.position[0]) * t;
      const y = current.position[1] + (next.position[1] - current.position[1]) * t;
      const z = current.position[2] + (next.position[2] - current.position[2]) * t;

      camera.position.set(x, y, z);

      const lx = current.lookAt[0] + (next.lookAt[0] - current.lookAt[0]) * t;
      const ly = current.lookAt[1] + (next.lookAt[1] - current.lookAt[1]) * t;
      const lz = current.lookAt[2] + (next.lookAt[2] - current.lookAt[2]) * t;

      camera.lookAt(lx, ly, lz);
      return;
    }

    // Discrete target mode (for chapter buttons) - smoother duration
    const tgt = CAMERA_TARGETS[target];
    gsap.to(camera.position, {
      x: tgt.position[0],
      y: tgt.position[1],
      z: tgt.position[2],
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(tgt.lookAt[0], tgt.lookAt[1], tgt.lookAt[2])
    });
  }, { dependencies: [target, progress], scope: camera });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[100, 120, 60]} intensity={2.5} castShadow />

      <RigModel onBloomReady={setBloomObjects} />

      <Environment preset="sunset" />

      {(quality !== 'low' && bloomObjects.length > 0 && bloomIntensity > 0) && (
        <EffectComposer>
          <SelectiveBloom
            ref={bloomRef}
            selection={bloomObjects}
            intensity={bloomIntensity}
            luminanceThreshold={quality === 'medium' ? 0.2 : 0.12}
            luminanceSmoothing={0.75}
            kernelSize={quality === 'high' ? KernelSize.LARGE : KernelSize.MEDIUM}
            mipmapBlur
          />

          {/* Subtle Depth of Field - only in high quality for cinematic feel */}
          {quality === 'high' && (
            <DepthOfField 
              focusDistance={0.02} 
              focalLength={0.05} 
              bokehScale={1.8} 
            />
          )}
        </EffectComposer>
      )}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={18}
        maxDistance={280}
        enableDamping
        dampingFactor={0.12}
      />
    </>
  );
}

interface CinematicRigProps {
  target?: keyof typeof CAMERA_TARGETS;
  lightweight?: boolean;           // Disable heavy postprocessing on mobile/low-end devices
  progress?: number;               // 0 to 1 - for smooth scroll-scrubbed camera animation
  quality?: 'high' | 'medium' | 'low';
  bloomIntensity?: number;         // Dynamic bloom control per section (0-3)
}

export default function CinematicRig({ 
  target = 'overview', 
  lightweight = false,
  progress,
  quality = 'medium',
  bloomIntensity = 1.8
}: CinematicRigProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [85, 70, 140], fov: 42 }}
        gl={{ 
          antialias: quality !== 'low', 
          alpha: false, 
          preserveDrawingBuffer: true,
          powerPreference: quality === 'low' ? "low-power" : "high-performance"
        }}
        dpr={
          quality === 'low' ? 1 : 
          quality === 'medium' ? [1, 1.5] : 
          [1, 2]
        }
        style={{ background: '#0a0a0a' }}
        frameloop={quality === 'low' ? "demand" : "always"}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-emerald-400 font-mono text-xs tracking-widest">
              LOADING SEMI-SUB DIGITAL TWIN...
            </div>
          </Html>
        }>
          <CinematicScene 
            target={target} 
            lightweight={lightweight} 
            progress={progress}
            quality={quality}
            bloomIntensity={bloomIntensity}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export type CameraTarget = keyof typeof CAMERA_TARGETS;
export { CINEMATIC_PATH };