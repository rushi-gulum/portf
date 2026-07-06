'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { Star, GitFork, GitCommit, ExternalLink, Github } from 'lucide-react';
import { repositories } from '@/lib/data';
import type { Repository } from '@/lib/data';

/* ─── animated counter ─── */
function AnimatedCounter({
  value,
  isInView,
}: {
  value: number;
  isInView: boolean;
}) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: 'easeOut',
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [isInView, motionVal, rounded, value]);

  const formatted =
    display >= 1000 ? `${(display / 1000).toFixed(1)}k` : String(display);

  return <span>{formatted}</span>;
}

/* ─── heatmap cell colors ─── */
const heatmapColors = [
  'bg-[var(--theme-hover)]',      // 0
  'bg-emerald-900/40',    // 1
  'bg-emerald-700/50',    // 2
  'bg-emerald-500/60',    // 3
  'bg-emerald-400/70',    // 4
];

/* ─── heatmap component ─── */
function ActivityHeatmap({ activity }: { activity: number[][] }) {
  return (
    <div className="flex gap-[3px] overflow-hidden">
      {activity.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((level, di) => (
            <div
              key={`${wi}-${di}`}
              className={`heatmap-cell ${heatmapColors[level] ?? heatmapColors[0]}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── repository card ─── */
function RepoCard({
  repo,
  index,
}: {
  repo: Repository;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`rounded-2xl border bg-card p-6 transition-all duration-300 ${
          isHovered
            ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.08)]'
            : 'border-border'
        }`}
      >
        {/* Top row: name + language */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-mono text-lg text-foreground">{repo.name}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
            />
            <span className="text-xs text-muted-foreground">
              {repo.language}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>

        {/* Topics */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-[var(--theme-hover)] px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Heatmap */}
        <div className="mt-4 overflow-x-auto">
          <ActivityHeatmap activity={repo.activity} />
        </div>

        {/* Bottom stats row */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {repo.stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              {repo.forks.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <GitCommit className="h-3.5 w-3.5" />
              {repo.commits.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            last commit {repo.lastCommit}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── main section ─── */
export default function OpenSource() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  const totalStars = repositories.reduce((s, r) => s + r.stars, 0);
  const totalRepos = repositories.length;
  const totalContributors = repositories.reduce(
    (s, r) => s + r.contributors,
    0,
  );

  const stats = [
    { label: 'Total Stars', value: totalStars, icon: Star },
    { label: 'Repositories', value: totalRepos, icon: Github },
    { label: 'Contributors', value: totalContributors, icon: GitFork },
  ];

  return (
    <section id="opensource" className="pb-20 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            OPEN SOURCE
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Building in Public
          </h2>
        </motion.div>

        {/* Summary stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-light flex items-center gap-4 rounded-xl px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    <AnimatedCounter
                      value={stat.value}
                      isInView={isHeaderInView}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Repository grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {repositories.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}