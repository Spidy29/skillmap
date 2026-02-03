"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { FiZap, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";
import { QuestWidget } from "@/components/gamification/QuestWidget";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * ASCEND - Career Intelligence Platform
 * Main chat page with TamboProvider
 */
export default function AscendChat() {
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey=""
      components={components}
      tools={tools}
      tamboUrl={typeof window !== "undefined" ? `${window.location.origin}/api/tambo` : "/api/tambo"}
      mcpServers={mcpServers}
    >
      <div className="min-h-screen text-foreground font-sans flex flex-col overflow-hidden bg-background transition-colors duration-300">
        <BeamsBackground />

        {/* Navbar */}
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="w-full px-4 h-20 flex items-center justify-between">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-4 h-full">
              <Link
                href="/"
                className="p-2 rounded-full bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                title="Back to Home"
              >
                <FiArrowLeft className="w-5 h-5" />
              </Link>

              <Link href="/" className="relative h-full flex items-center w-48">
                {/* Dark Mode Logo - White text */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal.png"
                  alt="ASCEND"
                  className="absolute left-0 h-[300%] w-auto object-contain top-1/2 -translate-y-1/2 pointer-events-none hidden dark:block"
                  style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
                />
                {/* Light Mode Logo - Black text */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal-light.png"
                  alt="ASCEND"
                  className="absolute left-0 h-[300%] w-auto object-contain top-1/2 -translate-y-1/2 pointer-events-none block dark:hidden"
                  style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />
              </Link>
            </div>

            {/* Center: Status */}
            <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-sm font-mono text-muted-foreground">AI Career Coach Active</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <FeatureBadge icon={<FiZap className="w-3.5 h-3.5" />} label="Generative UI" />
              <div className="h-8 w-px bg-border hidden sm:block" />
              <ThemeToggle />
              <QuestWidget />
            </div>
          </div>
        </nav>

        {/* Main Chat Container - Fixed height, no page scroll */}
        <main className="fixed top-20 left-0 right-0 bottom-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <MessageThreadFull />
          </motion.div>
        </main>
      </div>
    </TamboProvider>
  );
}

function FeatureBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="hidden md:flex items-center gap-2 text-muted-foreground text-xs font-mono bg-card/50 px-4 py-2 rounded-full border border-border backdrop-blur-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}
