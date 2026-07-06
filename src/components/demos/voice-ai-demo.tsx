'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Loader2, RotateCcw, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VOICES = [
  { id: 'kazi', label: 'Kazi', desc: 'Indian English · Clear', tag: 'Recommended' },
  { id: 'jam', label: 'Jam', desc: 'British English · Gentleman' },
  { id: 'tongtong', label: 'Tongtong', desc: 'Warm & friendly' },
  { id: 'xiaochen', label: 'Xiaochen', desc: 'Professional' },
  { id: 'douji', label: 'Douji', desc: 'Natural & smooth' },
  { id: 'luodo', label: 'Luodo', desc: 'Expressive' },
  { id: 'chuichui', label: 'Chuichui', desc: 'Playful & cute' },
];

const SAMPLE_TEXTS = [
  'Artificial intelligence is transforming the way we interact with technology, enabling more natural and intuitive experiences.',
  'The transformer architecture has revolutionized natural language processing, powering models like GPT and Claude.',
  'Voice interfaces are becoming increasingly sophisticated, understanding context, tone, and intent.',
  'Building production AI systems requires careful attention to latency, reliability, and user experience.',
];

export default function VoiceAIDemo() {
  const [text, setText] = useState(SAMPLE_TEXTS[0]);
  const [voice, setVoice] = useState('kazi');
  const [speed, setSpeed] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{ text: string; voice: string; time: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateSpeech = useCallback(async () => {
    if (!text.trim() || isGenerating) return;

    setIsGenerating(true);
    setError('');

    // Revoke previous URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      const res = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), voice, speed }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || 'Speech generation failed');
        setIsGenerating(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Add to history
      setHistory((prev) => [
        { text: text.trim().slice(0, 80), voice, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4),
      ]);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [text, voice, speed, isGenerating, audioUrl]);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, audioUrl]);

  const stopPlayback = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const clearAll = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsPlaying(false);
    setError('');
    setHistory([]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [audioUrl]);

  return (
    <div className="space-y-4">
      {/* Voice Selection */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
          Voice
        </label>
        <div className="flex flex-wrap gap-1.5">
          {VOICES.map((v) => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                voice === v.id
                  ? 'bg-green-500/15 border border-green-500/30 text-green-400'
                  : 'bg-[var(--theme-active)] border border-border text-muted-foreground hover:border-foreground/15'
              }`}
              title={v.desc}
            >
              {v.label}
              {v.tag && (
                <span className="absolute -top-1.5 -right-1.5 text-[8px] font-semibold px-1.5 py-0 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 leading-none">
                  {v.tag}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Text
          </label>
          <span className={`text-xs font-mono ${text.length > 1024 ? 'text-red-400' : 'text-muted-foreground'}`}>
            {text.length}/1024
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 1024))}
          rows={3}
          placeholder="Enter text to convert to speech..."
          className="w-full bg-[var(--theme-active)] border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 outline-none transition-colors focus:border-green-500/40 resize-none"
        />
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          Speed
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 h-1.5 bg-[var(--theme-active)] rounded-full appearance-none cursor-pointer accent-green-500"
        />
        <span className="text-xs font-mono text-green-400 w-8 text-right">{speed.toFixed(1)}x</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          onClick={generateSpeech}
          disabled={!text.trim() || isGenerating}
          className="bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-300"
        >
          {isGenerating ? (
            <>
              <Loader2 size={14} className="animate-spin mr-1.5" />
              Generating...
            </>
          ) : (
            <>
              <Volume2 size={14} className="mr-1.5" />
              Speak
            </>
          )}
        </Button>
        {audioUrl && (
          <>
            <Button
              onClick={togglePlayback}
              variant="outline"
              size="sm"
              className="bg-[var(--theme-active)] border-border hover:border-green-500/30 hover:text-green-400"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              onClick={stopPlayback}
              variant="outline"
              size="sm"
              className="bg-[var(--theme-active)] border-border hover:border-foreground/15"
            >
              <Square size={12} />
            </Button>
          </>
        )}
        <Button
          onClick={clearAll}
          variant="outline"
          size="sm"
          className="ml-auto bg-[var(--theme-active)] border-border hover:border-foreground/15"
        >
          <RotateCcw size={14} className="mr-1.5" />
          Reset
        </Button>
      </div>

      {/* Sample texts */}
      {!audioUrl && !isGenerating && (
        <div>
          <span className="text-xs text-muted-foreground mb-2 block">Try a sample:</span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_TEXTS.map((sample, i) => (
              <button
                key={i}
                onClick={() => setText(sample)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground cursor-pointer hover:border-green-500/30 hover:text-green-400 hover:bg-green-500/5 transition-all"
              >
                {sample.slice(0, 40)}...
              </button>
            ))}
          </div>
        </div>
      )}

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

      {/* Audio Player */}
      {audioUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-green-500/20 bg-green-500/[0.03] p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Volume2 size={18} className="text-green-400" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground/90">Audio Generated</p>
              <p className="text-xs text-muted-foreground">
                Voice: {VOICES.find(v => v.id === voice)?.label} · Speed: {speed.toFixed(1)}x
              </p>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            className="w-full h-10"
            controls
            preload="auto"
          />
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground">Recent generations:</span>
          {history.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-accent border border-border"
            >
              <Volume2 size={10} className="text-green-400/60" />
              <span className="text-foreground/50 flex-1 truncate">{item.text}...</span>
              <span className="text-foreground/20">{item.voice}</span>
              <span className="text-foreground/15">{item.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hidden audio element for play/pause control */}
    </div>
  );
}