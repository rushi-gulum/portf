'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-lg border t-border-subtle bg-[var(--theme-hover)]" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative h-8 w-8 rounded-lg border t-border-subtle bg-[var(--theme-hover)] flex items-center justify-center cursor-pointer transition-colors hover:bg-[var(--theme-active)]"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Moon className="size-4 text-slate-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Sun className="size-4 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}