'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Check, Sparkles, Thermometer, Zap } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Template {
  id: string;
  label: string;
  system: string;
  user: string;
  response: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'code-review',
    label: 'Code Review',
    system: 'You are a senior code reviewer with 15+ years of experience. You provide thorough, constructive feedback focusing on code quality, performance, security, and maintainability. Always suggest specific improvements.',
    user: `Review this function and provide feedback:

function getFilteredUsers(users: any[], minAge: number) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= minAge) {
      result.push(users[i]);
    }
  }
  return result;
}`,
    response: `## Code Review Summary

**Overall Assessment:** ⚠️ Needs Improvement (5/10)

### Issues Found

1. **Missing Type Safety** \`Critical\`
   - The \`users\` parameter uses \`any[]\` instead of a proper interface
   - \`Result\` array type is implicitly \`any[]\`
   - **Suggestion:** Define a \`User\` interface with typed properties

2. **Inefficient Iteration** \`Performance\`
   - Manual for-loop when \`Array.filter()\` is more idiomatic and readable
   - Creates unnecessary intermediate variables

3. **No Input Validation** \`Robustness\`
   - No null/undefined check on the \`users\` parameter
   - \`minAge\` could be negative or non-numeric

4. **Parameter Naming** \`Readability\`
   - \`minAge\` is ambiguous — does it mean "at least" or "at most"?

### Recommended Rewrite

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
}

function getFilteredUsers(
  users: User[],
  minimumAge: number
): User[] {
  if (!Array.isArray(users)) return [];
  const ageThreshold = Math.max(0, minimumAge);
  return users.filter(user => user.age >= ageThreshold);
}
\`\`\`

### Key Improvements
- ✅ Proper TypeScript interface
- ✅ Null safety with early return
- ✅ Clamped \`minAge\` to prevent negative values
- ✅ Declarative \`filter()\` replaces imperative loop`,
  },
  {
    id: 'translation',
    label: 'Translation',
    system: 'You are a professional translator specializing in technical and business content. Provide accurate translations that maintain the original tone and meaning. When translating idioms or culture-specific phrases, provide both a literal and localized version.',
    user: 'Translate the following text from English to Japanese:\n\n"Our cutting-edge AI platform leverages transformer architecture to deliver state-of-the-art natural language processing capabilities, enabling enterprises to automate complex workflows and extract actionable insights from unstructured data."',
    response: `## English → Japanese Translation

**Translation:**

「当社の最先端のAIプラットフォームは、トランスフォーマーアーキテクチャを活用して最先端の自然言語処理機能を提供し、企業が複雑なワークフローを自動化し、非構造化データから実用的なインサイトを抽出できるようにします。」

---

**Translation Notes:**

| English Term | Japanese Translation | Notes |
|---|---|---|
| cutting-edge | 最先端の (saissentan no) | Standard business/technical term |
| leverages | 活用して (katsuyō shite) | More professional than simply "uses" |
| state-of-the-art | 最先端の (saissentan no) | Redundant with "cutting-edge" — simplified to avoid repetition |
| enterprise | 企業 (kigyō) | Standard business context |
| actionable insights | 実用的なインサイト (jitsuyōteki na insaito) | "Insight" is widely used in Japanese tech as a loanword |
| unstructured data | 非構造化データ (hikōzōka dēta) | Standard technical term |

**Tone:** Formal business/technical (敬体 — です/ます form)`,
  },
  {
    id: 'summarization',
    label: 'Summarization',
    system: 'Summarize the following text concisely. Extract the key points, maintain factual accuracy, and organize the summary with clear structure. Use bullet points for main findings. Limit the summary to 150 words or fewer.',
    user: `Recent research from Stanford HAI reveals that large language models (LLMs) are increasingly being deployed in healthcare settings, with over 200 hospitals now using AI-assisted diagnostic tools. The study, published in Nature Medicine, analyzed 15,000 patient interactions across 12 months and found that AI-assisted diagnoses had a 94.2% accuracy rate compared to 87.6% for unassisted physicians. However, the researchers noted significant concerns about bias — the models performed 8.3% worse on patients from underrepresented demographics. The FDA has approved 692 AI/ML-enabled medical devices as of Q4 2024, a 43% increase from the previous year. Privacy advocates have raised concerns about the handling of sensitive medical data used to train these models, calling for stricter regulations and mandatory audit trails.`,
    response: `## Summary

### Key Findings
- **200+ hospitals** now use AI-assisted diagnostic tools
- AI-assisted diagnosis accuracy: **94.2%** vs. 87.6% unassisted
- FDA has approved **692 AI/ML medical devices** (+43% YoY)

### Critical Concerns
- **Bias**: Models perform 8.3% worse for underrepresented demographics
- **Privacy**: Sensitive medical data used in training raises regulatory concerns

### Bottom Line
While LLM-assisted diagnostics show significant accuracy improvements in healthcare (Stanford HAI, Nature Medicine), urgent action is needed on algorithmic bias and data privacy before widespread deployment.

---
*Source: Stanford HAI study, 15,000 patients, 12 months*`,
  },
];

function TerminalHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
      </div>
      <span className="ml-2 text-sm text-muted-foreground">{title}</span>
    </div>
  );
}

function TypingOutput({ text, speed = 8, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState(() => text.slice(0, 0));
  const indexRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    indexRef.current = 0;
    doneRef.current = false;
    const interval = setInterval(() => {
      indexRef.current += 2; // Type 2 chars at a time for speed
      if (indexRef.current <= text.length) {
        setDisplayed(text.slice(0, indexRef.current));
      } else {
        clearInterval(interval);
        if (!doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone]);

  return <span className="whitespace-pre-wrap">{displayed}<span className="animate-pulse text-cyan-400">▌</span></span>;
}

export default function PromptSandboxDemo() {
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const [systemPrompt, setSystemPrompt] = useState(TEMPLATES[0].system);
  const [userMessage, setUserMessage] = useState(TEMPLATES[0].user);
  const [temperature, setTemperature] = useState(0.7);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentTemplate = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0];

  const handleTemplateChange = useCallback((id: string) => {
    const t = TEMPLATES.find((t) => t.id === id);
    if (t) {
      setTemplateId(id);
      setSystemPrompt(t.system);
      setUserMessage(t.user);
      setOutput('');
      setInputTokens(0);
      setOutputTokens(0);
    }
  }, []);

  const handleRun = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('');
    // Simulate token counts
    const inTokens = Math.round((systemPrompt.length + userMessage.length) / 3.5);
    setInputTokens(inTokens);
    setOutputTokens(0);
  }, [isRunning, systemPrompt, userMessage]);

  const handleOutputDone = useCallback(() => {
    setIsRunning(false);
    const outTokens = Math.round(currentTemplate.response.length / 3.5);
    setOutputTokens(outTokens);
  }, [currentTemplate]);

  const handleCopy = useCallback(() => {
    if (!output && !isRunning) return;
    navigator.clipboard.writeText(isRunning ? output : currentTemplate.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output, isRunning, currentTemplate]);

  // Adjust response slightly based on temperature (visual only)
  const displayResponse = currentTemplate.response;

  return (
    <div className="flex h-full flex-col bg-[#0D1117] rounded-lg overflow-hidden">
      <TerminalHeader title="Prompt Sandbox — prompt engineering" />

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 overflow-y-auto">
        {/* Template Selector & Temperature */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Template
            </label>
            <Select value={templateId} onValueChange={handleTemplateChange}>
              <SelectTrigger className="h-10 w-full border-white/[0.06] bg-white/[0.03] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D1117] border-white/[0.06]">
                {TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id} className="text-white focus:bg-white/[0.06]">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:w-[200px]">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Temperature
              </label>
              <span className="text-xs font-mono text-cyan-400">{temperature.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Thermometer className="size-3.5 text-muted-foreground shrink-0" />
              <Slider
                value={[temperature]}
                onValueChange={([v]) => setTemperature(Number(v.toFixed(1)))}
                min={0}
                max={2}
                step={0.1}
                className="flex-1 [&_[data-slot=slider-range]]:bg-cyan-500 [&_[data-slot=slider-thumb]]:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Two-column inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              System Prompt
            </label>
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="min-h-[140px] resize-none border-white/[0.06] bg-white/[0.03] text-white text-sm placeholder:text-muted-foreground focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              User Message
            </label>
            <Textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="min-h-[140px] resize-none border-white/[0.06] bg-white/[0.03] text-white text-sm placeholder:text-muted-foreground focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Run Button */}
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="h-11 bg-cyan-600 hover:bg-cyan-500 text-white font-medium gap-2 transition-all"
        >
          {isRunning ? (
            <>
              <Zap className="size-4 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Play className="size-4" />
              Run Prompt
            </>
          )}
        </Button>

        {/* Output Panel */}
        {(isRunning || output) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-cyan-500/20 bg-[#080B10] overflow-hidden"
          >
            {/* Output Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">AI Output</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Token counts */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    Input: <span className="font-mono text-cyan-400">{inputTokens}</span>
                  </span>
                  <span>
                    Output: <span className="font-mono text-cyan-400">{outputTokens}</span>
                  </span>
                  <span>
                    Total: <span className="font-mono text-cyan-400">{inputTokens + outputTokens}</span>
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-7 gap-1.5 text-muted-foreground hover:text-white"
                >
                  {copied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            {/* Output Content */}
            <div className="p-4 max-h-80 overflow-y-auto">
              <div className="text-sm text-white/85 leading-relaxed font-mono">
                {isRunning ? (
                  <TypingOutput key={templateId} text={displayResponse} onDone={handleOutputDone} />
                ) : (
                  <>{displayResponse}</>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!isRunning && !output && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/[0.06] min-h-[160px]"
          >
            <div className="text-center p-6">
              <Sparkles className="mx-auto mb-3 size-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">AI response will appear here</p>
              <p className="mt-1 text-xs text-muted-foreground/60">Select a template and click Run Prompt</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}