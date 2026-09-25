"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 8000 : 25000;
    const heroStarCount = isMobile ? 400 : 1200;
    const nebulaCount = isMobile ? 800 : 2400;

    // 1. Scene & Deep Space Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020309, 0.003);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1400
    );
    camera.position.z = 35;
    let targetCameraZ = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Helper: Soft circular star texture
    const createCircleStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    // Helper: Soft nebula cloud particle texture
    const createNebulaTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createCircleStarTexture();
    const nebulaTexture = createNebulaTexture();

    // 2. Primary Deep Space Starfield (High Density + Spectral Color Tinting)
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starPalette = [
      new THREE.Color(0xffffff), // Diamond White
      new THREE.Color(0xffffff), // White accent
      new THREE.Color(0x00f0ff), // Cyan shimmer
      new THREE.Color(0xccff00), // Lime accent
      new THREE.Color(0xa78bfa), // Soft purple shimmer
      new THREE.Color(0x93c5fd), // Soft sky blue
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPositions[idx] = (Math.random() - 0.5) * 350;
      starPositions[idx + 1] = (Math.random() - 0.5) * 350;
      starPositions[idx + 2] = (Math.random() - 0.5) * 700;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.45 : 0.65,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 3. Foreground Hero Bright Floating Stars (Larger & Shimmering)
    const heroStarGeo = new THREE.BufferGeometry();
    const heroStarPositions = new Float32Array(heroStarCount * 3);
    const heroStarColors = new Float32Array(heroStarCount * 3);

    for (let i = 0; i < heroStarCount; i++) {
      const idx = i * 3;
      heroStarPositions[idx] = (Math.random() - 0.5) * 280;
      heroStarPositions[idx + 1] = (Math.random() - 0.5) * 280;
      heroStarPositions[idx + 2] = (Math.random() - 0.5) * 450;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      heroStarColors[idx] = col.r;
      heroStarColors[idx + 1] = col.g;
      heroStarColors[idx + 2] = col.b;
    }

    heroStarGeo.setAttribute('position', new THREE.BufferAttribute(heroStarPositions, 3));
    heroStarGeo.setAttribute('color', new THREE.BufferAttribute(heroStarColors, 3));

    const heroStarMat = new THREE.PointsMaterial({
      size: isMobile ? 1.1 : 1.7,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const heroStarField = new THREE.Points(heroStarGeo, heroStarMat);
    scene.add(heroStarField);

    // 4. Ambient Cosmic Nebulae / Dust Clouds
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    const nebulaPalette = [
      new THREE.Color(0xa78bfa), // Violet
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xccff00), // Lime accent
      new THREE.Color(0x3b82f6), // Deep blue
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const idx = i * 3;
      nebulaPositions[idx] = (Math.random() - 0.5) * 380;
      nebulaPositions[idx + 1] = (Math.random() - 0.5) * 380;
      nebulaPositions[idx + 2] = (Math.random() - 0.5) * 750;

      const col = nebulaPalette[Math.floor(Math.random() * nebulaPalette.length)];
      nebulaColors[idx] = col.r;
      nebulaColors[idx + 1] = col.g;
      nebulaColors[idx + 2] = col.b;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMat = new THREE.PointsMaterial({
      size: isMobile ? 2.8 : 5.0,
      map: nebulaTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebulaField = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaField);

    // Mouse & Scroll Progress Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0006;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0006;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = window.scrollY / maxScroll;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Main Render Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth initial camera zoom entrance
      camera.position.z += (targetCameraZ - camera.position.z) * 0.025;

      // Mouse parallax smooth damping
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;
      camera.rotation.y = -targetX;
      camera.rotation.x = -targetY;

      // Smooth scroll progress interpolation matching section flight distance
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

      // Synchronized deep space travel Z-offset using 3D particle group translation
      const spaceTravelOffset = currentScrollProgress * 500;
      starField.position.z = spaceTravelOffset % 400;
      heroStarField.position.z = (spaceTravelOffset * 1.3) % 400;
      nebulaField.position.z = spaceTravelOffset % 400;

      // Continuous gentle ambient rotations for depth
      starField.rotation.y += 0.00018;
      starField.rotation.x += 0.00009;
      heroStarField.rotation.y -= 0.00035;
      heroStarField.rotation.x += 0.00015;
      nebulaField.rotation.y -= 0.00012;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      starGeo.dispose();
      starMat.dispose();
      heroStarGeo.dispose();
      heroStarMat.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      starTexture.dispose();
      nebulaTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-100 transition-opacity duration-1000 bg-gradient-to-b from-[#020309] via-[#050816] to-[#020309]"
    />
  );
}
