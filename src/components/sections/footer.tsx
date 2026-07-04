'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#080808]">
      {/* Animated gradient top border */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), rgba(168,85,247,0.3), rgba(6,182,212,0.3), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <div className="absolute inset-0 border-t border-white/[0.06]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-slate-500">
            © 2024 {personalInfo.name}. Built with Next.js &amp; Tailwind.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="size-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}