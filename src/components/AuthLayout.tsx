"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { AuroraBackground, Room3DCanvas } from "@/components/Shared";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 selection:text-primary flex bg-white relative overflow-hidden">
      <AuroraBackground />

      {/* LEFT SIDE: Cinematic 3D Environment (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-10 z-10">
        
        {/* Brand/Nav */}
        <div className="flex justify-between items-center z-20">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white font-display font-bold shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
              S
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Sage<span className="text-text-tertiary">.os</span>
            </span>
          </Link>

          <Link href="/" className="flex items-center gap-1 text-sm font-semibold text-text-secondary hover:text-foreground transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to site
          </Link>
        </div>

        {/* 3D Scene */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pt-20">
           <div className="w-full h-full scale-110">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm">Loading environment...</div>}>
                <Room3DCanvas autoRotate={true} />
              </Suspense>
           </div>
        </div>
        
        {/* Cinematic Overlays */}
        <div className="z-20 max-w-md">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="glass-panel p-6 rounded-2xl border border-white/60 shadow-xl backdrop-blur-xl"
           >
             <h3 className="text-xl font-display font-bold text-foreground mb-2">Spatial Intelligence</h3>
             <p className="text-sm text-text-secondary leading-relaxed">
               You are about to enter a new paradigm of physical space management. The workspace is alive.
             </p>
           </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Panel */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 z-10">
         {/* Mobile Nav */}
         <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 z-20">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white font-display font-bold shadow-sm">
              S
            </div>
         </Link>

         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, type: "spring", bounce: 0 }}
           className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-[2rem] border border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/60 backdrop-blur-3xl relative"
         >
           <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[2rem] pointer-events-none" />
           
           <div className="relative z-10">
             <div className="mb-8">
               <h1 className="text-3xl font-display font-bold text-foreground tracking-tight mb-2">{title}</h1>
               <p className="text-sm text-text-secondary font-medium">{subtitle}</p>
             </div>
             
             {children}
           </div>
         </motion.div>
      </div>
    </div>
  );
}
