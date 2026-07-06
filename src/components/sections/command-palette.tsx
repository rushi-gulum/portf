'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Home,
  FolderOpen,
  FileSearch,
  Github,
  FlaskConical,
  Gamepad2,
  Cpu,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Search,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: Home, id: '#hero' },
  { label: 'Projects', icon: FolderOpen, id: '#projects' },
  { label: 'Case Studies', icon: FileSearch, id: '#case-studies' },
  { label: 'Open Source', icon: Github, id: '#opensource' },
  { label: 'Research', icon: FlaskConical, id: '#research' },
  { label: 'AI Playground', icon: Gamepad2, id: '#playground' },
  { label: 'Tech Stack', icon: Cpu, id: '#tech-stack' },
  { label: 'Timeline', icon: Clock, id: '#experience' },
  { label: 'Blog', icon: FileText, id: '#blog' },
  { label: 'Newsletter', icon: Mail, id: '#newsletter' },
  { label: 'Contact', icon: MessageSquare, id: '#contact' },
];

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="text-cyan-400">{match}</span>
      {after}
    </>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredItems = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = useCallback(
    (item: NavItem) => {
      setOpen(false);
      setSearch('');
      setActiveIndex(0);
      const target = document.querySelector(item.id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  // Auto-focus the input when dialog opens (DOM imperative)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setActiveIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter' && filteredItems[activeIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[activeIndex]);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      activeEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="bg-[#0F1117] border-white/[0.1] rounded-2xl max-w-lg p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Navigate to different sections of the portfolio
        </DialogDescription>

        {/* Search Input */}
        <div className="flex items-center border-b border-white/[0.06] px-4">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Type to search sections..."
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder-muted-foreground outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/[0.1] bg-white/[0.04] px-1.5 text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Navigation Items */}
        <div ref={listRef} className="max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  data-active={isActive}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    isActive
                      ? 'bg-white/[0.06] text-cyan-400'
                      : 'text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 text-sm">
                    {highlightMatch(item.label, search)}
                  </span>
                  <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-white/[0.08] bg-white/[0.03] px-1.5 text-[10px] font-medium text-muted-foreground">
                    ⌘K
                  </kbd>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-center text-[11px] text-muted-foreground">
            ↑↓ Navigate · ↵ Select · Esc Close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}