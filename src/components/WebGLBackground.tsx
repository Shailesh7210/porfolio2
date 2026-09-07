"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 4000 : 10000;
    const nebulaCount = isMobile ? 600 : 1800;

    // 1. Scene & Deep Space Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020309, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
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
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
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
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
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

    // 2. Primary Deep Space Starfield
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starOriginalZ = new Float32Array(starCount);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPositions[idx] = (Math.random() - 0.5) * 300;
      starPositions[idx + 1] = (Math.random() - 0.5) * 300;
      const zVal = (Math.random() - 0.5) * 600;
      starPositions[idx + 2] = zVal;
      starOriginalZ[i] = zVal;
      starSizes[i] = Math.random() * 0.45 + 0.2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.4 : 0.55,
      map: starTexture,
      transparent: true,
      opacity: 0.88,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 3. Ambient Cosmic Nebulae / Dust Clouds (Violet, Cyan, Warm Lime)
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    const palette = [
      new THREE.Color(0xa78bfa), // Violet
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xccff00), // Lime accent
      new THREE.Color(0x3b82f6), // Deep blue
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const idx = i * 3;
      nebulaPositions[idx] = (Math.random() - 0.5) * 350;
      nebulaPositions[idx + 1] = (Math.random() - 0.5) * 350;
      nebulaPositions[idx + 2] = (Math.random() - 0.5) * 700;

      const col = palette[Math.floor(Math.random() * palette.length)];
      nebulaColors[idx] = col.r;
      nebulaColors[idx + 1] = col.g;
      nebulaColors[idx + 2] = col.b;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMat = new THREE.PointsMaterial({
      size: isMobile ? 2.5 : 4.5,
      map: nebulaTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
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
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

      // Synchronized deep space travel Z-offset
      const spaceTravelOffset = currentScrollProgress * 550;

      // Continuous gentle ambient rotations
      starField.rotation.y += 0.00012;
      starField.rotation.x += 0.00006;
      nebulaField.rotation.y -= 0.00008;

      // Update Starfield Z Positions in direct sync with section scroll progress
      const starPosAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const starArr = starPosAttr.array as Float32Array;

      for (let i = 0; i < starCount; i++) {
        const zIdx = i * 3 + 2;
        // Combine base position, continuous ambient drift, and section travel offset
        let zPos = starOriginalZ[i] + spaceTravelOffset;

        // Wrap around infinite deep space boundaries cleanly
        while (zPos > 50) zPos -= 650;
        while (zPos < -600) zPos += 650;

        starArr[zIdx] = zPos;
      }
      starPosAttr.needsUpdate = true;

      // Update Nebulae Z Positions for multi-layered spatial depth
      const nebPosAttr = nebulaGeo.attributes.position as THREE.BufferAttribute;
      const nebArr = nebPosAttr.array as Float32Array;

      for (let i = 0; i < nebulaCount; i++) {
        const zIdx = i * 3 + 2;
        let zPos = nebArr[zIdx] + 0.03 + (targetScrollProgress - currentScrollProgress) * 15;
        if (zPos > 50) zPos = -650;
        nebArr[zIdx] = zPos;
      }
      nebPosAttr.needsUpdate = true;

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
