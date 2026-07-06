'use client';

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ScrollProgress } from "@/components/sections/scroll-progress";
import { ScrollToTop } from "@/components/sections/scroll-to-top";
import { SectionDivider } from "@/components/sections/section-divider";
import { CursorGlow } from "@/components/sections/cursor-glow";
import CommandPalette from "@/components/sections/command-palette";
import Projects from "@/components/sections/projects";
import CaseStudies from "@/components/sections/case-studies";
import OpenSource from "@/components/sections/open-source";
import Research from "@/components/sections/research";
import AIPlayground from "@/components/sections/ai-playground";
import TechStack from "@/components/sections/tech-stack";
import Timeline from "@/components/sections/timeline";
import BlogSection from "@/components/sections/blog";
import NewsletterSection from "@/components/sections/newsletter";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function HomePageContent() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <CursorGlow />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <SectionDivider variant="gradient" />
        <div className="section-ambient-engineering">
          <Projects />
        </div>
        <SectionDivider variant="dots" />
        <CaseStudies />
        <SectionDivider variant="gradient" />
        <div className="section-ambient-opensource">
          <OpenSource />
        </div>
        <SectionDivider variant="dots" />
        <div className="section-ambient-research">
          <Research />
        </div>
        <SectionDivider variant="gradient" />
        <div className="section-ambient-playground">
          <AIPlayground />
        </div>
        <SectionDivider variant="dots" />
        <TechStack />
        <SectionDivider variant="gradient" />
        <Timeline />
        <SectionDivider variant="dots" />
        <BlogSection />
        <SectionDivider variant="line" />
        <NewsletterSection />
        <SectionDivider variant="gradient" />
        <ContactSection />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
}