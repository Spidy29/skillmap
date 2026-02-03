import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Run ESLint separately via `npm run lint`
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize heavy package imports for better tree-shaking
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "recharts",
      "lucide-react",
      "react-icons",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
    ],
  },
  // Webpack configuration (for production builds)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      effect: false,
      sury: false,
      "@valibot/to-json-schema": false,
    };
    return config;
  },
};

export default nextConfig;

