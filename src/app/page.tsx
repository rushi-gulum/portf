import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Projects />
        <CaseStudies />
        <OpenSource />
        <Research />
        <AIPlayground />
        <TechStack />
        <Timeline />
        <BlogSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}