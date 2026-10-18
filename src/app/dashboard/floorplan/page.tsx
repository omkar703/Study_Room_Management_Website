"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { MassiveRoomScene, SeatData, SeatStatus } from "@/components/MassiveRoomScene";
import { Blueprint2D } from "@/components/Blueprint2D";
import { Info, Armchair, BatteryCharging, Filter, X, Calendar, User, Clock, ShieldAlert } from "lucide-react";

// Helper to generate 100 mock seats (5 zones, 20 seats each)
const generateSeats = (): SeatData[] => {
  const seats: SeatData[] = [];
  const zones = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 20; col++) {
      // Randomly assign states for visual demo
      const rand = Math.random();
      let status: SeatStatus = "available";
      if (rand > 0.8) status = "occupied";
      else if (rand > 0.75) status = "expiring";
      else if (rand < 0.05) status = "disabled";

      seats.push({
        id: `Z${row}-${col}`,
        row,
        col,
        zone: zones[row],
        status,
        studentName: status === "occupied" || status === "expiring" ? `Student ${row}-${col}` : undefined,
        expiry: status === "occupied" || status === "expiring" ? new Date(Date.now() + Math.random() * 10000000000).toISOString() : undefined,
      });
    }
  }
  return seats;
};

export default function FloorplanPage() {
  const [is2DMode, setIs2DMode] = useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  
  // Memoize the seat generation so it doesn't change on re-renders
  const seats = useMemo(() => generateSeats(), []);

  const selectedSeat = seats.find(s => s.id === selectedSeatId);
  
  const occupiedCount = seats.filter(s => s.status === 'occupied').length;
  const expiringCount = seats.filter(s => s.status === 'expiring').length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <div className="flex justify-between items-end mb-4 shrink-0">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight mb-1">
            Spatial Floorplan
          </h1>
          <p className="text-sm font-medium text-text-secondary">
            Manage 100+ seats in real-time.
          </p>
        </div>
        
        <div className="flex gap-2 bg-white/50 p-1 rounded-xl border border-white/60 shadow-sm backdrop-blur-md">
          <button 
            onClick={() => setIs2DMode(false)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              !is2DMode ? 'bg-white shadow-sm text-foreground' : 'text-text-secondary hover:text-foreground'
            }`}
          >
            3D View
          </button>
          <button 
            onClick={() => setIs2DMode(true)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              is2DMode ? 'bg-white shadow-sm text-foreground' : 'text-text-secondary hover:text-foreground'
            }`}
          >
            2D Blueprint
          </button>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[2rem] border border-white/60 shadow-sm bg-white/30 backdrop-blur-3xl overflow-hidden relative group">
        
        {/* Floating Analytics Header */}
        <div className="absolute top-6 left-6 right-6 z-10 flex justify-between pointer-events-none">
          <div className="glass-panel px-4 py-3 rounded-xl border border-white/80 shadow-lg bg-white/80 backdrop-blur-xl pointer-events-auto flex items-center gap-4">
             <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">Total Capacity</span>
               <span className="text-lg font-bold text-foreground">{occupiedCount + expiringCount} / 100</span>
             </div>
             <div className="w-px h-8 bg-surface-border" />
             <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Expiring Soon</span>
               <span className="text-lg font-bold text-amber-600">{expiringCount}</span>
             </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 z-10 flex gap-4 glass-panel px-4 py-2.5 rounded-full border border-white/80 shadow-lg bg-white/80 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5] shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
            <span className="text-xs font-semibold text-text-secondary">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="text-xs font-semibold text-text-secondary">Expiring</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]" />
            <span className="text-xs font-semibold text-text-secondary">Available</span>
          </div>
        </div>

        {/* Smart Modal for Selected Seat */}
        <AnimatePresence>
          {selectedSeat && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              className="absolute top-24 right-6 w-80 glass-panel rounded-2xl border border-white/80 shadow-2xl bg-white/90 backdrop-blur-3xl z-20 overflow-hidden"
            >
              <div className="p-4 border-b border-surface-border flex justify-between items-center bg-white/50">
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${
                     selectedSeat.status === 'occupied' ? 'bg-indigo-500' :
                     selectedSeat.status === 'expiring' ? 'bg-amber-500' : 'bg-slate-300'
                   }`} />
                   <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                     Desk {selectedSeat.col + 1} • Zone {selectedSeat.zone}
                   </span>
                </div>
                <button 
                  onClick={() => setSelectedSeatId(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-text-tertiary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                {selectedSeat.studentName ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center text-primary font-bold text-lg shadow-sm border border-white">
                        {selectedSeat.studentName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{selectedSeat.studentName}</h3>
                        <p className="text-xs font-medium text-text-tertiary">Premium Plan</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-text-tertiary" />
                        <span className="text-text-secondary">Expires: </span>
                        <span className="font-semibold text-foreground">
                          {new Date(selectedSeat.expiry!).toLocaleDateString()}
                        </span>
                      </div>
                      {selectedSeat.status === 'expiring' && (
                        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                          <ShieldAlert className="w-4 h-4" />
                          <span className="font-semibold">Subscription ends in 3 days</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-3 py-2 text-xs font-semibold bg-primary text-white rounded-xl shadow-md shadow-primary/20 hover:bg-indigo-700 transition-colors">
                        Extend Sub
                      </button>
                      <button className="px-3 py-2 text-xs font-semibold bg-slate-100 text-foreground rounded-xl hover:bg-slate-200 transition-colors">
                        Free Seat
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Armchair className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="font-bold text-foreground mb-1">Available Seat</h3>
                    <p className="text-xs text-text-tertiary mb-5">This desk is clean and ready for a new student.</p>
                    <button className="w-full px-4 py-2.5 text-sm font-semibold bg-foreground text-white rounded-xl shadow-lg shadow-foreground/10 hover:bg-primary transition-colors">
                      Assign Student
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2D/3D Content Switcher */}
        {is2DMode ? (
          <div className="absolute inset-0 bg-[#f8fafc] overflow-hidden">
            <Blueprint2D seats={seats} selectedId={selectedSeatId} onSelect={setSelectedSeatId} />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/40">
            <Canvas shadows camera={{ position: [0, 15, 25], fov: 35 }}>
              <MassiveRoomScene 
                seats={seats} 
                selectedId={selectedSeatId} 
                onSelect={setSelectedSeatId} 
                is2DMode={false}
              />
            </Canvas>
          </div>
        )}
      </div>
    </motion.div>
  );
}
