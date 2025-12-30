/** @format */
"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

type ColorKey =
  | "green"
  | "purple"
  | "red"
  | "blue"
  | "pink"
  | "yellow"
  | "orange";

interface ColorHSL {
  h: number;
  s: number;
  l: number;
}

const COLORS: Record<ColorKey, ColorHSL> = {
  green: { h: 152, s: 100, l: 50 },
  purple: { h: 277, s: 100, l: 50 },
  blue: { h: 190, s: 100, l: 50 },
  pink: { h: 320, s: 100, l: 60 },
  yellow: { h: 50, s: 100, l: 50 },
  red: { h: 0, s: 100, l: 50 },
  orange: { h: 25, s: 100, l: 50 },
};

class Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hue: number;

  constructor(x: number, y: number, hue: number = 0, maxRadius: number = 30) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = maxRadius;
    this.alpha = 0.5;
    this.hue = hue;
  }

  update() {
    this.radius += 1.5;
    this.alpha -= 0.015;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}

class Firework extends Ripple {
  vx: number;
  vy: number;

  constructor(x: number, y: number, hue: number) {
    super(x, y, hue, 0);
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  alpha: number;
  hueSpeed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 1;
    this.hueSpeed = Math.random() * 0.5 + 0.2;

    const colorKeys = Object.keys(COLORS) as ColorKey[];
    this.hue =
      COLORS[colorKeys[Math.floor(Math.random() * colorKeys.length)]].h;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update(mouse: Point, canvasWidth: number, canvasHeight: number) {
    this.hue = (this.hue + this.hueSpeed) % 360;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      this.vx += (dx / dist) * 0.05;
      this.vy += (dy / dist) * 0.05;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.98;
    this.vy *= 0.98;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
    ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let effects: (Ripple | Firework)[] = [];
    const mouse: Point = { x: -1000, y: -1000 };
    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from(
        { length: Math.min(Math.floor(window.innerWidth / 12), 100) },
        () =>
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
      );
    };

    const drawLines = () => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 15000) {
            const midHue = (particles[i].hue + particles[j].hue) / 2;
            const opacity = 0.2 - distSq / 15000;
            ctx.strokeStyle = `hsla(${midHue}, 100%, 50%, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(mouse, canvas.width, canvas.height);
        p.draw(ctx);
      });

      drawLines();

      effects = effects.filter((eff) => {
        eff.update();
        eff.draw(ctx);
        return eff.alpha > 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (Math.random() > 0.85) {
        effects.push(new Ripple(mouse.x, mouse.y, Math.random() * 360));
      }
    };

    const handleClick = (e: MouseEvent) => {
      effects.push(new Ripple(e.clientX, e.clientY, Math.random() * 360, 100));
      for (let i = 0; i < 15; i++) {
        effects.push(new Firework(e.clientX, e.clientY, Math.random() * 360));
      }
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none opacity-50"
    />
  );
}
