import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Chen — AI Engineer | Research • Engineering • Production",
  description: "Building production AI systems. Specializing in LLMs, RAG, AI Agents, and distributed ML infrastructure. Open source contributor and technical writer.",
  keywords: ["AI Engineer", "LLM", "RAG", "Machine Learning", "AI Agents", "Production AI", "MLOps", "Deep Learning"],
  authors: [{ name: "Alex Chen" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Alex Chen — AI Engineer",
    description: "Building production AI systems. Research • Engineering • Deployment.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — AI Engineer",
    description: "Building production AI systems. Research • Engineering • Deployment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground noise-overlay`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}