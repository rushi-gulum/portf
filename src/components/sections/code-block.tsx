'use client';

import { useState } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

function highlightNonComment(text: string): string {
  // Strings first (to protect their contents from keyword replacement)
  let result = text.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span class="text-green-400">$1</span>'
  );

  // Keywords
  result = result.replace(
    /\b(const|let|var|function|return|import|from|export|if|else|for|while|class|async|await|new|this|type|interface)\b/g,
    '<span class="text-cyan-400">$1</span>'
  );

  // Numbers
  result = result.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-amber-400">$1</span>'
  );

  // Function names after def/function keyword
  result = result.replace(
    /(<span class="text-cyan-400">def<\/span>|<span class="text-cyan-400">function<\/span>)\s+([a-zA-Z_]\w*)/g,
    (_full, keyword, name) => `${keyword} <span class="text-purple-400">${name}</span>`
  );

  return result;
}

function highlightCode(code: string): string {
  const lines = code.split('\n');
  const resultLines: string[] = [];

  for (const line of lines) {
    // Check for single-line comments (// or #)
    const commentIdx = Math.min(
      line.indexOf('//') >= 0 ? line.indexOf('//') : Infinity,
      line.indexOf('#') >= 0 ? line.indexOf('#') : Infinity
    );

    if (commentIdx !== Infinity && commentIdx >= 0) {
      const before = line.slice(0, commentIdx);
      const comment = line.slice(commentIdx);
      resultLines.push(
        highlightNonComment(before) +
          `<span class="text-gray-500">${comment}</span>`
      );
    } else {
      resultLines.push(highlightNonComment(line));
    }
  }

  return resultLines.join('\n');
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const highlighted = highlightCode(code);
  const highlightedLines = highlighted.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl border border-white/[0.06] overflow-hidden"
      style={{ background: '#0D1117' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-white/40" />
          {filename && (
            <span className="text-xs text-white/60 font-mono">{filename}</span>
          )}
          {language && (
            <span className="text-[10px] font-medium text-cyan-400/70 bg-cyan-500/10 px-1.5 py-0.5 rounded">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          {highlightedLines.map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-white/20 w-8 text-right pr-4 flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-white/80" dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}