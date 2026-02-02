"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiTarget, FiTrendingUp, FiUsers, FiZap, FiCheckCircle, FiLayout } from "react-icons/fi";

/**
 * Page explaining why we chose these components and when to use them
 */
export default function WhyThesePage() {
    const components = [
        {
            name: "SkillTree",
            icon: "🌳",
            category: "Visualization",
            problem: "Users don't know their complete skill landscape",
            solution: "Visual overview of all skills organized by category with levels",
            whenToUse: "When user asks: 'Show my skills', 'What skills do I have?', 'Analyze my profile'",
            whyChosen: "Skill categorization is foundational for career planning. Users need to see the big picture before diving into specifics.",
            keyFeatures: ["Category grouping", "Skill levels", "Overall readiness %", "Required vs Optional tags"],
        },
        {
            name: "SkillGapCard",
            icon: "🎯",
            category: "Focus",
            problem: "Users get overwhelmed with too many skills to learn",
            solution: "Focus on ONE skill gap with actionable details",
            whenToUse: "When user asks: 'What should I learn first?', 'My biggest gap?', 'Most important skill?'",
            whyChosen: "Focused attention on one skill reduces decision paralysis. Includes time estimate and resources for immediate action.",
            keyFeatures: ["Priority indicator", "Time estimate", "Learning resources", "Current vs Required level"],
        },
        {
            name: "LearningPath",
            icon: "🛤️",
            category: "Action",
            problem: "Users know WHAT to learn but not HOW to learn",
            solution: "Step-by-step roadmap with theory, practice, and projects",
            whenToUse: "When user asks: 'How to learn Docker?', 'Create roadmap for X', 'Learning path for Y'",
            whyChosen: "Structured learning is proven to be more effective. Mix of theory, practice, and projects ensures comprehensive skill development.",
            keyFeatures: ["Step-by-step flow", "Progress tracking", "Resource links", "Duration estimates"],
        },
        {
            name: "ProgressMeter",
            icon: "📊",
            category: "Motivation",
            problem: "Users don't know how close they are to their goal",
            solution: "Visual progress with category breakdown and insights",
            whenToUse: "When user asks: 'How ready am I?', 'Am I qualified for X?', 'Show my progress'",
            whyChosen: "Progress visualization motivates continued learning. Breakdown by category helps identify weak areas.",
            keyFeatures: ["Circular progress", "Category breakdown", "Trend indicators", "Next milestone"],
        },
        {
            name: "SkillRadar",
            icon: "🕸️",
            category: "Comparison",
            problem: "Users can't visualize gaps between current and required skills",
            solution: "Radar chart comparing current vs required levels",
            whenToUse: "When user asks: 'Compare my skills', 'Visual comparison', 'Skills radar'",
            whyChosen: "Radar charts are excellent for multi-dimensional comparisons. The overlap/gap is immediately visible.",
            keyFeatures: ["Spider/Radar visualization", "Current vs Required overlay", "Match percentage", "Multi-skill view"],
        },
        {
            name: "SkillComparison",
            icon: "📈",
            category: "Market",
            problem: "Users don't know how they compare to market standards",
            solution: "Bar chart comparing user vs market average with hire line",
            whenToUse: "When user asks: 'How do I compare?', 'Market average?', 'Am I competitive?'",
            whyChosen: "Knowing where you stand in the market is crucial for career decisions. The 'hire line' gives a clear target.",
            keyFeatures: ["Market comparison", "Hire line indicator", "Your vs Average bars", "Verdict message"],
        },
        {
            name: "SalaryProjection",
            icon: "💰",
            category: "Motivation",
            problem: "Users don't see the financial ROI of learning",
            solution: "Area chart showing salary growth with vs without upskilling",
            whenToUse: "When user asks: 'Salary expectations?', 'What can I earn?', 'ROI of learning?'",
            whyChosen: "Financial motivation is powerful. Showing concrete salary projections encourages learning investment.",
            keyFeatures: ["Salary timeline", "With/Without comparison", "Percentage increase", "Time to reach"],
        },
        {
            name: "CareerTimeline",
            icon: "🚀",
            category: "Planning",
            problem: "Users don't have a long-term career roadmap",
            solution: "Timeline showing career milestones with skills and salary",
            whenToUse: "When user asks: 'Path to Tech Lead?', 'Career roadmap', '5-year plan'",
            whyChosen: "Long-term vision keeps users motivated. Showing progressive roles with salaries makes goals tangible.",
            keyFeatures: ["Visual timeline", "Milestone cards", "Skills per stage", "Salary progression"],
        },
        {
            name: "JobMatchCard",
            icon: "💼",
            category: "Action",
            problem: "Users don't know which jobs match their skills",
            solution: "Job card showing match %, matched/missing skills, apply button",
            whenToUse: "When user asks: 'Jobs for me?', 'Find matching jobs', 'What can I apply for?'",
            whyChosen: "Direct connection between skills and jobs. Shows exactly what user has and what they need to learn.",
            keyFeatures: ["Match score", "Matched skills (green)", "Missing skills (red)", "Apply action"],
        },
        {
            name: "InterviewPrep",
            icon: "🎤",
            category: "Action",
            problem: "Users don't know how to prepare for interviews",
            solution: "Complete interview dashboard with rounds, questions, tips",
            whenToUse: "When user asks: 'Prepare for Google interview', 'Interview tips', 'What to study?'",
            whyChosen: "Interview prep is a critical career moment. Comprehensive dashboard covers all aspects of preparation.",
            keyFeatures: ["Round breakdown", "Top questions", "Difficulty tags", "Pro tips"],
        },
        {
            name: "WeeklySchedule",
            icon: "📅",
            category: "Action",
            problem: "Users don't know how to organize their learning time",
            solution: "Weekly calendar with time blocks and activities",
            whenToUse: "When user asks: 'Weekly plan', 'Study schedule', 'How to organize learning?'",
            whyChosen: "Time management is key to consistent learning. Structured schedules increase completion rates.",
            keyFeatures: ["Day-wise blocks", "Activity types", "Duration tracking", "Progress indicator"],
        },
        {
            name: "SkillTrends",
            icon: "📉",
            category: "Market",
            problem: "Users don't know which skills are in demand",
            solution: "Line chart showing market trends with growth rates",
            whenToUse: "When user asks: 'Trending skills?', 'What's in demand?', 'Market insights?'",
            whyChosen: "Learning trending skills maximizes career opportunities. Market data helps prioritize learning.",
            keyFeatures: ["Multi-skill line chart", "Growth rates", "Demand scores", "Market insights"],
        },
    ];

    const categories = [
        { name: "Visualization", icon: <FiLayout />, description: "See the big picture of your skills" },
        { name: "Focus", icon: <FiTarget />, description: "Zero in on what matters most" },
        { name: "Action", icon: <FiZap />, description: "Take immediate, concrete steps" },
        { name: "Motivation", icon: <FiTrendingUp />, description: "Stay motivated with visible progress" },
        { name: "Comparison", icon: <FiUsers />, description: "Know where you stand vs others" },
        { name: "Market", icon: <FiCheckCircle />, description: "Understand market demands" },
        { name: "Planning", icon: <FiArrowRight />, description: "Plan your long-term career path" },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-8 pt-8 pb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl font-bold mb-4">Why These Components?</h1>
                    <p className="text-xl text-neutral-400 max-w-3xl">
                        Each component was designed to solve a specific problem in the career development journey.
                        Here&apos;s the thinking behind each choice.
                    </p>
                </motion.div>
            </div>

            {/* Design Philosophy */}
            <div className="max-w-6xl mx-auto px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800"
                >
                    <h2 className="text-2xl font-bold mb-4">🎯 Design Philosophy</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 bg-black rounded-xl border border-neutral-800">
                            <h3 className="font-semibold text-white mb-2">Problem → Solution</h3>
                            <p className="text-sm text-neutral-500">Every component solves a real user problem in career development.</p>
                        </div>
                        <div className="p-4 bg-black rounded-xl border border-neutral-800">
                            <h3 className="font-semibold text-white mb-2">Visual First</h3>
                            <p className="text-sm text-neutral-500">Complex data is presented through intuitive visualizations, not walls of text.</p>
                        </div>
                        <div className="p-4 bg-black rounded-xl border border-neutral-800">
                            <h3 className="font-semibold text-white mb-2">Actionable</h3>
                            <p className="text-sm text-neutral-500">Every component leads to a clear next step the user can take.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Categories Overview */}
            <div className="max-w-6xl mx-auto px-8 mb-16">
                <h2 className="text-2xl font-bold mb-6">Component Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 text-center"
                        >
                            <div className="text-2xl mb-2 text-white flex items-center justify-center">{cat.icon}</div>
                            <h3 className="font-medium text-white text-sm mb-1">{cat.name}</h3>
                            <p className="text-xs text-neutral-500">{cat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Component Details */}
            <div className="max-w-6xl mx-auto px-8 pb-20">
                <h2 className="text-2xl font-bold mb-8">All 12 Components Explained</h2>
                <div className="space-y-6">
                    {components.map((comp, index) => (
                        <motion.div
                            key={comp.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{comp.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                                        <span className="text-xs px-2 py-0.5 bg-neutral-800 rounded text-neutral-400">
                                            {comp.category}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-4xl font-bold text-neutral-800">#{index + 1}</span>
                            </div>

                            {/* Content Grid */}
                            <div className="grid md:grid-cols-2 gap-6 p-6">
                                {/* Problem & Solution */}
                                <div className="space-y-4">
                                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                        <p className="text-xs text-red-400 font-mono mb-1">❌ PROBLEM</p>
                                        <p className="text-neutral-300">{comp.problem}</p>
                                    </div>
                                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                        <p className="text-xs text-green-400 font-mono mb-1">✅ SOLUTION</p>
                                        <p className="text-neutral-300">{comp.solution}</p>
                                    </div>
                                </div>

                                {/* Why & When */}
                                <div className="space-y-4">
                                    <div className="p-4 bg-neutral-800 rounded-xl">
                                        <p className="text-xs text-neutral-500 font-mono mb-1">💡 WHY WE CHOSE THIS</p>
                                        <p className="text-neutral-300 text-sm">{comp.whyChosen}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-xs text-white font-mono mb-1">💬 WHEN TO USE</p>
                                        <p className="text-neutral-400 text-sm">{comp.whenToUse}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="px-6 pb-6">
                                <p className="text-xs text-neutral-500 font-mono mb-2">KEY FEATURES</p>
                                <div className="flex flex-wrap gap-2">
                                    {comp.keyFeatures.map((f, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300"
                                        >
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="max-w-6xl mx-auto px-8 pb-16 text-center">
                <div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Ready to see them in action?</h2>
                    <p className="text-neutral-500 mb-6">Try these components in the AI chat or explore the interactive demos.</p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/chat"
                            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                        >
                            Try in Chat →
                        </Link>
                        <Link
                            href="/demo"
                            className="px-6 py-3 bg-neutral-800 text-white rounded-full font-medium border border-neutral-700 hover:bg-neutral-700 transition-colors"
                        >
                            View Demos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
