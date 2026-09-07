"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Map scroll position to background layers shifting at different speeds
  const yGrid = useTransform(scrollY, [0, 4000], [0, -150]);
  const yGlow1 = useTransform(scrollY, [0, 4000], [0, -350]);
  const yGlow2 = useTransform(scrollY, [0, 4000], [0, -150]);
  const yGlow3 = useTransform(scrollY, [0, 4000], [0, -250]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gray-950">
      {/* Background Dot Grid (Shifting slowly upward) */}
      <motion.div 
        style={{ y: yGrid }}
        className="absolute inset-0 bg-dot-grid opacity-60"
      />

      {/* Layer 2: Deep Violet Glow (Upper Left) */}
      <motion.div 
        style={{ y: yGlow1 }}
        className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-slow"
      />

      {/* Layer 3: Neon Blue Glow (Middle Right) */}
      <motion.div 
        style={{ y: yGlow2 }}
        className="absolute top-[35%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[130px]"
      />

      {/* Layer 4: Emerald Green Glow (Lower Left) */}
      <motion.div 
        style={{ y: yGlow3 }}
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/8 blur-[120px]"
      />
    </div>
  );
}
