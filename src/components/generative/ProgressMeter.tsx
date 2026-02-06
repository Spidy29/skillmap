"use client";

import { motion } from "framer-motion";
import { FiTrendingUp, FiTarget, FiZap } from "react-icons/fi";
import { z } from "zod";

// Schema for ProgressMeter component
export const progressMeterSchema = z.object({
    currentRole: z.string().describe("User's current role"),
    targetRole: z.string().describe("User's target role"),
    overallReadiness: z
        .number()
        .min(0)
        .max(100)
        .describe("Overall readiness percentage"),
    breakdown: z
        .array(
            z.object({
                category: z.string().describe("Category like 'Technical', 'Soft Skills'"),
                score: z.number().min(0).max(100).describe("Score for this category"),
                trend: z
                    .enum(["up", "stable", "down"])
                    .describe("Recent trend in this category"),
            })
        )
        .describe("Score breakdown by category"),
    insights: z
        .array(z.string())
        .describe("Key insights about the user's progress"),
    nextMilestone: z.string().describe("Next milestone to achieve"),
});

type ProgressMeterProps = z.infer<typeof progressMeterSchema>;

const getTrendIcon = (trend: string) => {
    switch (trend) {
        case "up":
            return <FiTrendingUp className="w-4 h-4 text-primary" />;
        case "down":
            return <FiTrendingUp className="w-4 h-4 text-muted-foreground rotate-180" />;
        default:
            return <span className="w-4 h-4 text-muted-foreground">→</span>;
    }
};

export function ProgressMeter({
    currentRole = "Current Role",
    targetRole = "Target Role",
    overallReadiness = 0,
    breakdown = [],
    insights = [],
    nextMilestone = "Keep learning!",
}: Partial<ProgressMeterProps>) {
    const safeBreakdown = Array.isArray(breakdown) ? breakdown : [];
    const safeInsights = Array.isArray(insights) ? insights : [];
    const safeReadiness = typeof overallReadiness === 'number' ? overallReadiness : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-auto bg-card rounded-2xl p-6 shadow-2xl border border-border"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground font-sans">Your journey from</p>
                <div className="flex items-center justify-center gap-3 mt-1 font-mono">
                    <span className="text-lg text-muted-foreground">{currentRole}</span>
                    <span className="text-2xl text-muted-foreground/50">→</span>
                    <span className="text-lg text-foreground font-semibold">
                        {targetRole}
                    </span>
                </div>
            </div>

            {/* Main Progress Circle */}
            <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            className="stroke-muted"
                            strokeWidth="12"
                            fill="none"
                        />
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            className="stroke-foreground"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={440}
                            initial={{ strokeDashoffset: 440 }}
                            animate={{
                                strokeDashoffset: 440 - (440 * safeReadiness) / 100,
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="text-4xl font-bold text-foreground font-mono"
                        >
                            {safeReadiness}%
                        </motion.span>
                        <span className="text-sm text-muted-foreground">Ready</span>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-3 mb-6">
                {safeBreakdown.map((item, index) => (
                    <motion.div
                        key={item.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="bg-muted/50 rounded-lg p-3 border border-border"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground flex items-center gap-2 font-sans">
                                {item.category}
                                {getTrendIcon(item.trend)}
                            </span>
                            <span className="text-sm font-medium text-foreground font-mono">
                                {item.score}%
                            </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                className="h-full bg-foreground rounded-full"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Next Milestone */}
            <div className="bg-muted/50 rounded-lg p-4 border border-primary/30 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <FiTarget className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground font-sans">Next Milestone</span>
                </div>
                <p className="text-foreground font-sans">{nextMilestone}</p>
            </div>

            {/* Insights */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2 font-sans">
                    <FiZap className="w-4 h-4 text-primary" />
                    Key Insights
                </h4>
                {safeInsights.map((insight, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-sm text-muted-foreground pl-6 font-sans"
                    >
                        • {insight}
                    </motion.p>
                ))}
            </div>
        </motion.div>
    );
}
