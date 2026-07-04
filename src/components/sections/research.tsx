'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Code, GitBranch, Sigma, ArrowRight } from 'lucide-react';
import { articles, blogCategories } from '@/lib/data';
import type { Article } from '@/lib/data';

/* ─── article card ─── */
function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      className="hover-lift rounded-2xl border border-white/[0.06] bg-[#0F1117] p-6"
    >
      {/* Top row: category + date + read time */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 font-medium text-cyan-400">
          {article.category}
        </span>
        <span>{article.date}</span>
        <span className="text-white/20">·</span>
        <span>{article.readTime} read</span>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>

      {/* Bottom row: content type icons + tags + read link */}
      <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] pt-4">
        {/* Content type icons */}
        <div className="flex items-center gap-3">
          {article.hasCode && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Code className="h-3.5 w-3.5" />
              Code
            </span>
          )}
          {article.hasDiagrams && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5" />
              Diagrams
            </span>
          )}
          {article.hasEquations && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Sigma className="h-3.5 w-3.5" />
              Equations
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read link */}
        <a
          href="#"
          className="group mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          Read Article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

/* ─── main section ─── */
export default function Research() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section id="research" className="pb-20 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            RESEARCH &amp; WRITING
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Technical Deep Dives
          </h2>
        </motion.div>

        {/* Category filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 no-scrollbar">
            {blogCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
                      : 'border-transparent bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Article grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            transition={{ layoutDuration: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-muted-foreground"
          >
            No articles found in this category.
          </motion.div>
        )}
      </div>
    </section>
  );
}