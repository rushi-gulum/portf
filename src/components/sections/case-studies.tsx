'use client';

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Database,
  GitBranch,
  Brain,
  Cpu,
  Server,
  Scale,
  Lightbulb,
  Rocket,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { caseStudies, colorMap } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/lib/data';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

interface SubsectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Subsection({ icon, title, children }: SubsectionProps) {
  return (
    <div className="glass-light rounded-xl p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--theme-active)]">
          {icon}
        </div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {title}
        </h4>
      </div>
      <div className="mt-3 pl-11 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function CaseStudyAccordionItem({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudy;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const colorKey = index % 2 === 0 ? 'cyan' : 'purple';
  const colors = colorMap[colorKey];

  const subsections: { icon: React.ReactNode; title: string; content: string }[] = [
    { icon: <AlertCircle className="h-4 w-4" style={{ color: colors.text }} />, title: 'Problem', content: caseStudy.problem },
    { icon: <Database className="h-4 w-4" style={{ color: colors.text }} />, title: 'Dataset', content: caseStudy.dataset },
    { icon: <GitBranch className="h-4 w-4" style={{ color: colors.text }} />, title: 'Architecture', content: caseStudy.architecture },
    { icon: <Brain className="h-4 w-4" style={{ color: colors.text }} />, title: 'Model Selection', content: caseStudy.modelSelection },
    { icon: <Cpu className="h-4 w-4" style={{ color: colors.text }} />, title: 'Training Pipeline', content: caseStudy.trainingPipeline },
    { icon: <Server className="h-4 w-4" style={{ color: colors.text }} />, title: 'Infrastructure', content: caseStudy.infrastructure },
    { icon: <Scale className="h-4 w-4" style={{ color: colors.text }} />, title: 'Tradeoffs', content: caseStudy.tradeoffs },
    { icon: <Lightbulb className="h-4 w-4" style={{ color: colors.text }} />, title: 'Lessons Learned', content: caseStudy.lessonsLearned },
    { icon: <Rocket className="h-4 w-4" style={{ color: colors.text }} />, title: 'Production Deployment', content: caseStudy.deployment },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <AccordionItem
        value={caseStudy.id}
        className={cn(
          'mb-4 overflow-hidden rounded-2xl border bg-card transition-colors duration-300',
          'border-border',
          'data-[state=open]:border-foreground/10'
        )}
      >
        <AccordionTrigger
          className={cn(
            'flex w-full flex-col items-start gap-4 p-6 hover:no-underline sm:p-8',
            '[&>svg]:hidden' // hide default chevron
          )}
        >
          {/* Title row */}
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex-1">
              {/* Accent bar + title */}
              <div className="flex items-start gap-4">
                <div
                  className="mt-1.5 h-8 w-[3px] shrink-0 rounded-full"
                  style={{ background: colors.text }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl lg:text-2xl">
                    {caseStudy.title}
                  </h3>
                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Animated chevron */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--theme-hover)] transition-colors group-data-[state=open]:bg-[var(--theme-active)]">
              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </div>
          </div>

          {/* Metrics summary */}
          <div className="ml-0 grid w-full grid-cols-2 gap-3 pl-12 sm:grid-cols-4 sm:pl-14">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg bg-[var(--theme-hover)] p-3"
              >
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
                <div className="mt-0.5 text-lg font-bold text-foreground">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-8 pt-0">
          <div className="space-y-4 pl-12 sm:pl-14">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {subsections.map((section, i) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.06,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  >
                    <Subsection
                      icon={section.icon}
                      title={section.title}
                    >
                      {section.content}
                    </Subsection>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export default function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="case-studies" className="pb-20 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Engineering Case Studies
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="gradient-text">Production Deep Dives</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Detailed technical breakdowns of real production systems — from
            problem framing through architecture decisions to deployment and
            lessons learned.
          </p>
        </motion.div>

        {/* Case Studies Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyAccordionItem
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={index}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
}