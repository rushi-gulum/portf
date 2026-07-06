'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#080808]">
      {/* Animated 2px gradient top line */}
      <div className="footer-gradient-line" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-4">
          {/* Copyright + credit line */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="text-sm text-muted-foreground">
              © 2024 {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Social links with pulse hover + Back to top */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mr-2 size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:bg-[var(--theme-active)] transition-all duration-200 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="size-4" />
            </button>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-link-pulse size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:bg-[var(--theme-active)] transition-all duration-200"
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