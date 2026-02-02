"use client";

import { SkillTree } from "@/components/generative/SkillTree";
import { SkillGapCard } from "@/components/generative/SkillGapCard";
import { LearningPath } from "@/components/generative/LearningPath";
import { ProgressMeter } from "@/components/generative/ProgressMeter";
import { SkillRadar } from "@/components/generative/SkillRadar";
import { SkillComparison } from "@/components/generative/SkillComparison";
import { SalaryProjection } from "@/components/generative/SalaryProjection";
import { CareerTimeline } from "@/components/generative/CareerTimeline";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

/**
 * Demo page to showcase all 8 generative components with sample data
 */
export default function DemoPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>
                <h1 className="text-4xl font-bold mb-4">🧩 Component Demo</h1>
                <p className="text-neutral-500">
                    All 8 Generative UI components — AI decides which one to render based on your prompt.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {["SkillTree", "SkillGapCard", "LearningPath", "ProgressMeter", "SkillRadar", "SkillComparison", "SalaryProjection", "CareerTimeline"].map((name) => (
                        <span key={name} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-neutral-400">
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-20">
                {/* 1. SkillTree Demo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">1. SkillTree</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;Show me all my skills as a React developer&quot;
                    </p>
                    <SkillTree
                        title="Your Skill Landscape"
                        currentRole="React Developer"
                        targetRole="Full-Stack Developer"
                        overallReadiness={65}
                        categories={[
                            {
                                name: "Frontend",
                                skills: [
                                    { name: "React", level: "advanced", required: "required", priority: 1 },
                                    { name: "TypeScript", level: "intermediate", required: "required", priority: 2 },
                                    { name: "Next.js", level: "beginner", required: "recommended", priority: 3 },
                                    { name: "Tailwind", level: "advanced", required: "optional", priority: 4 },
                                ],
                            },
                            {
                                name: "Backend",
                                skills: [
                                    { name: "Node.js", level: "beginner", required: "required", priority: 1 },
                                    { name: "Express", level: "missing", required: "required", priority: 2 },
                                    { name: "PostgreSQL", level: "missing", required: "recommended", priority: 3 },
                                ],
                            },
                            {
                                name: "DevOps",
                                skills: [
                                    { name: "Docker", level: "missing", required: "required", priority: 1 },
                                    { name: "AWS", level: "missing", required: "recommended", priority: 2 },
                                ],
                            },
                        ]}
                    />
                </motion.section>

                {/* 2. SkillGapCard Demo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">2. SkillGapCard</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;What is my biggest skill gap for Full-Stack Developer?&quot;
                    </p>
                    <SkillGapCard
                        skill="Node.js & Express"
                        currentLevel="beginner"
                        requiredLevel="advanced"
                        priority="high"
                        estimatedTime="4-6 weeks"
                        reason="Backend development is essential for full-stack roles. Most companies expect proficiency in Node.js/Express for API development and server-side logic."
                        resources={[
                            { title: "Node.js Official Docs", type: "documentation", url: "https://nodejs.org" },
                            { title: "Express.js Crash Course", type: "tutorial", url: "#" },
                            { title: "Build a REST API Project", type: "project", url: "#" },
                        ]}
                    />
                </motion.section>

                {/* 3. LearningPath Demo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">3. LearningPath</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;Create a learning path for Docker&quot;
                    </p>
                    <LearningPath
                        skill="Docker"
                        totalDuration="3 weeks"
                        steps={[
                            {
                                title: "Docker Fundamentals",
                                description: "Learn what containers are, how Docker works, and basic terminology.",
                                duration: "2 days",
                                type: "theory",
                                completed: true,
                                resources: [{ name: "Docker Official Docs", url: "https://docs.docker.com" }],
                            },
                            {
                                title: "Hands-on with Docker CLI",
                                description: "Practice running containers, building images, and managing Docker.",
                                duration: "3 days",
                                type: "practice",
                                completed: true,
                                resources: [{ name: "Docker CLI Cheatsheet", url: "#" }],
                            },
                            {
                                title: "Build a Containerized App",
                                description: "Create a Dockerfile for a Node.js app, set up multi-stage builds.",
                                duration: "1 week",
                                type: "project",
                                completed: false,
                                resources: [{ name: "Sample Dockerfile", url: "#" }],
                            },
                            {
                                title: "Final Assessment",
                                description: "Deploy a full-stack app with Docker Compose.",
                                duration: "2 days",
                                type: "assessment",
                                completed: false,
                                resources: [],
                            },
                        ]}
                    />
                </motion.section>

                {/* 4. ProgressMeter Demo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">4. ProgressMeter</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;How ready am I for a DevOps Engineer position?&quot;
                    </p>
                    <ProgressMeter
                        currentRole="React Developer"
                        targetRole="DevOps Engineer"
                        overallReadiness={42}
                        breakdown={[
                            { category: "Linux & CLI", score: 60, trend: "up" },
                            { category: "Containerization", score: 25, trend: "up" },
                            { category: "CI/CD", score: 35, trend: "stable" },
                            { category: "Cloud (AWS/GCP)", score: 20, trend: "down" },
                        ]}
                        insights={[
                            "Your Linux skills are solid - keep building on them",
                            "Docker is your next high-priority skill",
                            "Consider getting AWS Cloud Practitioner certification",
                        ]}
                        nextMilestone="Complete Docker fundamentals and build 2 containerized projects"
                    />
                </motion.section>

                {/* 5. SkillRadar Demo - NEW */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">5. SkillRadar 📊</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;Show a radar chart of my skills vs required for SDE-2&quot;
                    </p>
                    <SkillRadar
                        title="Skill Match Analysis"
                        targetRole="SDE-2 at FAANG"
                        overallMatch={58}
                        skills={[
                            { skill: "DSA", current: 45, required: 90 },
                            { skill: "System Design", current: 30, required: 85 },
                            { skill: "React", current: 85, required: 70 },
                            { skill: "Node.js", current: 40, required: 75 },
                            { skill: "SQL", current: 55, required: 70 },
                            { skill: "Docker", current: 20, required: 60 },
                        ]}
                    />
                </motion.section>

                {/* 6. SkillComparison Demo - NEW */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">6. SkillComparison 📈</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;How do my skills compare to market average?&quot;
                    </p>
                    <SkillComparison
                        title="Market Comparison"
                        targetRole="Full-Stack Developer"
                        skills={[
                            { name: "React", yourLevel: 85, marketAvg: 70, topPerformers: 95 },
                            { name: "Node.js", yourLevel: 40, marketAvg: 65, topPerformers: 90 },
                            { name: "TypeScript", yourLevel: 60, marketAvg: 55, topPerformers: 85 },
                            { name: "PostgreSQL", yourLevel: 30, marketAvg: 60, topPerformers: 85 },
                            { name: "Docker", yourLevel: 20, marketAvg: 50, topPerformers: 80 },
                        ]}
                        verdict="You're above market average in React but need to focus on backend skills. Node.js and PostgreSQL are priority areas where you're below the hire line."
                    />
                </motion.section>

                {/* 7. SalaryProjection Demo - NEW */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">7. SalaryProjection 💰</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;What salary can I expect if I learn these skills?&quot;
                    </p>
                    <SalaryProjection
                        currentRole="React Developer"
                        targetRole="Full-Stack Developer"
                        currentSalary={60000}
                        projectedSalary={95000}
                        salaryIncrease={58}
                        timeToReach="8 months"
                        timeline={[
                            { month: "Now", current: 60000, projected: 60000 },
                            { month: "M2", current: 60000, projected: 65000 },
                            { month: "M4", current: 62000, projected: 72000 },
                            { month: "M6", current: 64000, projected: 82000 },
                            { month: "M8", current: 65000, projected: 95000 },
                            { month: "M10", current: 66000, projected: 100000 },
                            { month: "M12", current: 68000, projected: 110000 },
                        ]}
                    />
                </motion.section>

                {/* 8. CareerTimeline Demo - NEW */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                >
                    <h2 className="text-2xl font-bold mb-2 text-white">8. CareerTimeline 🎯</h2>
                    <p className="text-neutral-500 mb-6 text-sm font-mono">
                        💬 &quot;Show me a timeline to become a Tech Lead&quot;
                    </p>
                    <CareerTimeline
                        title="Path to Tech Lead"
                        totalDuration="24 months"
                        milestones={[
                            {
                                role: "Junior Developer",
                                timeline: "Completed",
                                skills: ["JavaScript", "React", "Git"],
                                status: "completed",
                                salary: "$60K",
                            },
                            {
                                role: "Mid-Level Developer",
                                timeline: "Current",
                                skills: ["TypeScript", "Node.js", "Testing"],
                                status: "current",
                                salary: "$80K",
                            },
                            {
                                role: "Senior Developer",
                                timeline: "Month 6-12",
                                skills: ["System Design", "Mentoring", "AWS"],
                                status: "upcoming",
                                salary: "$120K",
                            },
                            {
                                role: "Tech Lead",
                                timeline: "Month 18-24",
                                skills: ["Architecture", "Team Leadership", "Strategy"],
                                status: "upcoming",
                                salary: "$150K+",
                            },
                        ]}
                    />
                </motion.section>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-neutral-800 text-center">
                <p className="text-neutral-500 mb-4">
                    Type these prompts in chat — AI will automatically decide which component to render! 🚀
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Try in Chat →
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium border border-neutral-800 hover:bg-neutral-800 transition-colors"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
