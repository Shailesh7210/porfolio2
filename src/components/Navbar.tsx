"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSpatialSection } from '@/lib/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [activeNav, setActiveNav] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // Listen for active section changes from SpatialDeck
    const handleSectionChange = (e: any) => {
      const id = e.detail?.activeId;
      if (id) {
        if (id.startsWith('project')) {
          setActiveNav('projects');
        } else {
          setActiveNav(id);
        }
      }
    };

    window.addEventListener('spatialSectionChange', handleSectionChange as any);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('spatialSectionChange', handleSectionChange as any);
      clearInterval(timer);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSpatialSection(id);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'about' },
    { id: 'skills', label: 'skills' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'services', label: 'services' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#070708]/90 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
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

        {/* Desktop Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-colors relative py-1 group ${
                  isActive ? 'text-[#ccff00] font-bold' : 'text-[#888890] hover:text-[#ccff00]'
                }`}
                data-cursor="NAV"
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#ccff00] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            );
          })}
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-flex px-5 py-2 rounded-full border border-white/15 bg-white/5 hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black font-mono text-xs font-bold uppercase transition-all duration-300"
            data-cursor="HIRE"
          >
            LET&apos;S TALK
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-[#f4f4f5] hover:text-[#ccff00] transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 mt-4 pt-4 pb-6 px-4 space-y-4 font-mono text-sm uppercase bg-[#070708]/95 backdrop-blur-2xl rounded-2xl"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block py-2 px-4 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#ccff00]/10 text-[#ccff00] font-bold border border-[#ccff00]/30'
                      : 'text-[#888890] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="block w-full py-3 text-center rounded-xl bg-[#ccff00] text-black font-bold uppercase tracking-wider mt-4"
            >
              LET&apos;S TALK
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
