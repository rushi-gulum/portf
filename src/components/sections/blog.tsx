'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { articles, colorMap, type Article } from '@/lib/data';
import { Calendar, Clock, ArrowRight, Code2, FileText, Sigma } from 'lucide-react';

const categoryColorMap: Record<string, keyof typeof colorMap> = {
  'Deep Learning': 'purple',
  'RAG': 'cyan',
  'AI Agents': 'purple',
  'MLOps': 'green',
  'Prompt Engineering': 'amber',
  'LLM Engineering': 'blue',
  'Product Engineering': 'green',
};

function getCategoryColor(category: string): keyof typeof colorMap {
  return categoryColorMap[category] || 'cyan';
}

function CategoryBadge({ category }: { category: string }) {
  const color = getCategoryColor(category);
  const colors = colorMap[color];

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {category}
    </span>
  );
}

function ArticleMetaIcons({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-500">
      {article.hasCode && <Code2 className="size-3" />}
      {article.hasDiagrams && <FileText className="size-3" />}
      {article.hasEquations && <Sigma className="size-3" />}
    </div>
  );
}

function FeaturedArticle({ article }: { article: Article }) {
  const color = getCategoryColor(article.category);
  const colors = colorMap[color];

  return (
    <motion.a
      href="#"
      className="block group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#0F1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left content (60%) */}
          <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <CategoryBadge category={article.category} />
                <ArticleMetaIcons article={article} />
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                {article.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-medium text-slate-500 bg-white/[0.03] border border-white/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3" />
                  {article.readTime}
                </span>
              </div>
              <span className="text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>

          {/* Right gradient panel (40%) */}
          <div
            className="w-full md:w-[40%] min-h-[200px] md:min-h-0 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.glow} 0%, rgba(10, 10, 10, 0.95) 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at 30% 50%, ${colors.text}40 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(ellipse at 70% 30%, ${colors.text}30 0%, transparent 60%)`,
              }}
            />
            {/* Decorative grid lines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(${colors.text} 1px, transparent 1px), linear-gradient(90deg, ${colors.text} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Category label centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-6xl md:text-7xl font-black opacity-[0.08] tracking-wider uppercase select-none"
                style={{ color: colors.text }}
              >
                {article.category.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.a
      href="#"
      className="block group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-[#0F1117] border border-white/[0.06] rounded-2xl p-6 h-full flex flex-col transition-all duration-300 group-hover:border-white/[0.12] group-hover:shadow-lg group-hover:shadow-black/20 group-hover:-translate-y-1">
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <CategoryBadge category={article.category} />
            <ArticleMetaIcons article={article} />
          </div>

          <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">
            {article.title}
          </h4>

          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {article.readTime}
            </span>
          </div>
          <span className="text-cyan-400 text-xs font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
            Read <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function BlogSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section id="blog" ref={ref} className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-4 block">
            BLOG
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Writing
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            In-depth articles on AI engineering, from production architecture to
            research insights. Writing that bridges theory and practice.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <FeaturedArticle article={featured} />
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}