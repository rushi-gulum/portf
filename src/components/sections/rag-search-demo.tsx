'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  content: string;
  score: number;
  source: string;
  chunk: string;
}

const DOCUMENTS: Document[] = [
  {
    id: 1,
    title: 'Attention Mechanism in Transformers',
    content:
      'The self-attention mechanism allows each position in the encoder to attend to all positions...',
    score: 0.94,
    source: 'arxiv.org/abs/1706.03762',
    chunk: 'Chunk #47',
  },
  {
    id: 2,
    title: 'RAG: Retrieval-Augmented Generation',
    content:
      'RAG combines pre-trained parametric and non-parametric memory for language generation...',
    score: 0.91,
    source: 'arxiv.org/abs/2005.11401',
    chunk: 'Chunk #12',
  },
  {
    id: 3,
    title: 'Dense Passage Retrieval for Open-Domain QA',
    content: 'DPR uses dense embeddings for retrieving relevant passages...',
    score: 0.87,
    source: 'arxiv.org/abs/2004.04906',
    chunk: 'Chunk #23',
  },
  {
    id: 4,
    title: 'Hybrid Search Strategies',
    content:
      'Combining BM25 lexical search with dense vector search improves retrieval quality by 15-20%...',
    score: 0.85,
    source: 'blog.example.com/hybrid-search',
    chunk: 'Chunk #8',
  },
  {
    id: 5,
    title: 'Cross-Encoder Reranking',
    content:
      'Cross-encoders provide more accurate relevance scoring by jointly encoding query-document pairs...',
    score: 0.83,
    source: 'arxiv.org/abs/1911.03675',
    chunk: 'Chunk #31',
  },
  {
    id: 6,
    title: 'Adaptive Chunking Strategies',
    content:
      'Semantic chunking based on embedding similarity outperforms fixed-size chunking...',
    score: 0.81,
    source: 'blog.example.com/chunking',
    chunk: 'Chunk #5',
  },
  {
    id: 7,
    title: 'LLM Agent Tool Use',
    content:
      'Function calling allows LLMs to interact with external tools and APIs through structured outputs...',
    score: 0.89,
    source: 'arxiv.org/abs/2303.08761',
    chunk: 'Chunk #19',
  },
  {
    id: 8,
    title: 'Multi-Agent Orchestration',
    content:
      'Orchestrating multiple AI agents with specialized roles improves complex task completion rates...',
    score: 0.86,
    source: 'arxiv.org/abs/2308.08155',
    chunk: 'Chunk #42',
  },
  {
    id: 9,
    title: 'Fine-tuning LLMs with LoRA',
    content:
      'Low-Rank Adaptation enables efficient fine-tuning of large language models...',
    score: 0.82,
    source: 'arxiv.org/abs/2106.09685',
    chunk: 'Chunk #14',
  },
  {
    id: 10,
    title: 'Vector Database Comparison',
    content:
      'Pinecone, Weaviate, and Qdrant offer different trade-offs in latency, recall, and cost...',
    score: 0.79,
    source: 'blog.example.com/vectordb',
    chunk: 'Chunk #27',
  },
];

const PIPELINE_STAGES = [
  'Query',
  'Embed',
  'Vector Search',
  'Rerank',
  'LLM Generate',
];

const STATUS_TEXTS = [
  'Querying vector store...',
  'Embedding query...',
  'Retrieving top-k results...',
  'Reranking results...',
  'Generating response...',
];

const SUGGESTED_QUERIES = [
  'How does attention work?',
  'RAG architecture patterns',
  'Vector search optimization',
  'Multi-agent systems',
];

function getStageStyle(stage: number, currentIndex: number) {
  if (currentIndex < stage) {
    return 't-border-subtle text-muted-foreground';
  }
  if (currentIndex === stage) {
    return 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10 scale-105';
  }
  return 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5';
}

export default function RAGSearchDemo() {
  const [query, setQuery] = useState('');
  const [pipelineStage, setPipelineStage] = useState(-1);
  const [results, setResults] = useState<Document[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const searchDocuments = useCallback(
    (searchQuery: string): Document[] => {
      const q = searchQuery.toLowerCase();
      const keywords = q.split(/\s+/).filter(Boolean);

      const scored = DOCUMENTS.map((doc) => {
        let boost = 0;
        const lowerTitle = doc.title.toLowerCase();
        const lowerContent = doc.content.toLowerCase();

        // Title match boost
        keywords.forEach((kw) => {
          if (lowerTitle.includes(kw)) boost += 0.15;
          if (lowerContent.includes(kw)) boost += 0.08;
        });

        // Full query match in title
        if (lowerTitle.includes(q)) boost += 0.2;

        return {
          ...doc,
          score: Math.min(doc.score + boost, 0.99),
        };
      });

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 4);
    },
    []
  );

  const handleSubmit = useCallback(
    (searchQuery?: string) => {
      const q = searchQuery || query;
      if (!q.trim() || isSearching) return;

      clearTimers();
      setIsSearching(true);
      setResults([]);
      setHasSearched(true);
      setPipelineStage(0);

      const delays = [300, 500, 700, 500, 500];

      delays.reduce((prevDelay, delay, i) => {
        const timer = setTimeout(() => {
          setPipelineStage(i);
        }, prevDelay);
        timersRef.current.push(timer);
        return prevDelay + delay;
      }, 0);

      // Show results after pipeline completes
      const totalDelay = delays.reduce((a, b) => a + b, 0);
      const finalTimer = setTimeout(() => {
        const searchResults = searchDocuments(q);
        setResults(searchResults);
        setIsSearching(false);
      }, totalDelay);
      timersRef.current.push(finalTimer);
    },
    [query, isSearching, clearTimers, searchDocuments]
  );

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSubmit(suggestion);
  };

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const currentStatus =
    pipelineStage >= 0 && pipelineStage < STATUS_TEXTS.length
      ? STATUS_TEXTS[pipelineStage]
      : null;

  return (
    <div className="bg-[var(--theme-surface-code)] rounded-xl border t-border-subtle overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b t-border-subtle px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm font-medium text-foreground">RAG Search Pipeline</span>
        <Search className="h-4 w-4 text-muted-foreground ml-auto" />
      </div>

      <div className="p-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            placeholder="Search knowledge base..."
            className="w-full bg-[var(--theme-active)] border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-cyan-500/40"
          />
        </div>

        {/* Suggested Queries (shown before search) */}
        {!hasSearched && (
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground cursor-pointer hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Pipeline Stages */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {PIPELINE_STAGES.map((stage, index) => (
            <div key={stage} className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${getStageStyle(pipelineStage, index)}`}
              >
                {stage}
              </span>
              {index < PIPELINE_STAGES.length - 1 && (
                <span className="text-muted-foreground text-xs">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Status text during pipeline */}
        {currentStatus && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground"
          >
            {currentStatus}
          </motion.p>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {results.map((doc, index) => {
                const scoreColor =
                  doc.score > 0.9
                    ? 'text-emerald-400'
                    : doc.score > 0.8
                      ? 'text-yellow-400'
                      : 'text-muted-foreground';

                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="rounded-lg border t-border-subtle bg-white/[0.02] p-3"
                  >
                    {/* Top row: score + bar */}
                    <div className="mb-2 flex items-center gap-3">
                      <span className={`text-xs font-medium ${scoreColor}`}>
                        {(doc.score * 100).toFixed(0)}%
                      </span>
                      <div className="flex-1 h-[3px] rounded bg-[var(--theme-active)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${doc.score * 100}%` }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
                          className={`h-full rounded ${doc.score > 0.9 ? 'bg-emerald-500' : doc.score > 0.8 ? 'bg-yellow-500' : 'bg-white/30'}`}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {doc.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {doc.content}
                    </p>

                    {/* Bottom row: source + chunk */}
                    <div className="flex items-center justify-between">
                      <a
                        href={`https://${doc.source}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {doc.source}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <span className="text-[10px] text-muted-foreground bg-[var(--theme-active)] px-2 py-0.5 rounded-full">
                        {doc.chunk}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No results */}
        {hasSearched && !isSearching && results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No matching documents found. Try a different query.
          </p>
        )}
      </div>
    </div>
  );
}