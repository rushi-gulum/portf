'use client';

import { useState, useCallback, useEffect, useRef, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Image,
  Mic,
  Database,
  Bot,
  Code,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';
import { playgroundDemos, colorMap } from '@/lib/data';
import LLMChatDemo from '@/components/sections/llm-chat-demo';
import RAGSearchDemo from '@/components/sections/rag-search-demo';
import ImageGenDemo from '@/components/demos/image-gen-demo';
import VoiceAIDemo from '@/components/demos/voice-ai-demo';
import VectorSearchDemo from '@/components/demos/vector-search-demo';
import AIAgentsDemo from '@/components/demos/ai-agents-demo';
import PromptSandboxDemo from '@/components/demos/prompt-sandbox-demo';

const iconMap: Record<string, ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
  MessageSquare,
  Search,
  Image,
  Mic,
  Database,
  Bot,
  Code,
};

const demoComponentMap: Record<string, ComponentType> = {
  'demo-llm': LLMChatDemo,
  'demo-rag': RAGSearchDemo,
  'demo-image': ImageGenDemo,
  'demo-voice': VoiceAIDemo,
  'demo-vector': VectorSearchDemo,
  'demo-agents': AIAgentsDemo,
  'demo-prompt': PromptSandboxDemo,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 },
  },
};

export default function AIPlayground() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const featuredDemo = playgroundDemos[0];
  const otherDemos = playgroundDemos.slice(1);

  const openDemo = useCallback((demoId: string) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setActiveDemo(demoId);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDemo = useCallback(() => {
    setActiveDemo(null);
    document.body.style.overflow = '';
    // Restore focus to the element that opened the modal
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (activeDemo === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDemo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDemo, closeDemo]);

  // Trap focus inside modal
  useEffect(() => {
    if (activeDemo === null || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll<HTMLElement>(focusableSelector);

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, [activeDemo]);

  const activeDemoData = activeDemo
    ? playgroundDemos.find((d) => d.id === activeDemo)
    : null;

  const ActiveComponent = activeDemo ? demoComponentMap[activeDemo] : null;
  const activeColors = activeDemoData ? colorMap[activeDemoData.color] : null;

  return (
    <section id="playground" className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-cyan-400 font-medium uppercase mb-4 block">
            AI PLAYGROUND
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Interactive Demos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore hands-on demonstrations of AI systems I&apos;ve built. Each demo showcases
            real-world applications of LLMs, RAG, computer vision, and more.
          </p>
        </motion.div>

        {/* Demo Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Featured Demo Card - LLM Chat - spans 2 rows on lg */}
          <motion.div
            variants={cardVariants}
            className="group relative lg:row-span-2"
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={`Open ${featuredDemo.title} demo`}
              onClick={() => openDemo(featuredDemo.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openDemo(featuredDemo.id);
                }
              }}
              className="relative h-full bg-[#0F1117] border border-white/[0.06] rounded-2xl p-6
                transition-all duration-500 cursor-pointer
                hover:border-cyan-500/40
                hover:shadow-[0_0_30px_rgba(6,182,212,0.1),0_0_60px_rgba(6,182,212,0.05)]"
              style={{ minHeight: '100%' }}
            >
              {/* Animated border overlay on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0"
                  style={{
                    borderRadius: 'inherit',
                    padding: '1px',
                    background: `linear-gradient(135deg, ${colorMap.cyan.border}, transparent 50%, ${colorMap.purple.border})`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
              </div>

              {/* Featured badge */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: colorMap.cyan.bg,
                    color: colorMap.cyan.text,
                    border: `1px solid ${colorMap.cyan.border}`,
                  }}
                >
                  Featured
                </span>
                <Sparkles size={14} className="text-cyan-400" />
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: colorMap.cyan.bg,
                  border: `1px solid ${colorMap.cyan.border}`,
                }}
              >
                {(() => {
                  const IconComp = iconMap[featuredDemo.icon];
                  return IconComp ? (
                    <IconComp
                      size={28}
                      style={{ color: colorMap.cyan.text }}
                    />
                  ) : null;
                })()}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {featuredDemo.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {featuredDemo.description}
              </p>

              {/* Interactive preview area */}
              <div className="bg-black/30 rounded-xl p-4 mb-6 border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs text-muted-foreground">Live Preview</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] text-cyan-400">U</span>
                    </div>
                    <div className="bg-white/[0.04] rounded-lg rounded-tl-none px-3 py-2 text-xs text-muted-foreground">
                      How does attention mechanism work in transformers?
                    </div>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg rounded-tr-none px-3 py-2 text-xs text-cyan-300 max-w-[80%]">
                      The attention mechanism computes weighted relationships between all tokens...
                    </div>
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={12} className="text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Try Demo link */}
              <div className="flex items-center gap-2 text-sm font-medium transition-colors duration-300" style={{ color: colorMap.cyan.text }}>
                <span>Try Demo</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>

          {/* Other Demo Cards */}
          {otherDemos.map((demo) => {
            const IconComp = iconMap[demo.icon];
            const colors = colorMap[demo.color];

            return (
              <motion.div
                key={demo.id}
                variants={cardVariants}
                className="group relative"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${demo.title} demo`}
                  onClick={() => openDemo(demo.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDemo(demo.id);
                    }
                  }}
                  className="relative bg-[#0F1117] border border-white/[0.06] rounded-2xl p-6
                    transition-all duration-500 cursor-pointer h-full flex flex-col
                    hover:border-white/10"
                  style={{
                    // @ts-expect-error CSS custom property
                    '--hover-color': colors.text,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = colors.border;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow.replace('0.15', '0.05')}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Animated border overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderRadius: 'inherit',
                        padding: '1px',
                        background: `linear-gradient(135deg, ${colors.border}, transparent 50%, ${colors.border})`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {IconComp ? (
                      <IconComp
                        size={20}
                        style={{ color: colors.text }}
                      />
                    ) : null}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {demo.description}
                  </p>

                  {/* Try Demo link */}
                  <div className="flex items-center gap-2 text-sm font-medium transition-colors duration-300" style={{ color: colors.text }}>
                    <span>Try Demo</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeDemo && activeDemoData && ActiveComponent && activeColors && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={closeDemo}
            aria-modal="true"
            role="dialog"
            aria-label={`${activeDemoData.title} demo`}
          >
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '85vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: activeColors.bg,
                      border: `1px solid ${activeColors.border}`,
                    }}
                  >
                    {(() => {
                      const IconComp = iconMap[activeDemoData.icon];
                      return IconComp ? (
                        <IconComp size={18} style={{ color: activeColors.text }} />
                      ) : null;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {activeDemoData.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {activeDemoData.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeDemo}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                  aria-label="Close demo"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Content (scrollable) */}
              <div className="flex-1 overflow-y-auto p-6">
                <ActiveComponent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}