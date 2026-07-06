/* deterministic seeded random for SSR hydration consistency */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateActivity(seed: number) {
  const rng = seededRandom(seed);
  return Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(rng() * 5))
  );
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  github: string;
  demo: string;
  article: string;
  color: 'cyan' | 'purple' | 'blue' | 'green' | 'amber';
  size: 'large' | 'medium' | 'small';
  image?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  dataset: string;
  architecture: string;
  modelSelection: string;
  trainingPipeline: string;
  infrastructure: string;
  tradeoffs: string;
  lessonsLearned: string;
  deployment: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  commits: number;
  contributors: number;
  lastCommit: string;
  activity: number[][];
  topics: string[];
}

export interface ArticleContentSection {
  id: string;
  heading: string;
 content: string[];
  codeBlock?: { language: string; code: string; caption?: string };
  callout?: { type: 'tip' | 'warning' | 'info'; text: string };
  keyTakeaway?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  hasCode: boolean;
  hasDiagrams: boolean;
  hasEquations: boolean;
  content: ArticleContentSection[];
}

export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  type: 'work' | 'research' | 'talk' | 'award' | 'publication';
  metrics?: string[];
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
  connections: string[];
}

export const personalInfo = {
  name: "Alex Chen",
  role: "AI Engineer",
  tagline: "Build • Research • Deploy",
  bio: "Building production AI systems at the intersection of research and engineering. Specializing in LLMs, RAG pipelines, AI agents, and scalable ML infrastructure.",
  currentlyBuilding: "Multi-agent orchestration framework",
  latestResearch: "Attention-efficient transformer architectures",
  latestRelease: "v2.4 — Agent Runtime SDK",
  email: "alex@alexchen.dev",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  twitter: "https://x.com/alexchen_ai",
  calendar: "https://cal.com/alexchen",
  avatarUrl: "",
};

export const projects: Project[] = [
  {
    id: "nexus-rag",
    title: "Nexus RAG",
    description: "Production-grade retrieval-augmented generation pipeline with hybrid search, reranking, and adaptive chunking. Serving 50K+ queries/day.",
    longDescription: "A fully productionized RAG system handling document ingestion, chunking, embedding, hybrid search, reranking, and LLM generation with comprehensive observability.",
    tags: ["RAG", "LangChain", "Pinecone", "FastAPI", "Redis"],
    metrics: [
      { label: "Queries/Day", value: "50K+" },
      { label: "p95 Latency", value: "180ms" },
      { label: "Retrieval Acc.", value: "94.2%" },
      { label: "Cost/Query", value: "$0.002" },
    ],
    architecture: ["Document Ingestion", "Adaptive Chunking", "Hybrid Search", "Cross-Encoder Reranker", "LLM Generation", "Streaming Response"],
    github: "https://github.com/alexchen/nexus-rag",
    demo: "#",
    article: "#",
    color: "cyan",
    size: "large",
  },
  {
    id: "agent-runtime",
    title: "Agent Runtime",
    description: "Lightweight, composable framework for building multi-agent AI systems with tool use, memory, and structured output.",
    longDescription: "A runtime SDK for orchestrating multiple AI agents with shared memory, tool registries, and streaming. Designed for production workloads.",
    tags: ["AI Agents", "TypeScript", "Streaming", "Tools", "Memory"],
    metrics: [
      { label: "Downloads", value: "12K/mo" },
      { label: "GitHub Stars", value: "2.8K" },
      { label: "Agents Supported", value: "50+" },
      { label: "Uptime", value: "99.9%" },
    ],
    architecture: ["Agent Orchestrator", "Tool Registry", "Memory Store", "Streaming Pipeline", "Error Recovery", "Observability"],
    github: "https://github.com/alexchen/agent-runtime",
    demo: "#",
    article: "#",
    color: "purple",
    size: "large",
  },
  {
    id: "neural-search",
    title: "Neural Search",
    description: "Semantic search engine with real-time indexing, multimodal embeddings, and sub-second query latency.",
    longDescription: "A high-performance semantic search system supporting text, image, and audio queries with real-time indexing and intelligent caching.",
    tags: ["Vector Search", "Embeddings", "Qdrant", "Rust", "gRPC"],
    metrics: [
      { label: "Index Size", value: "10M+ vectors" },
      { label: "Query p99", value: "45ms" },
      { label: "Recall@10", value: "97.1%" },
      { label: "Throughput", value: "5K QPS" },
    ],
    architecture: ["Multi-modal Encoder", "Real-time Indexer", "HNSW Index", "Query Router", "Result Reranker", "Cache Layer"],
    github: "https://github.com/alexchen/neural-search",
    demo: "#",
    article: "#",
    color: "blue",
    size: "medium",
  },
  {
    id: "ml-infra",
    title: "ML Platform",
    description: "End-to-end ML platform with experiment tracking, model registry, automated training, and canary deployments.",
    longDescription: "Full lifecycle ML platform managing experiments, model versioning, training pipelines, and production deployments with monitoring.",
    tags: ["MLOps", "Kubernetes", "MLflow", "Terraform", "Prometheus"],
    metrics: [
      { label: "Models Deployed", value: "200+" },
      { label: "Training Jobs/mo", value: "1.2K" },
      { label: "GPU Utilization", value: "89%" },
      { label: "Deploy Time", value: "< 5min" },
    ],
    architecture: ["Experiment Tracker", "Model Registry", "Training Orchestrator", "Serving Engine", "Canary Deployer", "Monitoring"],
    github: "https://github.com/alexchen/ml-platform",
    demo: "#",
    article: "#",
    color: "green",
    size: "medium",
  },
  {
    id: "prompt-lab",
    title: "Prompt Lab",
    description: "Systematic prompt engineering toolkit with A/B testing, version control, and automated evaluation.",
    longDescription: "A development environment for prompt engineering with systematic testing, evaluation, and optimization capabilities.",
    tags: ["Prompt Engineering", "LLM", "Evaluation", "A/B Testing"],
    metrics: [
      { label: "Prompts Managed", value: "5K+" },
      { label: "Test Runs", value: "100K+" },
      { label: "Avg. Improvement", value: "+23%" },
      { label: "Models Tested", value: "15+" },
    ],
    architecture: ["Prompt Editor", "Version Control", "A/B Runner", "Auto Evaluator", "Analytics Dashboard", "Export Pipeline"],
    github: "https://github.com/alexchen/prompt-lab",
    demo: "#",
    article: "#",
    color: "amber",
    size: "small",
  },
  {
    id: "data-pipeline",
    title: "StreamForge",
    description: "Real-time data pipeline framework for ML training data with schema validation and quality gates.",
    longDescription: "A high-throughput data processing framework for preparing ML training data with built-in quality controls.",
    tags: ["Data Pipeline", "Kafka", "Spark", "Great Expectations"],
    metrics: [
      { label: "Throughput", value: "2M events/s" },
      { label: "Pipeline Uptime", value: "99.99%" },
      { label: "Data Quality", value: "99.7%" },
      { label: "Sources", value: "40+" },
    ],
    architecture: ["Ingestion Layer", "Schema Validator", "Transform Engine", "Quality Gates", "Output Sink", "Monitoring"],
    github: "https://github.com/alexchen/streamforge",
    demo: "#",
    article: "#",
    color: "cyan",
    size: "small",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-rag-production",
    title: "Scaling RAG to 50K Daily Queries",
    problem: "Enterprise knowledge base needed instant, accurate answers from 2M+ documents across multiple departments with strict latency requirements.",
    dataset: "2.1M documents, 47 departments, mixed formats (PDF, DOCX, HTML, Confluence)",
    architecture: "Multi-stage pipeline: Preprocessing → Adaptive Chunking (512-2048 tokens) → Hybrid Embedding (BGE-Large + ColBERT) → HNSW Index (Pinecone) → Cross-Encoder Reranker → LLM Synthesis",
    modelSelection: "BGE-large-en-v1.5 for embeddings (balance of quality/speed), Cohere Command R+ for generation, bge-reranker-large for reranking",
    trainingPipeline: "Fine-tuned embedding model on domain-specific pairs using LoRA. Evaluated retrieval with NDCG@10, MRR, and relevance annotations from domain experts.",
    infrastructure: "FastAPI on Kubernetes with HPA, Redis for caching, Pinecone pod-based index, Kafka for async processing, Grafana + Prometheus for observability",
    tradeoffs: "Chose Pinecone over self-hosted for faster time-to-production. Accepted 2x cost increase for managed service. Traded 1% retrieval accuracy for 3x latency improvement.",
    lessonsLearned: "Adaptive chunking based on document structure significantly outperformed fixed-size. Caching common queries reduced costs by 40%. Reranker was the highest-ROI addition.",
    deployment: "Blue-green deployment with automated canary analysis. Gradual rollout: 5% → 25% → 100% over 2 weeks. Automated rollback on latency spike.",
    tags: ["RAG", "Production", "Enterprise", "Search"],
    metrics: [
      { label: "Queries/Day", value: "50K+" },
      { label: "p95 Latency", value: "180ms" },
      { label: "User Satisfaction", value: "4.7/5" },
      { label: "Cost Reduction", value: "40%" },
    ],
  },
  {
    id: "cs-agents",
    title: "Building a Multi-Agent Customer Support System",
    problem: "Support team handling 10K tickets/week with 15-min SLA. Need intelligent routing, auto-resolution for common cases, and AI-assisted agents.",
    dataset: "3 years of support tickets (1.5M), resolution guides (800+), product documentation, Slack conversations",
    architecture: "Orchestrator Agent → Router (intent classification) → Specialist Agents (Billing, Technical, Account) → Tool Layer (CRM, Knowledge Base, Order System) → Response Generator",
    modelSelection: "GPT-4o for complex reasoning, GPT-4o-mini for classification/routing, fine-tuned Llama 3 8B for common patterns to reduce costs",
    trainingPipeline: "Fine-tuned classifier on 500K labeled tickets. Prompt engineering for specialist agents. A/B testing framework for continuous improvement.",
    infrastructure: "Agent Runtime SDK on EKS, DynamoDB for conversation state, SQS for async processing, CloudWatch for monitoring, custom evaluation pipeline",
    tradeoffs: "Hybrid model strategy (GPT-4o + fine-tuned Llama) reduced costs by 65% while maintaining quality. Accepted higher cold-start time for specialist agents.",
    lessonsLearned: "Clear agent boundaries are crucial. Overlapping responsibilities cause confusion. Tool-use reliability > model intelligence. Human-in-the-loop for edge cases is non-negotiable.",
    deployment: "Shadow mode for 1 week, then 20% traffic for 2 weeks. Automated quality scoring on every interaction. Gradual autonomy increase based on confidence thresholds.",
    tags: ["AI Agents", "Production", "Support", "Multi-Agent"],
    metrics: [
      { label: "Auto-Resolution", value: "62%" },
      { label: "Avg. Handle Time", value: "-45%" },
      { label: "CSAT Score", value: "+18%" },
      { label: "Cost/Ticket", value: "-65%" },
    ],
  },
];

export const repositories: Repository[] = [
  {
    id: "repo-1",
    name: "agent-runtime",
    description: "Lightweight, composable framework for building multi-agent AI systems with tool use, memory, and streaming.",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 2847,
    forks: 234,
    commits: 892,
    contributors: 47,
    lastCommit: "2 hours ago",
    activity: generateActivity(42),
    topics: ["ai-agents", "llm", "multi-agent", "tool-use", "streaming"],
  },
  {
    id: "repo-2",
    name: "nexus-rag",
    description: "Production-grade RAG pipeline with hybrid search, reranking, and adaptive chunking.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 5621,
    forks: 612,
    commits: 1247,
    contributors: 83,
    lastCommit: "5 hours ago",
    activity: generateActivity(137),
    topics: ["rag", "search", "llm", "production", "embeddings"],
  },
  {
    id: "repo-3",
    name: "neural-search",
    description: "High-performance semantic search with real-time indexing and multimodal embeddings.",
    language: "Rust",
    languageColor: "#DEA584",
    stars: 3892,
    forks: 289,
    commits: 1563,
    contributors: 34,
    lastCommit: "1 day ago",
    activity: generateActivity(256),
    topics: ["search", "vector", "embeddings", "rust", "performance"],
  },
  {
    id: "repo-4",
    name: "prompt-lab",
    description: "Systematic prompt engineering toolkit with A/B testing and automated evaluation.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1956,
    forks: 178,
    commits: 634,
    contributors: 29,
    lastCommit: "3 days ago",
    activity: generateActivity(389),
    topics: ["prompt-engineering", "llm", "evaluation", "a-b-testing"],
  },
  {
    id: "repo-5",
    name: "ml-platform",
    description: "End-to-end ML platform with experiment tracking, model registry, and automated deployments.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4231,
    forks: 456,
    commits: 2100,
    contributors: 67,
    lastCommit: "12 hours ago",
    activity: generateActivity(512),
    topics: ["mlops", "ml-platform", "kubernetes", "experiment-tracking"],
  },
  {
    id: "repo-6",
    name: "streamforge",
    description: "Real-time data pipeline framework for ML training data with quality gates.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: 1678,
    forks: 145,
    commits: 923,
    contributors: 21,
    lastCommit: "2 days ago",
    activity: generateActivity(777),
    topics: ["data-pipeline", "streaming", "ml-data", "quality"],
  },
];

export const articles: Article[] = [
  {
    id: "art-1",
    title: "Attention Is All You Need: A Production Engineer's Guide",
    excerpt: "Deep dive into transformer attention mechanisms with practical optimization strategies for production deployment, including Flash Attention, KV caching, and PagedAttention.",
    category: "Deep Learning",
    date: "2024-12-15",
    readTime: "18 min",
    tags: ["Transformers", "Attention", "Optimization"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: true,
    content: [
      {
        id: "s1",
        heading: "Why Attention Matters in Production",
        content: [
          "The self-attention mechanism is the cornerstone of modern transformer architectures. While the original paper 'Attention Is All You Need' introduced the concept, production engineers face a different set of challenges than researchers. In production, we care about memory footprint, inference latency, and throughput — all of which are dominated by the quadratic cost of attention.",
          "For a sequence length N and hidden dimension d, standard attention requires O(N² · d) memory and compute. With modern LLMs processing 128K+ token contexts, this becomes the primary bottleneck. A 70B parameter model with 128K context requires over 120GB of memory just for the KV cache alone.",
          "This article bridges the gap between the theoretical understanding of attention and the practical optimization techniques that make production deployment feasible. We'll cover Flash Attention, KV caching, PagedAttention, and Grouped-Query Attention — the four pillars of production attention optimization."
        ],
        callout: { type: "info", text: "This guide focuses on inference-time optimization. For training-time attention efficiency, see our companion article on Ring Attention and Sequence Parallelism." },
      },
      {
        id: "s2",
        heading: "Standard Attention: The Baseline",
        content: [
          "Let's start with the mathematical formulation. For a query matrix Q, key matrix K, and value matrix V, the attention output is:",
          "Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V",
          "The softmax computation over N tokens produces an N×N attention matrix. For each token, we compute a weighted sum over all V vectors. The memory bottleneck isn't the parameters — it's the intermediate attention scores.",
          "In production, this means a single forward pass through a 32-layer transformer with 128K context requires storing 32 separate N×N attention matrices during computation. Even with float16, this is prohibitive."
        ]
      },
      {
        id: "s3",
        heading: "Flash Attention: IO-Aware Exact Attention",
        content: [
          "Flash Attention (Dao et al., 2022) is perhaps the most impactful optimization for production attention. The key insight is that the standard attention implementation is memory-bandwidth bound, not compute bound. By reorganizing the computation to be IO-aware, Flash Attention achieves 2-4× speedups with exact results.",
          "The technique works by tiling the Q, K, V matrices and computing attention in blocks stored in SRAM (fast on-chip memory) rather than HBM (slow GPU memory). This reduces the number of HBM reads/writes from O(N²) to O(N²/M) where M is the tile size.",
          "Flash Attention 2 (2023) further improves this by parallelizing the attention computation across the sequence length dimension and better utilizing GPU warps. In our benchmarks, Flash Attention 2 achieves 2.3× speedup over Flash Attention 1 on A100 GPUs."
        ],
        codeBlock: {
          language: "python",
          code: `# Standard attention (memory-inefficient)
def standard_attention(Q, K, V):
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    attn_weights = F.softmax(scores, dim=-1)
    return torch.matmul(attn_weights, V)

# Flash Attention (memory-efficient, exact)
from flash_attn import flash_attn_func
output = flash_attn_func(q, k, v, causal=True)`,
          caption: "Flash Attention drops in as a simple replacement with 2-4× speedup"
        },
      },
      {
        id: "s4",
        heading: "KV Cache: Avoiding Redundant Computation",
        content: [
          "In autoregressive generation, each new token only needs to attend to previous tokens. Without caching, we'd recompute attention for all previous positions at each step. The KV cache stores the key and value projections from all previous positions.",
          "However, the KV cache grows linearly with sequence length. For a 70B model with 128K context, the KV cache alone requires approximately 120GB of memory. This is often the binding constraint on maximum context length.",
          "Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) address this by sharing K and V heads across multiple Q heads. Llama 2 uses GQA with 8 KV heads for 64 Q heads, reducing KV cache size by 8× with minimal quality loss."
        ],
        codeBlock: {
          language: "python",
          code: `# KV Cache memory calculation
def kv_cache_memory(
    num_layers: int,
    num_kv_heads: int,
    head_dim: int,
    seq_len: int,
    batch_size: int = 1,
    bytes_per_param: int = 2,  # fp16
) -> float:
    return (
        num_layers * num_kv_heads * head_dim
        * seq_len * batch_size * bytes_per_param
    ) / (1024 ** 3)  # in GB

# Llama 2 70B: 32 layers, 8 KV heads, 128 dim
# At 128K context: ~120 GB
print(f"KV Cache: {kv_cache_memory(32, 8, 128, 128_000):.1f} GB")`,
          caption: "KV cache memory scales linearly with sequence length"
        },
        callout: { type: "tip", text: "Use GQA (8 KV heads for 64 Q heads) to reduce KV cache by 8×. Llama 2, Mistral, and most modern models use this approach." },
      },
      {
        id: "s5",
        heading: "PagedAttention: Virtual Memory for KV Cache",
        content: [
          "PagedAttention, implemented in vLLM, applies the concept of virtual memory paging to the KV cache. Instead of pre-allocating contiguous memory for the maximum sequence length, it divides the KV cache into fixed-size blocks and allocates them on demand.",
          "This eliminates memory fragmentation and enables dynamic batching — serving multiple requests with different sequence lengths efficiently. In production, vLLM with PagedAttention achieves 2-4× higher throughput compared to naive continuous batching.",
          "The key insight is that most requests have highly variable sequence lengths. Pre-allocating for worst-case wastes memory; PagedAttention allocates exactly what's needed and reclaims blocks when requests complete."
        ],
        codeBlock: {
          language: "python",
          code: `# vLLM with PagedAttention
from vllm import LLM, SamplingParams

llm = LLM(
    model="meta-llama/Llama-2-70b-chat-hf",
    tensor_parallel_size=4,
    gpu_memory_utilization=0.90,
    max_model_len=8192,
)

params = SamplingParams(temperature=0.0, max_tokens=256)
outputs = llm.generate(["Explain RAG in 3 steps"], params)`,
          caption: "vLLM uses PagedAttention for efficient KV cache management"
        },
      },
      {
        id: "s6",
        heading: "Putting It All Together: Production Recommendations",
        content: [
          "Based on our experience deploying models serving 10M+ requests per day, here are the practical recommendations for production attention optimization:",
          "1. Always use Flash Attention 2 — it's a drop-in replacement with zero quality loss and 2-4× speedup.",
          "2. Use GQA models when available — they reduce KV cache by 4-8× with minimal quality impact.",
          "3. Use vLLM or TensorRT-LLM for serving — both implement PagedAttention and continuous batching.",
          "4. Profile your actual context length distribution — most production queries use much shorter contexts than the maximum.",
          "5. Consider speculative decoding for latency-sensitive applications — it can reduce decoding latency by 2-3×."
        ],
        keyTakeaway: "The combination of Flash Attention + GQA + PagedAttention reduces memory by 8× and increases throughput by 3-4× compared to baseline attention, making 128K+ context feasible in production."
      },
    ],
  },
  {
    id: "art-2",
    title: "Building RAG Systems That Actually Work at Scale",
    excerpt: "Lessons from deploying RAG to production: chunking strategies, retrieval evaluation, reranking pipelines, and the architectural decisions that matter.",
    category: "RAG",
    date: "2024-11-28",
    readTime: "22 min",
    tags: ["RAG", "Production", "Search"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: false,
    content: [
      {
        id: "s1",
        heading: "The Gap Between Prototype and Production",
        content: [
          "Every AI engineer has experienced it: the RAG demo that works perfectly on 10 documents falls apart on 10,000. Retrieval accuracy drops, latency spikes, costs explode, and the system that was 'almost ready' needs months of engineering work.",
          "After deploying RAG systems serving 50K+ queries/day across enterprise knowledge bases with 2M+ documents, I've learned that the gap between prototype and production comes down to a handful of critical decisions — most of which have nothing to do with the LLM itself.",
          "This article distills those lessons into actionable guidance. We'll cover the decisions that actually matter: chunking strategies, retrieval evaluation frameworks, reranking pipelines, and the architectural patterns that scale."
        ],
      },
      {
        id: "s2",
        heading: "Chunking: The Most Underrated Decision",
        content: [
          "Chunking is often treated as an afterthought — set a fixed window of 512 tokens and move on. In practice, chunking strategy has an outsized impact on retrieval quality. We've seen 20-40% improvements in retrieval accuracy just from better chunking.",
          "The key insight is that documents have structure, and respecting that structure produces better chunks than naive splitting. A code document should be split at function boundaries. A legal document at clause boundaries. A research paper at section boundaries."
        ],
        codeBlock: {
          language: "python",
          code: `import re
from typing import List

def structural_chunking(
    text: str,
    max_chunk_size: int = 1000,
    overlap: int = 100
) -> List[str]:
    """Split text at natural boundaries."""
    # Try section headers first
    sections = re.split(r'\n(?=#{1,3}\\s)', text)
    chunks = []
    
    for section in sections:
        if len(section) <= max_chunk_size:
            chunks.append(section)
        else:
            # Fall back to paragraph splitting
            paragraphs = section.split('\n\n')
            current = ""
            for p in paragraphs:
                if len(current) + len(p) > max_chunk_size:
                    if current:
                        chunks.append(current)
                    current = p
                else:
                    current = current + "\n\n" + p if current else p
            if current:
                chunks.append(current)
    
    # Add overlap between chunks
    final = []
    for i, chunk in enumerate(chunks):
        if i > 0:
            prev_tail = chunks[i-1][-overlap:]
            chunk = prev_tail + "\n" + chunk
        final.append(chunk)
    
    return final`,
          caption: "Structural chunking respects document boundaries for better retrieval"
        },
        callout: { type: "tip", text: "Always test multiple chunking strategies on your specific data. The 'best' chunking depends entirely on your document types and query patterns." },
      },
      {
        id: "s3",
        heading: "Retrieval Evaluation: What to Measure and How",
        content: [
          "You can't improve what you don't measure. Most teams skip retrieval evaluation and jump straight to end-to-end metrics. This is a mistake — if retrieval fails, no amount of LLM prompting can fix it.",
          "The three metrics that matter most for retrieval quality are: NDCG@10 (normalized discounted cumulative gain), MRR (mean reciprocal rank), and Recall@K (fraction of relevant documents in top K). Each captures a different aspect of quality.",
          "We recommend building a golden evaluation set of 200-500 query-document pairs annotated by domain experts. This set serves as your north star for all retrieval experiments."
        ],
        codeBlock: {
          language: "python",
          code: `from typing import List, Dict

def evaluate_retrieval(
    queries: List[Dict],
    retrieved: List[List[str]],
    k: int = 10
) -> Dict[str, float]:
    """Evaluate retrieval quality."""
    ndcg_scores = []
    mrr_scores = []
    recall_scores = []
    
    for q, docs in zip(queries, retrieved):
        relevant = set(q['relevant_ids'])
        
        # NDCG@K
        dcg = sum(1/np.log2(i+2) for i, d in enumerate(docs[:k]) 
                  if d in relevant)
        idcg = sum(1/np.log2(i+2) for i in range(min(len(relevant), k)))
        ndcg_scores.append(dcg/idcg if idcg > 0 else 0)
        
        # MRR
        for i, d in enumerate(docs):
            if d in relevant:
                mrr_scores.append(1/(i+1))
                break
        
        # Recall@K
        recall_scores.append(len(set(docs[:k]) & relevant) / len(relevant))
    
    return {
        'ndcg@10': np.mean(ndcg_scores),
        'mrr': np.mean(mrr_scores),
        f'recall@{k}': np.mean(recall_scores),
    }`,
          caption: "Retrieval evaluation framework measuring NDCG, MRR, and Recall"
        },
      },
      {
        id: "s4",
        heading: "Reranking: The Highest-ROI Addition",
        content: [
          "If there's one thing I'd recommend to every RAG team, it's adding a reranker. In our benchmarks, adding a cross-encoder reranker after initial retrieval improved end-to-end answer quality by 25-35% with only 50ms additional latency.",
          "The reason is simple: bi-encoder retrieval (embeddings + cosine similarity) is fast but coarse. Cross-encoder reranking is slower but much more precise. By using both, you get the best of both worlds — broad recall from embeddings, precise ranking from cross-encoders.",
          "We use bge-reranker-large as our default. It's fast (~50ms per query on CPU), accurate, and open-source. For specialized domains, fine-tuning on 1K-5K domain-specific query-document pairs can further improve accuracy by 10-15%."
        ],
        callout: { type: "info", text: "The reranker is the single highest-ROI component in a RAG pipeline. It consistently provides 25-35% quality improvement for <5% of total latency budget." },
      },
      {
        id: "s5",
        heading: "Architecture: The Pipeline That Scales",
        content: [
          "A production RAG system needs more than retrieval + generation. Here's the architecture we've evolved to after 18 months of production:",
          "Query Understanding → Hybrid Search (Dense + Sparse) → Candidate Pool → Cross-Encoder Reranker → Context Window Assembly → LLM Generation → Response Validation",
          "Each stage is independently scalable and observable. We can swap components, A/B test alternatives, and identify exactly where quality degrades."
        ],
        codeBlock: {
          language: "python",
          code: `# Production RAG pipeline
async def rag_pipeline(query: str) -> dict:
    # Stage 1: Query understanding
    expanded = await query_expander.expand(query)
    
    # Stage 2: Hybrid search (dense + sparse)
    dense_results = await vector_store.search(expanded, k=50)
    sparse_results = await bm25.search(expanded, k=50)
    candidates = reciprocal_rank_fusion(dense_results, sparse_results)
    
    # Stage 3: Rerank
    reranked = await reranker.rerank(query, candidates, k=5)
    
    # Stage 4: Assemble context
    context = context_assembler.assemble(reranked, max_tokens=4000)
    
    # Stage 5: Generate
    response = await llm.generate(query, context=context)
    
    # Stage 6: Validate
    validated = await response_validator.validate(response, context)
    
    return {"answer": validated.text, "sources": reranked}`,
          caption: "6-stage production RAG pipeline with full observability"
        },
      },
      {
        id: "s6",
        heading: "Key Lessons from 50K Queries/Day",
        content: [
          "After handling over 50K queries/day in production for 6 months, here are the lessons that surprised us most:",
          "1. Caching common queries reduced costs by 40% with no quality impact — 30% of queries are near-duplicates.",
          "2. The reranker was more important than the embedding model — a good reranker with average embeddings outperformed great embeddings with no reranker.",
          "3. Adaptive chunking based on document structure significantly outperformed fixed-size chunking across all document types.",
          "4. Query expansion (generating related queries) helped for vague queries but hurt for specific ones — we now use it conditionally based on query confidence scoring."
        ],
        keyTakeaway: "The biggest RAG quality improvements come not from better LLMs but from better retrieval: structural chunking, hybrid search, and cross-encoder reranking together deliver 40-60% improvement in answer quality."
      },
    ],
  },
  {
    id: "art-3",
    title: "The Architecture of Multi-Agent AI Systems",
    excerpt: "Design patterns for building reliable multi-agent systems: orchestration strategies, tool use, memory management, and failure recovery.",
    category: "AI Agents",
    date: "2024-11-10",
    readTime: "25 min",
    tags: ["Agents", "Architecture", "Orchestration"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: false,
    content: [
      {
        id: "s1",
        heading: "Beyond Single-Agent Systems",
        content: [
          "Single-agent systems work well for simple tasks: answer a question, summarize a document, translate text. But complex real-world workflows require multiple specialized agents working together — each with its own instructions, tools, and context.",
          "The challenge isn't making agents communicate — it's making them communicate reliably. Production multi-agent systems must handle partial failures, conflicting information, circular dependencies, and graceful degradation when one agent fails.",
          "After building multi-agent systems for customer support, research automation, and content pipelines, I've identified five architectural patterns that consistently produce reliable, maintainable systems."
        ],
      },
      {
        id: "s2",
        heading: "Pattern 1: Orchestrator-Worker",
        content: [
          "The most common and reliable pattern. A central orchestrator agent decomposes tasks, assigns them to specialist workers, and synthesizes results. The orchestrator maintains the global state and makes routing decisions.",
          "This pattern works well when tasks can be decomposed into relatively independent subtasks. The key design decision is how much autonomy to give the orchestrator versus hardcoding the workflow."
        ],
        codeBlock: {
          language: "python",
          code: `class OrchestratorAgent:
    def __init__(self, workers: Dict[str, WorkerAgent]):
        self.workers = workers
        self.memory = ConversationMemory()
    
    async def execute(self, task: str) -> str:
        # Plan: decompose task into subtasks
        plan = await self.plan(task)
        
        results = []
        for step in plan.steps:
            worker = self.workers[step.agent_type]
            
            # Execute with retry and timeout
            result = await self._safe_execute(
                worker, step.prompt, 
                max_retries=3, timeout=30
            )
            results.append(result)
        
        # Synthesize final output
        return await self.synthesize(task, results)
    
    async def _safe_execute(self, worker, prompt, **kwargs):
        for attempt in range(kwargs['max_retries']):
            try:
                return await asyncio.wait_for(
                    worker.execute(prompt), 
                    timeout=kwargs['timeout']
                )
            except (TimeoutError, AgentError) as e:
                if attempt == kwargs['max_retries'] - 1:
                    return f"[Agent failed: {e}]"
                await asyncio.sleep(2 ** attempt)`,
          caption: "Orchestrator agent with retry logic and timeout handling"
        },
        callout: { type: "warning", text: "Avoid giving the orchestrator too much autonomy. Unconstrained agent-to-agent routing leads to unpredictable behavior. Define clear routing rules based on task type." },
      },
      {
        id: "s3",
        heading: "Pattern 2: Pipeline / Sequential",
        content: [
          "For deterministic workflows, a sequential pipeline is the most predictable pattern. Each agent processes the output of the previous one. This is ideal for content pipelines: Research → Outline → Draft → Edit → Publish.",
          "The advantage is predictability — you always know which agent is running and what data flows between them. The disadvantage is rigidity — you can't easily handle branching logic or dynamic routing."
        ],
      },
      {
        id: "s4",
        heading: "Tool Use: The Real Differentiator",
        content: [
          "Agent intelligence is determined more by available tools than by the underlying LLM. A GPT-4o agent with no tools is less useful than a GPT-4o-mini agent with well-designed tools for its domain.",
          "Tool design follows the same principles as API design: clear interfaces, good error messages, idempotent operations, and comprehensive documentation (in the tool description that the agent sees)."
        ],
        codeBlock: {
          language: "python",
          code: `@tool
async def search_knowledge_base(
    query: str, 
    top_k: int = 5,
    filters: dict = None
) -> List[SearchResult]:
    """Search the internal knowledge base.
    
    Use this tool when you need factual information from 
    company documents, policies, or procedures.
    
    Args:
        query: Natural language search query. Be specific.
        top_k: Number of results to return (1-20).
        filters: Optional filters like {"department": "engineering"}
    
    Returns:
        List of relevant document chunks with relevance scores.
    """
    return await vector_store.search(
        query, top_k=top_k, filters=filters
    )`,
          caption: "Well-documented tools with clear descriptions improve agent reliability dramatically"
        },
      },
      {
        id: "s5",
        heading: "Memory Management",
        content: [
          "Agent memory is a spectrum from short-term (conversation context) to long-term (persistent knowledge). Production systems typically need both, plus shared memory between agents.",
          "Short-term memory is the conversation buffer — typically the last N turns. Long-term memory is a vector store of past interactions that can be searched. Shared memory is what makes multi-agent systems more than the sum of their parts.",
          "The critical insight: agents should pass structured intermediate results, not raw conversation. When Agent A hands off to Agent B, it should pass a structured summary with key findings, not the full conversation transcript."
        ],
      },
      {
        id: "s6",
        heading: "Production Hard Truths",
        content: [
          "After deploying multi-agent systems in production, here's what I wish I knew earlier:",
          "1. Clear agent boundaries are more important than agent intelligence. Overlapping responsibilities cause confusion and inconsistent behavior.",
          "2. Tool-use reliability matters more than model intelligence. A flaky tool API will cause more problems than a less capable model.",
          "3. Human-in-the-loop is non-negotiable for edge cases. Design your system so agents can escalate to humans gracefully.",
          "4. Observability is critical. You need to trace every decision, tool call, and data flow to debug issues.",
          "5. Start with 2-3 agents, not 10. Complexity grows super-linearly with agent count."  
        ],
        keyTakeaway: "The most reliable multi-agent systems use an Orchestrator-Worker pattern with clear boundaries, well-designed tools, structured inter-agent communication, and human-in-the-loop for edge cases."
      },
    ],
  },
  {
    id: "art-4",
    title: "Distributed Training at Scale: From 1 GPU to 1000",
    excerpt: "Practical guide to distributed training with PyTorch: DDP, FSDP, DeepSpeed, and the infrastructure decisions that determine training throughput.",
    category: "MLOps",
    date: "2024-10-22",
    readTime: "20 min",
    tags: ["Distributed", "Training", "PyTorch"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: true,
    content: [
      {
        id: "s1",
        heading: "The Distributed Training Landscape",
        content: [
          "Training large language models is fundamentally a distributed systems problem. A 70B parameter model with fp16 weights requires 140GB of memory for parameters alone — before gradients, optimizer states, and activations. A single A100 80GB GPU can't even load the weights.",
          "The distributed training ecosystem has converged around three primary approaches: PyTorch Distributed Data Parallel (DDP) for data-parallel training of smaller models, PyTorch Fully Sharded Data Parallel (FSDP) for large-model training with full GPU memory savings, and Microsoft DeepSpeed which offers ZeRO optimization stages and additional features like pipeline parallelism and activation checkpointing.",
          "Choosing between these isn't just a technical decision — it affects your infrastructure costs, debugging experience, and training stability. After scaling training from 1 GPU to 1024 GPUs across multiple projects, I've learned that the framework choice matters less than how you configure it."
        ],
        callout: { type: "info", text: "Before optimizing for distributed training, ensure your single-GPU training loop is efficient. A 2× speedup on single GPU means you need half the GPUs, saving far more than any distributed optimization." },
      },
      {
        id: "s2",
        heading: "DDP: The Reliable Workhorse",
        content: [
          "Distributed Data Parallel is PyTorch's battle-tested approach to data parallelism. Each GPU holds a complete copy of the model, processes a different data batch, and synchronizes gradients via All-Reduce operations after each backward pass. The implementation uses NCCL for efficient GPU-to-GPU communication.",
          "DDP's strength is its simplicity and reliability. Gradient synchronization happens asynchronously with the backward pass, hiding most of the communication overhead. On a well-connected cluster (NVLink or InfiniBand), DDP achieves near-linear scaling up to 8-16 GPUs for models that fit in a single GPU's memory.",
          "The main limitation is memory: every GPU must hold the full model, optimizer states, and activations. For a 7B model with Adam optimizer, you need approximately 56GB per GPU (14GB params + 28GB optimizer + 14GB gradients/activations). This is feasible on A100s but leaves little headroom for larger batch sizes."
        ],
        codeBlock: {
          language: "python",
          code: `# PyTorch DDP setup
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

def setup_distributed(rank, world_size):
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)

def train():
    model = LlamaForCausalLM.from_pretrained("meta-llama/Llama-2-7b")
    model = model.to(rank)
    model = DDP(model, device_ids=[rank])
    
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
    
    for batch in dataloader:
        loss = model(**batch).loss
        loss.backward()       # Gradients sync automatically
        optimizer.step()
        optimizer.zero_grad()`,
          caption: "DDP wraps the model and synchronizes gradients during backward()"
        },
      },
      {
        id: "s3",
        heading: "FSDP and ZeRO: Sharding Everything",
        content: [
          "When models don't fit in a single GPU, you need to shard them across GPUs. PyTorch FSDP (Fully Sharded Data Parallel) and DeepSpeed ZeRO (Zero Redundancy Optimizer) solve this by distributing the model parameters, gradients, and optimizer states across all GPUs.",
          "ZeRO has three progressive stages. Stage 1 shards optimizer states across GPUs (reducing memory by ~4× with Adam). Stage 2 adds gradient sharding (additional ~2× reduction). Stage 3 shards the model parameters themselves, so each GPU only holds a slice of the model and gathers what it needs on-the-fly during computation.",
          "FSDP is PyTorch's native implementation of ZeRO Stage 3 with additional features like automatic wrapping hierarchy and CPU offloading. It requires more configuration than DDP but enables training models that would otherwise be impossible on a given GPU cluster."
        ],
        callout: { type: "warning", text: "ZeRO Stage 3 adds significant communication overhead. Expect 20-40% throughput reduction compared to DDP for the same model size. Only use it when the model genuinely doesn't fit in GPU memory." },
      },
      {
        id: "s4",
        heading: "Gradient Accumulation and Mixed Precision",
        content: [
          "Even with distributed training, you often can't fit the desired effective batch size into GPU memory. Gradient accumulation lets you simulate larger batches by accumulating gradients over multiple forward passes before calling optimizer.step(). This is independent of distributed training but interacts with it in important ways.",
          "Mixed precision training uses fp16 (or bf16) for forward/backward computation while maintaining an fp32 master copy of weights. This cuts memory usage roughly in half and provides 2-3× speedup on Ampere+ GPUs with Tensor Cores. BF16 is generally preferred over FP16 because it has the same exponent range as FP32, eliminating the need for loss scaling.",
          "The combination of gradient accumulation with mixed precision and distributed training is the standard recipe for large-model training. A typical configuration: 8 GPUs × 4 gradient accumulation steps × micro-batch size 2 = effective batch size of 64."
        ],
        codeBlock: {
          language: "python",
          code: `# Mixed precision + gradient accumulation with FSDP
from torch.distributed.fsdp import (
    FullyShardedDataParallel as FSDP,
    MixedPrecision,
    ShardingStrategy,
)

mp_policy = MixedPrecision(
    param_dtype=torch.bfloat16,
    reduce_dtype=torch.bfloat16, 
    buffer_dtype=torch.bfloat16,
)

model = FSDP(
    llama_model,
    sharding_strategy=ShardingStrategy.FULL_SHARD,
    mixed_precision=mp_policy,
    cpu_offload=CPUOffload(offload_params=False),
)

# Gradient accumulation loop
optimizer.zero_grad()
for i, batch in enumerate(dataloader):
    loss = model(**batch).loss / accumulation_steps
    loss.backward()
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()`,
          caption: "FSDP with bf16 mixed precision and gradient accumulation"
        },
      },
      {
        id: "s5",
        heading: "Infrastructure: Network Is the Bottleneck",
        content: [
          "At scale, distributed training is a network problem, not a compute problem. Gradient synchronization via All-Reduce requires every GPU to communicate with every other GPU. On a 1024-GPU cluster, the communication pattern is O(n²) for naive implementations.",
          "The network topology matters enormously. NVLink (within a node) provides 600 GB/s bidirectional bandwidth between GPUs. InfiniBand (between nodes) provides 200-400 Gb/s. Ethernet (common in cloud environments) provides 25-100 Gb/s with higher latency. Training a 70B model on 64 A100s over Ethernet can be 3-5× slower than NVLink-connected A100s.",
          "Practical recommendations: prefer fewer large nodes (8×A100) over many small ones (1×A100 × 64) because intra-node NVLink is 6× faster than inter-node networking. If you must scale across nodes, use InfiniBand and ensure your deep learning framework is configured to exploit the hierarchical network topology."
        ],
      },
      {
        id: "s6",
        heading: "Scaling Checklist: From Prototype to Production",
        content: [
          "Scaling distributed training reliably requires addressing multiple concerns that don't exist in single-GPU training. Here's the checklist I use before every large-scale training run:",
          "1. Validate convergence at small scale first — train for 1000 steps on 1 GPU, then 4 GPUs, then 16. If loss curves diverge at any scale, debug before going bigger.",
          "2. Enable gradient clipping (max_norm=1.0) — distributed training amplifies gradient variance and makes training less stable.",
          "3. Set NCCL environment variables — NCCL_DEBUG=INFO for debugging, NCCL_SOCKET_TIMEOUT for handling hung ranks.",
          "4. Implement robust checkpointing — save full model state every N steps. In a 1000-GPU job, a single GPU failure loses all progress without checkpoints.",
          "5. Monitor GPU utilization and communication time — use torch.profiler or Nsight Systems to identify whether you're compute-bound or communication-bound."
        ],
        keyTakeaway: "Start with DDP for models that fit in GPU memory, move to FSDP/ZeRO Stage 3 only when necessary. Infrastructure choices (NVLink > InfiniBand > Ethernet) often matter more than the training framework. Always validate scaling behavior incrementally."
      },
    ],
  },
  {
    id: "art-5",
    title: "Prompt Engineering Beyond Basics: Systematic Approaches",
    excerpt: "Moving beyond ad-hoc prompting: evaluation frameworks, automated optimization, prompt versioning, and building a prompt engineering practice.",
    category: "Prompt Engineering",
    date: "2024-10-05",
    readTime: "15 min",
    tags: ["Prompts", "Evaluation", "Optimization"],
    hasCode: true,
    hasDiagrams: false,
    hasEquations: false,
    content: [
      {
        id: "s1",
        heading: "The Prompt Engineering Maturity Gap",
        content: [
          "Most teams start prompt engineering the same way: a developer writes a prompt in a chat interface, tests it on a few examples, and ships it. This works for simple tasks but breaks down as the system grows. Prompts become entangled with application logic, regressions go undetected, and nobody knows which version of a prompt is running in production.",
          "The gap between ad-hoc prompting and systematic prompt engineering is analogous to the gap between scripting and software engineering. Both involve writing code, but the systematic approach includes version control, testing, evaluation, and deployment processes that prevent regressions and enable iteration.",
          "After building prompt management systems for production applications processing millions of requests, I've found that the key practices are: evaluation frameworks that correlate with user satisfaction, automated prompt optimization, version-controlled prompt pipelines, and structured prompting techniques like chain-of-thought and few-shot learning."
        ],
      },
      {
        id: "s2",
        heading: "Building an Evaluation Framework",
        content: [
          "You can't optimize what you can't measure. A prompt evaluation framework needs three components: a representative dataset of test cases, automated scoring criteria, and a regression detection mechanism. The test dataset should cover edge cases, common inputs, and adversarial examples.",
          "For classification tasks, accuracy is straightforward. For generative tasks, you need proxy metrics: exact match, semantic similarity (embedding distance), format compliance, and LLM-as-judge scoring. Each metric has trade-offs — exact match is strict but brittle, LLM-as-judge is flexible but expensive and inconsistent.",
          "The most practical approach is a tiered evaluation: fast automated checks (format, length, keyword presence) run on every prompt change, while expensive LLM-as-judge evaluations run on a sampled subset. This gives you fast iteration cycles without sacrificing quality signals."
        ],
        codeBlock: {
          language: "python",
          code: `class PromptEvaluator:
    def __init__(self, test_cases: List[TestCase]):
        self.test_cases = test_cases
        self.scores: List[EvalScore] = []
    
    def evaluate(
        self, 
        prompt_fn: Callable,
        model: str = "gpt-4o"
    ) -> EvalReport:
        for case in self.test_cases:
            output = prompt_fn(case.input, model=model)
            score = EvalScore(
                test_id=case.id,
                format_ok=self._check_format(output, case),
                has_keywords=self._check_keywords(output, case),
                similarity=self._semantic_sim(output, case.expected),
                latency_ms=case.latency_ms,
            )
            self.scores.append(score)
        
        return EvalReport(
            total=len(self.test_cases),
            pass_rate=sum(s.format_ok for s in self.scores) / len(self.scores),
            avg_similarity=np.mean([s.similarity for s in self.scores]),
            scores=self.scores,
        )`,
          caption: "Tiered evaluation with fast automated checks and semantic scoring"
        },
        callout: { type: "tip", text: "Store evaluation results in a database, not just logs. Historical eval scores let you detect slow degradations that single-run evaluations miss." },
      },
      {
        id: "s3",
        heading: "DSPy: Programmatic Prompt Optimization",
        content: [
          "DSPy (from Stanford NLP) represents a paradigm shift in prompt engineering. Instead of manually crafting prompts, you define the input-output signature and let the framework optimize the prompt and few-shot examples automatically. It treats prompt engineering as a machine learning problem.",
          "The workflow is: define a module (like dspy.ChainOfThought or dspy.ReAct), specify a metric function, provide training examples, and call optimize(). DSPy will search over prompt formulations, few-shot examples, and even model parameters to maximize your metric. In practice, DSPy-optimized prompts consistently outperform hand-crafted ones by 5-15% on our benchmarks.",
          "DSPy compiles your declarative module into optimized prompts for specific models. A prompt optimized for GPT-4o looks different from one optimized for Claude 3.5 — DSPy handles this automatically. This model-agnostic optimization is critical for teams deploying across multiple LLM providers."
        ],
        codeBlock: {
          language: "python",
          code: `import dspy

# Define the task signature
class QASignature(dspy.Signature):
    """Answer questions about your documents."""
    context: str = dspy.InputField(desc="Retrieved documents")
    question: str = dspy.InputField(desc="User question")
    answer: str = dspy.OutputField(desc="Concise answer")

# Build the pipeline
class RAGPipeline(dspy.Module):
    def __init__(self):
        self.retrieve = dspy.Retrieve(k=5)
        self.generate = dspy.ChainOfThought(QASignature)
    
    def forward(self, question):
        docs = self.retrieve(question).passages
        return self.generate(context="\\n".join(docs), question=question)

# Optimize with a metric
from dspy.teleprompt import BootstrapFewShot
optimizer = BootstrapFewShot(metric=answer_exact_match, max_bootstrapped_demos=4)
optimized_rag = optimizer.compile(RAGPipeline(), trainset=train_examples)`,
          caption: "DSPy optimizes prompts programmatically instead of manual crafting"
        },
      },
      {
        id: "s4",
        heading: "Chain-of-Thought and Few-Shot Strategies",
        content: [
          "Chain-of-thought (CoT) prompting remains one of the most effective techniques for complex reasoning tasks. The key insight: forcing the model to reason step-by-step before producing an answer dramatically improves accuracy on multi-step problems. Our benchmarks show 15-40% improvement on mathematical reasoning and 10-25% on multi-hop question answering.",
          "The effectiveness of CoT depends heavily on the quality of reasoning examples. Generic 'let's think step by step' works reasonably well, but domain-specific reasoning chains with intermediate verification steps work much better. For a medical diagnosis system, the CoT examples should mirror how a doctor would reason through differential diagnosis.",
          "Few-shot learning and CoT interact: providing 2-3 high-quality examples of correct reasoning is significantly better than providing 10 mediocre ones. The examples serve a dual purpose — they teach the model both what to do and how to think about the problem."
        ],
        callout: { type: "info", text: "For CoT to work well, your few-shot examples should include both the reasoning steps AND common mistakes that the model should avoid. Negative examples are as valuable as positive ones." },
      },
      {
        id: "s5",
        heading: "Prompt Versioning and Deployment",
        content: [
          "Prompts are code. They should be version-controlled, reviewed, tested, and deployed with the same rigor as application code. Yet most teams treat prompts as configuration strings scattered across codebases.",
          "A proper prompt versioning system stores every prompt version with its evaluation scores, the dataset used for testing, and metadata about which model it was optimized for. When you deploy a new prompt version, the system should automatically run the evaluation suite and compare against the previous version's baseline.",
          "The deployment pipeline should support A/B testing and canary deployments. Prompt changes can have non-obvious effects — a prompt that performs 5% better on average might perform 20% worse on a specific user segment. Shadow mode (logging both old and new prompt outputs without serving the new one) is essential for safe prompt iteration."
        ],
      },
      {
        id: "s6",
        heading: "Building a Prompt Engineering Practice",
        content: [
          "The most impactful organizational change is creating a shared prompt library with versioning, evaluation results, and usage documentation. When a new engineer needs to build a classification prompt, they should find a battle-tested template with known performance characteristics — not start from scratch.",
          "Prompt engineering is an iterative, empirical process. The teams that get the best results treat it as a continuous improvement cycle: deploy → measure → analyze failures → improve prompt → repeat. Each iteration should be documented so the team builds institutional knowledge about what works.",
          "Invest in tooling early. A simple prompt registry with evaluation tracking prevents the most common failure modes: lost prompts, unknown versions in production, and unmeasured regressions. The ROI is enormous — we've seen 3× faster iteration speed and 40% fewer prompt-related incidents after implementing systematic prompt management."
        ],
        keyTakeaway: "Treat prompts as code with version control, automated evaluation, and staged deployment. Use DSPy for programmatic optimization and chain-of-thought with curated few-shot examples for complex reasoning. The organizational practice matters as much as the individual techniques."
      },
    ],
  },
  {
    id: "art-6",
    title: "LLM Infrastructure: Serving Models in Production",
    excerpt: "The complete guide to LLM serving: vLLM, TGI, model quantization, batching strategies, and achieving sub-100ms inference latency.",
    category: "LLM Engineering",
    date: "2024-09-18",
    readTime: "28 min",
    tags: ["LLM", "Serving", "Infrastructure"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: false,
    content: [
      {
        id: "s1",
        heading: "Why LLM Serving Is Hard",
        content: [
          "Serving LLMs in production is fundamentally different from traditional ML model serving. The autoregressive generation process means latency is dominated by the sequential decoding loop — each token depends on all previous tokens. A 70B model generating 500 tokens requires 500 sequential forward passes through 80+ transformer layers.",
          "The core tension in LLM serving is throughput versus latency. Batching multiple requests together improves GPU utilization and throughput, but adds queuing delay to each request. Dynamic batching helps, but the batching window itself adds latency. Every production deployment must find the right balance for its specific workload.",
          "This guide covers the three pillars of production LLM serving: the serving frameworks (vLLM, TGI, TensorRT-LLM), quantization methods (GPTQ, AWQ, GGUF) that reduce memory and compute requirements, and batching strategies that maximize throughput while meeting latency SLAs. We'll also cover the metrics that actually matter: P50, P95, and P99 latency, time-to-first-token, and tokens-per-second."
        ],
        callout: { type: "warning", text: "Never deploy an LLM serving endpoint without setting explicit latency SLOs. Without SLOs, you'll optimize for throughput at the expense of user experience. Define your P99 latency target before choosing infrastructure." },
      },
      {
        id: "s2",
        heading: "vLLM: High-Throughput Serving with PagedAttention",
        content: [
          "vLLM has become the de facto standard for open-source LLM serving. Its key innovation is PagedAttention, which manages the KV cache with virtual memory paging — allocating memory in fixed-size blocks instead of pre-allocating for the maximum sequence length. This eliminates memory waste from over-allocation and fragmentation.",
          "In production benchmarks, vLLM achieves 2-4× higher throughput than HuggingFace Transformers for the same model and hardware. The improvement comes from three sources: PagedAttention's efficient memory management, continuous batching (adding new requests to a running batch as slots become available), and optimized CUDA kernels for attention and sampling.",
          "vLLM supports tensor parallelism for multi-GPU serving, speculative decoding for latency reduction, and a comprehensive OpenAI-compatible API. It's our default choice for new deployments unless there's a specific reason to use an alternative."
        ],
        codeBlock: {
          language: "python",
          code: `from vllm import LLM, SamplingParams

# Production vLLM configuration
llm = LLM(
    model="meta-llama/Meta-Llama-3-70B-Instruct",
    tensor_parallel_size=4,       # 4×A100 80GB
    gpu_memory_utilization=0.92,  # Aggressive but safe
    max_model_len=4096,           # Match your workload
    enforce_eager=True,           # Disable CUDA graph for debugging
    max_num_batched_tokens=32768, # Batching budget
    max_num_seqs=128,             # Max concurrent requests
)

# Sampling parameters per use case
chat_params = SamplingParams(
    temperature=0.6,
    top_p=0.9,
    max_tokens=512,
    stop=["<|end_of_text|>", "<|eot_id|>"],
)

structured_params = SamplingParams(
    temperature=0.0,  # Deterministic for structured output
    max_tokens=256,
)

outputs = llm.generate(["Hello, how are you?"], chat_params)`,
          caption: "Production vLLM configuration with batching and sampling parameters"
        },
      },
      {
        id: "s3",
        heading: "TGI and TensorRT-LLM: Alternative Frameworks",
        content: [
          "HuggingFace Text Generation Inference (TGI) is the other major open-source serving framework. TGI's strengths include excellent integration with the HuggingFace ecosystem (model hub, tokenizers, quantization methods), built-in watermarking, guided decoding for structured outputs, and tensor parallelism via custom CUDA kernels.",
          "TensorRT-LLM is NVIDIA's optimization framework that compiles models into highly optimized TensorRT engines. It provides the best raw performance on NVIDIA GPUs — typically 20-40% better than vLLM for throughput — but requires a compilation step that takes 30-90 minutes and produces engine files that are GPU-architecture-specific.",
          "The practical choice: use vLLM for most deployments (best balance of performance, ease of use, and community support), TGI when you need HuggingFace ecosystem integration or guided decoding, and TensorRT-LLM when you're deploying at very high scale on NVIDIA GPUs and can afford the compilation overhead."
        ],
        callout: { type: "tip", text: "Test both vLLM and TGI with your specific model and workload. The performance gap varies significantly by model architecture and request distribution. We've seen cases where TGI outperforms vLLM by 30% and vice versa." },
      },
      {
        id: "s4",
        heading: "Quantization: GPTQ, AWQ, and GGUF",
        content: [
          "Quantization reduces the precision of model weights from fp16 (2 bytes per parameter) to int8 (1 byte), int4 (0.5 bytes), or even lower. This directly reduces memory requirements and can improve inference speed due to reduced memory bandwidth. A 70B model in fp16 needs 140GB; in 4-bit it needs ~35GB — fitting on a single A100.",
          "GPTQ (GPT Quantization) is a post-training quantization method that minimizes the error from weight quantization by solving a layer-by-layer optimization problem. AWQ (Activation-Aware Weight Quantization) observes that only ~1% of weight channels are critical for model quality and protects them during quantization. Both achieve near-lossless quality at 4-bit for most models.",
          "GGUF is the format used by llama.cpp for CPU and mixed CPU-GPU inference. It supports quantization levels from Q2_K (very aggressive, significant quality loss) to Q8_0 (nearly lossless). GGUF is essential for edge deployment and local inference where GPU memory is limited. The sweet spot is usually Q4_K_M — good quality with 3.5× memory reduction."
        ],
        codeBlock: {
          language: "python",
          code: `# Loading quantized models in vLLM
from vllm import LLM

# AWQ quantized model (best quality-speed tradeoff for GPU)
llm_awq = LLM(
    model="meta-llama/Meta-Llama-3-70B-Instruct-AWQ",
    quantization="awq",
    tensor_parallel_size=2,  # 70B AWQ fits in 2×A100
)

# GPTQ quantized model
llm_gptq = LLM(
    model="TheBloke/Llama-2-70B-Chat-GPTQ",
    quantization="gptq",
    tensor_parallel_size=2,
)

# Memory comparison (70B model):
# FP16:  ~140 GB → 4 GPUs minimum
# AWQ-4: ~37 GB  → 1 GPU (A100 80GB)
# GPTQ-4: ~38 GB → 1 GPU (A100 80GB)
# Speed: AWQ and GPTQ are 1.3-1.8× faster than FP16
#         due to reduced memory bandwidth`,
          caption: "Quantization reduces GPU requirements by 3-4× with minimal quality loss"
        },
      },
      {
        id: "s5",
        heading: "Batching Strategies and Latency Optimization",
        content: [
          "Continuous batching is the most important serving optimization. Unlike static batching (wait for N requests, process all, return all), continuous batching adds new requests to the batch as soon as a slot opens up from a completed request. This maximizes GPU utilization while keeping latency low for each individual request.",
          "The key configuration knobs are: batch size (how many requests to process simultaneously), maximum batched tokens (total token budget per batch iteration), and scheduling policy (FCFS vs. priority-based). A common production configuration: max_num_seqs=64, max_num_batched_tokens=16384, which means on average ~256 tokens per request in the batch.",
          "For latency optimization, the most impactful techniques are: (1) speculative decoding using a small draft model to predict tokens in parallel, achieving 2-3× speedup on the decode phase, (2) prefix caching for repeated system prompts, and (3) reducing max_model_len to your actual workload maximum — longer context windows consume KV cache memory that could be used for more concurrent requests."
        ],
      },
      {
        id: "s6",
        heading: "Production Operations and Metrics",
        content: [
          "The metrics that matter for LLM serving are different from traditional APIs. You need to track: Time-to-First-Token (TTFT) which measures prompt processing latency, Inter-Token-Latency (ITL) for generation speed, end-to-end latency for the full request, and throughput in tokens per second per GPU.",
          "Set up alerts on P99 latency, not just P50. A system with good P50 (200ms TTFT) but bad P99 (5s TTFT) will frustrate users. The P99 is driven by tail events: garbage collection pauses, queueing from request bursts, and cold starts after model reloading. Each of these needs specific mitigation strategies.",
          "Autoscaling for LLM serving is fundamentally different from traditional web services. GPU instances take 2-5 minutes to provision and 1-2 minutes to load a model. You can't rely on reactive autoscaling — you need predictive scaling based on traffic patterns and pre-warmed instances ready to handle traffic spikes."
        ],
        keyTakeaway: "Use vLLM with PagedAttention as your default serving framework, AWQ quantization to reduce GPU requirements by 3-4×, and continuous batching to maximize throughput. Define P99 latency SLOs before optimizing, and implement predictive autoscaling for traffic variability."
      },
    ],
  },
  {
    id: "art-7",
    title: "Vector Databases Compared: Pinecone vs Weaviate vs Qdrant",
    excerpt: "Benchmarking vector databases across 10M+ vectors: indexing speed, query latency, recall accuracy, and total cost of ownership.",
    category: "RAG",
    date: "2024-09-01",
    readTime: "16 min",
    tags: ["Vector DB", "Benchmarks", "Search"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: false,
    content: [
      {
        id: "s1",
        heading: "Why Vector DB Benchmarks Matter for RAG",
        content: [
          "Every RAG system's quality depends on retrieval quality, and retrieval quality depends on the vector database. A retrieval system with 95% recall at top-10 will consistently produce better answers than one with 85% recall — even with the same LLM. Yet most teams choose their vector database based on marketing claims or developer familiarity rather than systematic benchmarking.",
          "The three most popular vector databases — Pinecone (managed), Weaviate (hybrid), and Qdrant (performance-focused) — have very different architectures and trade-offs. Pinecone is a fully managed service that prioritizes ease of use. Weaviate offers built-in hybrid search combining vector and keyword search. Qdrant is a Rust-based engine optimized for raw performance.",
          "We ran a comprehensive benchmark across these three databases using a realistic RAG workload: 10M vectors of 1536 dimensions (OpenAI text-embedding-3-small), with queries testing both exact and approximate nearest neighbor search at different recall targets. Here's what we found."
        ],
        callout: { type: "info", text: "These benchmarks reflect performance as of Q4 2024. Vector database performance improves rapidly with each release. Always run your own benchmarks with your specific workload before making a decision." },
      },
      {
        id: "s2",
        heading: "Benchmarking Methodology",
        content: [
          "Benchmarking vector databases correctly is harder than it seems. The three critical dimensions are: indexing speed (how fast you can ingest vectors), query latency (P50/P95/P99 at a given recall target), and recall accuracy (what fraction of true nearest neighbors appear in the results). You can't optimize all three simultaneously — higher recall requires more computation, increasing latency and reducing throughput.",
          "Our test dataset consisted of 10M vectors from Wikipedia article embeddings (text-embedding-3-small, 1536 dimensions). We used 10,000 held-out query vectors with ground-truth nearest neighbors computed via brute-force search. Each benchmark was run on equivalent hardware (c6a.4xlarge for self-hosted, comparable tier for Pinecone) with 5 warm-up queries discarded before measurement.",
          "The recall vs. latency tradeoff is the most important curve. We measure recall@10 at different ef_search/hnsw_ef parameters. A practical RAG system needs recall@10 > 0.92 — below this, the missing relevant documents noticeably degrade answer quality. Our benchmarks target this minimum recall threshold."
        ],
        codeBlock: {
          language: "python",
          code: `import qdrant_client
from qdrant_client.models import Distance, VectorParams, PointStruct
import numpy as np
import time

# Benchmark harness
def benchmark_qdrant(vectors, queries, ground_truth, dim=1536):
    client = qdrant_client.QdrantClient(":memory:")
    client.create_collection(
        "bench",
        vectors_config=VectorParams(size=dim, distance=Distance.COSINE),
        hnsw_config={"ef_construct": 128, "m": 32},
    )
    
    # Indexing speed
    start = time.perf_counter()
    client.upsert("bench", [
        PointStruct(id=i, vector=v.tolist())
        for i, v in enumerate(vectors)
    ])
    index_time = time.perf_counter() - start
    
    # Query latency + recall at different ef values
    results = {}
    for ef in [32, 64, 128, 256]:
        latencies = []
        recalls = []
        for q, gt in zip(queries, ground_truth):
            t0 = time.perf_counter()
            hits = client.search("bench", q.tolist(), limit=10,
                                 search_params={"hnsw_ef": ef})
            latencies.append(time.perf_counter() - t0)
            found = set(h.id for h in hits)
            recalls.append(len(found & gt) / len(gt))
        results[ef] = {
            "p50_ms": np.median(latencies) * 1000,
            "recall": np.mean(recalls),
        }
    return index_time, results`,
          caption: "Vector DB benchmark harness measuring indexing speed and recall@10 vs latency"
        },
      },
      {
        id: "s3",
        heading: "Indexing Speed: Qdrant Leads, Pinecone Simplifies",
        content: [
          "Indexing 10M vectors of 1536 dimensions, Qdrant was the fastest at 4.2 minutes, followed by Weaviate at 5.8 minutes, and Pinecone at approximately 8 minutes (network-dependent). For initial bulk loading, Qdrant's Rust-based engine and batched upsert API provide a clear advantage.",
          "However, indexing speed matters most during initial setup or large-scale reindexing. For ongoing incremental updates (adding a few thousand vectors per day), all three databases perform adequately. The indexing speed difference only matters if you need to rebuild your index frequently — for example, when changing embedding models.",
          "Pinecone's advantage is that you don't manage the indexing at all. The managed service handles infrastructure provisioning, scaling, and maintenance. For teams without dedicated infrastructure engineers, this operational simplicity often outweighs raw performance advantages."
        ],
      },
      {
        id: "s4",
        heading: "Query Latency and Recall Accuracy",
        content: [
          "At the 0.92 recall@10 target that RAG systems need, Qdrant achieves P50 query latency of 2.1ms and P99 of 8.4ms. Weaviate is close at 2.8ms P50 and 11.2ms P99. Pinecone's managed service shows 4.5ms P50 and 18ms P99 due to network overhead between your application and Pinecone's infrastructure.",
          "The latency differences become more pronounced under load. At 100 concurrent queries per second, Qdrant maintains its P50 latency while Weaviate shows a 30% increase and Pinecone shows a 50% increase. This is expected — self-hosted solutions have lower and more predictable network latency.",
          "One important nuance: recall at equivalent ef_search parameters varies between databases due to different HNSW implementation details. Qdrant and Weaviate both achieve 0.95+ recall@10 at ef=128, while Pinecone achieves equivalent recall at its default configuration. The key takeaway is that all three can achieve high recall — the question is the latency cost of doing so."
        ],
        callout: { type: "tip", text: "Always benchmark with your actual query distribution, not synthetic data. Real queries tend to be more clustered and have different distance distributions than random benchmark queries, which can significantly affect relative performance." },
      },
      {
        id: "s5",
        heading: "Total Cost of Ownership",
        content: [
          "TCO is where the comparison gets interesting. For 10M vectors with production-level availability, Pinecone's managed service costs approximately $800-1200/month (Standard tier, depending on pod type). Self-hosting Qdrant or Weaviate on equivalent cloud infrastructure costs $300-500/month for compute, but adds $200-400/month in engineering overhead for maintenance, monitoring, and scaling.",
          "At 100M vectors, the cost gap widens. Pinecone scales to $4000-6000/month, while self-hosted solutions scale to $1500-2500/month in infrastructure. However, the engineering overhead for self-hosting at 100M vectors increases significantly — you need dedicated ops engineers for scaling, backups, and disaster recovery.",
          "The breakeven point depends on your team size and expertise. For small teams (1-3 engineers) with 1-10M vectors, Pinecone's managed service is usually cheaper when accounting for engineering time. For larger teams (5+ engineers) with 10M+ vectors, self-hosting Qdrant typically wins on TCO by 40-60%."
        ],
      },
      {
        id: "s6",
        heading: "Decision Framework: Which One to Choose",
        content: [
          "Based on our benchmarks and production experience across multiple RAG deployments, here's our decision framework:",
          "Choose Pinecone if: you have a small team, want zero operational overhead, need managed scaling, and your vector count is under 50M. The developer experience is excellent — from Python SDK to serverless functions to metadata filtering — everything just works.",
          "Choose Qdrant if: you need the best query latency, have infrastructure engineering capacity, vector count is 10M+, or you need fine-grained control over HNSW parameters. Qdrant's filtering performance is also notably better for complex metadata queries.",
          "Choose Weaviate if: you need hybrid search (vector + BM25 keyword) built-in, want GraphQL and REST APIs, or need multi-modal search out of the box. Weaviate's hybrid search is its killer feature — it consistently outperforms vector-only search for text retrieval tasks by 5-10% on retrieval quality metrics."
        ],
        keyTakeaway: "Qdrant leads on raw performance (2.1ms P50, 8.4ms P99 at 0.92 recall), Pinecone wins on operational simplicity for small teams, and Weaviate differentiates with built-in hybrid search. For most production RAG systems with 10M+ vectors and engineering capacity, self-hosted Qdrant provides the best combination of performance and cost."
      },
    ],
  },
  {
    id: "art-8",
    title: "Building Reliable AI Products: Testing & Evaluation",
    excerpt: "A framework for testing AI systems: unit tests for prompts, integration tests for pipelines, and evaluation metrics that correlate with user satisfaction.",
    category: "Product Engineering",
    date: "2024-08-15",
    readTime: "19 min",
    tags: ["Testing", "Evaluation", "Quality"],
    hasCode: true,
    hasDiagrams: true,
    hasEquations: false,
    content: [
      {
        id: "s1",
        heading: "The AI Testing Problem",
        content: [
          "Testing AI systems is fundamentally different from testing deterministic software. A traditional unit test checks if f(x) = y for specific inputs. For an AI system, the output is probabilistic — the same input can produce different valid outputs. You can't assert exact equality; you need to assert that the output satisfies quality constraints.",
          "This probabilistic nature means AI testing requires a different mental model. Instead of testing individual code paths, you test distributions of outputs. Instead of asserting exact values, you assert statistical properties. The test suite for an AI system looks more like a quality assurance pipeline than a traditional test suite.",
          "After building testing frameworks for AI products handling millions of users, I've developed a three-layer testing pyramid: prompt unit tests (fast, cheap, run on every commit), pipeline integration tests (medium cost, run on PRs), and full evaluation suites (expensive, run nightly and before releases). Each layer catches different classes of bugs."
        ],
        callout: { type: "warning", text: "The biggest mistake teams make is only testing at the evaluation layer. Evaluation suites catch quality regressions but are too slow and expensive for fast iteration. Prompt unit tests provide the fast feedback loop that enables daily development." },
      },
      {
        id: "s2",
        heading: "Layer 1: Prompt Unit Tests",
        content: [
          "Prompt unit tests verify that a prompt produces outputs meeting specific constraints for a set of inputs. They don't test quality — they test correctness of format, structure, and basic content requirements. A prompt unit test checks: does the output contain the required sections? Does it follow the specified format (JSON, markdown)? Does it stay within length limits?",
          "These tests are fast because they use a small, cheap model (GPT-4o-mini or Claude 3 Haiku) instead of the production model. The assumption is that if a prompt produces correctly-formatted output on a small model, it will likely do so on the production model too. This reduces per-test cost from ~$0.01 to ~$0.0001, enabling hundreds of tests to run in seconds.",
          "The key design principle is that prompt unit tests should be deterministic in their assertions, even though the model output is not. Instead of asserting 'output == expected_output', assert 'all required fields are present', 'output is valid JSON', 'output does not contain forbidden phrases', or 'output passes a lightweight semantic check'."
        ],
        codeBlock: {
          language: "python",
          code: `import pytest

class TestSummarizationPrompt:
    """Unit tests for the summarization prompt template."""
    
    @pytest.fixture
    def prompt(self):
        return load_prompt("summarization_v3")
    
    @pytest.fixture
    def eval_model(self):
        return "gpt-4o-mini"  # Fast, cheap for unit tests
    
    def test_output_is_valid_json(self, prompt, eval_model):
        output = call_llm(prompt, INPUT_SAMPLE, model=eval_model)
        json.loads(output)  # Raises if invalid
    
    def test_output_has_required_sections(self, prompt, eval_model):
        output = call_llm(prompt, INPUT_SAMPLE, model=eval_model)
        assert "summary" in output.lower()
        assert "key_points" in output.lower()
    
    def test_output_within_length_limit(self, prompt, eval_model):
        output = call_llm(prompt, INPUT_SAMPLE, model=eval_model)
        assert len(output) < 500
    
    def test_no_hallucinated_facts(self, prompt, eval_model):
        output = call_llm(prompt, INPUT_SAMPLE, model=eval_model)
        claims = extract_claims(output)
        for claim in claims:
            assert verify_claim(claim, INPUT_SAMPLE)`,
          caption: "Prompt unit tests using pytest with fast model for fast feedback"
        },
      },
      {
        id: "s3",
        heading: "Layer 2: Pipeline Integration Tests",
        content: [
          "Pipeline integration tests verify that the entire AI pipeline works correctly end-to-end: from user input through preprocessing, retrieval, prompt construction, model inference, post-processing, and output delivery. These tests catch bugs that prompt unit tests miss: retrieval failures, format mismatches between pipeline stages, and error handling gaps.",
          "A good integration test uses a small set of representative inputs (10-50 cases) that cover the main usage patterns and known edge cases. Each test runs the full pipeline with mocks for external dependencies (LLM API, vector DB) or against a dedicated test environment. The assertion is that the pipeline completes without errors and produces output meeting structural requirements.",
          "Integration tests are where you test error handling: what happens when the LLM returns malformed JSON? When the vector DB returns zero results? When the input exceeds the context window? These failure modes are common in production and must be handled gracefully. We use chaos testing principles — deliberately injecting failures to verify the pipeline degrades gracefully."
        ],
        callout: { type: "tip", text: "Mock the LLM in integration tests using recorded responses. This makes tests deterministic and fast (~50ms vs ~2s per test). Keep a library of recorded responses for different scenarios and update them when prompt behavior intentionally changes." },
      },
      {
        id: "s4",
        heading: "Layer 3: Evaluation Suites",
        content: [
          "The evaluation suite is the gold standard for measuring AI product quality. It runs the full pipeline with the production model on a comprehensive dataset (100-1000+ examples) and computes quality metrics. This is where you measure the things that actually matter to users: answer accuracy, relevance, completeness, and helpfulness.",
          "Building an evaluation dataset is the most important investment. The dataset should be representative of real user queries, include edge cases and adversarial examples, and have ground-truth labels for objective metrics. We maintain evaluation datasets with three tiers: a small 'smoke test' set (50 examples, runs on every PR), a medium regression set (200 examples, runs nightly), and a comprehensive set (1000+ examples, runs before releases).",
          "The evaluation metrics should correlate with user satisfaction. We've found that a combination of factual accuracy (does the answer contain correct information?), completeness (does it address all aspects of the query?), and instruction following (does it follow formatting and style requirements?) correlates at r=0.82 with user thumbs-up/down ratings."
        ],
        codeBlock: {
          language: "python",
          code: `class EvaluationSuite:
    def __init__(self, dataset: EvalDataset, model: str):
        self.dataset = dataset
        self.model = model
        self.results: List[EvalResult] = []
    
    def run(self) -> EvalReport:
        for example in self.dataset.examples:
            output = self.pipeline.run(example.input)
            
            result = EvalResult(
                example_id=example.id,
                factual_accuracy=self._check_facts(
                    output, example.reference
                ),
                completeness=self._check_completeness(
                    output, example.required_aspects
                ),
                format_compliance=self._check_format(
                    output, example.format_spec
                ),
                latency_ms=example.latency_ms,
            )
            self.results.append(result)
        
        return EvalReport(
            model=self.model,
            num_examples=len(self.dataset),
            accuracy=np.mean([r.factual_accuracy for r in self.results]),
            completeness=np.mean([r.completeness for r in self.results]),
            p95_latency=np.percentile(
                [r.latency_ms for r in self.results], 95
            ),
        )`,
          caption: "Evaluation suite measuring factual accuracy, completeness, and format compliance"
        },
      },
      {
        id: "s5",
        heading: "Regression Detection and Continuous Evaluation",
        content: [
          "The most valuable use of evaluation suites is regression detection. When you change a prompt, update a model, or modify the retrieval pipeline, you need to know if the change improved or hurt quality. Continuous evaluation automates this: every change triggers the evaluation suite and compares results against the previous baseline.",
          "We use a simple but effective regression policy: any change that reduces accuracy by more than 2 percentage points or completeness by more than 3 percentage points requires explicit approval before merging. Changes within these thresholds are allowed to proceed, enabling fast iteration while catching significant regressions.",
          "Evaluation results should be tracked over time in a dashboard. This lets you see trends: is quality improving or degrading over time? Are there seasonal patterns? Did a specific model update cause a step change? Without this historical view, you're flying blind — you can't tell if today's quality is better or worse than last month's."
        ],
      },
      {
        id: "s6",
        heading: "Building a Testing Culture for AI",
        content: [
          "Testing AI systems requires a cultural shift. Engineers accustomed to deterministic testing need to embrace probabilistic thinking. QA teams need new skills in curating evaluation datasets and defining quality metrics. Product managers need to understand that 'quality' in AI is a distribution, not a binary.",
          "The practical steps to build this culture: (1) Start with prompt unit tests — they're the easiest to adopt and provide immediate value. (2) Invest in a shared evaluation dataset that the whole team contributes to. (3) Make evaluation results visible — post them in PR comments, track them in dashboards. (4) Celebrate quality improvements, not just feature launches.",
          "The ROI of AI testing is substantial but often overlooked. We've measured a 60% reduction in prompt-related production incidents and a 3× increase in deployment frequency after implementing the three-layer testing framework. More importantly, the confidence to iterate quickly on prompts — knowing that regressions will be caught — is what enables continuous quality improvement."
        ],
        keyTakeaway: "Adopt a three-layer testing pyramid: prompt unit tests (fast, cheap, every commit), pipeline integration tests (medium cost, every PR), and evaluation suites (comprehensive, before releases). Track evaluation metrics over time to catch slow degradations and measure improvement. The testing culture matters as much as the testing tools."
      },
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "tl-1",
    year: "2024",
    role: "Senior AI Engineer",
    company: "Nexus AI",
    description: "Leading the AI platform team, building production ML infrastructure serving 10M+ users.",
    highlights: ["Built multi-agent system handling 50K queries/day", "Reduced inference costs by 65%", "Published 3 research papers", "Grew team from 3 to 12 engineers"],
    type: "work",
    metrics: ["50K daily queries", "65% cost reduction", "12 team members"],
  },
  {
    id: "tl-2",
    year: "2024",
    role: "NeurIPS Workshop Paper",
    company: "Attention-Efficient Transformers for Production",
    description: "Presented novel attention mechanism reducing memory usage by 40% without quality degradation.",
    highlights: ["Accepted at NeurIPS 2024 Workshop", "Open-sourced implementation", "Adopted by 3 production systems"],
    type: "publication",
  },
  {
    id: "tl-3",
    year: "2023",
    role: "AI Engineer",
    company: "DataScale",
    description: "Built ML platform and deployed 50+ models to production across the organization.",
    highlights: ["Designed ML platform serving 200+ models", "Automated training pipeline reducing deploy time 80%", "Keynote at internal engineering summit"],
    type: "work",
    metrics: ["200+ models", "80% faster deploys", "99.9% uptime"],
  },
  {
    id: "tl-4",
    year: "2023",
    role: "Conference Talk",
    company: "MLOps Conf Europe",
    description: "Talk on 'Production RAG: Lessons from 1 Million Queries' — architectural patterns and anti-patterns.",
    highlights: ["500+ attendees", "Top-rated talk", "Led to 2 enterprise partnerships"],
    type: "talk",
  },
  {
    id: "tl-2b",
    year: "2022",
    role: "ML Engineer",
    company: "TechCorp",
    description: "Developed recommendation systems and NLP pipelines for the core product.",
    highlights: ["Improved recommendation CTR by 35%", "Built NLP pipeline processing 1M+ documents", "Mentored 5 junior engineers"],
    type: "work",
    metrics: ["35% CTR improvement", "1M+ documents processed"],
  },
  {
    id: "tl-5",
    year: "2022",
    role: "Best Paper Award",
    company: "ICML Workshop",
    description: "Awarded best paper for work on efficient fine-tuning methods for large language models.",
    highlights: ["Best Paper Award", "Cited 200+ times", "Method adopted by major companies"],
    type: "award",
  },
  {
    id: "tl-6",
    year: "2021",
    role: "ML Research Intern → ML Engineer",
    company: "TechCorp",
    description: "Started as research intern, transitioned to full-time ML engineering role.",
    highlights: ["Published first research paper", "Built prototype recommendation system", "Converted to full-time after 3 months"],
    type: "work",
  },
];

export const techStack: TechItem[] = [
  // Languages
  { name: "Python", category: "Languages", icon: "🐍", connections: ["PyTorch", "FastAPI", "LangChain"] },
  { name: "TypeScript", category: "Languages", icon: "🔷", connections: ["Next.js", "Node.js", "React"] },
  { name: "Rust", category: "Languages", icon: "🦀", connections: ["Vector Search", "High Performance"] },
  { name: "Go", category: "Languages", icon: "🔵", connections: ["Kubernetes", "Microservices"] },

  // Frameworks
  { name: "PyTorch", category: "Frameworks", icon: "🔥", connections: ["Python", "Transformers", "Distributed Training"] },
  { name: "FastAPI", category: "Frameworks", icon: "⚡", connections: ["Python", "REST APIs", "ML Serving"] },
  { name: "LangChain", category: "Frameworks", icon: "🔗", connections: ["Python", "LLMs", "RAG"] },
  { name: "Next.js", category: "Frameworks", icon: "▲", connections: ["TypeScript", "React", "Web"] },

  // LLMs
  { name: "GPT-4o", category: "LLMs", icon: "🧠", connections: ["OpenAI", "Agents", "RAG"] },
  { name: "Claude", category: "LLMs", icon: "🤖", connections: ["Anthropic", "Agents", "Analysis"] },
  { name: "Llama 3", category: "LLMs", icon: "🦙", connections: ["Meta", "Fine-tuning", "Open Source"] },
  { name: "Gemini", category: "LLMs", icon: "💎", connections: ["Google", "Multimodal", "Agents"] },

  // Cloud
  { name: "AWS", category: "Cloud", icon: "☁️", connections: ["EKS", "SageMaker", "S3"] },
  { name: "GCP", category: "Cloud", icon: "🌐", connections: ["Vertex AI", "GKE", "BigQuery"] },
  { name: "Vercel", category: "Cloud", icon: "▲", connections: ["Next.js", "Edge Functions", "Web"] },

  // Databases
  { name: "PostgreSQL", category: "Databases", icon: "🐘", connections: ["Relational", "pgvector"] },
  { name: "Redis", category: "Databases", icon: "🔴", connections: ["Caching", "Queue", "Sessions"] },
  { name: "MongoDB", category: "Databases", icon: "🍃", connections: ["Document", "Flexibility"] },

  // Vector DBs
  { name: "Pinecone", category: "Vector DBs", icon: "🌲", connections: ["Managed", "Scale", "RAG"] },
  { name: "Qdrant", category: "Vector DBs", icon: "🟡", connections: ["Open Source", "Rust", "Performance"] },
  { name: "Weaviate", category: "Vector DBs", icon: "🔵", connections: ["Multi-modal", "GraphQL"] },

  // DevOps
  { name: "Docker", category: "DevOps", icon: "🐳", connections: ["Containers", "Kubernetes"] },
  { name: "Kubernetes", category: "DevOps", icon: "☸️", connections: ["Docker", "EKS", "GKE"] },
  { name: "Terraform", category: "DevOps", icon: "🏗️", connections: ["IaC", "AWS", "GCP"] },

  // MLOps
  { name: "MLflow", category: "MLOps", icon: "📊", connections: ["Experiments", "Models", "Registry"] },
  { name: "Weights & Biases", category: "MLOps", icon: "📈", connections: ["Experiments", "Visualization", "Teams"] },
  { name: "vLLM", category: "MLOps", icon: "🚀", connections: ["Serving", "LLM", "Performance"] },
];

export const newsletterTopics = [
  "Weekly AI Engineering Insights",
  "Production AI Lessons",
  "Architecture Breakdowns",
  "Open Source Updates",
  "New Research Summaries",
];

export const playgroundDemos = [
  { id: "demo-llm", title: "LLM Chat", description: "Conversational AI with streaming responses", icon: "MessageSquare", color: "cyan" },
  { id: "demo-rag", title: "RAG Demo", description: "Retrieval-augmented generation with source citations", icon: "Search", color: "purple" },
  { id: "demo-image", title: "Image Generation", description: "Text-to-image with diffusion models", icon: "Image", color: "blue" },
  { id: "demo-voice", title: "Voice AI", description: "Speech-to-text and text-to-speech pipeline", icon: "Mic", color: "green" },
  { id: "demo-vector", title: "Vector Search", description: "Semantic search across documents", icon: "Database", color: "amber" },
  { id: "demo-agents", title: "AI Agents", description: "Multi-agent task orchestration", icon: "Bot", color: "purple" },
  { id: "demo-prompt", title: "Prompt Sandbox", description: "Experiment with prompt engineering", icon: "Code", color: "cyan" },
];

export const blogCategories = [
  "All",
  "LLM Engineering",
  "AI Agents",
  "RAG",
  "MLOps",
  "Distributed Systems",
  "Deep Learning",
  "Prompt Engineering",
  "Product Engineering",
];

export const colorMap = {
  cyan: {
    bg: "rgba(6, 182, 212, 0.1)",
    border: "rgba(6, 182, 212, 0.2)",
    text: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  purple: {
    bg: "rgba(168, 85, 247, 0.1)",
    border: "rgba(168, 85, 247, 0.2)",
    text: "#A855F7",
    glow: "rgba(168, 85, 247, 0.15)",
  },
  blue: {
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.2)",
    text: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  green: {
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.2)",
    text: "#10B981",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.2)",
    text: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.15)",
  },
};