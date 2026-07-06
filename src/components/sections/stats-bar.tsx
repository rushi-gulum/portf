'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Star, Layers, GitFork, Zap, Sparkles } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  target: number;
  suffix: string;
  color: string;
  bgColor: string;
  underlineClass: string;
  sparkleColor: string;
  customDisplay?: string;
}

const STATS: StatItem[] = [
  {
    icon: Clock,
    label: 'Years',
    target: 5,
    suffix: 'Years',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    underlineClass: 'stat-underline-cyan',
    sparkleColor: 'text-cyan-400',
  },
  {
    icon: Star,
    label: 'Stars',
    target: 50,
    suffix: 'Stars',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    underlineClass: 'stat-underline-yellow',
    sparkleColor: 'text-yellow-400',
  },
  {
    icon: Layers,
    label: 'Systems',
    target: 10,
    suffix: 'Systems',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    underlineClass: 'stat-underline-purple',
    sparkleColor: 'text-purple-400',
  },
  {
    icon: GitFork,
    label: 'Projects',
    target: 20,
    suffix: 'Projects',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    underlineClass: 'stat-underline-emerald',
    sparkleColor: 'text-emerald-400',
  },
  {
    icon: Zap,
    label: 'API Calls/Day',
    target: 1,
    suffix: 'API Calls/Day',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    underlineClass: 'stat-underline-orange',
    sparkleColor: 'text-orange-400',
    customDisplay: '1M+',
  },
];

function useCountUp(target: number, inView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let rafId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(easedProgress * target);

      setCount(currentValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [inView, target, duration]);

  return count;
}

function StatCard({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const count = useCountUp(stat.target, inView);
  const isCountingDone = inView && (stat.customDisplay ? true : count >= stat.target);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-3 flex h-10 w-10 items-center justify-center rounded-full">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bgColor}`}>
          <Icon className={`h-5 w-5 ${stat.color}`} />
        </div>
        {/* Sparkle indicator */}
        <Sparkles
          className={`stat-sparkle absolute -top-1.5 -right-1.5 size-3.5 ${stat.sparkleColor}`}
          style={{ animationDelay: `${index * 0.5}s` }}
        />
      </div>
      <div
        className={`stat-underline relative text-2xl font-bold text-white tabular-nums sm:text-3xl ${stat.underlineClass} ${isCountingDone ? 'active' : ''}`}
      >
        {stat.customDisplay || `${count}+`}
      </div>
      <span className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.suffix}</span>
    </motion.div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="mt-8 px-4">
      <div
        ref={ref}
        className="stats-container-border relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/[0.06] py-6"
        style={{ backgroundColor: 'rgba(15,17,23,0.6)', backdropFilter: 'blur(24px)' }}
      >
        {/* 2px gradient accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, #06b6d4, #a855f7)' }}
        />

        {/* Desktop: 5 columns with gradient vertical separators */}
        <div className="hidden md:grid md:grid-cols-5 md:items-center md:justify-items-center">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="relative flex w-full items-center justify-center px-4">
              <StatCard stat={stat} index={index} inView={isInView} />
              {index < STATS.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent, rgba(255,255,255,0.08) 50%, transparent)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} inView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
}