"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface SpatialDeckProps {
  sections: {
    id: string;
    label: string;
    component: React.ReactNode;
  }[];
}

export default function SpatialDeck({ sections }: SpatialDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || slideRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      const totalSlides = sections.length;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalSlides * 250}%`,
          pin: true,
          scrub: 0.6,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.3, max: 0.6 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (totalSlides - 1));
            setActiveIndex(idx);
          },
        },
      });

      // Initial state setup for 3D stack
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;
        if (i === 0) {
          gsap.set(slide, {
            opacity: 1,
            scale: 1,
            z: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
          });
        } else {
          gsap.set(slide, {
            opacity: 0,
            scale: 0.08,
            z: -2500,
            filter: 'blur(30px)',
            pointerEvents: 'none',
          });
        }
      });

      // Build 3D spatial zoom transitions for each slide step
      for (let i = 0; i < totalSlides - 1; i++) {
        const currentSlide = slideRefs.current[i];
        const nextSlide = slideRefs.current[i + 1];

        if (!currentSlide || !nextSlide) continue;

        // Step transition: current slide flies past camera, next slide zooms in from deep background
        timeline
          // 1. Current slide zooms forward into camera and disappears
          .to(
            currentSlide,
            {
              scale: 3.5,
              z: 1200,
              opacity: 0,
              filter: 'blur(25px)',
              pointerEvents: 'none',
              ease: 'power1.in',
            },
            `step-${i}`
          )
          // 2. Next slide flies in from deep space to screen center
          .to(
            nextSlide,
            {
              scale: 1,
              z: 0,
              opacity: 1,
              filter: 'blur(0px)',
              pointerEvents: 'auto',
              ease: 'power2.out',
            },
            `step-${i}`
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [sections]);

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const totalSlides = sections.length;
    const scrollTarget =
      containerRef.current.offsetTop +
      (index / (totalSlides - 1)) * (containerRef.current.offsetHeight * (totalSlides - 1));

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {/* 3D Spatial Viewport Container */}
      <div
        className="w-full h-full relative"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {sections.map((section, idx) => (
          <div
            key={section.id}
            ref={(el) => {
              slideRefs.current[idx] = el;
            }}
            id={section.id}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-16 lg:p-24 will-change-transform"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center">
              {section.component}
            </div>
          </div>
        ))}
      </div>

      {/* Side Spatial Flight Index Indicator */}
      <div className="fixed right-6 sm:right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 font-mono text-xs text-[#888890]">
        <div className="text-[#ccff00] font-bold text-sm">
          {activeIndex < 9 ? `0${activeIndex + 1}` : activeIndex + 1}
        </div>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <div
            className="w-full bg-[#ccff00] transition-all duration-300"
            style={{
              height: `${((activeIndex + 1) / sections.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="text-white/40">{sections.length < 10 ? `0${sections.length}` : sections.length}</div>

        {/* Slide Navigation Dots */}
        <div className="flex flex-col gap-2 mt-4">
          {sections.map((sec, i) => (
            <button
              key={sec.id}
              onClick={() => scrollToSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i
                  ? 'bg-[#ccff00] scale-125 shadow-lg shadow-[#ccff00]/60'
                  : 'bg-white/20 hover:bg-white/50'
              }`}
              title={sec.label}
              data-cursor={sec.id.toUpperCase()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
