"use client";

import { FiArrowRight, FiZap, FiLayers, FiTarget } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";
import { LoadingLink } from "@/components/ui/LoadingLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground font-sans overflow-hidden transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
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

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="/demo">Demo</NavLink>
            <NavLink href="/why">Why</NavLink>
            <NavLink href="https://github.com/Spidy29/skillmap" external>GitHub</NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LoadingLink
              href="/chat"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-foreground text-background hover:opacity-90 rounded-full font-medium text-sm transition-all"
            >
              Get Started
              <FiArrowRight className="w-4 h-4" />
            </LoadingLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-32">
        <BeamsBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">AI-Powered Career Intelligence</span>
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
            className="text-2xl md:text-4xl text-foreground/80 max-w-4xl mx-auto mb-8 font-medium tracking-tight"
          >
            Architect Your Future.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
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
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-foreground"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 border-t border-border bg-card/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Path to <span className="text-primary">10x Growth</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              3 powerful stages. Zero guesswork. Maximum impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiZap />}
              step="01"
              title="X-Ray Your Skills"
              description="Drop your resume or tell us about yourself. Our AI maps every skill, finds hidden gaps, and benchmarks you against industry leaders."
            />
            <FeatureCard
              icon={<FiLayers />}
              step="02"
              title="See Your Trajectory"
              description="Interactive skill trees reveal exactly what separates you from your dream role. No more guessing. Just clarity."
            />
            <FeatureCard
              icon={<FiTarget />}
              step="03"
              title="Execute Like a Pro"
              description="AI-curated resources, real deadlines, and progress tracking. Every step is engineered for maximum career velocity."
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="prompts" className="relative z-10 py-32 border-t border-border bg-card/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Try These <span className="text-primary">Power Prompts</span></h2>
            <p className="text-muted-foreground text-lg">Click any to start your journey</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <PromptCard text="🚀 Turn me from Frontend to Full-Stack in 90 days" />
            <PromptCard text="📊 Analyze my resume for FAANG SDE-2 readiness" />
            <PromptCard text="🎯 Build my System Design mastery roadmap" />
            <PromptCard text="⚡ Junior → Senior: Give me the fastest path" />
            <PromptCard text="🤖 Python → ML Engineer: What's missing?" />
            <PromptCard text="👑 Am I ready to lead a team?" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 border-t border-border bg-card/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Stop Planning. <span className="text-primary">Start Ascending.</span></h2>
            <p className="text-xl text-muted-foreground mb-10">Join 1000+ developers who stopped dreaming and started doing.</p>
            <LoadingLink
              href="/chat"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-full font-semibold text-xl hover:scale-105 transition-all duration-300"
            >
              Build Your Roadmap
              <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </LoadingLink>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 py-8 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          {/* Credits */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="text-muted-foreground">&lt;</span>
            <span className="text-primary">Built</span>
            <span className="text-muted-foreground">by</span>
            <a href="https://heyarjun.me" target="_blank" rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-semibold underline decoration-primary/50 hover:decoration-primary">
              Arjun Sharma
            </a>
            <span className="text-muted-foreground">/&gt;</span>
          </div>

          <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/30"></span>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/spidy29" target="_blank" rel="noopener noreferrer"
              className="hover:text-primary transition-colors" title="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/arjun2903" target="_blank" rel="noopener noreferrer"
              className="hover:text-primary transition-colors" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>

          <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/30"></span>

          {/* Hackathon Badge */}
          <span className="font-mono text-xs px-2 py-1 bg-primary/10 text-primary rounded">
            The UI Strikes Back &apos;26
          </span>
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
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
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
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({
  step,
  title,
  description,
}: {
  icon?: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-gradient-to-br from-card/80 to-card/40 border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden"
    >
      {/* Gradient accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Step badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
        <span className="text-primary font-mono text-sm font-bold">STEP {step}</span>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>

      {/* Subtle glow effect on hover */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

function PromptCard({ text }: { text: string }) {
  return (
    <Link
      href="/chat"
      className="group block p-5 bg-card/50 border border-border rounded-xl hover:bg-card hover:border-foreground/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">&quot;</span>
        <span className="text-foreground/80 font-mono text-sm group-hover:text-foreground transition-colors">
          {text}
        </span>
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">&quot;</span>
        <FiArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
