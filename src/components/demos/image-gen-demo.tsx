'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Sparkles, Loader2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PRESETS = [
  'A futuristic city skyline at sunset, cyberpunk style',
  'Abstract neural network visualization, glowing connections',
  'Robot writing code on a holographic display, sci-fi',
  'Serene Japanese garden with cherry blossoms',
];

const SIZES = [
  { label: 'Square', value: '1024x1024' },
  { label: 'Portrait', value: '768x1344' },
  { label: 'Landscape', value: '1344x768' },
];

interface GeneratedImage {
  id: string;
  prompt: string;
  size: string;
  base64: string;
  timestamp: number;
}

export default function ImageGenDemo() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState('');

  const generateImage = useCallback(async (inputPrompt?: string) => {
    const p = inputPrompt || prompt;
    if (!p.trim() || isGenerating) return;

    setIsGenerating(true);
    setError('');
    if (!inputPrompt) setPrompt('');

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: p.trim(), size }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Generation failed');
        setIsGenerating(false);
        return;
      }

      const newImage: GeneratedImage = {
        id: `img-${Date.now()}`,
        prompt: p.trim(),
        size: data.size,
        base64: data.image,
        timestamp: Date.now(),
      };
      setImages((prev) => [newImage, ...prev]);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, size, isGenerating]);

  const handlePreset = useCallback((preset: string) => {
    setPrompt(preset);
    // We need to trigger generation with the preset but state hasn't updated yet
    // So we call the API directly
    generateImage(preset);
  }, [generateImage]);

  const downloadImage = useCallback((img: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${img.base64}`;
    link.download = `generated-${img.id}.png`;
    link.click();
  }, []);

  return (
    <div className="space-y-4">
      {/* Prompt Input */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') generateImage(); }}
            placeholder="Describe the image you want to generate..."
            maxLength={500}
            className="w-full bg-[var(--theme-active)] border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-colors focus:border-blue-500/40"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="h-10 px-3 bg-[var(--theme-active)] border border-border rounded-lg text-xs text-foreground outline-none cursor-pointer focus:border-blue-500/40"
          >
            {SIZES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[var(--theme-surface-code)]">
                {s.label} ({s.value})
              </option>
            ))}
          </select>
          <Button
            onClick={() => generateImage()}
            disabled={!prompt.trim() || isGenerating}
            className="h-10 px-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
          >
            {isGenerating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            <span className="ml-2 hidden sm:inline">{isGenerating ? 'Generating...' : 'Generate'}</span>
          </Button>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePreset(preset)}
            disabled={isGenerating}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground cursor-pointer hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all disabled:opacity-50"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generating Indicator */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-16 border border-dashed border-blue-500/20 rounded-xl bg-blue-500/[0.03]"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Loader2 size={36} className="text-blue-400 animate-spin" />
                <Sparkles size={14} className="text-blue-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <p className="text-sm text-foreground/80">Generating your image with AI...</p>
              <p className="text-xs text-muted-foreground">This may take 10-30 seconds</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Images Grid */}
      <AnimatePresence mode="popLayout">
        {images.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative group rounded-xl overflow-hidden border t-border-subtle hover:border-blue-500/30 transition-all cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={`data:image/png;base64,${img.base64}`}
              alt={img.prompt}
              className="w-full h-auto max-h-96 object-contain bg-black/40"
            />
            {/* Hover overlay with actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-foreground/80 line-clamp-2 mb-3">{img.prompt}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); downloadImage(img); }}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-all cursor-pointer"
                  >
                    <Download size={12} className="inline mr-1.5" />
                    Download
                  </button>
                  <span className="text-[10px] text-foreground/40 ml-auto">{img.size}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {images.length === 0 && !isGenerating && (
        <div className="text-center py-10 border border-dashed t-border-subtle rounded-xl">
          <ImageIcon size={36} className="text-foreground/15 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Enter a prompt or click a preset to generate</p>
          <p className="text-xs text-foreground/20 mt-1">Powered by AI diffusion models</p>
        </div>
      )}

      {/* Lightbox / Full-size viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[var(--theme-surface-code)] border t-border-subtle rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-black/70 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
              <img
                src={`data:image/png;base64,${selectedImage.base64}`}
                alt={selectedImage.prompt}
                className="w-full h-auto max-h-[70vh] object-contain bg-black/40"
              />
              <div className="p-4 border-t t-border-subtle">
                <p className="text-sm text-foreground/80 mb-2">{selectedImage.prompt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{selectedImage.size}</span>
                  <button
                    onClick={() => downloadImage(selectedImage)}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-all cursor-pointer"
                  >
                    <Download size={12} className="inline mr-1.5" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}