'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Play, RotateCcw, CheckCircle2, Clock, AlertCircle, Cpu, Globe, FileText, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentStep {
  id: string;
  agent: string;
  action: string;
  status: 'pending' | 'running' | 'done' | 'error';
  detail?: string;
  duration?: number;
}

const TASKS = [
  {
    label: 'Research AI trends',
    steps: [
      { agent: 'Researcher', action: 'Searching the web for latest AI trends' },
      { agent: 'Researcher', action: 'Summarizing findings from 12 sources' },
      { agent: 'Writer', action: 'Drafting a structured report' },
      { agent: 'Reviewer', action: 'Checking facts and citations' },
      { agent: 'Writer', action: 'Incorporating review feedback' },
    ],
  },
  {
    label: 'Analyze codebase',
    steps: [
      { agent: 'Coder', action: 'Scanning project directory structure' },
      { agent: 'Coder', action: 'Analyzing dependencies and tech stack' },
      { agent: 'Analyst', action: 'Identifying code quality issues' },
      { agent: 'Coder', action: 'Generating improvement suggestions' },
    ],
  },
  {
    label: 'Plan a project',
    steps: [
      { agent: 'Planner', action: 'Breaking down requirements' },
      { agent: 'Architect', action: 'Designing system architecture' },
      { agent: 'Planner', action: 'Creating task timeline' },
      { agent: 'Reviewer', action: 'Validating feasibility' },
      { agent: 'Planner', action: 'Finalizing project plan' },
    ],
  },
];

const AGENT_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Researcher: Globe,
  Writer: FileText,
  Reviewer: AlertCircle,
  Coder: Terminal,
  Analyst: Cpu,
  Planner: Bot,
  Architect: Cpu,
};

const AGENT_COLORS: Record<string, string> = {
  Researcher: 'text-blue-400 bg-blue-500/15 border-blue-500/20',
  Writer: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
  Reviewer: 'text-amber-400 bg-amber-500/15 border-amber-500/20',
  Coder: 'text-green-400 bg-green-500/15 border-green-500/20',
  Analyst: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20',
  Planner: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
  Architect: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/20',
};

export default function AIAgentsDemo() {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runTask = useCallback(() => {
    clearTimers();
    const task = TASKS[selectedTask];
    const initialSteps: AgentStep[] = task.steps.map((s, i) => ({
      id: `step-${i}`,
      agent: s.agent,
      action: s.action,
      status: 'pending' as const,
    }));
    setSteps(initialSteps);
    setIsRunning(true);
    setTotalTime(0);

    let cumulativeDelay = 500;

    task.steps.forEach((step, i) => {
      const startDelay = cumulativeDelay;
      const runDuration = 800 + Math.random() * 1200;
      const completeDelay = startDelay + runDuration;

      const startTimer = setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: 'running' as const, detail: 'Processing...' } : s
          )
        );
      }, startDelay);
      timersRef.current.push(startTimer);

      const completeTimer = setTimeout(() => {
        const hasError = Math.random() < 0.1;
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? {
                  ...s,
                  status: hasError ? ('error' as const) : ('done' as const),
                  detail: hasError ? 'Retrying...' : 'Completed successfully',
                  duration: Math.round(runDuration / 100) / 10,
                }
              : s
          )
        );

        if (i === task.steps.length - 1) {
          setTotalTime(Math.round((completeDelay + 500) / 100) / 10);
          setIsRunning(false);
        }
      }, completeDelay);
      timersRef.current.push(completeTimer);

      cumulativeDelay = completeDelay + 300;
    });
  }, [selectedTask, clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setSteps([]);
    setIsRunning(false);
    setTotalTime(0);
  }, [clearTimers]);

  const completedCount = steps.filter((s) => s.status === 'done').length;
  const runningStep = steps.find((s) => s.status === 'running');

  return (
    <div className="space-y-4">
      {/* Task Selection */}
      <div className="flex flex-wrap gap-2">
        {TASKS.map((task, i) => (
          <button
            key={task.label}
            onClick={() => { if (!isRunning) setSelectedTask(i); }}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedTask === i
                ? 'bg-purple-500/15 border border-purple-500/30 text-purple-400'
                : 'bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:border-white/20'
            } disabled:opacity-50`}
          >
            {task.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={runTask}
          disabled={isRunning}
          size="sm"
          className="bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
        >
          <Play size={14} className="mr-1.5" />
          Run Task
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="bg-white/[0.04] border-white/[0.08] hover:border-white/20"
        >
          <RotateCcw size={14} className="mr-1.5" />
          Reset
        </Button>
        {steps.length > 0 && (
          <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-400" />
              {completedCount}/{steps.length}
            </span>
            {totalTime > 0 && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {totalTime}s
              </span>
            )}
          </div>
        )}
      </div>

      {/* Agent Steps */}
      <div className="space-y-2">
        <AnimatePresence>
          {steps.map((step, i) => {
            const IconComp = AGENT_ICONS[step.agent] || Bot;
            const colorClass = AGENT_COLORS[step.agent] || 'text-purple-400 bg-purple-500/15 border-purple-500/20';

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`rounded-lg border p-3 transition-all ${
                  step.status === 'running'
                    ? 'border-purple-500/30 bg-purple-500/[0.04]'
                    : step.status === 'done'
                    ? 'border-emerald-500/20 bg-emerald-500/[0.03]'
                    : step.status === 'error'
                    ? 'border-red-500/20 bg-red-500/[0.03]'
                    : 'border-white/[0.06] bg-white/[0.02] opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Agent Icon */}
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <IconComp size={14} />
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{step.agent}</span>
                      <span className="text-white/10">|</span>
                      <span className="text-xs text-muted-foreground">Step {i + 1}</span>
                    </div>
                    <p className="text-sm text-white/70 mt-0.5">{step.action}</p>
                    {step.detail && (
                      <p className={`text-[11px] mt-1 ${
                        step.status === 'done' ? 'text-emerald-400/80' :
                        step.status === 'error' ? 'text-red-400/80' :
                        'text-purple-400/80'
                      }`}>
                        {step.detail}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    {step.status === 'running' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Cpu size={16} className="text-purple-400" />
                      </motion.div>
                    )}
                    {step.status === 'done' && <CheckCircle2 size={16} className="text-emerald-400" />}
                    {step.status === 'error' && <AlertCircle size={16} className="text-red-400" />}
                    {step.status === 'pending' && <div className="w-4 h-4 rounded-full border border-white/10" />}
                  </div>
                </div>

                {/* Progress bar for running step */}
                {step.status === 'running' && (
                  <div className="mt-2 h-1 bg-white/[0.06] rounded overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-500 rounded"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {steps.length === 0 && (
        <div className="text-center py-8 border border-dashed border-white/[0.06] rounded-xl">
          <Bot size={32} className="text-white/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Select a task and click &quot;Run Task&quot; to see multi-agent orchestration</p>
          <p className="text-xs text-white/20 mt-1">Agents will execute sequentially with status updates</p>
        </div>
      )}
    </div>
  );
}