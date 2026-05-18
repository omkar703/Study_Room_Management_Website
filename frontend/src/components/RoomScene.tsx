"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

// Desk with occupancy expressed through chair color, glowing lamp, laptop screen
function Desk({
  position,
  occupied,
  flip = false,
}: {
  position: [number, number, number];
  occupied: boolean;
  flip?: boolean;
}) {
  const woodColor = "#c8906a";
  const chairColor = occupied ? "#4f46e5" : "#e2e8f0";
  const chairMetal = occupied ? 0.05 : 0.0;
  const chairRough = occupied ? 0.5 : 0.8;
  const lampGlow = occupied ? "#fef9c3" : "#e2e8f0";

  return (
    <group position={position} rotation={[0, flip ? Math.PI : 0, 0]}>
      {/* ── Desk surface ── */}
      <RoundedBox
        args={[1.15, 0.038, 0.58]}
        position={[0, 0.76, 0]}
        radius={0.008}
        smoothness={2}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={woodColor}
          roughness={0.3}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* ── Legs ── */}
      {([-0.52, 0.52] as number[]).flatMap((x) =>
        ([-0.22, 0.22] as number[]).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.38, z]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.76, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </mesh>
        ))
      )}

      {/* ── Chair ── */}
      <group position={[0, 0, 0.5]}>
        {/* Seat */}
        <RoundedBox
          args={[0.38, 0.045, 0.38]}
          position={[0, 0.45, 0]}
          radius={0.012}
          smoothness={2}
          castShadow
        >
          <meshStandardMaterial
            color={chairColor}
            metalness={chairMetal}
            roughness={chairRough}
          />
        </RoundedBox>
        {/* Back */}
        <RoundedBox
          args={[0.38, 0.3, 0.045]}
          position={[0, 0.62, 0.16]}
          radius={0.012}
          smoothness={2}
          castShadow
        >
          <meshStandardMaterial
            color={chairColor}
            metalness={chairMetal}
            roughness={chairRough}
          />
        </RoundedBox>
        {/* Post */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.44, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Base ring */}
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.016, 6, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── Desk lamp ── */}
      <group position={[0.38, 0.76, -0.18]}>
        {/* Base */}
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 0.012, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.5} />
        </mesh>
        {/* Arm */}
        <mesh position={[0, 0.13, 0]} rotation={[0, 0, -0.08]}>
          <cylinderGeometry args={[0.008, 0.008, 0.25, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.7} />
        </mesh>
        {/* Shade */}
        <mesh position={[0.015, 0.265, 0]} rotation={[0, 0, -1.1]}>
          <cylinderGeometry args={[0.03, 0.045, 0.09, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
        {/* Emissive glow disk */}
        <mesh position={[0.04, 0.255, 0]} rotation={[0, 0, -1.1]}>
          <circleGeometry args={[0.028, 12]} />
          <meshBasicMaterial color={lampGlow} />
        </mesh>
        {occupied && (
          <pointLight
            position={[0.04, 0.23, 0]}
            intensity={0.3}
            distance={1.6}
            color="#fef3c7"
          />
        )}
      </group>

      {/* ── Laptop (occupied only) ── */}
      {occupied && (
        <group position={[-0.08, 0.76, 0.04]} rotation={[0, 0.15, 0]}>
          {/* Base */}
          <RoundedBox
            args={[0.27, 0.009, 0.18]}
            radius={0.003}
            smoothness={1}
            castShadow
          >
            <meshStandardMaterial color="#b0bec5" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          {/* Lid */}
          <RoundedBox
            args={[0.27, 0.18, 0.009]}
            position={[0, 0.09, -0.086]}
            rotation={[-0.22, 0, 0]}
            radius={0.003}
            smoothness={1}
            castShadow
          >
            <meshStandardMaterial color="#b0bec5" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          {/* Screen */}
          <mesh position={[0, 0.09, -0.08]} rotation={[-0.22, 0, 0]}>
            <planeGeometry args={[0.25, 0.165]} />
            <meshBasicMaterial color="#dbeafe" />
          </mesh>
          {/* Screen glow */}
          <pointLight
            position={[0, 0.09, -0.05]}
            intensity={0.15}
            distance={0.8}
            color="#bfdbfe"
          />
        </group>
      )}
    </group>
  );
}

function DeskPair({
  position,
  occ1,
  occ2,
}: {
  position: [number, number, number];
  occ1: boolean;
  occ2: boolean;
}) {
  return (
    <group position={position}>
      {/* Frosted glass divider */}
      <RoundedBox
        args={[1.18, 0.38, 0.016]}
        position={[0, 0.97, 0]}
        radius={0.006}
        smoothness={2}
      >
        <meshPhysicalMaterial
          color="#eef2ff"
          transmission={0.9}
          roughness={0.2}
          thickness={0.05}
          ior={1.45}
          transparent
        />
      </RoundedBox>
      {/* Front desk faces +Z */}
      <Desk position={[0, 0, 0.3]} occupied={occ1} flip={false} />
      {/* Rear desk faces -Z */}
      <Desk position={[0, 0, -0.3]} occupied={occ2} flip={true} />
    </group>
  );
}

export function PremiumRoomScene({ 
  autoRotate = true,
  occupancy = [true, false, true, true, false, true]
}: { 
  autoRotate?: boolean;
  occupancy?: boolean[];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.04) * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, -0.55, 0]}>
        {/* 3 × 2 grid of desk pairs */}
        <DeskPair position={[-1.55, 0, -1.5]} occ1={occupancy[0]} occ2={occupancy[1]} />
        <DeskPair position={[    0, 0, -1.5]} occ1={occupancy[2]} occ2={occupancy[3]} />
        <DeskPair position={[ 1.55, 0, -1.5]} occ1={occupancy[4]} occ2={occupancy[5]} />

        <DeskPair position={[-1.55, 0,  1.5]} occ1={occupancy[0]} occ2={occupancy[1]} />
        <DeskPair position={[    0, 0,  1.5]} occ1={occupancy[2]} occ2={occupancy[3]} />
        <DeskPair position={[ 1.55, 0,  1.5]} occ1={occupancy[4]} occ2={occupancy[5]} />

        {/* ── Floor ── */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#f0f4f8" roughness={0.92} metalness={0.0} />
        </mesh>
        {/* Subtle tile grid */}
        <gridHelper
          args={[14, 28, "#dde3ec", "#dde3ec"]}
          position={[0, 0.002, 0]}
        />
      </group>

      {/* ── Lighting ── */}
      {/* HDRI for PBR reflections */}
      <Environment preset="city" environmentIntensity={0.35} />

      {/* Warm key from upper-right */}
      <directionalLight
        position={[7, 9, 5]}
        intensity={1.3}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      {/* Cool fill from left */}
      <directionalLight
        position={[-6, 5, -3]}
        intensity={0.4}
        color="#e0f2fe"
      />
      {/* Gentle ambient */}
      <ambientLight intensity={0.6} color="#fff5eb" />

      <ContactShadows
        position={[0, -0.54, 0]}
        opacity={0.4}
        scale={14}
        blur={1.8}
        far={3}
        resolution={512}
        color="#1e293b"
      />
    </group>
  );
}
