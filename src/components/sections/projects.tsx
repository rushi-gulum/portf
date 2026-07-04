'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { projects, colorMap } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/data';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[project.color];

  const colSpan =
    project.size === 'large'
      ? 'col-span-12 lg:col-span-7'
      : project.size === 'medium'
        ? 'col-span-12 lg:col-span-5'
        : 'col-span-12 lg:col-span-6';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(colSpan)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0F1117] transition-all duration-300',
          'hover:-translate-y-1 hover:shadow-lg'
        )}
        style={{
          borderColor: isHovered ? colors.border : 'rgba(255,255,255,0.06)',
          boxShadow: isHovered ? `0 8px 30px ${colors.glow}` : 'none',
        }}
      >
        {/* Accent bar */}
        <div className="h-[2px] w-full" style={{ background: colors.text }} />

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="mt-4 text-xl font-semibold text-white">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Metrics Grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg bg-white/[0.03] p-3"
              >
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
                <div className="mt-1 text-lg font-bold text-white">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture pipeline - revealed on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Architecture Pipeline
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                {project.architecture.map((stage, i) => (
                  <span key={stage} className="flex items-center gap-1">
                    <span
                      className="rounded px-1.5 py-0.5 font-medium"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                      }}
                    >
                      {stage}
                    </span>
                    {i < project.architecture.length - 1 && (
                      <span className="text-white/20">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center gap-1 border-t border-white/[0.06] px-6 py-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Demo</span>
          </a>
          <a
            href={project.article}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Article</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="pb-20 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Featured Projects
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="gradient-text">Production AI Systems</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Battle-tested systems built for scale. Each project handles real-world
            workloads with rigorous engineering standards and production-grade
            reliability.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}