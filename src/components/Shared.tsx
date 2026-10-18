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

// ─── Study Room Logo Icon ─────────────────────────────────────────
export function StudyRoomLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative rounded-[10px] bg-gradient-to-br from-primary via-indigo-600 to-accent-cyan flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="w-[84%] h-[84%]">
        <polygon points="37,23 20,44 48,44" fill="white" fillOpacity="0.32" />
        <rect x="13" y="44" width="38" height="3" rx="1.5" fill="white" fillOpacity="0.95" />
        <path d="M25 41 C27.5 39.5 29.8 39.8 32 41 C34.2 39.8 36.5 39.5 39 41 V36.2 C36.5 34.7 34.2 35 32 36.2 C29.8 35 27.5 34.7 25 36.2 Z" fill="white" />
        <line x1="32" y1="36.2" x2="32" y2="41" stroke="#4F46E5" strokeWidth="0.8" strokeLinecap="round" />
        <rect x="17.5" y="42" width="6" height="2" rx="1" fill="white" fillOpacity="0.9" />
        <path d="M20.5 42 V28 C20.5 20.5 27.5 17 35 19.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="32,17 40.5,22 36.5,25.5 29.5,20.5" fill="white" />
        <circle cx="36" cy="23" r="1.6" fill="#38BDF8" />
        <circle cx="47" cy="18" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="50" cy="22" r="1" fill="white" fillOpacity="0.4" />
      </svg>
    </div>
  );
}
