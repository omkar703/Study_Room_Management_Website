"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PremiumRoomScene } from "@/components/RoomScene";
import React from "react";

// ─── Aurora background ────────────────────────────────────────────
export const AuroraBackground = () => (
  <div className="aurora-bg" aria-hidden>
    <div className="aurora-blob aurora-1" />
    <div className="aurora-blob aurora-2" />
    <div className="aurora-blob aurora-3" />
  </div>
);

// ─── 3D Canvas wrapper ────────────────────────────────────────────
export function Room3DCanvas({ 
  autoRotate = true,
  occupancy
}: { 
  autoRotate?: boolean;
  occupancy?: boolean[];
}) {
  return (
    <Canvas shadows camera={{ position: [7, 7, 10], fov: 33 }}>
      <PremiumRoomScene autoRotate={autoRotate} occupancy={occupancy} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.15}
        minPolarAngle={Math.PI / 6}
        autoRotate={autoRotate}
        autoRotateSpeed={0.35}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
