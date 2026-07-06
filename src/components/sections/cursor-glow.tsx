'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

function getIsDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return !('ontouchstart' in window) && navigator.maxTouchPoints === 0 && window.innerWidth >= 1024;
}

function subscribeToResize(callback: () => void) {
  window.addEventListener('resize', callback, { passive: true });
  return () => window.removeEventListener('resize', callback);
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useSyncExternalStore(subscribeToResize, getIsDesktop, () => false);

  useEffect(() => {
    if (!isDesktop) return;

    let animationId: number;
    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth following with lerp
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[1]"
      style={{
        width: '400px',
        height: '400px',
        top: 0,
        left: 0,
        background:
          'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}