"use client";

import React, { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { AuthInput } from "@/components/AuthInput";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function SignupPage() {
  const [password, setPassword] = useState("");
  
  // Simple password strength calculation for demo
  const getStrength = (pass: string) => {
    if (!pass) return -1;
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return Math.min(strength, 4);
  };

  const strength = getStrength(password);
  const strengthColors = ["bg-rose-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500", "bg-emerald-500"];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Join the next generation of spatial workspace management."
    >
      <motion.form 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.div variants={item}>
          <AuthInput 
            label="Full Name"
            type="text"
            icon={User}
            id="name"
            required
          />
        </motion.div>

        <motion.div variants={item}>
          <AuthInput 
            label="Email Address"
            type="email"
            icon={Mail}
            id="email"
            required
          />
        </motion.div>
        
        <motion.div variants={item} className="mb-2">
          <AuthInput 
            label="Password"
            type="password"
            icon={Lock}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </motion.div>

        {/* Password Strength Indicator */}
        <motion.div variants={item} className="mb-6 px-1">
          <div className="flex items-center gap-2 mb-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="h-1 flex-1 rounded-full bg-slate-200 overflow-hidden">
                <motion.div 
                  initial={false}
                  animate={{ 
                    width: strength > index ? "100%" : "0%",
                    backgroundColor: strength > 0 ? (
                      strengthColors[strength] === "bg-rose-500" ? "#f43f5e" :
                      strengthColors[strength] === "bg-amber-500" ? "#f59e0b" :
                      strengthColors[strength] === "bg-yellow-400" ? "#facc15" :
                      "#10b981"
                    ) : "#e2e8f0"
                  }}
                  className="h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-text-tertiary">Password strength</span>
            <span className={strength >= 0 ? strengthColors[strength].replace('bg-', 'text-') : 'text-text-tertiary'}>
              {strength >= 0 ? strengthLabels[strength] : "None"}
            </span>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <AuthInput 
            label="Confirm Password"
            type="password"
            icon={ShieldCheck}
            id="confirm-password"
            required
          />
        </motion.div>

        <motion.div variants={item}>
          <button className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-foreground hover:bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-foreground/10 hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden">
            <span className="relative z-10">Create Account</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </motion.div>
        
        <motion.p variants={item} className="mt-8 text-center text-sm text-text-secondary font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-indigo-700 font-bold transition-colors">
            Sign in
          </Link>
        </motion.p>
      </motion.form>
    </AuthLayout>
  );
}
