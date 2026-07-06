'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCcw, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Web Speech API voices mapped to friendly labels
const VOICE_PRESETS = [
  { id: 'en-US-f', label: 'Aria', desc: 'American English · Female', lang: 'en-US', gender: 'female' },
  { id: 'en-GB-m', label: 'James', desc: 'British English · Male', lang: 'en-GB', gender: 'male', tag: 'Recommended' },
  { id: 'en-AU-f', label: 'Zoe', desc: 'Australian English · Female', lang: 'en-AU', gender: 'female' },
  { id: 'en-US-m', label: 'Ryan', desc: 'American English · Male', lang: 'en-US', gender: 'male' },
  { id: 'en-IN-f', label: 'Priya', desc: 'Indian English · Female', lang: 'en-IN', gender: 'female' },
];

const SAMPLE_TEXTS = [
  'Artificial intelligence is transforming the way we interact with technology, enabling more natural and intuitive experiences.',
  'The transformer architecture has revolutionized natural language processing, powering models like GPT and Claude.',
  'Voice interfaces are becoming increasingly sophisticated, understanding context, tone, and intent.',
  'Building production AI systems requires careful attention to latency, reliability, and user experience.',
];

export default function VoiceAIDemo() {
  const [text, setText] = useState(SAMPLE_TEXTS[0]);
  const [voiceId, setVoiceId] = useState(VOICE_PRESETS[1].id);
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<{ text: string; voice: string; time: string }[]>([]);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
    }
  }, []);

  // Pick the best matching browser voice for the selected preset
  const getBrowserVoice = useCallback((preset: typeof VOICE_PRESETS[0]): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    // Try exact lang match first, then partial match
    const langVoices = voices.filter((v) => v.lang.startsWith(preset.lang));
    if (langVoices.length === 0) {
      // Fallback to any English voice
      return voices.find((v) => v.lang.startsWith('en')) ?? voices[0];
    }
    // Prefer voices with matching gender hints in the name
    const genderHint = preset.gender === 'female'
      ? ['female', 'woman', 'girl', 'aria', 'zira', 'hazel', 'susan', 'kate', 'samantha', 'victoria']
      : ['male', 'man', 'david', 'james', 'daniel', 'alex', 'mark', 'ryan'];

    const genderMatch = langVoices.find((v) =>
      genderHint.some((hint) => v.name.toLowerCase().includes(hint))
    );
    return genderMatch ?? langVoices[0];
  }, []);

  const speak = useCallback(() => {
    if (!supported || !text.trim()) return;

    // Stop anything currently playing
    window.speechSynthesis.cancel();
    setIsPaused(false);

    const preset = VOICE_PRESETS.find((v) => v.id === voiceId) ?? VOICE_PRESETS[0];
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.rate = speed;
    utterance.pitch = 1;

    // Voices may load async — wait for them
    const assignVoice = () => {
      const voice = getBrowserVoice(preset);
      if (voice) utterance.voice = voice;
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      assignVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = assignVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = (e) => {
      setIsPlaying(false);
      setIsPaused(false);
      if (e.error !== 'interrupted') setError('Speech failed. Try a different voice or browser.');
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);

    setHistory((prev) => [
      { text: text.trim().slice(0, 80), voice: preset.label, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ]);
    setError('');
  }, [supported, text, voiceId, speed, getBrowserVoice]);

  const togglePause = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const clearAll = useCallback(() => {
    stop();
    setError('');
    setHistory([]);
  }, [stop]);

  return (
    <div className="space-y-4">
      {!supported && (
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-400">
          Your browser doesn&apos;t support the Web Speech API. Try Chrome or Edge.
        </div>
      )}

      {/* Voice Selection */}
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
          Voice
        </label>
        <div className="flex flex-wrap gap-1.5">
          {VOICE_PRESETS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVoiceId(v.id)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                voiceId === v.id
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
        <p className="text-[10px] text-muted-foreground/50 mt-1.5">
          Powered by your browser&apos;s built-in voices — actual voice may vary by OS
        </p>
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
        {!isPlaying ? (
          <Button
            onClick={speak}
            disabled={!text.trim() || !supported}
            className="bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-300"
          >
            <Volume2 size={14} className="mr-1.5" />
            Speak
          </Button>
        ) : (
          <>
            <Button
              onClick={togglePause}
              variant="outline"
              size="sm"
              className="bg-[var(--theme-active)] border-border hover:border-green-500/30 hover:text-green-400"
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button
              onClick={stop}
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
      {!isPlaying && (
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

      {/* Playing indicator */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-green-500/20 bg-green-500/[0.03] p-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={!isPaused ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Volume2 size={18} className="text-green-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-foreground/90">
                  {isPaused ? 'Paused' : 'Speaking...'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Voice: {VOICE_PRESETS.find((v) => v.id === voiceId)?.label} · Speed: {speed.toFixed(1)}x
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground">Recent:</span>
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
    </div>
  );
}
