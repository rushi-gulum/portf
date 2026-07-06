'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent(Math.min(Math.round((scrollY / docHeight) * 100), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Glow intensity increases as user scrolls further (0–1 range)
  const glowOpacity = Math.min(scrollPercent / 100, 1);
  const glowShadow = `0 0 ${8 + glowOpacity * 16}px rgba(6, 182, 212, ${0.05 + glowOpacity * 0.2}), 0 0 ${4 + glowOpacity * 8}px rgba(6, 182, 212, ${0.03 + glowOpacity * 0.1})`;

  return (
    <AnimatePresence>
      {isVisible && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full
                bg-white/[0.05] backdrop-blur-xl border border-white/[0.1]
                hover:bg-white/[0.1] hover:border-cyan-500/30
                transition-all duration-300 cursor-pointer group"
              style={{ boxShadow: glowShadow }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="text-white/70 group-hover:text-cyan-400 transition-colors" />
              {/* Scroll percentage ring */}
              <svg
                className="absolute inset-0 -rotate-90 pointer-events-none"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="rgba(6,182,212,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - scrollPercent / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            sideOffset={8}
            className="bg-[#1A1D2E] border-white/[0.1] text-white text-xs rounded-lg px-3 py-1.5"
          >
            Back to top
          </TooltipContent>
        </Tooltip>
      )}
    </AnimatePresence>
  );
}