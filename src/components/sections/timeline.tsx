'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  FlaskConical,
  Mic,
  Trophy,
  BookOpen,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { timeline, colorMap } from '@/lib/data';
import type { TimelineItem } from '@/lib/data';

const typeColorMap: Record<TimelineItem['type'], string> = {
  work: '#06B6D4',
  research: '#3B82F6',
  talk: '#A855F7',
  award: '#F59E0B',
  publication: '#10B981',
};

const typeBgMap: Record<TimelineItem['type'], string> = {
  work: 'rgba(6,182,212,0.1)',
  research: 'rgba(59,130,246,0.1)',
  talk: 'rgba(168,85,247,0.1)',
  award: 'rgba(245,158,11,0.1)',
  publication: 'rgba(16,185,129,0.1)',
};

const typeBorderMap: Record<TimelineItem['type'], string> = {
  work: 'rgba(6,182,212,0.2)',
  research: 'rgba(59,130,246,0.2)',
  talk: 'rgba(168,85,247,0.2)',
  award: 'rgba(245,158,11,0.2)',
  publication: 'rgba(16,185,129,0.2)',
};

const typeLabelMap: Record<TimelineItem['type'], string> = {
  work: 'Work',
  research: 'Research',
  talk: 'Talk',
  award: 'Award',
  publication: 'Publication',
};

const typeIconMap: Record<TimelineItem['type'], React.ComponentType<{ size?: number; className?: string }>> = {
  work: Briefcase,
  research: FlaskConical,
  talk: Mic,
  award: Trophy,
  publication: BookOpen,
};

function TimelineCard({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const color = typeColorMap[item.type];
  const bg = typeBgMap[item.type];
  const border = typeBorderMap[item.type];
  const TypeIcon = typeIconMap[item.type];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative flex items-start gap-6 md:gap-0
        md:[&:nth-child(odd)]:flex-row
        md:[&:nth-child(even)]:flex-row-reverse`}
    >
      {/* Card - Desktop layout: odd = left, even = right */}
      <div className={`hidden md:block md:w-[calc(50%-28px)] ${isLeft ? '' : 'md:ml-auto'}`}>
        <TimelineCardContent item={item} color={color} bg={bg} border={border} TypeIcon={TypeIcon} />
      </div>

      {/* Center Node */}
      <div className="hidden md:flex flex-col items-center relative z-10 flex-shrink-0">
        <div
          className="w-3.5 h-3.5 rounded-full border-2"
          style={{
            borderColor: color,
            background: `${color}40`,
            boxShadow: `0 0 12px ${color}40, 0 0 24px ${color}20`,
          }}
        />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-[calc(50%-28px)]" />

      {/* Mobile layout: card always on the right */}
      <div className="md:hidden flex items-start gap-4 w-full pl-8 relative">
        {/* Mobile node */}
        <div
          className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 z-10"
          style={{
            borderColor: color,
            background: `${color}40`,
            boxShadow: `0 0 12px ${color}40, 0 0 24px ${color}20`,
          }}
        />
        <div className="flex-1">
          <TimelineCardContent item={item} color={color} bg={bg} border={border} TypeIcon={TypeIcon} />
        </div>
      </div>
    </motion.div>
  );
}

function TimelineCardContent({
  item,
  color,
  bg,
  border,
  TypeIcon,
}: {
  item: TimelineItem;
  color: string;
  bg: string;
  border: string;
  TypeIcon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div
      className="group bg-card border border-border rounded-2xl p-6
        transition-all duration-500
        hover:border-foreground/10 hover:shadow-[0_0_30px_var(--theme-border-subtle)]"
    >
      {/* Top row: year badge + type */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span
          className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: bg,
            color: color,
            border: `1px solid ${border}`,
          }}
        >
          {item.year}
        </span>
        <span
          className="text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5"
          style={{
            background: 'var(--theme-hover)',
            color: 'var(--theme-text-tertiary)',
          }}
        >
          <TypeIcon size={10} />
          {typeLabelMap[item.type]}
        </span>
      </div>

      {/* Role */}
      <h3 className="text-xl font-semibold text-foreground mb-1 leading-tight">
        {item.role}
      </h3>

      {/* Company */}
      <p className="text-muted-foreground text-sm mb-3">{item.company}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {item.description}
      </p>

      {/* Highlights */}
      {item.highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {item.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2
                size={14}
                className="flex-shrink-0 mt-0.5"
                style={{ color: color, opacity: 0.7 }}
              />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Metrics */}
      {item.metrics && item.metrics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
          {item.metrics.map((metric) => (
            <span
              key={metric}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: bg,
                color: color,
                border: `1px solid ${border}`,
              }}
            >
              {metric}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-green-400 font-medium uppercase mb-4 block">
            EXPERIENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From research to production — a timeline of roles, publications, talks,
            and milestones that shaped my career in AI engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.2) 5%, rgba(6,182,212,0.2) 95%, transparent)',
            }}
          />

          {/* Vertical line - mobile */}
          <div
            className="md:hidden absolute left-[5px] top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.2) 5%, rgba(6,182,212,0.2) 95%, transparent)',
            }}
          />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <span>View full resume</span>
            <ChevronRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}