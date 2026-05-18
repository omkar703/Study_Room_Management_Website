"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Instances, 
  Instance,
  RoundedBox,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Info, User, Calendar, X, Zap } from "lucide-react";

// ─── Seat State Definition ─────────────────────────────────────────

export type SeatStatus = "available" | "occupied" | "expiring" | "disabled";

export interface SeatData {
  id: string;
  row: number;
  col: number;
  zone: string;
  status: SeatStatus;
  studentName?: string;
  expiry?: string;
}

// ─── Geometry & Materials for Instancing ──────────────────────────

const deskGeo = new THREE.BoxGeometry(1.15, 0.038, 0.58);
const deskMat = new THREE.MeshPhysicalMaterial({ color: "#c8906a", roughness: 0.3 });

const legGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.76, 8);
const metalMat = new THREE.MeshStandardMaterial({ color: "#64748b", metalness: 0.9, roughness: 0.1 });

const seatGeo = new THREE.BoxGeometry(0.38, 0.045, 0.38);
const backGeo = new THREE.BoxGeometry(0.38, 0.3, 0.045);
const postGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.44, 8);
const baseGeo = new THREE.TorusGeometry(0.13, 0.016, 6, 16);

// Status Colors
const colors = {
  available: new THREE.Color("#e2e8f0"),
  occupied: new THREE.Color("#4f46e5"),
  expiring: new THREE.Color("#f59e0b"),
  selected: new THREE.Color("#0ea5e9"),
  disabled: new THREE.Color("#cbd5e1"),
};

// ─── Single Desk Component (Instanced) ────────────────────────────

function InstancedDesk({
  position,
  rotation,
  data,
  selectedId,
  onSelect,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  data: SeatData;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const isSelected = selectedId === data.id;
  
  // Determine color based on status and selection
  const chairColor = isSelected ? colors.selected : colors[data.status];
  const isOccupied = data.status === "occupied" || data.status === "expiring";

  // Interaction handlers
  const [hovered, setHovered] = useState(false);

  // Floating effect if selected
  const groupY = isSelected ? 0.05 : 0;
  const hoverScale = hovered && !isSelected ? 1.02 : 1;

  return (
    <group 
      position={[position[0], position[1] + groupY, position[2]]} 
      rotation={rotation}
      scale={hoverScale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Desk Surface */}
      <Instance position={[0, 0.76, 0]} color={isSelected ? "#e0e7ff" : undefined} />
      
      {/* Legs */}
      {[-0.52, 0.52].map((x, i) =>
        [-0.22, 0.22].map((z, j) => (
          <mesh key={`leg-${i}-${j}`} position={[x, 0.38, z]} geometry={legGeo} material={metalMat} castShadow />
        ))
      )}

      {/* Chair Group */}
      <group position={[0, 0, 0.5]}>
        <mesh position={[0, 0.45, 0]} geometry={seatGeo} castShadow>
          <meshStandardMaterial color={chairColor} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.62, 0.16]} geometry={backGeo} castShadow>
          <meshStandardMaterial color={chairColor} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.22, 0]} geometry={postGeo} material={metalMat} castShadow />
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} geometry={baseGeo} material={metalMat} />
      </group>

      {/* Simplified Laptop (Only if occupied) */}
      {isOccupied && (
        <group position={[-0.08, 0.76, 0.04]} rotation={[0, 0.15, 0]}>
          <mesh position={[0, 0.09, -0.08]} rotation={[-0.22, 0, 0]}>
            <planeGeometry args={[0.25, 0.165]} />
            <meshBasicMaterial color="#bfdbfe" />
          </mesh>
          <mesh position={[0, 0.09, -0.086]} rotation={[-0.22, 0, 0]} castShadow>
             <boxGeometry args={[0.27, 0.18, 0.009]} />
             <meshStandardMaterial color="#b0bec5" roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* Simplified Lamp Glow */}
      <group position={[0.38, 0.76, -0.18]}>
        <mesh position={[0.04, 0.255, 0]} rotation={[0, 0, -1.1]}>
          <circleGeometry args={[0.028, 12]} />
          <meshBasicMaterial color={isOccupied ? "#fef9c3" : "#94a3b8"} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Procedural Room Generator ─────────────────────────────────────

export function MassiveRoomScene({
  seats,
  selectedId,
  onSelect,
  is2DMode = false,
}: {
  seats: SeatData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  is2DMode?: boolean;
}) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  // Animate camera transition between 2D (top-down) and 3D
  useFrame((state, delta) => {
    if (controlsRef.current) {
      const targetPolar = is2DMode ? 0 : Math.PI / 2.5; // Top-down vs Isometric
      const targetY = is2DMode ? 25 : 7;
      const targetZ = is2DMode ? 0 : 18;

      // Smoothly interpolate camera position and angles
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
      
      controlsRef.current.maxPolarAngle = THREE.MathUtils.damp(controlsRef.current.maxPolarAngle, targetPolar, 4, delta);
      controlsRef.current.minPolarAngle = THREE.MathUtils.damp(controlsRef.current.minPolarAngle, targetPolar, 4, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} color="#fff5eb" />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#fff8f0" castShadow shadow-mapSize={[2048, 2048]} />
      <Environment preset="city" environmentIntensity={0.3} />

      <group position={[0, -0.5, 0]}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[40, 30]} />
          <meshStandardMaterial color="#f0f4f8" roughness={0.9} />
        </mesh>
        
        {/* Subtle grid to emphasize scale and zones */}
        <gridHelper args={[40, 80, "#dde3ec", "#e2e8f0"]} position={[0, 0.002, 0]} />

        {/* Render 100+ Desks */}
        <Instances range={seats.length} geometry={deskGeo} material={deskMat} castShadow receiveShadow>
          {seats.map((seat) => {
            // Layout Logic:
            // 5 Rows (Zones). 20 seats per row.
            // Left side: cols 0-9. Right side: cols 10-19.
            // Aisle in the middle.
            
            const rowIndex = seat.row; // 0 to 4
            const colIndex = seat.col; // 0 to 19

            const isRightSide = colIndex >= 10;
            const xOffset = isRightSide ? (colIndex - 10) * 1.6 + 2 : colIndex * 1.6 - 16.5;
            const zOffset = rowIndex * 4 - 8;
            
            // Pairs face each other. Evens face -Z, Odds face +Z
            const isFront = colIndex % 2 === 0;
            const zFinal = isFront ? zOffset - 0.3 : zOffset + 0.3;
            const rotationY = isFront ? 0 : Math.PI;

            return (
              <InstancedDesk
                key={seat.id}
                position={[xOffset, 0, zFinal]}
                rotation={[0, rotationY, 0]}
                data={seat}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            );
          })}
        </Instances>

        {/* Partitions (One per pair) */}
        {seats.filter((s) => s.col % 2 === 0).map((seat) => {
           const rowIndex = seat.row;
           const colIndex = seat.col;
           const isRightSide = colIndex >= 10;
           const xOffset = isRightSide ? (colIndex - 10) * 1.6 + 2 : colIndex * 1.6 - 16.5;
           const zOffset = rowIndex * 4 - 8;

           return (
             <mesh key={`part-${seat.id}`} position={[xOffset, 0.97, zOffset]}>
                <boxGeometry args={[1.18, 0.38, 0.016]} />
                <meshPhysicalMaterial color="#eef2ff" transmission={0.9} roughness={0.2} transparent opacity={0.8} />
             </mesh>
           );
        })}
      </group>

      <OrbitControls 
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={40}
        target={[0, 0, 0]}
      />
    </>
  );
}
