'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { newsletterTopics } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function NewsletterSection() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [email, setEmail] = useState('');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const interval = setInterval(() => {
      setTopicIndex((prev) => (prev + 1) % newsletterTopics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section ref={ref} className="pt-20 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Rotating topic text */}
          <div className="h-8 mb-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={topicIndex}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                className="text-sm font-medium text-cyan-400 tracking-wide"
              >
                {newsletterTopics[topicIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Heading */}
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stay Updated
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Weekly AI engineering insights, architecture breakdowns, and
            production lessons.
          </motion.p>

          {/* Email form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-11 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-500 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20 text-sm"
            />
            <Button
              type="submit"
              className="h-11 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 text-sm transition-colors"
            >
              Subscribe
              <Send className="size-4 ml-1.5" />
            </Button>
          </motion.form>

          {/* Small text */}
          <motion.p
            className="text-slate-600 text-xs mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            No spam. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}