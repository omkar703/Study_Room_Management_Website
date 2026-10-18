"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar, ShieldAlert } from "lucide-react";

const students = [
  { id: "STU-001", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 98765 43210", desk: "A-3", status: "Active", expiry: "2026-08-15" },
  { id: "STU-002", name: "Arjun Mehta", email: "arjun.m@example.com", phone: "+91 98765 43211", desk: "B-1", status: "Active", expiry: "2026-11-20" },
  { id: "STU-003", name: "Sara Lee", email: "sara.l@example.com", phone: "+91 98765 43212", desk: "A-6", status: "Expiring", expiry: "2026-05-20" },
  { id: "STU-004", name: "Rahul Desai", email: "rahul.d@example.com", phone: "+91 98765 43213", desk: "C-2", status: "Inactive", expiry: "2026-04-01" },
  { id: "STU-005", name: "Neha Gupta", email: "neha.g@example.com", phone: "+91 98765 43214", desk: "B-4", status: "Active", expiry: "2026-09-10" },
  { id: "STU-006", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 98765 43215", desk: "A-1", status: "Expiring", expiry: "2026-05-18" },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight mb-1">
            Student Management
          </h1>
          <p className="text-sm font-medium text-text-secondary">
            Manage subscriptions, assignments, and profiles.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all flex-1 sm:w-64">
            <Search className="w-4 h-4 text-text-tertiary" />
            <input 
              type="text" 
              placeholder="Search by name, ID or desk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-text-tertiary"
            />
          </div>
          <button className="p-2.5 glass-panel border-white/60 text-text-secondary hover:text-foreground rounded-xl transition-colors shadow-sm shrink-0">
            <Filter className="w-4 h-4" />
          </button>
          <button className="px-4 py-2.5 bg-foreground text-white text-sm font-semibold rounded-xl shadow-lg shadow-foreground/10 hover:shadow-primary/25 hover:bg-primary transition-all duration-300 transform hover:-translate-y-0.5 shrink-0">
            Add Student
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] border border-white/60 shadow-sm bg-white/40 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/50 bg-white/20">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Student</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Desk</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Expiry</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-white/30"
            >
              {students.map((student) => (
                <motion.tr 
                  variants={itemVariants}
                  key={student.id} 
                  className="group hover:bg-white/60 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center text-primary font-bold text-sm shadow-sm border border-white group-hover:scale-105 transition-transform">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{student.name}</div>
                        <div className="text-xs font-medium text-text-tertiary">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                      <Mail className="w-3.5 h-3.5 text-text-tertiary" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-text-tertiary">
                      <Phone className="w-3 h-3" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-white/80 border border-surface-border text-xs font-bold text-foreground shadow-sm">
                      {student.desk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                      student.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                      student.status === 'Expiring' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {student.status === 'Expiring' && <ShieldAlert className="w-3 h-3 mr-1" />}
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary">
                      <Calendar className="w-4 h-4 text-text-tertiary" />
                      {new Date(student.expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-white/80 text-text-tertiary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
