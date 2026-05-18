"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

export function AuthInput({ label, icon: Icon, ...props }: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  // Need to track value to keep label floated if there's text
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    if (props.onChange) props.onChange(e);
  };

  const isFloated = isFocused || hasValue;

  return (
    <div className="relative mb-5 group">
      <div 
        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent-cyan/20 blur-md transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
      />
      <div 
        className={`relative flex items-center w-full rounded-xl border transition-colors duration-300 overflow-hidden bg-white/50 backdrop-blur-sm ${
          isFocused ? 'border-primary shadow-[0_0_0_4px_rgba(79,70,229,0.1)]' : 'border-surface-border group-hover:border-slate-300'
        }`}
      >
        <div className="pl-4 pr-3 py-4 flex items-center justify-center text-text-tertiary transition-colors duration-300">
          <Icon className={`w-5 h-5 ${isFocused ? 'text-primary' : ''}`} />
        </div>
        <div className="relative flex-1">
          <motion.label
            initial={false}
            animate={{
              y: isFloated ? -12 : 0,
              scale: isFloated ? 0.75 : 1,
              color: isFocused ? '#4f46e5' : '#64748b'
            }}
            transition={{ duration: 0.2, type: "tween", ease: "easeOut" }}
            className="absolute left-0 top-3.5 origin-left pointer-events-none font-medium text-text-secondary"
          >
            {label}
          </motion.label>
          <input
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`w-full bg-transparent outline-none pt-6 pb-2 pr-4 text-foreground font-medium text-sm transition-opacity duration-200 ${isFloated ? 'opacity-100' : 'opacity-0'}`}
            placeholder="" // placeholder handled by label animation
          />
        </div>
      </div>
    </div>
  );
}
