'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/data';
import { NeuralNetworkBg } from './neural-network-bg';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const STATUS_CARDS = [
  {
    label: 'Currently Building',
    value: personalInfo.currentlyBuilding,
    dotColor: 'bg-emerald-500',
    glowClass: 'breathe-glow-emerald',
  },
  {
    label: 'Latest Research',
    value: personalInfo.latestResearch,
    dotColor: 'bg-blue-500',
    glowClass: 'breathe-glow-blue',
  },
  {
    label: 'Latest Release',
    value: personalInfo.latestRelease,
    dotColor: 'bg-purple-500',
    glowClass: 'breathe-glow-purple',
  },
];

export function Hero() {
  const headingRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!headingRef.current) return;
    const rect = headingRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Max 5px displacement
    const dx = Math.max(-5, Math.min(5, ((e.clientX - cx) / rect.width) * 10));
    const dy = Math.max(-5, Math.min(5, ((e.clientY - cy) / rect.height) * 10));
    mouseX.set(dx);
    mouseY.set(dy);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section id="hero" className="radial-glow relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Neural network canvas background */}
      <NeuralNetworkBg />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6 md:pt-32"
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <Badge
            variant="outline"
            className="t-border-default bg-[var(--theme-hover)] px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <span className="status-dot mr-2 inline-block size-2" />
            {personalInfo.role}
          </Badge>
        </motion.div>

        {/* Heading with mouse parallax */}
        <motion.div
          ref={headingRef}
          variants={item}
          className="mb-4 text-center"
          style={{ x: springX, y: springY }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Building Production
            <span className="typing-cursor" />
          </h1>
        </motion.div>
        <motion.div
          variants={item}
          className="mb-6 text-center"
          style={{ x: springX, y: springY }}
        >
          <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI Systems
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mb-4 text-center text-sm font-medium tracking-widest text-muted-foreground uppercase sm:text-base"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={item}
          className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg md:mb-12"
        >
          {personalInfo.bio}
        </motion.p>

        {/* Status cards with breathing glow */}
        <motion.div
          variants={item}
          className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mb-12"
        >
          {STATUS_CARDS.map((card, i) => (
            <div
              key={card.label}
              className={`glass rounded-xl p-4 transition-colors hover:bg-[var(--theme-hover)] ${card.glowClass}`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span
                  className={`inline-block size-2 rounded-full ${card.dotColor} shadow-[0_0_8px_currentColor]`}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {card.label}
                </span>
              </div>
              <p className="truncate text-sm font-medium text-foreground">
                {card.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons with animated gradient borders */}
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <div className="cta-gradient-border rounded-lg">
            <Button
              size="lg"
              className="relative z-10 rounded-lg bg-cyan-500 text-foreground shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]"
              onClick={() => {
                const target = document.querySelector('#projects');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="cta-gradient-border-outline rounded-lg">
            <Button
              size="lg"
              variant="outline"
              className="relative z-10 rounded-lg t-border-default bg-transparent text-foreground hover:bg-[var(--theme-active)] hover:text-foreground"
              onClick={() => {
                const target = document.querySelector('#blog');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Read Blog
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="size-4" />
              GitHub
            </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}