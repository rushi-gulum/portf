'use client';

import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { playgroundDemos, colorMap } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
  MessageSquare,
  Search,
  Image,
  Mic,
  Database,
  Bot,
  Code,
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

export default function AIPlayground() {
  const featuredDemo = playgroundDemos[0];
  const otherDemos = playgroundDemos.slice(1);

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
    </section>
  );
}