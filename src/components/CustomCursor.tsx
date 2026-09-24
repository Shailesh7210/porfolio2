"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch screen devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering over interactive element with data-cursor attribute or a clickable tag
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor], a, button, input, textarea');

      if (interactive) {
        setIsHovered(true);
        const attrText = interactive.getAttribute('data-cursor');
        if (attrText) {
          setCursorText(attrText);
        } else if (interactive.tagName === 'A') {
          setCursorText('OPEN');
        } else if (interactive.tagName === 'BUTTON') {
          setCursorText('CLICK');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full flex items-center justify-center font-mono text-[10px] font-bold tracking-wider uppercase text-black"
        animate={{
          x: position.x - (isHovered ? 36 : 14),
          y: position.y - (isHovered ? 36 : 14),
          width: isHovered ? 72 : 28,
          height: isHovered ? 72 : 28,
          backgroundColor: isHovered ? '#ccff00' : 'rgba(204, 255, 0, 0)',
          borderColor: isHovered ? '#ccff00' : 'rgba(255, 255, 255, 0.4)',
          borderWidth: isHovered ? 0 : 1.5,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      >
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="select-none text-black font-extrabold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none w-2 h-2 rounded-full bg-[#ccff00]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
        }}
      />
    </>
  );
}
