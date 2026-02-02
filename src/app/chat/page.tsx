"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { FiZap, FiLayers, FiTarget, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

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
      <div className="min-h-screen bg-black font-sans flex flex-col">
        {/* Header */}
        <header className="flex-none border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-neutral-500 hover:text-white transition-colors"
                title="Back to Home"
              >
                <FiArrowLeft className="w-5 h-5" />
              </Link>

              <div className="relative h-10 w-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal.png"
                  alt="ASCEND"
                  className="absolute left-0 h-[250%] w-auto object-contain top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
                />
              </div>
            </div>

            {/* Right: Indicators */}
            <div className="flex items-center gap-6">
              <FeatureBadge icon={<FiZap className="w-3.5 h-3.5" />} label="AI Active" />
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="text-xs font-mono text-neutral-400">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden relative">
          <MessageThreadFull />
        </main>
      </div>
    </TamboProvider>
  );
}

function FeatureBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="hidden md:flex items-center gap-2 text-neutral-400 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
      {icon}
      <span>{label}</span>
    </div>
  );
}
