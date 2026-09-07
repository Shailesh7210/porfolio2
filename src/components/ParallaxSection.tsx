"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // positive moves faster, negative moves slower
  className?: string;
}

export default function ParallaxSection({ children, speed = 0.1, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Shift elements vertically based on target viewport enter/leave progress
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, -speed * 120]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
