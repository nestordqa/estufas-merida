"use client";

import { useEffect, useRef } from "react";

type Ember = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number; hue: number };

/** Chispas de fundición subiendo, en canvas para que sea liviano. */
export function Embers({ className, density = 70 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 768 ? Math.round(density * 0.5) : density;

    const spawn = (initial = false): Ember => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      r: Math.random() * 1.8 + 0.6,
      vy: Math.random() * 0.9 + 0.35,
      vx: (Math.random() - 0.5) * 0.4,
      life: 0,
      max: Math.random() * 380 + 220,
      hue: Math.random() * 30 + 18,
    });

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const embers = Array.from({ length: count }, () => spawn(true));

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;
        e.y -= e.vy;
        e.x += e.vx + Math.sin((e.life + i * 13) / 28) * 0.35;
        const fade = Math.sin((e.life / e.max) * Math.PI);
        if (e.life > e.max || e.y < -10) {
          embers[i] = spawn();
          continue;
        }
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        glow.addColorStop(0, `hsla(${e.hue + 15}, 100%, 75%, ${fade})`);
        glow.addColorStop(0.4, `hsla(${e.hue}, 100%, 55%, ${fade * 0.6})`);
        glow.addColorStop(1, `hsla(${e.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    tick();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className ?? ""}`} aria-hidden="true" />;
}
