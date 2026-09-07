"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface FlightSectionProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // Initial Z-distance (e.g. -600)
}

export default function FlightSection({
  children,
  className = '',
  depth = -700,
}: FlightSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const el = containerRef.current;

      // 3D Z-Axis Open Space Flight Reveal Timeline
      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.25,
          z: depth,
          rotateX: 15,
          filter: 'blur(20px)',
          transformPerspective: 1200,
          transformOrigin: '50% 50%',
        },
        {
          opacity: 1,
          scale: 1,
          z: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 35%',
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [depth]);

  return (
    <div
      ref={containerRef}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
