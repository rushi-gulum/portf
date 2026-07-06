'use client';

import dynamic from "next/dynamic";

const HomePageContent = dynamic(
  () => import("@/components/home-page-content"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background" />
    ),
  }
);

export default function Home() {
  return <HomePageContent />;
}