"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 sm:px-12 border-t border-white/5 bg-[#070708] font-mono text-xs text-[#888890]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[#f4f4f5] font-bold">
            &copy; {new Date().getFullYear()} SHA ILESH JAISWAL
          </p>
          <p className="text-[10px] text-[#888890] mt-1">
            CRAFTED WITH NEXT.JS, GSAP, THREE.JS & LENIS SMOOTH SCROLL
          </p>
        </div>

        <div className="flex items-center gap-8 text-xs">
          <a
            href="https://github.com/shailjaiswal9135"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ccff00] transition-colors"
            data-cursor="GITHUB"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/shailjaiswal9135"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ccff00] transition-colors"
            data-cursor="LINKEDIN"
          >
            LINKEDIN
          </a>
          <a
            href="https://leetcode.com/shailjaiswal9135"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ccff00] transition-colors"
            data-cursor="LEETCODE"
          >
            LEETCODE
          </a>
          <a
            href="https://hackerrank.com/shailjaiswal9135"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ccff00] transition-colors"
            data-cursor="HACKERRANK"
          >
            HACKERRANK
          </a>
        </div>
      </div>
    </footer>
  );
}
