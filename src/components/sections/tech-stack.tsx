'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { techStack } from '@/lib/data';
import type { TechItem } from '@/lib/data';

const categoryOrder = [
  'Languages',
  'Frameworks',
  'LLMs',
  'Cloud',
  'Databases',
  'Vector DBs',
  'DevOps',
  'MLOps',
];

const categoryColorMap: Record<string, string> = {
  Languages: '#06B6D4',
  Frameworks: '#A855F7',
  LLMs: '#3B82F6',
  Cloud: '#F59E0B',
  Databases: '#10B981',
  'Vector DBs': '#EC4899',
  DevOps: '#6366F1',
  MLOps: '#F97316',
};

const categoryGlowMap: Record<string, string> = {
  Languages: 'rgba(6,182,212,0.12)',
  Frameworks: 'rgba(168,85,247,0.12)',
  LLMs: 'rgba(59,130,246,0.12)',
  Cloud: 'rgba(245,158,11,0.12)',
  Databases: 'rgba(16,185,129,0.12)',
  'Vector DBs': 'rgba(236,72,153,0.12)',
  DevOps: 'rgba(99,102,241,0.12)',
  MLOps: 'rgba(249,115,22,0.12)',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function TechPill({ item, categoryColor }: { item: TechItem; categoryColor: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          variants={pillVariants}
          className="glass-light rounded-lg px-4 py-3 cursor-default
            transition-all duration-300
            hover:scale-105 hover:brightness-125"
          style={{
            // @ts-expect-error CSS custom property
            '--glow-color': categoryGlowMap[item.category] || categoryGlowMap.Languages,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${categoryGlowMap[item.category] || categoryGlowMap.Languages}, 0 0 40px ${categoryGlowMap[item.category] || categoryGlowMap.Languages}`;
            (e.currentTarget as HTMLDivElement).style.borderColor = `${categoryColor}33`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.05)';
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-base flex-shrink-0">{item.icon}</span>
            <span className="text-sm font-medium text-foreground/90">{item.name}</span>
          </div>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={8}
        className="bg-secondary border border-border text-foreground/80 max-w-[240px]"
      >
        <div className="text-xs">
          <div className="font-semibold text-foreground mb-1">{item.name}</div>
          <div className="text-foreground/50 mb-1.5">Connected with:</div>
          <div className="flex flex-wrap gap-1">
            {item.connections.map((conn) => (
              <span
                key={conn}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  background: `${categoryColor}15`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}25`,
                }}
              >
                {conn}
              </span>
            ))}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export default function TechStack() {
  const groupedTech = useMemo(() => {
    const groups: Record<string, TechItem[]> = {};
    for (const item of techStack) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
    // Order by categoryOrder
    const ordered: { category: string; items: TechItem[] }[] = [];
    for (const cat of categoryOrder) {
      if (groups[cat]) {
        ordered.push({ category: cat, items: groups[cat] });
      }
    }
    return ordered;
  }, []);

  return (
    <section id="tech-stack" className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-purple-400 font-medium uppercase mb-4 block">
            TECH STACK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Engineering Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The tools and technologies I work with daily to build, train, deploy, and scale
            AI systems in production.
          </p>
        </motion.div>

        {/* Animated Grid Background + Content */}
        <div className="relative">
          {/* Subtle grid background */}
          <div className="absolute inset-0 animated-grid rounded-3xl opacity-50 pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {groupedTech.map((group) => {
              const catColor = categoryColorMap[group.category] || '#06B6D4';
              const catGlow = categoryGlowMap[group.category] || categoryGlowMap.Languages;

              return (
                <motion.div
                  key={group.category}
                  variants={categoryVariants}
                  className="group"
                >
                  {/* Category Label */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: catColor,
                        boxShadow: `0 0 8px ${catGlow}`,
                      }}
                    />
                    <span className="text-xs tracking-[0.15em] text-muted-foreground font-medium uppercase">
                      {group.category}
                    </span>
                    <div
                      className="flex-1 h-px opacity-30"
                      style={{ background: `linear-gradient(90deg, ${catColor}, transparent)` }}
                    />
                  </div>

                  {/* Tech Pills */}
                  <motion.div
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.05 },
                      },
                    }}
                    className="flex flex-wrap gap-2"
                  >
                    {group.items.map((item) => (
                      <TechPill
                        key={item.name}
                        item={item}
                        categoryColor={catColor}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Connection Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Technologies', value: techStack.length, color: '#06B6D4' },
            { label: 'Categories', value: categoryOrder.length, color: '#A855F7' },
            { label: 'Cloud Platforms', value: groupedTech.find(g => g.category === 'Cloud')?.items.length || 0, color: '#F59E0B' },
            { label: 'LLM Models', value: groupedTech.find(g => g.category === 'LLMs')?.items.length || 0, color: '#3B82F6' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 glass-light rounded-xl"
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}