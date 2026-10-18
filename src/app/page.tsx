"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Users, Layers, Zap, ChevronRight, BarChart3, ShieldCheck, Box, Grid, Play } from "lucide-react";
import Link from "next/link";
import { PremiumRoomScene } from "@/components/RoomScene";
import { AuroraBackground, Room3DCanvas, StudyRoomLogo } from "@/components/Shared";
import { Blueprint2D, BlueprintSmartModal } from "@/components/Blueprint2D";
import { SeatData, SeatStatus } from "@/components/MassiveRoomScene";
import type { Variants } from "framer-motion";

// ─── Shared fade-up variant ───────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as any } },
};

// ─── Navbar ───────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/75 backdrop-blur-xl border-b border-surface-border shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <StudyRoomLogo />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Sage<span className="text-text-tertiary">.os</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          {["Platform", "Visualization"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <Link href="/login" className="hidden md:block text-sm font-medium text-text-secondary hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold bg-foreground text-white rounded-full hover:bg-primary transition-colors shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 duration-200">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 w-full relative z-10">

      {/* LEFT — Copy */}
      <motion.div
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="flex flex-col items-start gap-7 lg:pt-16"
      >
        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-7xl xl:text-8xl font-display font-bold leading-[1.05] tracking-tight text-foreground"
        >
          Spatial <br />
          <span className="text-gradient">Intelligence</span>
          <br />for Spaces.
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed font-light">
          Manage physical study rooms like digital assets — real-time telemetry, visual seat allocation, and seamless subscription orchestration.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <Link href="/signup" className="group px-8 py-4 rounded-full bg-foreground text-white font-semibold flex items-center gap-2 hover:bg-primary transition-all duration-300 shadow-xl shadow-foreground/10 hover:shadow-primary/30 transform hover:-translate-y-1">
            Start Building
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="group px-8 py-4 rounded-full glass-panel text-foreground font-semibold hover:bg-white transition-all flex items-center gap-2">
            <Play className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            Watch Demo
          </button>
        </motion.div>

        {/* Stat pills */}
        <motion.div variants={fadeUp} className="flex gap-4 flex-wrap mt-2">
          {[
            { val: "500+", label: "Study Rooms" },
            { val: "99.9%", label: "Uptime" },
            { val: "12k+", label: "Active Seats" },
          ].map((s) => (
            <div key={s.label} className="glass-panel px-5 py-3 rounded-2xl flex items-baseline gap-2">
              <span className="text-xl font-display font-bold text-primary">{s.val}</span>
              <span className="text-xs text-text-secondary font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT — 3D Scene */}
      <div className="relative w-full" style={{ minHeight: 520 }}>
        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
          className="absolute top-10 right-0 lg:-right-4 z-20 glass-panel p-4 rounded-2xl flex items-center gap-4 shadow-xl"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center text-primary">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-text-tertiary font-semibold uppercase tracking-widest mb-0.5">Live Occupancy</p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-2xl font-bold text-foreground font-display">92%</p>
              <p className="text-xs text-accent-emerald font-semibold">+4% today</p>
            </div>
          </div>
        </motion.div>

        {/* 3D Canvas — must have explicit pixel height */}
        <div style={{ width: "100%", height: 560 }}>
          <Suspense fallback={
            <div style={{ width: "100%", height: 560 }} className="flex items-center justify-center text-text-tertiary text-sm">
              Loading 3D scene…
            </div>
          }>
            <Room3DCanvas autoRotate />
          </Suspense>
        </div>
      </div>
    </div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────
const FEATURES = [
  { title: "Spatial Telemetry", desc: "Monitor desk-level occupancy in real-time with zero-latency sync.", icon: Zap },
  { title: "Visual Allocation", desc: "Place students on physical nodes directly from the interactive floorplan.", icon: Layers },
  { title: "Revenue Automation", desc: "Self-healing subscription cycles that auto-revoke access on expiry.", icon: ShieldCheck },
  { title: "Frictionless Onboarding", desc: "Consumer-grade checkout that converts visitors to active members.", icon: Users },
];

const Features = () => (
  <section id="platform" className="py-32 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="mb-20"
      >
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-5 tracking-tight text-foreground">
          Engineering <span className="text-gradient">Elegance.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-text-secondary text-xl font-light max-w-lg">
          Every interaction is designed to feel instantaneous and visually stunning.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-panel p-10 rounded-[2rem] group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="w-14 h-14 rounded-2xl bg-white border border-surface-border flex items-center justify-center text-primary mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-foreground tracking-tight">{f.title}</h3>
              <p className="text-text-secondary text-lg font-light leading-relaxed relative z-10">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Spatial Preview (2D / 3D toggle) ────────────────────────────
const generateSeats = (): SeatData[] => {
  const seats: SeatData[] = [];
  const zones = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 20; col++) {
      const rand = Math.random();
      let status: SeatStatus = "available";
      if (rand > 0.8) status = "occupied";
      else if (rand > 0.75) status = "expiring";

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

const SpatialPreview = () => {
  const [mode, setMode] = useState<"3d" | "2d">("3d");
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const seats = useMemo(() => generateSeats(), []);
  
  const selectedSeat = seats.find(s => s.id === selectedSeatId) || null;

  return (
    <section id="visualization" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-foreground">
              Digital <span className="text-gradient-subtle">Twin.</span>
            </h2>
            <p className="text-text-secondary text-xl font-light">
              Switch between high-fidelity 3D rendering and fast operational 2D layout.
            </p>
          </div>
          <div className="flex bg-white/60 backdrop-blur-md rounded-full p-1 border border-surface-border shadow-sm shrink-0">
            {(["3d", "2d"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMode(v)}
                className={`px-7 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  mode === v ? "bg-white shadow-md text-foreground" : "text-text-secondary hover:text-foreground"
                }`}
              >
                {v === "3d" ? "3D Spatial" : "2D Layout"}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="w-full aspect-video rounded-[2rem] border border-white/80 bg-white/40 backdrop-blur-2xl overflow-hidden relative shadow-[0_16px_60px_-15px_rgba(0,0,0,0.06)]"
        >
          {mode === "3d" ? (
            <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
              {/* 3D Legend */}
              <div className="absolute top-5 left-5 flex gap-3 z-10 pointer-events-none">
                {[
                  { color: "bg-slate-300", label: "Vacant" },
                  { color: "bg-primary", label: "Occupied" },
                ].map((l) => (
                  <div key={l.label} className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 pointer-events-auto">
                    <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{l.label}</span>
                  </div>
                ))}
              </div>

              <Suspense fallback={null}>
                <Canvas shadows camera={{ position: [0, 10, 9], fov: 32 }}>
                  <PremiumRoomScene autoRotate={false} />
                  <OrbitControls enableDamping dampingFactor={0.06} maxPolarAngle={Math.PI / 2.05} />
                </Canvas>
              </Suspense>
            </div>
          ) : (
            <div className="w-full h-full relative overflow-hidden">
               <Blueprint2D seats={seats} selectedId={selectedSeatId} onSelect={setSelectedSeatId} />
               <BlueprintSmartModal selectedSeat={selectedSeat} onClose={() => setSelectedSeatId(null)} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Dashboard Mockup ─────────────────────────────────────────────
const Dashboard = () => (
  <section className="py-32 relative z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-5 tracking-tight text-foreground">The Command Center</h2>
      <p className="text-text-secondary max-w-2xl mx-auto text-xl font-light">Absolute clarity over every seat, student, and subscription.</p>
    </div>

    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ rotateX: 14, y: 80, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, type: "spring", bounce: 0.12 }}
        style={{ perspective: 1800 }}
        className="w-full aspect-[16/10] rounded-[1.75rem] bg-white/75 backdrop-blur-3xl border border-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col"
      >
        {/* Title bar */}
        <div className="h-12 border-b border-surface-border flex items-center px-5 justify-between bg-white/60">
          <div className="flex gap-2">
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
            <Grid className="w-3 h-3" /> sage.os — dashboard
          </span>
          <div className="w-16" />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-56 border-r border-surface-border p-4 flex flex-col gap-1.5 bg-slate-50/60 shrink-0">
            {[
              { label: "Overview", icon: BarChart3, active: true },
              { label: "Students", icon: Users, active: false },
              { label: "Floorplan", icon: Box, active: false },
              { label: "Billing", icon: ShieldCheck, active: false },
            ].map(({ label, icon: Icon, active }) => (
              <div key={label} className={`py-2 px-3 rounded-xl text-sm flex items-center gap-3 transition-colors ${active ? "bg-white shadow-sm border border-surface-border font-semibold text-primary" : "font-medium text-text-secondary hover:bg-slate-100 cursor-pointer"}`}>
                <Icon className="w-4 h-4" /> {label}
              </div>
            ))}
          </aside>

          {/* Main */}
          <main className="flex-1 p-8 flex flex-col gap-7 bg-white/30 overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Overview</h3>
                <p className="text-sm text-text-secondary mt-0.5">Friday, May 16</p>
              </div>
              <button className="px-4 py-2 bg-foreground text-white text-sm font-semibold rounded-xl">Add Student</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: "Total Revenue", val: "$24,500", trend: "+12% MoM", color: "text-foreground" },
                { label: "Active Seats", val: "142 / 160", trend: "88% full", color: "text-primary" },
                { label: "Expiring Soon", val: "8 subs", trend: "This week", color: "text-amber-500" },
              ].map((s) => (
                <div key={s.label} className="p-5 rounded-2xl border border-surface-border bg-white/80 shadow-sm flex flex-col gap-1.5 relative overflow-hidden">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">{s.label}</span>
                  <span className={`text-2xl font-display font-bold ${s.color}`}>{s.val}</span>
                  <span className="text-xs text-text-tertiary">{s.trend}</span>
                  <div className="absolute right-0 bottom-0 w-16 h-16 bg-gradient-to-tl from-slate-100/80 to-transparent rounded-tl-full" />
                </div>
              ))}
            </div>

            {/* Activity */}
            <div className="flex-1 border border-surface-border rounded-2xl bg-white/70 p-6 flex flex-col overflow-hidden">
              <div className="flex gap-6 border-b border-surface-border mb-5 shrink-0">
                <span className="pb-3 text-sm font-bold text-foreground border-b-2 border-primary">Live Activity</span>
                <span className="pb-3 text-sm font-medium text-text-tertiary cursor-pointer hover:text-foreground">Analytics</span>
              </div>
              <div className="flex flex-col gap-2.5 overflow-hidden">
                {["Priya Sharma → Desk A-3", "Arjun Mehta → Desk B-1", "Sara Lee → Desk A-6"].map((entry) => (
                  <div key={entry} className="flex justify-between items-center p-3.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 border border-white shadow-sm flex items-center justify-center text-primary font-bold text-xs">
                        {entry[0]}
                      </div>
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{entry}</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── CTA ──────────────────────────────────────────────────────────
const CTA = () => (
  <section className="py-40 relative z-10 text-center overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/10 to-accent-cyan/10 rounded-full blur-[90px] -z-10" />
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-foreground tracking-tight leading-tight">
          Ready to Elevate<br />Your Space?
        </h2>
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-light">
          Join the next generation of premium study spaces powered by Sage OS.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/signup" className="px-10 py-4 rounded-full bg-foreground text-white font-bold text-lg hover:bg-primary hover:shadow-[0_0_40px_rgba(79,70,229,0.35)] transition-all duration-300 transform hover:-translate-y-1">
            Start Free
          </Link>
          <button className="px-10 py-4 rounded-full glass-panel text-foreground font-bold text-lg hover:bg-white transition-colors border border-surface-border">
            Book a Demo
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────
const Footer = () => (
  <footer className="relative z-10 border-t border-surface-border bg-white/50 backdrop-blur-xl pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
      <div className="flex flex-col gap-5 max-w-xs">
        <div className="flex items-center gap-2.5">
          <StudyRoomLogo />
          <span className="font-display text-xl font-bold text-foreground tracking-tight">Sage.os</span>
        </div>
        <p className="text-sm text-text-secondary font-light leading-relaxed">
          The spatial operating system for the next generation of physical study spaces.
        </p>
      </div>
      {[
        { heading: "Platform", links: ["Features", "Visualization", "Pricing"] },
        { heading: "Company", links: ["About", "Blog", "Contact"] },
        { heading: "Legal", links: ["Privacy", "Terms"] },
      ].map(({ heading, links }) => (
        <div key={heading}>
          <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wide">{heading}</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-text-secondary font-medium">
            {links.map((l) => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-surface-border text-sm text-text-tertiary font-medium">
      <p>© 2026 Sage OS Inc. All rights reserved.</p>
      <div className="flex gap-8">
        {["Twitter", "LinkedIn", "GitHub"].map((s) => (
          <a key={s} href="#" className="hover:text-foreground transition-colors">{s}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── Root ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SpatialPreview />
        <Dashboard />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
