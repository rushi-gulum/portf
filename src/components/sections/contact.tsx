'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { personalInfo } from '@/lib/data';
import { Mail, Github, Linkedin, Twitter, Calendar, ArrowUpRight } from 'lucide-react';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/alexchen',
    href: personalInfo.github,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/alexchen',
    href: personalInfo.linkedin,
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    value: 'x.com/alexchen_ai',
    href: personalInfo.twitter,
  },
  {
    icon: Calendar,
    label: 'Schedule',
    value: 'Schedule a Meeting',
    href: personalInfo.calendar,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-4 block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build{' '}
            <span className="gradient-text">Something</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            Open to collaboration, consulting, and interesting conversations
            about AI engineering.
          </p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="group"
                variants={itemVariants}
              >
                <div className="glass rounded-xl p-4 flex items-center gap-4 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]">
                  <div className="size-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20">
                    <Icon className="size-4 text-slate-400 transition-colors duration-300 group-hover:text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-0.5">
                      {link.label}
                    </p>
                    <p className="text-sm text-white font-medium truncate group-hover:text-cyan-400 transition-colors duration-300">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-slate-600 transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}