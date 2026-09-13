'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function MistCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system: thermal mist vapors
    const particles: Particle[] = [];
    const maxParticles = 45;
    const colors = [
      'rgba(245, 235, 215, ', // warm amber steam
      'rgba(180, 215, 210, ', // glacial mineral mist
      'rgba(212, 175, 55, ',  // subtle gold dust
    ];

    const createParticle = (x?: number, y?: number): Particle => {
      const maxLife = 160 + Math.random() * 200;
      return {
        x: x !== undefined ? x : Math.random() * width,
        y: y !== undefined ? y : Math.random() * height,
        radius: 40 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5, // gentle upwards rise like thermal steam
        alpha: 0,
        maxAlpha: 0.04 + Math.random() * 0.05,
        life: 0,
        maxLife,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    // Mouse interactivity
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 150);

      // Add gentle interactive puff
      if (Math.random() > 0.6 && particles.length < maxParticles + 15) {
        particles.push(createParticle(mouseX + (Math.random() - 0.5) * 40, mouseY + (Math.random() - 0.5) * 40));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Fade in then fade out
        if (p.life < p.maxLife * 0.3) {
          p.alpha = (p.life / (p.maxLife * 0.3)) * p.maxAlpha;
        } else {
          p.alpha = (1 - (p.life - p.maxLife * 0.3) / (p.maxLife * 0.7)) * p.maxAlpha;
        }

        // Swirl interaction towards/away from mouse
        if (isMouseMoving) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Reset dead particle
        if (p.life >= p.maxLife || p.y < -p.radius || p.x < -p.radius || p.x > width + p.radius) {
          particles[i] = createParticle(Math.random() * width, height + p.radius);
          continue;
        }

        // Draw radial mist gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(0.6, `${p.color}${p.alpha * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        mixBlendMode: 'screen',
      }}
    />
  );
}
