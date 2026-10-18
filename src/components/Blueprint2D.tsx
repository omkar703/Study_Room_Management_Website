"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, ShieldAlert, Monitor, Info, Armchair } from "lucide-react";
import { SeatData, SeatStatus } from "./MassiveRoomScene";

// ─── Desk Component (2D Blueprint) ───────────────────────────────

function BlueprintDeskPair({
  pairId,
  seat1,
  seat2,
  onSelect,
  selectedId
}: {
  pairId: string;
  seat1: SeatData;
  seat2: SeatData;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const renderSeat = (seat: SeatData, isTop: boolean) => {
    const isSelected = selectedId === seat.id;
    const isOccupied = seat.status === 'occupied';
    const isExpiring = seat.status === 'expiring';
    const isAvailable = seat.status === 'available';

    // Premium styling colors
    const chairColor = isOccupied ? 'bg-indigo-500' : isExpiring ? 'bg-amber-500' : 'bg-slate-200';
    const chairShadow = isOccupied ? 'shadow-[0_0_8px_rgba(99,102,241,0.5)]' : isExpiring ? 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' : '';
    
    const glowClass = isSelected 
      ? 'ring-2 ring-primary ring-offset-1 bg-indigo-50 shadow-[0_4px_12px_rgba(79,70,229,0.2)] z-10 scale-[1.02]' 
      : isOccupied 
        ? 'hover:ring-1 hover:ring-indigo-300 hover:bg-slate-50 shadow-sm'
        : isExpiring
          ? 'hover:ring-1 hover:ring-amber-300 hover:bg-slate-50 shadow-sm'
          : 'hover:ring-1 hover:ring-slate-300 hover:bg-white shadow-sm';

    return (
      <div 
        onClick={(e) => { e.stopPropagation(); onSelect(seat.id); }}
        className={`relative w-full h-[60px] flex flex-col justify-center items-center cursor-pointer transition-all duration-300 rounded-lg group ${glowClass} ${isTop ? 'rounded-b-none border-b-0 pb-1' : 'rounded-t-none border-t-0 pt-1'}`}
      >
        {/* Seat Number */}
        <span className={`text-[10px] font-bold ${isOccupied || isExpiring ? 'text-indigo-900' : 'text-slate-400'} z-10 mb-0.5`}>
           {seat.id.split('-')[1]}
        </span>

        {/* Chair silhouette */}
        <div className={`absolute ${isTop ? '-top-3' : '-bottom-3'} w-6 h-3 rounded-full transition-colors duration-300 ${chairColor} ${chairShadow}`} />
        
        {/* Desk Lamp Glow */}
        {(isOccupied || isExpiring) && (
          <div className={`absolute ${isTop ? 'bottom-1 right-2' : 'top-1 right-2'} w-2 h-2 rounded-full ${isExpiring ? 'bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]' : 'bg-yellow-200 shadow-[0_0_6px_rgba(254,240,138,0.8)]'}`} />
        )}
        
        {/* Laptop icon */}
        {(isOccupied || isExpiring) && (
          <div className={`absolute ${isTop ? 'bottom-1 left-2' : 'top-1 left-2'} opacity-60 text-slate-500`}>
             <Monitor className="w-3 h-3" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-[100px] bg-[#fdfbf9] border border-slate-200 rounded-xl flex flex-col items-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform hover:scale-[1.02] duration-300">
      {/* Wood texture overlay (subtle) */}
      <div className="absolute inset-0 bg-[#c8906a] opacity-[0.03] rounded-xl pointer-events-none" />
      
      {/* Top Seat */}
      {renderSeat(seat1, true)}
      
      {/* Center Partition */}
      <div className="w-[90%] h-[3px] bg-slate-200 rounded-full my-[1px] relative z-20 shadow-sm" />
      
      {/* Bottom Seat */}
      {renderSeat(seat2, false)}
    </div>
  );
}

// ─── Main Blueprint Component ──────────────────────────────────────

export function Blueprint2D({ 
  seats, 
  selectedId, 
  onSelect 
}: { 
  seats: SeatData[]; 
  selectedId: string | null; 
  onSelect: (id: string) => void;
}) {
  const zones = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];

  const getSeat = (row: number, col: number) => {
    return seats.find(s => s.row === row && s.col === col)!;
  };

  return (
    <div className="relative w-full h-full overflow-auto bg-[#f8fafc] p-8 custom-scrollbar">
      {/* Architectural Floor Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
      
      <div className="min-w-[1000px] max-w-5xl mx-auto pb-24">
        
        {/* Legend & Controls Header */}
        <div className="flex justify-between items-center mb-10 sticky top-0 z-30 bg-[#f8fafc]/90 backdrop-blur-md py-4 border-b border-slate-200">
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Occupied</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Expiring</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-slate-300 bg-slate-100" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Available</span>
             </div>
           </div>
           
           <div className="flex items-center gap-4 text-slate-500 text-sm font-semibold">
              <span>Front Desk ↑</span>
           </div>
        </div>

        {/* Room Layout rendering */}
        <div className="space-y-16 relative" onClick={() => onSelect("")}>
          {zones.map((zoneName, rowIdx) => {
             // Calculate zone occupancy
             const zoneSeats = seats.filter(s => s.row === rowIdx);
             const occCount = zoneSeats.filter(s => s.status === 'occupied' || s.status === 'expiring').length;

             return (
               <div key={zoneName} className="relative group">
                 {/* Zone Label */}
                 <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-display font-bold text-slate-800 uppercase tracking-widest">{zoneName}</span>
                    <span className="text-[10px] font-bold text-slate-500">{occCount}/20</span>
                 </div>
                 
                 {/* Row Container */}
                 <div className="flex justify-between items-center gap-8 bg-white/40 p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm relative">
                    
                    {/* Left Section (10 seats = 5 pairs) */}
                    <div className="flex gap-4">
                      {[0, 2, 4, 6, 8].map(colIdx => (
                        <BlueprintDeskPair
                           key={`pair-${rowIdx}-${colIdx}`}
                           pairId={`pair-${rowIdx}-${colIdx}`}
                           seat1={getSeat(rowIdx, colIdx)}
                           seat2={getSeat(rowIdx, colIdx + 1)}
                           selectedId={selectedId}
                           onSelect={onSelect}
                        />
                      ))}
                    </div>

                    {/* Central Aisle */}
                    <div className="w-16 h-full flex items-center justify-center relative">
                       <div className="w-px h-[120%] bg-slate-200 absolute top-[-10%]" />
                       <span className="bg-[#f8fafc] px-2 py-1 rounded text-[10px] font-bold text-slate-400 tracking-widest uppercase rotate-90 z-10 shadow-sm border border-slate-100">Aisle</span>
                    </div>

                    {/* Right Section (10 seats = 5 pairs) */}
                    <div className="flex gap-4">
                      {[10, 12, 14, 16, 18].map(colIdx => (
                        <BlueprintDeskPair
                           key={`pair-${rowIdx}-${colIdx}`}
                           pairId={`pair-${rowIdx}-${colIdx}`}
                           seat1={getSeat(rowIdx, colIdx)}
                           seat2={getSeat(rowIdx, colIdx + 1)}
                           selectedId={selectedId}
                           onSelect={onSelect}
                        />
                      ))}
                    </div>

                 </div>
               </div>
             );
          })}
        </div>

      </div>
    </div>
  );
}

// ─── Smart Floating Modal ──────────────────────────────────────────

export function BlueprintSmartModal({
  selectedSeat,
  onClose
}: {
  selectedSeat: SeatData | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {selectedSeat && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[340px] glass-panel rounded-2xl border border-white/80 shadow-2xl bg-white/95 backdrop-blur-3xl z-40 overflow-hidden"
        >
          <div className="p-3 border-b border-surface-border flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  selectedSeat.status === 'occupied' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' :
                  selectedSeat.status === 'expiring' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-300'
                }`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Seat {selectedSeat.id.split('-')[1]} • Zone {selectedSeat.zone}
                </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            {selectedSeat.studentName ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-primary font-bold text-sm shadow-inner border border-indigo-100">
                    {selectedSeat.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{selectedSeat.studentName}</h3>
                    <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Active Plan</p>
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-500">Expires:</span>
                    <span className="font-semibold text-foreground">
                      {new Date(selectedSeat.expiry!).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedSeat.status === 'expiring' && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-100">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span className="font-semibold">Subscription ends very soon</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 text-[11px] font-bold bg-foreground text-white rounded-xl shadow-lg shadow-foreground/10 hover:bg-primary transition-colors">
                    Manage
                  </button>
                  <button className="px-3 py-2 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
                    Free Seat
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <Armchair className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-700 text-sm mb-1">Available Seat</h3>
                <p className="text-[11px] text-slate-500 mb-4 px-4 leading-relaxed">This premium desk is clean and ready for assignment.</p>
                <button className="w-full px-4 py-2 text-[11px] font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-indigo-700 transition-colors">
                  Assign Student
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
