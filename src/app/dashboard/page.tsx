"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  IndianRupee, 
  Users, 
  Armchair, 
  TrendingUp, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";
import { Room3DCanvas } from "@/components/Shared";

const stats = [
  { name: "Total Revenue", value: "₹1,24,500", change: "+12.5%", icon: IndianRupee, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Active Seats", value: "142 / 160", change: "88% full", icon: Armchair, color: "text-cyan-500", bg: "bg-cyan-50" },
  { name: "Expiring Soon", value: "8 subs", change: "This week", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Active Students", value: "128", change: "+4 this month", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
];

const activity = [
  { user: "Priya Sharma", action: "checked in to Desk A-3", time: "10 mins ago", status: "Active" },
  { user: "Arjun Mehta", action: "subscription renewed", time: "1 hour ago", status: "Paid" },
  { user: "Sara Lee", action: "checked out of Desk B-1", time: "2 hours ago", status: "Inactive" },
  { user: "Rahul Desai", action: "assigned to Desk A-6", time: "3 hours ago", status: "Active" },
];

export default function DashboardOverview() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold text-foreground tracking-tight mb-1">
            Overview
          </motion.h1>
          <motion.p variants={itemVariants} className="text-sm font-medium text-text-secondary">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>
        <motion.button variants={itemVariants} className="px-4 py-2.5 bg-foreground text-white text-sm font-semibold rounded-xl shadow-lg shadow-foreground/10 hover:shadow-primary/25 hover:bg-primary transition-all duration-300 transform hover:-translate-y-0.5">
          Add Student
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            variants={itemVariants}
            className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 border border-white/60 bg-white/40 backdrop-blur-xl"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 opacity-50" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-1">{stat.name}</p>
                <h3 className="text-2xl font-display font-bold text-foreground">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shadow-sm`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary relative z-10">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Live Floorplan Preview */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel rounded-[2rem] border border-white/60 shadow-sm bg-white/40 backdrop-blur-xl flex flex-col overflow-hidden min-h-[400px]">
          <div className="p-6 border-b border-white/50 flex justify-between items-center bg-white/20">
            <div>
              <h3 className="text-lg font-display font-bold text-foreground">Live Floorplan</h3>
              <p className="text-xs font-medium text-text-secondary">Real-time occupancy visualization</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full border border-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live</span>
            </div>
          </div>
          
          <div className="flex-1 relative bg-gradient-to-b from-transparent to-slate-50/50">
            {/* Fallback pattern for spatial depth */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            
            {/* 3D Scene embedded here */}
            <div className="absolute inset-0">
               <Room3DCanvas autoRotate={false} occupancy={[true, true, false, true, true, false]} />
            </div>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-[2rem] border border-white/60 shadow-sm bg-white/40 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-display font-bold text-foreground">Live Activity</h3>
            <button className="text-xs font-semibold text-primary hover:text-indigo-700 transition-colors flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors border border-transparent hover:border-white/40 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center text-primary font-bold text-xs shrink-0 shadow-sm">
                  {item.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.user}</p>
                  <p className="text-xs font-medium text-text-secondary truncate">{item.action}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 ${
                    item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                    item.status === 'Paid' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-text-tertiary font-medium block">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
