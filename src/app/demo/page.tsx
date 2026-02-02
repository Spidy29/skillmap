"use client";

import { SkillTree } from "@/components/generative/SkillTree";
import { SkillGapCard } from "@/components/generative/SkillGapCard";
import { LearningPath } from "@/components/generative/LearningPath";
import { ProgressMeter } from "@/components/generative/ProgressMeter";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

/**
 * Demo page to showcase all 4 generative components with sample data
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
                    Ye saare 4 Generative UI components hain jo AI decide karta hai kab render karne hain.
                </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
                {/* 1. SkillTree Demo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">1. SkillTree</h2>
                    <p className="text-neutral-500 mb-6">
                        Prompt: &quot;Show me all my skills as a React developer&quot;
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
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">2. SkillGapCard</h2>
                    <p className="text-neutral-500 mb-6">
                        Prompt: &quot;What is my biggest skill gap for Full-Stack Developer?&quot;
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
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">3. LearningPath</h2>
                    <p className="text-neutral-500 mb-6">
                        Prompt: &quot;Create a learning path for Docker&quot;
                    </p>
                    <LearningPath
                        skill="Docker"
                        totalDuration="3 weeks"
                        steps={[
                            {
                                title: "Docker Fundamentals",
                                description: "Learn what containers are, how Docker works, and basic terminology like images, containers, volumes.",
                                duration: "2 days",
                                type: "theory",
                                completed: true,
                                resources: [{ name: "Docker Official Docs", url: "https://docs.docker.com" }],
                            },
                            {
                                title: "Hands-on with Docker CLI",
                                description: "Practice running containers, building images, and managing the Docker ecosystem using CLI commands.",
                                duration: "3 days",
                                type: "practice",
                                completed: true,
                                resources: [{ name: "Docker CLI Cheatsheet", url: "#" }],
                            },
                            {
                                title: "Build a Containerized App",
                                description: "Create a Dockerfile for a Node.js app, set up multi-stage builds, and push to Docker Hub.",
                                duration: "1 week",
                                type: "project",
                                completed: false,
                                resources: [{ name: "Sample Dockerfile", url: "#" }],
                            },
                            {
                                title: "Docker Compose & Orchestration",
                                description: "Learn to manage multi-container applications with Docker Compose and intro to Kubernetes.",
                                duration: "4 days",
                                type: "theory",
                                completed: false,
                                resources: [{ name: "Docker Compose Guide", url: "#" }],
                            },
                            {
                                title: "Final Assessment",
                                description: "Deploy a full-stack app with frontend, backend, and database using Docker Compose.",
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
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">4. ProgressMeter</h2>
                    <p className="text-neutral-500 mb-6">
                        Prompt: &quot;How ready am I for a DevOps Engineer position?&quot;
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
                            { category: "Monitoring & Logging", score: 15, trend: "stable" },
                        ]}
                        insights={[
                            "Your Linux skills are solid - keep building on them",
                            "Docker is your next high-priority skill",
                            "Consider getting AWS Cloud Practitioner certification",
                            "Start with GitHub Actions for CI/CD basics",
                        ]}
                        nextMilestone="Complete Docker fundamentals and build 2 containerized projects"
                    />
                </motion.section>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-neutral-800 text-center">
                <p className="text-neutral-500">
                    Chat mein ye prompts type kar ke dekh — AI automatically decide karega konsa component render karna hai! 🚀
                </p>
                <Link
                    href="/chat"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                >
                    Try in Chat
                </Link>
            </div>
        </div>
    );
}
