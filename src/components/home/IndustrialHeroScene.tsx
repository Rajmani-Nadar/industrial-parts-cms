"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";
import { MathUtils, Vector3 } from "three";

const steel = { color: "#b9c3c8", metalness: 0.96, roughness: 0.2 };
const polished = { color: "#e1e6e8", metalness: 1, roughness: 0.12 };
const gunmetal = { color: "#56636b", metalness: 0.94, roughness: 0.28 };
const darkSteel = { color: "#26343d", metalness: 0.9, roughness: 0.32 };
const orange = { color: "#d97820", metalness: 0.82, roughness: 0.24 };

function Fastener({ angle, radius, y = 0.4 }: { angle: number; radius: number; y?: number }) {
  return (
    <mesh position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.105, 0.105, 0.13, 16]} />
      <meshStandardMaterial {...polished} />
    </mesh>
  );
}

function RotorDetails() {
  return (
    <group position={[0, 0.45, 0]}>
      {[1.5, 1.34, 1.17, 0.98].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, index === 0 ? 0.035 : 0.022, 10, 96]} />
          <meshStandardMaterial {...(index % 2 === 0 ? polished : gunmetal)} />
        </mesh>
      ))}
      {Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2;
        return (
          <mesh key={index} position={[Math.cos(angle) * 1.23, 0, Math.sin(angle) * 1.23]} rotation={[0, -angle, 0.1]} castShadow>
            <boxGeometry args={[0.1, 0.07, 0.42]} />
            <meshStandardMaterial {...darkSteel} />
          </mesh>
        );
      })}
    </group>
  );
}

function HubAndShaft() {
  return (
    <group>
      <mesh position={[0, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.74, 0.74, 0.24, 48]} /><meshStandardMaterial {...darkSteel} /></mesh>
      <mesh position={[0, 0.73, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.48, 0.48, 0.34, 48]} /><meshStandardMaterial {...steel} /></mesh>
      <mesh position={[0, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.27, 0.27, 0.28, 40]} /><meshStandardMaterial {...polished} /></mesh>
      <mesh position={[0, 1.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.13, 0.13, 0.38, 32]} /><meshStandardMaterial {...orange} /></mesh>
      {Array.from({ length: 8 }, (_, index) => <Fastener key={index} angle={(index / 8) * Math.PI * 2} radius={0.58} y={0.88} />)}
    </group>
  );
}

function Caliper() {
  return (
    <group position={[1.52, 0.42, 0.18]} rotation={[0.04, 0.12, -0.11]}>
      <mesh castShadow><boxGeometry args={[0.56, 0.94, 0.76]} /><meshStandardMaterial {...orange} /></mesh>
      <mesh position={[-0.3, 0, 0]} castShadow><boxGeometry args={[0.12, 0.62, 0.86]} /><meshStandardMaterial {...darkSteel} /></mesh>
      <mesh position={[-0.37, 0, 0]}><boxGeometry args={[0.055, 0.38, 0.62]} /><meshStandardMaterial {...polished} /></mesh>
      <mesh position={[0.02, 0.5, 0]} rotation={[0, 0, 0.28]} castShadow><boxGeometry args={[0.52, 0.1, 0.28]} /><meshStandardMaterial {...gunmetal} /></mesh>
      <mesh position={[0.02, -0.5, 0]} rotation={[0, 0, -0.28]} castShadow><boxGeometry args={[0.52, 0.1, 0.28]} /><meshStandardMaterial {...gunmetal} /></mesh>
    </group>
  );
}

function MountingBrackets() {
  return (
    <group>
      <mesh position={[-1.45, -0.42, -0.42]} rotation={[0, -0.25, 0.14]} castShadow><boxGeometry args={[0.65, 0.28, 0.76]} /><meshStandardMaterial {...darkSteel} /></mesh>
      <mesh position={[-1.65, -0.68, -0.4]} rotation={[0, -0.25, 0]} castShadow><cylinderGeometry args={[0.15, 0.15, 0.72, 24]} /><meshStandardMaterial {...polished} /></mesh>
      <mesh position={[1.05, -0.58, -0.55]} rotation={[0, 0.2, -0.18]} castShadow><boxGeometry args={[0.72, 0.3, 0.68]} /><meshStandardMaterial {...darkSteel} /></mesh>
      <mesh position={[1.28, -0.8, -0.58]} rotation={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.15, 0.15, 0.7, 24]} /><meshStandardMaterial {...orange} /></mesh>
    </group>
  );
}

function BrakeAssembly() {
  const assembly = useRef<Group>(null);
  const rotor = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();
  const { pointer } = useThree();
  const target = useRef(new Vector3());

  useFrame((state, delta) => {
    if (!assembly.current || !rotor.current) return;
    target.current.set(pointer.x * 0.1, pointer.y * 0.065, 0);
    assembly.current.rotation.x = MathUtils.damp(assembly.current.rotation.x, 0.19 + target.current.y, 2.2, delta);
    assembly.current.rotation.z = MathUtils.damp(assembly.current.rotation.z, -0.11 - target.current.x, 2.2, delta);
    if (!reducedMotion) {
      rotor.current.rotation.y += delta * 0.075;
      assembly.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.022;
    }
  });

  return (
    <group ref={assembly} position={[0.08, 0, 0]} rotation={[0.19, -0.43, -0.11]} scale={0.94}>
      <mesh position={[0, -0.05, -0.28]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[1.98, 1.98, 0.66, 64]} /><meshStandardMaterial {...gunmetal} /></mesh>
      <mesh position={[0, 0.08, -0.59]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[1.78, 1.78, 0.16, 64]} /><meshStandardMaterial {...darkSteel} /></mesh>
      <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[1.78, 1.78, 0.2, 64]} /><meshStandardMaterial {...steel} /></mesh>
      <mesh ref={rotor} position={[0, 0.39, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[1.58, 1.58, 0.17, 64]} /><meshStandardMaterial color="#89959b" metalness={0.98} roughness={0.23} /></mesh>
      <RotorDetails />
      {Array.from({ length: 12 }, (_, index) => <Fastener key={index} angle={(index / 12) * Math.PI * 2} radius={1.48} />)}
      <HubAndShaft />
      <Caliper />
      <MountingBrackets />
    </group>
  );
}

function SceneFallback() {
  return (
    <div className="flex h-full min-h-90 items-center justify-center bg-[radial-gradient(circle_at_center,#ffffff_0%,#e8eef1_62%,#d1dbe0_100%)]">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-[18px] border-slate-500 bg-slate-700 shadow-[inset_0_0_0_12px_#d5dadd,0_24px_50px_rgba(15,23,42,0.2)]"><div className="h-24 w-24 rounded-full border-[10px] border-orange-500 bg-slate-900 shadow-[inset_0_0_0_8px_#b9c3c8]" /></div>
    </div>
  );
}

export default function IndustrialHeroScene() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden md:h-[500px] lg:h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_44%,rgba(255,255,255,0.98),rgba(231,238,241,0.78)_55%,rgba(204,216,221,0.42)_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,51,102,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,51,102,0.06)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500/15" />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/15" />
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0.92, 6.15], fov: 34 }} gl={{ antialias: true, powerPreference: "high-performance" }} fallback={<SceneFallback />}>
        <ambientLight intensity={1.45} />
        <directionalLight position={[3.5, 5, 4]} intensity={4.7} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 2.5, -2]} intensity={2.8} color="#a9c9d7" />
        <pointLight position={[2.8, 1.8, 2.5]} intensity={13} distance={8} color="#ffab45" />
        <pointLight position={[-2.5, -1, 2]} intensity={6} distance={7} color="#d7edf5" />
        <Suspense fallback={<Html center><span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Loading assembly</span></Html>}><BrakeAssembly /><ContactShadows position={[0, -2.05, 0]} opacity={0.27} scale={5.4} blur={2.6} far={4.5} /></Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-slate-400/30 bg-white/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 backdrop-blur-sm">Heavy-duty brake assembly</div>
    </div>
  );
}
