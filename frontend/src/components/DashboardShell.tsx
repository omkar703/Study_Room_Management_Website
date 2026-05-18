"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  CreditCard, 
  Settings, 
  Search, 
  Bell, 
  Sparkles, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";
import { AuroraBackground } from "./Shared";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Floorplan", href: "/dashboard/floorplan", icon: Map },
  { name: "Students", href: "/dashboard/students", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 selection:text-primary flex bg-white relative overflow-hidden text-foreground">
      <AuroraBackground />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-40 border-r border-white/50 bg-white/40 backdrop-blur-3xl shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white font-display font-bold shadow-md shadow-primary/20">
            S
          </div>
          <span className="font-display font-bold tracking-tight">
            Sage<span className="text-text-tertiary">.os</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="relative block">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/80 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-white"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 z-10 ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-foreground hover:bg-white/40"
                }`}>
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-text-tertiary"}`} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-cyan-50/50 border border-white shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Sage AI</p>
              <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Active</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary font-medium leading-relaxed">
            3 subscriptions expiring this week.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative z-10">
        
        {/* Top Navigation */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-8 border-b border-white/40 bg-white/30 backdrop-blur-2xl sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-foreground rounded-lg hover:bg-white/50 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 shadow-sm backdrop-blur-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all w-64">
              <Search className="w-4 h-4 text-text-tertiary" />
              <input 
                type="text" 
                placeholder="Search students, desks..." 
                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-text-tertiary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 text-text-secondary hover:text-foreground rounded-full hover:bg-white/50 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            </button>
            <div className="h-8 w-px bg-surface-border mx-1 hidden sm:block" />
            <button className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full hover:bg-white/50 transition-colors border border-transparent hover:border-white/60">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-7 h-7 rounded-full border border-white shadow-sm"
              />
              <span className="text-sm font-semibold hidden sm:block">Admin</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-3xl z-50 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-4 flex justify-between items-center border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white font-display font-bold shadow-md shadow-primary/20">
                    S
                  </div>
                  <span className="font-display font-bold tracking-tight">Sage.os</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text-secondary hover:text-foreground bg-slate-100 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-slate-50 hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
