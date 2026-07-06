'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Clock, Calendar, Code2, FileText, Sigma, Copy, Check, ChevronRight, BookOpen, Zap, Lightbulb, AlertTriangle, Info } from 'lucide-react';
import type { Article } from '@/lib/data';
import { colorMap } from '@/lib/data';

/* ─── callout styles ─── */
const calloutConfig = {
  tip: {
    bg: 'bg-emerald-500/[0.08]',
    border: 'border-emerald-500/20',
    icon: Lightbulb,
    iconColor: 'text-emerald-400',
    label: 'Tip',
    labelColor: 'text-emerald-400',
  },
  warning: {
    bg: 'bg-amber-500/[0.08]',
    border: 'border-amber-500/20',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    label: 'Warning',
    labelColor: 'text-amber-400',
  },
  info: {
    bg: 'bg-cyan-500/[0.08]',
    border: 'border-cyan-500/20',
    icon: Info,
    iconColor: 'text-cyan-400',
    label: 'Note',
    labelColor: 'text-cyan-400',
  },
} as const;

/* ─── code block with copy ─── */
function ArticleCodeBlock({ code, language, caption }: { code: string; language: string; caption?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="my-6 rounded-xl overflow-hidden border t-border-subtle">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--theme-surface-code)] border-b t-border-subtle">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-[var(--theme-text-2)] hover:text-foreground hover:bg-[var(--theme-active)] transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <div className="bg-[var(--theme-surface-code)] p-4 overflow-x-auto">
        <pre className="text-[13px] leading-relaxed">
          <code className="text-[var(--theme-text-2)] font-mono">{code}</code>
        </pre>
      </div>
      {/* Caption */}
      {caption && (
        <div className="px-4 py-2.5 bg-[var(--theme-surface-code)] border-t border-white/[0.04]">
          <p className="text-[11px] text-muted-foreground italic">{caption}</p>
        </div>
      )}
    </div>
  );
}

/* ─── callout box ─── */
function ArticleCallout({ type, text }: { type: 'tip' | 'warning' | 'info'; text: string }) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={`my-6 flex gap-3 p-4 rounded-xl border ${config.bg} ${config.border}`}>
      <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-xs font-semibold uppercase tracking-wider ${config.labelColor} block mb-1`}>
          {config.label}
        </span>
        <p className="text-sm leading-relaxed text-[var(--theme-text-2)]">{text}</p>
      </div>
    </div>
  );
}

/* ─── key takeaway ─── */
function KeyTakeaway({ text }: { text: string }) {
  return (
    <div className="my-8 relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.06] to-purple-500/[0.06] p-6">
      <div className="absolute -top-3 left-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-cyan-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          <Zap className="size-3" />
          Key Takeaway
        </span>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-200 font-medium">{text}</p>
    </div>
  );
}

/* ─── table of contents (sidebar) ─── */
function TableOfContents({
  sections,
  activeSection,
  onSelect,
}: {
  sections: { id: string; heading: string }[];
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="hidden lg:block sticky top-24 w-56 flex-shrink-0" aria-label="Table of Contents">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-1 border-l t-border-subtle pl-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => onSelect(section.id)}
                className={`block w-full text-left text-[13px] leading-snug py-1.5 pr-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 font-medium border-l-2 border-cyan-400 -ml-[5px] pl-3'
                    : 'text-muted-foreground hover:text-[var(--theme-text-2)] border-l-2 border-transparent -ml-[5px] pl-3'
                }`}
              >
                {section.heading}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─── main modal ─── */
export default function ArticleReaderModal({
  article,
  isOpen,
  onClose,
}: {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(() => article?.content[0]?.id ?? '');
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const categoryColorKey = (() => {
    const map: Record<string, keyof typeof colorMap> = {
      'Deep Learning': 'purple',
      'RAG': 'cyan',
      'AI Agents': 'purple',
      'MLOps': 'green',
      'Prompt Engineering': 'amber',
      'LLM Engineering': 'cyan',
      'Product Engineering': 'green',
    };
    return map[article?.category ?? ''] || 'cyan';
  })();
  const colors = colorMap[categoryColorKey];

  // Scroll progress + active section tracking
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !article) return;
    const el = scrollRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    setReadingProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);

    // Determine active section using IntersectionObserver
    const sections = article.content;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionEl = sectionRefs.current.get(sections[i].id);
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const containerRect = el.getBoundingClientRect();
        if (rect.top - containerRect.top < 150) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    }
  }, [article]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Scroll to top via DOM (no setState)
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      });
      // Reset progress via scroll handler after scroll
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.dispatchEvent(new Event('scroll'));
        }
      });
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, article]);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = sectionRefs.current.get(sectionId);
    if (el && scrollRef.current) {
      const containerRect = scrollRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollTop + (elRect.top - containerRect.top) - 80,
        behavior: 'smooth',
      });
    }
  }, []);

  if (!article) return null;

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Reading progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[101] h-[2px]"
            style={{ background: colors.text }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: readingProgress / 100, transformOrigin: 'left' }}
            transition={{ duration: 0.1 }}
          />

          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal container */}
          <motion.div
            className="absolute inset-0 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Sticky header */}
            <header className="flex-shrink-0 border-b t-border-subtle bg-background/95 backdrop-blur-xl z-10">
              <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm text-[var(--theme-text-2)] hover:text-foreground transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back</span>
                </button>

                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="size-3.5" />
                  <span>{readingProgress.toFixed(0)}% read</span>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--theme-text-2)] hover:text-foreground hover:bg-[var(--theme-active)] transition-all cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="size-4" />
                </button>
              </div>
            </header>

            {/* Scrollable content */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
                {/* Article header */}
                <motion.header
                  className="mb-12 sm:mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Category + meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {article.readTime} read
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-4xl">
                    {article.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="mt-6 text-lg text-[var(--theme-text-2)] leading-relaxed max-w-3xl">
                    {article.excerpt}
                  </p>

                  {/* Content type indicators + tags */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {article.hasCode && (
                        <span className="flex items-center gap-1.5">
                          <Code2 className="size-3.5" />
                          Code
                        </span>
                      )}
                      {article.hasDiagrams && (
                        <span className="flex items-center gap-1.5">
                          <FileText className="size-3.5" />
                          Diagrams
                        </span>
                      )}
                      {article.hasEquations && (
                        <span className="flex items-center gap-1.5">
                          <Sigma className="size-3.5" />
                          Equations
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[var(--theme-text-2)] bg-[var(--theme-active)] border t-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Separator */}
                  <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.header>

                {/* Body: TOC sidebar + content */}
                <div className="flex gap-12" ref={contentRef}>
                  {/* Table of Contents (desktop) */}
                  <TableOfContents
                    sections={article.content.map((s) => ({ id: s.id, heading: s.heading }))}
                    activeSection={activeSection}
                    onSelect={scrollToSection}
                  />

                  {/* Article content */}
                  <article className="flex-1 min-w-0 max-w-3xl">
                    {article.content.map((section, idx) => (
                      <motion.section
                        key={section.id}
                        ref={(el) => {
                          if (el) sectionRefs.current.set(section.id, el);
                        }}
                        id={section.id}
                        className="mb-12 last:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 * idx }}
                      >
                        {/* Section heading */}
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5 tracking-tight">
                          {section.heading}
                        </h2>

                        {/* Paragraphs */}
                        {section.content.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-[15px] leading-[1.8] text-[var(--theme-text-2)] mb-4 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))}

                        {/* Code block */}
                        {section.codeBlock && (
                          <ArticleCodeBlock
                            code={section.codeBlock.code}
                            language={section.codeBlock.language}
                            caption={section.codeBlock.caption}
                          />
                        )}

                        {/* Callout */}
                        {section.callout && (
                          <ArticleCallout type={section.callout.type} text={section.callout.text} />
                        )}

                        {/* Key Takeaway */}
                        {section.keyTakeaway && (
                          <KeyTakeaway text={section.keyTakeaway} />
                        )}
                      </motion.section>
                    ))}

                    {/* End separator */}
                    <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Footer */}
                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-muted-foreground bg-[var(--theme-hover)] border border-white/[0.05]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--theme-text-2)] hover:text-foreground border t-border-subtle hover:t-border-default hover:bg-[var(--theme-hover)] transition-all cursor-pointer"
                      >
                        <ArrowLeft className="size-3.5" />
                        Back to articles
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}