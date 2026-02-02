"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import { FiCheck, FiArrowRight, FiBriefcase, FiAward } from "react-icons/fi";

// Schema for CareerTimeline component
export const careerTimelineSchema = z.object({
    title: z.string().describe("Title of the timeline"),
    milestones: z
        .array(
            z.object({
                role: z.string().describe("Role/position name"),
                timeline: z.string().describe("When to achieve, e.g., 'Month 1-3'"),
                skills: z.array(z.string()).describe("Skills to acquire"),
                status: z.enum(["completed", "current", "upcoming"]).describe("Milestone status"),
                salary: z.string().optional().describe("Expected salary at this stage"),
            })
        )
        .describe("Career milestones"),
    totalDuration: z.string().describe("Total time to reach final goal"),
});

type CareerTimelineProps = z.infer<typeof careerTimelineSchema>;

export function CareerTimeline({
    title = "Career Roadmap",
    milestones = [],
    totalDuration = "12 months",
}: Partial<CareerTimelineProps>) {
    const safeMilestones = Array.isArray(milestones) ? milestones : [];

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "completed":
                return {
                    bg: "bg-white",
                    text: "text-black",
                    border: "border-white",
                    icon: <FiCheck className="w-4 h-4" />,
                };
            case "current":
                return {
                    bg: "bg-neutral-900",
                    text: "text-white",
                    border: "border-white animate-pulse",
                    icon: <FiArrowRight className="w-4 h-4" />,
                };
            default:
                return {
                    bg: "bg-neutral-900",
                    text: "text-neutral-500",
                    border: "border-neutral-700",
                    icon: <FiBriefcase className="w-4 h-4" />,
                };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white font-sans">{title}</h2>
                    <p className="text-neutral-500 text-sm font-mono mt-1">
                        Total journey: {totalDuration}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 rounded-full border border-neutral-800">
                    <FiAward className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono text-neutral-400">
                        {safeMilestones.length} milestones
                    </span>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {safeMilestones.map((milestone, index) => {
                    const config = getStatusConfig(milestone.status);
                    const safeSkills = Array.isArray(milestone.skills) ? milestone.skills : [];

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="relative pl-10 pb-8 last:pb-0"
                        >
                            {/* Connector Line */}
                            {index !== safeMilestones.length - 1 && (
                                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-neutral-800" />
                            )}

                            {/* Status Icon */}
                            <div
                                className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${config.bg} ${config.text} ${config.border}`}
                            >
                                {config.icon}
                            </div>

                            {/* Content */}
                            <div
                                className={`p-4 rounded-xl border ${milestone.status === "current"
                                        ? "bg-neutral-900 border-white/30"
                                        : "bg-neutral-900/50 border-neutral-800"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3
                                        className={`text-lg font-semibold font-sans ${milestone.status === "completed" ? "text-neutral-500" : "text-white"
                                            }`}
                                    >
                                        {milestone.role}
                                    </h3>
                                    <span className="text-xs font-mono text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                                        {milestone.timeline}
                                    </span>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {safeSkills.map((skill, sIndex) => (
                                        <span
                                            key={sIndex}
                                            className={`text-xs px-2 py-1 rounded font-mono ${milestone.status === "completed"
                                                    ? "bg-neutral-800 text-neutral-500"
                                                    : "bg-neutral-800 text-neutral-300"
                                                }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Salary */}
                                {milestone.salary && (
                                    <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center gap-2 text-sm">
                                        <span className="text-neutral-500">Expected:</span>
                                        <span className="text-white font-mono font-medium">{milestone.salary}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
