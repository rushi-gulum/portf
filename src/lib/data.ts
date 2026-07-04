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