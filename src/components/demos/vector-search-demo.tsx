'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Hash, ArrowRight } from 'lucide-react';

interface VectorDoc {
  id: number;
  text: string;
  category: string;
  dimensions: number[];
}

const DOCUMENTS: VectorDoc[] = [
  { id: 1, text: 'Neural networks learn through backpropagation, adjusting weights to minimize loss', category: 'ML', dimensions: [0.82, 0.15, 0.33, 0.91, 0.44] },
  { id: 2, text: 'PostgreSQL supports vector extensions like pgvector for similarity search', category: 'Database', dimensions: [0.12, 0.88, 0.45, 0.21, 0.76] },
  { id: 3, text: 'Embeddings capture semantic meaning in high-dimensional vector space', category: 'Embeddings', dimensions: [0.71, 0.34, 0.89, 0.56, 0.23] },
  { id: 4, text: 'HNSW indexing enables approximate nearest neighbor search at scale', category: 'Search', dimensions: [0.45, 0.67, 0.12, 0.88, 0.91] },
  { id: 5, text: 'Cosine similarity measures the angle between two vectors in space', category: 'Math', dimensions: [0.33, 0.56, 0.78, 0.44, 0.85] },
  { id: 6, text: 'Pinecone offers managed vector database with automatic indexing', category: 'Database', dimensions: [0.18, 0.92, 0.34, 0.67, 0.52] },
  { id: 7, text: 'Attention mechanisms allow models to focus on relevant parts of input', category: 'ML', dimensions: [0.88, 0.21, 0.56, 0.78, 0.34] },
  { id: 8, text: 'Chunking strategies affect retrieval quality in RAG pipelines', category: 'RAG', dimensions: [0.56, 0.43, 0.67, 0.12, 0.89] },
  { id: 9, text: 'Dot product similarity is efficient but requires normalized vectors', category: 'Math', dimensions: [0.41, 0.78, 0.23, 0.65, 0.47] },
  { id: 10, text: 'Weaviate combines vector search with GraphQL-based filtering', category: 'Database', dimensions: [0.25, 0.85, 0.91, 0.33, 0.68] },
  { id: 11, text: 'Cross-encoders rerank search results more accurately than bi-encoders', category: 'Search', dimensions: [0.67, 0.34, 0.45, 0.91, 0.56] },
  { id: 12, text: 'Contrastive learning produces embeddings that cluster similar concepts', category: 'Embeddings', dimensions: [0.79, 0.12, 0.88, 0.45, 0.33] },
];

const CATEGORIES = ['All', 'ML', 'Database', 'Embeddings', 'Search', 'Math', 'RAG'];

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (magA * magB);
}

export default function VectorSearchDemo() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState<(VectorDoc & { score: number })[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  const filteredDocs = useMemo(() => {
    if (selectedCategory === 'All') return DOCUMENTS;
    return DOCUMENTS.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;

    setIsSearching(true);

    // Generate a pseudo-query vector based on query text hash
    const queryVec = Array.from({ length: 5 }, (_, i) => {
      const charCode = query.charCodeAt(i % query.length) || 0;
      return (Math.sin(charCode * (i + 1) * 0.1) + 1) / 2;
    });

    setTimeout(() => {
      const scored = filteredDocs
        .map((doc) => ({
          ...doc,
          score: cosineSimilarity(queryVec, doc.dimensions),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      setResults(scored);
      setIsSearching(false);
      setSearchCount((c) => c + 1);
    }, 600);
  }, [query, filteredDocs]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="Search by semantic meaning..."
            className="w-full bg-[var(--theme-active)] border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-colors focus:border-amber-500/40"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!query.trim() || isSearching}
          className="px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                : 'bg-[var(--theme-active)] border border-border text-muted-foreground hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-muted-foreground self-center">
          {filteredDocs.length} documents
        </span>
      </div>

      {/* Vector Space Visualization */}
      <div className="bg-white/[0.02] border t-border-subtle rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Database size={14} className="text-amber-400" />
          <span className="text-xs font-medium text-foreground/80">Vector Space (5D projected)</span>
        </div>
        <div className="relative h-32 bg-black/20 rounded-lg overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="border border-white/[0.03]" />
            ))}
          </div>
          {/* Document points */}
          {DOCUMENTS.map((doc) => {
            const x = (doc.dimensions[0] * 80 + 10);
            const y = (1 - doc.dimensions[3]) * 80 + 10;
            const isResult = results.some((r) => r.id === doc.id);
            const catColors: Record<string, string> = {
              ML: 'bg-cyan-400',
              Database: 'bg-amber-400',
              Embeddings: 'bg-purple-400',
              Search: 'bg-green-400',
              Math: 'bg-blue-400',
              RAG: 'bg-pink-400',
            };
            return (
              <motion.div
                key={doc.id}
                className={`absolute w-2.5 h-2.5 rounded-full ${catColors[doc.category] || 'bg-white/40'} ${isResult ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-[#0D1117]' : 'opacity-40'}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={isResult ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 1, repeat: isResult ? Infinity : 0 }}
                title={`${doc.text.slice(0, 30)}...`}
              />
            );
          })}
          {/* Query point */}
          {results.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white"
              style={{ left: '50%', top: '40%' }}
            />
          )}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-2">
          {['ML', 'Database', 'Embeddings', 'Search'].map((cat) => {
            const colors: Record<string, string> = {
              ML: 'bg-cyan-400', Database: 'bg-amber-400',
              Embeddings: 'bg-purple-400', Search: 'bg-green-400',
            };
            return (
              <div key={cat} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${colors[cat]}`} />
                <span className="text-[10px] text-muted-foreground">{cat}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Found {results.length} similar documents</span>
              <span className="text-foreground/10">|</span>
              <span>Sorted by cosine similarity</span>
            </div>
            {results.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border t-border-subtle bg-white/[0.02] p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground/90 mb-1 line-clamp-2">{doc.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--theme-active)] text-muted-foreground">{doc.category}</span>
                      <span className="text-[10px] text-muted-foreground">ID: {doc.id}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-sm font-mono font-medium ${doc.score > 0.95 ? 'text-amber-400' : doc.score > 0.85 ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                      {(doc.score * 100).toFixed(1)}%
                    </span>
                    <div className="w-16 h-1.5 rounded bg-[var(--theme-active)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${doc.score * 100}%` }}
                        transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                        className={`h-full rounded ${doc.score > 0.95 ? 'bg-amber-500' : doc.score > 0.85 ? 'bg-yellow-500' : 'bg-white/30'}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {results.length === 0 && !isSearching && (
        <div className="text-center py-6">
          <Hash size={24} className="text-foreground/20 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Enter a query to search the vector space</p>
        </div>
      )}
    </div>
  );
}