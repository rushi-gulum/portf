'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
}

export function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const NODE_COUNT_BASE = 50;
    const PARTICLE_COUNT = 40;
    const CONNECTION_DISTANCE = 200;
    const MOUSE_INFLUENCE_RADIUS = 250;
    const CYAN = '6, 182, 212';
    const PURPLE = '168, 85, 247';

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      const count = Math.min(NODE_COUNT_BASE, Math.floor((width * height) / 25000));
      const nodes: Node[] = [];
      for (let i = 0; i < count; i++) {
        const useCyan = Math.random() > 0.4;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 1.5 + Math.random() * 2,
          color: useCyan ? CYAN : PURPLE,
          alpha: 0.2 + Math.random() * 0.4,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = nodes;
    }

    function initParticles() {
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.1 - Math.random() * 0.25,
          radius: 0.5 + Math.random() * 1,
          alpha: 0,
          alphaSpeed: 0.003 + Math.random() * 0.005,
        });
      }
      particlesRef.current = particles;
    }

    function drawCenterGlow() {
      if (!ctx) return;
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.5
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
      gradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.015)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawConnections() {
      if (!ctx) return;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;

            // Mouse proximity boost
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseDist = Math.sqrt(
              (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
            );
            const mouseBoost =
              mouseDist < MOUSE_INFLUENCE_RADIUS
                ? (1 - mouseDist / MOUSE_INFLUENCE_RADIUS) * 0.15
                : 0;

            const useCyan = nodes[i].color === CYAN;
            const color = useCyan ? CYAN : PURPLE;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${color}, ${alpha + mouseBoost})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function drawNodes() {
      if (!ctx) return;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const time = timeRef.current;

      for (const node of nodes) {
        const mouseDist = Math.sqrt(
          (node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2
        );
        const mouseFactor =
          mouseDist < MOUSE_INFLUENCE_RADIUS
            ? 1 - mouseDist / MOUSE_INFLUENCE_RADIUS
            : 0;

        // Pulse
        const pulse = Math.sin(time * 0.002 + node.pulseOffset) * 0.5 + 0.5;
        const currentAlpha = node.alpha + pulse * 0.15 + mouseFactor * 0.3;
        const currentRadius = node.radius + pulse * 0.5 + mouseFactor * 1.5;

        // Glow
        if (mouseFactor > 0.1) {
          const glowRadius = currentRadius * 6;
          const glow = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowRadius
          );
          glow.addColorStop(0, `rgba(${node.color}, ${mouseFactor * 0.15})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(
            node.x - glowRadius,
            node.y - glowRadius,
            glowRadius * 2,
            glowRadius * 2
          );
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${currentAlpha})`;
        ctx.fill();
      }
    }

    function drawParticles() {
      if (!ctx) return;
      const particles = particlesRef.current;

      for (const p of particles) {
        // Fade in and out
        if (p.alpha < 0.3) {
          p.alpha = Math.min(p.alpha + p.alphaSpeed, 0.3);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN}, ${p.alpha})`;
        ctx.fill();
      }
    }

    function updateNodes() {
      const nodes = nodesRef.current;
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Subtle mouse attraction
        const mouse = mouseRef.current;
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * 0.003;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Damping
        node.vx *= 0.998;
        node.vy *= 0.998;

        // Boundaries - wrap around
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }
    }

    function updateParticles() {
      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Reset if out of bounds
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.alpha = 0;
        }
      }
    }

    function animate() {
      if (!ctx) return;
      timeRef.current++;

      ctx.clearRect(0, 0, width, height);

      drawCenterGlow();
      drawParticles();
      drawConnections();
      drawNodes();

      updateNodes();
      updateParticles();

      frameRef.current = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    initNodes();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
      initParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}