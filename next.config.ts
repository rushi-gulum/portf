import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["https://preview-chat-c6c1250a-7f1e-4675-a6f6-16eebe449820.space-z.ai"],
};

export default nextConfig;
