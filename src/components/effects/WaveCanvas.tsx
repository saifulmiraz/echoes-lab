"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface WaveCanvasProps {
  className?: string;
}

/**
 * The studio's signature: a layered oscilloscope of sound waves that bend
 * toward the cursor, over a slow drift of signal particles. Canvas 2D keeps
 * the bundle light and the paint cheap; it pauses when the tab is hidden and
 * renders a single calm frame when the visitor prefers reduced motion.
 */
export default function WaveCanvas({ className }: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    // Cursor target + eased pointer, normalised 0..1.
    const target = { x: 0.5, y: 0.5 };
    const pointer = { x: 0.5, y: 0.5 };

    const waves = [
      { color: "255, 222, 56", amp: 0.16, freq: 1.6, speed: 0.6, weight: 1.5, phase: 0 },
      { color: "255, 222, 56", amp: 0.12, freq: 2.3, speed: -0.45, weight: 1.25, phase: 2 },
      { color: "255, 222, 56", amp: 0.09, freq: 3.1, speed: 0.34, weight: 1.0, phase: 4 },
    ];

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: Particle[] = [];

    const buildParticles = () => {
      const count = Math.round(Math.min(70, (width * height) / 24000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.4 + 0.1,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const drawWave = (t: number, lift: number) => {
      for (const w of waves) {
        ctx.beginPath();
        const mid = height * (0.5 + (pointer.y - 0.5) * 0.25);
        const amp = height * w.amp * (0.65 + lift * 0.7);
        const step = 6;
        for (let x = 0; x <= width; x += step) {
          const nx = x / width;
          const bend = Math.exp(-Math.pow((nx - pointer.x) * 3.2, 2)) * amp * 0.9;
          const y =
            mid +
            Math.sin(nx * Math.PI * 2 * w.freq + t * w.speed + w.phase) * amp +
            Math.sin(nx * Math.PI * 6 + t * w.speed * 1.7) * amp * 0.18 -
            bend;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(${w.color}, 0)`);
        grad.addColorStop(0.5, `rgba(${w.color}, 0.55)`);
        grad.addColorStop(1, `rgba(${w.color}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = w.weight;
        ctx.shadowColor = `rgba(${w.color}, 0.6)`;
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 163, 161, ${p.a})`;
        ctx.fill();
      }
    };

    let start = performance.now();
    const render = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;
      const lift = Math.hypot(target.x - 0.5, target.y - 0.5);
      ctx.clearRect(0, 0, width, height);
      drawParticles();
      drawWave(t, lift);
      raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      target.y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        start = performance.now();
        raf = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) {
      // One calm, static frame — no animation loop.
      ctx.clearRect(0, 0, width, height);
      drawParticles();
      drawWave(0, 0);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(render);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
