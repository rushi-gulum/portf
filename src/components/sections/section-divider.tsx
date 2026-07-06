'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant: 'gradient' | 'dots' | 'line';
}

export function SectionDivider({ variant }: SectionDividerProps) {
  if (variant === 'gradient') {
    return (
      <div className="max-w-5xl mx-auto py-4">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: '0 0 8px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.3)',
            }}
          />
        </motion.div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="max-w-5xl mx-auto py-6 flex items-center justify-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-[var(--theme-active)] ${
              i === 2 ? 'w-2 h-2 bg-cyan-400/50' : 'w-1 h-1'
            }`}
          />
        ))}
      </div>
    );
  }

  // 'line' variant
  return (
    <div className="max-w-5xl mx-auto py-2">
      <div className="border-t border-border" />
    </div>
  );
}