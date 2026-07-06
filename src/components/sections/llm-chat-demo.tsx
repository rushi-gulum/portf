'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, SendHorizontal, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('attention') || lower.includes('transformer')) {
    return "The attention mechanism is the core innovation behind Transformers. It allows models to weigh the importance of different tokens in a sequence relative to each other. Multi-head attention computes multiple attention distributions in parallel, enabling the model to capture different types of relationships. The formula: Attention(Q,K,V) = softmax(QK^T / √d_k)V.";
  }

  if (lower.includes('rag') || lower.includes('retrieval')) {
    return "RAG (Retrieval-Augmented Generation) combines a retrieval system with an LLM. First, the user query is embedded and used to search a vector database for relevant documents. Those documents are then injected into the LLM's context as additional knowledge. This approach reduces hallucinations and enables the model to reference up-to-date or proprietary information without retraining.";
  }

  if (lower.includes('agent')) {
    return "AI agents are systems that use LLMs as reasoning engines to plan, use tools, and execute multi-step tasks. They typically follow a ReAct (Reason + Act) loop: think about what to do, take an action (API call, code execution, web search), observe the result, and repeat until the task is complete. Frameworks like LangChain and AutoGPT build on this pattern.";
  }

  if (lower.includes('fine-tun')) {
    return "Fine-tuning adapts a pre-trained model to a specific task or domain using a smaller labeled dataset. Techniques like LoRA (Low-Rank Adaptation) freeze the base weights and train small rank decomposition matrices, dramatically reducing compute requirements. QLoRA further quantizes the base model to 4-bit. This makes fine-tuning accessible even on consumer GPUs.";
  }

  return "That's a great question! AI is a vast and rapidly evolving field. Key areas include deep learning, natural language processing, computer vision, and reinforcement learning. Each has transformative applications across industries. Feel free to ask about any specific topic like transformers, RAG, agents, or fine-tuning!";
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content:
    "Hello! I'm an AI assistant. Ask me about machine learning, transformers, RAG, or anything AI-related.",
};

export default function LLMChatDemo() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: getAIResponse(trimmed),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div
      className="rounded-2xl border t-border-subtle overflow-hidden"
      style={{ background: '#0D1117' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b t-border-subtle">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm font-medium text-foreground/90">LLM Chat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-green-400/80">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="max-h-64 overflow-y-auto p-4 space-y-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={12} className="text-purple-400" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 rounded-tr-none'
                    : 'bg-[var(--theme-active)] text-foreground/80 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={12} className="text-cyan-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot size={12} className="text-purple-400" />
              </div>
              <div className="bg-[var(--theme-active)] rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-1">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/30"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t t-border-subtle p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about AI..."
            disabled={isTyping}
            className="bg-[var(--theme-active)] t-border-subtle text-sm text-foreground placeholder:text-foreground/30 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/30 h-9"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isTyping}
            className="h-9 px-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300"
          >
            <SendHorizontal size={14} />
          </Button>
        </form>
      </div>
    </div>
  );
}