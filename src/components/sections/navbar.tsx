'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, Github, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Open Source', href: '#opensource' },
  { label: 'Playground', href: '#playground' },
  { label: 'Blog', href: '#blog' },
  { label: 'Experience', href: '#experience', mobileOnly: true },
  { label: 'Contact', href: '#contact', mobileOnly: true },
];

type NavLink = (typeof NAV_LINKS)[number];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    lastScrollY.current = latest;
  });

  const openCommandPalette = useCallback(() => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    );
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="glass mx-auto mt-4 max-w-5xl rounded-2xl px-4 py-2.5 md:mt-5 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            Alex
            <span className="gradient-text">Chen</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.filter((l) => !('mobileOnly' in l && l.mobileOnly)).map((link: NavLink) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-[var(--theme-active)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* GitHub link - desktop */}
            <a
              href="https://github.com/alexchen"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-muted-foreground transition-colors hover:text-foreground md:block"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>

            {/* Theme toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* ⌘K command palette hint - desktop */}
            <button
              onClick={openCommandPalette}
              className="hidden h-8 items-center gap-1.5 rounded-lg border t-border-subtle bg-[var(--theme-hover)] px-2 text-[11px] text-muted-foreground transition-colors hover:bg-[var(--theme-active)] hover:text-foreground md:inline-flex"
              aria-label="Open command palette"
            >
              <Search className="size-3" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="ml-1 hidden h-4 items-center rounded border t-border-subtle bg-[var(--theme-hover)] px-1 text-[10px] font-medium text-muted-foreground lg:inline-flex">
                ⌘K
              </kbd>
            </button>

            {/* Contact button - desktop */}
            <button
              className="h-8 px-4 text-xs font-medium text-cyan-400 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/10 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              onClick={() => {
                const target = document.querySelector('#contact');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
              <ArrowRight className="size-3.5" />
            </button>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 t-border-subtle bg-[var(--theme-surface-2)]/95 backdrop-blur-xl"
              >
                <SheetHeader className="mt-8">
                  <SheetTitle className="text-left text-foreground">
                    Alex<span className="gradient-text">Chen</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1 px-4">
                  {NAV_LINKS.map((link: NavLink) => {
                    const sectionId = link.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                      <SheetClose asChild key={link.href}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={cn(
                            'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-[var(--theme-active)] text-foreground'
                              : 'text-muted-foreground hover:bg-[var(--theme-hover)] hover:text-foreground'
                          )}
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <SheetClose asChild>
                    <a
                      href="https://github.com/alexchen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[var(--theme-hover)] hover:text-foreground"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  </SheetClose>
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
                    <ThemeToggle />
                  </div>
                  <SheetClose asChild>
                    <button
                      className="flex w-full items-center justify-start gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2.5 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/10"
                      onClick={() => {
                        const target = document.querySelector('#contact');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Contact
                      <ArrowRight className="ml-auto size-3.5" />
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}