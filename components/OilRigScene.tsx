"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF, Preload } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { useRef, Suspense, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
useGLTF.preload("/models/semi-sub.glb");

function RigModel({
  onBloomReady,
  onBeaconsReady,
}: {
  onBloomReady: (objs: THREE.Object3D[]) => void;
  onBeaconsReady: (beacons: THREE.Mesh[]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/semi-sub.glb");

  useEffect(() => {
    if (!groupRef.current) return;

    const bloomList: THREE.Object3D[] = [];
    const beaconList: THREE.Mesh[] = [];

    groupRef.current.traverse((child: any) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();

      if (
        name.includes("light") || name.includes("beacon") ||
        name.includes("lamp") || name.includes("helipad") ||
        name.includes("radar") || name.includes("navigation")
      ) {
        if (child.material) {
          child.material.emissive = new THREE.Color("#ff8800");
          child.material.emissiveIntensity = 5;
        }
        bloomList.push(child);
        beaconList.push(child);
      }
    });

    onBloomReady(bloomList);
    onBeaconsReady(beaconList);
  }, [onBloomReady, onBeaconsReady]);

  return <primitive ref={groupRef} object={scene} dispose={null} />;
}

function SceneContent() {
  const { camera } = useThree();
  const [bloomObjects, setBloomObjects] = useState<THREE.Object3D[]>([]);
  const [beacons, setBeacons] = useState<THREE.Mesh[]>([]);
  const bloomRef = useRef<any>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#rig-experience",
        start: "top top",
        end: "+=400%",
        scrub: 1.3,
        pin: true,
      },
    });

    tl.to(camera.position, { x: 140, y: 95, z: 190, duration: 1 }, 0)
      .to(bloomRef.current || {}, { intensity: 1.0, duration: 1 }, 0);

    tl.to(camera.position, { x: 45, y: 48, z: 85, duration: 1 }, 1)
      .to(bloomRef.current || {}, { intensity: 2.0, duration: 1 }, 1);

    tl.to(camera.position, { x: -65, y: 30, z: 58, duration: 1 }, 2)
      .to(bloomRef.current || {}, { intensity: 2.8, duration: 1 }, 2);

    tl.to(camera.position, { x: 25, y: 18, z: 38, duration: 1 }, 3)
      .to(bloomRef.current || {}, { intensity: 3.5, duration: 1 }, 3);

    // Pulsing beacons
    beacons.forEach((beacon, i) => {
      gsap.to(beacon.material, {
        emissiveIntensity: 16,
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.1,
      });
    });
  }, [beacons, camera]);

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[130, 110, 70]} intensity={2.2} castShadow />

      <RigModel onBloomReady={setBloomObjects} onBeaconsReady={setBeacons} />

      <Environment preset="sunset" />   {/* Fixed: Changed from "ocean" */}

      <EffectComposer>
        <SelectiveBloom
          ref={bloomRef}
          selection={bloomObjects}
          intensity={1.1}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.7}
          kernelSize={KernelSize.MEDIUM}
          mipmapBlur
        />
      </EffectComposer>

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={25}
        maxDistance={500}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

export default function OilRigScene() {
  return (
    <div className="relative h-screen w-full" id="rig-experience">
      <Canvas
        camera={{ position: [85, 70, 140], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-cyan-400 font-mono text-center">
              LOADING DIGITAL TWIN...<br />
              <span className="text-xs text-zinc-500">Please wait • RTX 3050</span>
            </div>
          </Html>
        }>
          <SceneContent />
        </Suspense>
        <Preload all />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 font-mono text-xs text-orange-400 mix-blend-difference pointer-events-none">
        SEMI-SUBMERSIBLE DIGITAL TWIN
      </div>
    </div>
  );
}