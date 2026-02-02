"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { FiZap, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";

/**
 * ASCEND - Career Intelligence Platform
 * Main chat page with TamboProvider
 */
export default function AscendChat() {
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <div className="min-h-screen text-white font-sans flex flex-col overflow-hidden">
        {/* Beams Background - same as landing page */}
        <BeamsBackground />

        {/* Navbar - same style as landing page */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                title="Back to Home"
              >
                <FiArrowLeft className="w-5 h-5" />
              </Link>

              <Link href="/" className="relative h-full flex items-center w-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal.png"
                  alt="ASCEND"
                  className="absolute left-0 h-[300%] w-auto object-contain top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
                />
              </Link>
            </div>

            {/* Center: Title */}
            <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-sm font-mono text-neutral-400">AI Career Coach Active</span>
              </div>
            </div>

            {/* Right: Indicators */}
            <div className="flex items-center gap-4">
              <FeatureBadge icon={<FiZap className="w-3.5 h-3.5" />} label="Generative UI" />
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="text-xs font-mono text-neutral-400">Online</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Chat Container */}
        <main className="flex-1 pt-20 relative z-10">
          <div className="h-[calc(100vh-5rem)] max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full bg-black/40 backdrop-blur-xl border-x border-white/5"
            >
              <MessageThreadFull />
            </motion.div>
          </div>
        </main>

        {/* Footer - minimal */}
        <footer className="relative z-10 py-4 border-t border-neutral-900 text-center bg-black/50 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <span className="font-mono">Powered by Tambo AI</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
            <a
              href="https://heyarjun.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              by Arjun Sharma
            </a>
          </div>
        </footer>
      </div>
    </TamboProvider>
  );
}

function FeatureBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="hidden md:flex items-center gap-2 text-neutral-400 text-xs font-mono bg-neutral-900/50 px-4 py-2 rounded-full border border-neutral-800 backdrop-blur-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}
