"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Update real-time IST clock (Bengaluru, India)
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(now.toLocaleTimeString('en-US', options) + ' IST');
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070708]/80 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          className="group flex items-center gap-3 font-mono text-sm tracking-wider uppercase font-bold text-[#f4f4f5]"
          data-cursor="HOME"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] group-hover:scale-150 transition-transform"></span>
          <span>SHA ILESH <span className="text-[#888890] font-normal">.DEV</span></span>
        </a>

        {/* Real-time Location & Status */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#888890]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
            </span>
            <span className="text-[#f4f4f5]">AVAILABLE FOR ROLES</span>
          </div>
          <span>•</span>
          <span>BENGALURU {timeString}</span>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-[#888890] uppercase">
          {['about', 'skills', 'projects', 'services', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => scrollToSection(e, item)}
              className="hover:text-[#ccff00] transition-colors relative py-1 group"
              data-cursor="NAV"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ccff00] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Quick Contact CTA */}
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          className="px-5 py-2 rounded-full border border-white/15 bg-white/5 hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black font-mono text-xs font-bold uppercase transition-all duration-300"
          data-cursor="HIRE"
        >
          LET&apos;S TALK
        </a>
      </div>
    </motion.header>
  );
}
