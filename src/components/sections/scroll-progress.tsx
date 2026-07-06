'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    scaleX.set(latest);
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #06B6D4, #A855F7, #3B82F6)',
        boxShadow: '0 2px 10px rgba(6, 182, 212, 0.3), 0 4px 20px rgba(6, 182, 212, 0.1)',
      }}
    />
  );
}