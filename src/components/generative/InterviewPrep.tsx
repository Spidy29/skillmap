"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import { FiCode, FiMessageSquare, FiUsers, FiAlertCircle, FiCheckCircle, FiClock, FiTarget } from "react-icons/fi";

// Schema for InterviewPrep component
export const interviewPrepSchema = z.object({
    targetRole: z.string().describe("Target role for interview prep"),
    company: z.string().optional().describe("Specific company if any"),
    overallReadiness: z.number().min(0).max(100).describe("Overall interview readiness"),
    rounds: z
        .array(
            z.object({
                name: z.string().describe("Round name like 'Technical', 'System Design'"),
                type: z.enum(["coding", "system-design", "behavioral", "hr"]).describe("Type of round"),
                readiness: z.number().min(0).max(100).describe("Readiness for this round"),
                topics: z.array(z.string()).describe("Topics to prepare"),
                estimatedPrepTime: z.string().describe("Time needed to prepare"),
            })
        )
        .describe("Interview rounds"),
    topQuestions: z
        .array(
            z.object({
                question: z.string().describe("Interview question"),
                difficulty: z.enum(["easy", "medium", "hard"]).describe("Difficulty level"),
                frequency: z.string().describe("How often asked, e.g., 'Very Common'"),
            })
        )
        .describe("Top interview questions"),
    tips: z.array(z.string()).describe("Interview tips"),
});

type InterviewPrepProps = z.infer<typeof interviewPrepSchema>;

export function InterviewPrep({
    targetRole = "Software Engineer",
    company,
    overallReadiness = 60,
    rounds = [],
    topQuestions = [],
    tips = [],
}: Partial<InterviewPrepProps>) {
    const safeRounds = Array.isArray(rounds) ? rounds : [];
    const safeQuestions = Array.isArray(topQuestions) ? topQuestions : [];
    const safeTips = Array.isArray(tips) ? tips : [];
    const safeReadiness = typeof overallReadiness === "number" ? overallReadiness : 0;

    const getRoundIcon = (type: string) => {
        switch (type) {
            case "coding":
                return <FiCode className="w-5 h-5" />;
            case "system-design":
                return <FiTarget className="w-5 h-5" />;
            case "behavioral":
                return <FiMessageSquare className="w-5 h-5" />;
            case "hr":
                return <FiUsers className="w-5 h-5" />;
            default:
                return <FiCode className="w-5 h-5" />;
        }
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case "easy":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "medium":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "hard":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-neutral-500/20 text-neutral-400";
        }
    };

    const getReadinessColor = (score: number) => {
        if (score >= 80) return "bg-green-500";
        if (score >= 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white font-sans">Interview Prep</h2>
                    <p className="text-neutral-500 text-sm font-mono mt-1">
                        {targetRole} {company && `@ ${company}`}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-white font-mono">{safeReadiness}%</div>
                    <p className="text-xs text-neutral-500">Ready</p>
                </div>
            </div>

            {/* Overall Progress */}
            <div className="mb-6">
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${safeReadiness}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full rounded-full ${getReadinessColor(safeReadiness)}`}
                    />
                </div>
            </div>

            {/* Interview Rounds */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-400 mb-3 font-sans">Interview Rounds</h3>
                <div className="space-y-3">
                    {safeRounds.map((round, index) => {
                        const safeTopics = Array.isArray(round.topics) ? round.topics : [];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-neutral-900 rounded-xl border border-neutral-800"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neutral-800 rounded-lg text-white">
                                            {getRoundIcon(round.type)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white font-sans">{round.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                                <FiClock className="w-3 h-3" />
                                                <span>{round.estimatedPrepTime} to prepare</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-white font-mono">{round.readiness}%</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {safeTopics.map((topic, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 bg-neutral-800 text-neutral-400 rounded text-xs font-mono"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Top Questions */}
            {safeQuestions.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-neutral-400 mb-3 font-sans">Top Questions to Practice</h3>
                    <div className="space-y-2">
                        {safeQuestions.map((q, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-800"
                            >
                                <span className="text-sm text-neutral-300 font-sans flex-1">{q.question}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-neutral-500">{q.frequency}</span>
                                    <span
                                        className={`px-2 py-0.5 rounded text-xs font-mono border ${getDifficultyColor(
                                            q.difficulty
                                        )}`}
                                    >
                                        {q.difficulty}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tips */}
            {safeTips.length > 0 && (
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-700">
                    <div className="flex items-center gap-2 mb-2">
                        <FiAlertCircle className="w-4 h-4 text-yellow-400" />
                        <h3 className="text-sm font-medium text-neutral-300 font-sans">Pro Tips</h3>
                    </div>
                    <ul className="space-y-1">
                        {safeTips.map((tip, i) => (
                            <li key={i} className="text-sm text-neutral-500 font-sans flex items-start gap-2">
                                <FiCheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
}
