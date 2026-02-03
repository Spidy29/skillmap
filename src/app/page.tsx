"use client";

import { FiArrowRight, FiZap, FiLayers, FiTarget } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";
import { LoadingLink } from "@/components/ui/LoadingLink";

export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="relative h-full flex items-center w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.png"
              alt="ASCEND"
              className="absolute left-0 h-[300%] w-auto object-contain top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
            />
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="/demo">Demo</NavLink>
            <NavLink href="/why">Why</NavLink>
            <NavLink href="https://github.com/Spidy29/skillmap" external>GitHub</NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <LoadingLink
              href="/chat"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-neutral-200 rounded-full font-medium text-sm transition-all"
            >
              Get Started
              <FiArrowRight className="w-4 h-4" />
            </LoadingLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-32">
        {/* Ascending Beams Background */}
        <BeamsBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-mono text-neutral-400">AI-Powered Career Intelligence</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
          >
            <span className="block">ASCEND</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-4xl text-neutral-200 max-w-4xl mx-auto mb-8 font-medium tracking-tight"
          >
            Architect Your Future.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto mb-12"
          >
            AI-driven skill mapping for precision career growth.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <LoadingLink
              href="/chat"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Analyze My Profile
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </LoadingLink>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <Stat value="10K+" label="Skills Analyzed" />
            <Stat value="500+" label="Learning Paths" />
            <Stat value="98%" label="Success Rate" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500"
        >
          <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 border-t border-neutral-900 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Three steps to transform your career trajectory
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiZap />}
              step="01"
              title="Deep Analysis"
              description="From resume to skills graph in seconds. We benchmark you against the top 1% of your field."
            />
            <FeatureCard
              icon={<FiLayers />}
              step="02"
              title="Strategic Visualization"
              description="See the gap. Know the path. Interactive maps that eliminate career ambiguity instantly."
            />
            <FeatureCard
              icon={<FiTarget />}
              step="03"
              title="Precision Execution"
              description="No fluff. Just the exact resources, milestones, and feedback you need to level up."
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="prompts" className="relative z-10 py-32 border-t border-neutral-900 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Can You Ask?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <PromptCard text="I'm a frontend developer. How do I become a full-stack engineer?" />
            <PromptCard text="Analyze my resume and show me what I need for SDE-2 at FAANG" />
            <PromptCard text="Create a 3-month learning path for System Design" />
            <PromptCard text="What's the fastest path from Junior to Senior Developer?" />
            <PromptCard text="I know Python. What skills do I need for Machine Learning?" />
            <PromptCard text="How ready am I for a Tech Lead position?" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 border-t border-neutral-900 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to level up?
            </h2>
            <p className="text-xl text-neutral-500 mb-10">
              Your future self is waiting.
            </p>
            <LoadingLink
              href="/chat"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-semibold text-xl hover:scale-105 transition-all duration-300"
            >
              Build Your Roadmap
              <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </LoadingLink>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-10 border-t border-neutral-900 text-center bg-black">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-neutral-300 font-sans text-sm tracking-wide">
          <div className="flex items-center gap-2 group">
            <span className="opacity-90">Crafted by</span>
            <a
              href="https://heyarjun.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 transition-all duration-300 font-medium group-hover:tracking-wider border-b border-transparent hover:border-emerald-400 pb-0.5"
            >
              Arjun Sharma
            </a>
          </div>
          <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-600"></span>
          <span className="text-neutral-400 font-mono text-xs">The UI Strikes Back '26</span>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
    >
      {children}
      {external && <FiArrowRight className="w-3 h-3 -rotate-45" />}
    </a>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold font-mono">{value}</div>
      <div className="text-sm text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 text-center"
    >
      <div className="absolute top-6 right-6 text-5xl font-bold text-neutral-800 font-mono">
        {step}
      </div>
      <div className="w-14 h-14 rounded-xl bg-white text-black flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function PromptCard({ text }: { text: string }) {
  return (
    <Link
      href="/chat"
      className="group block p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <span className="text-neutral-600 group-hover:text-white transition-colors">&quot;</span>
        <span className="text-neutral-300 font-mono text-sm group-hover:text-white transition-colors">
          {text}
        </span>
        <span className="text-neutral-600 group-hover:text-white transition-colors">&quot;</span>
        <FiArrowRight className="w-4 h-4 ml-auto text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
