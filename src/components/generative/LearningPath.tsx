"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiBook, FiCode, FiZap, FiFileText } from "react-icons/fi";
import { z } from "zod";

// Schema for LearningPath component
export const learningPathSchema = z.object({
    skill: z.string().describe("The skill this learning path is for"),
    totalDuration: z.string().describe("Total estimated duration, e.g., '4 weeks'"),
    steps: z
        .array(
            z.object({
                title: z.string().describe("Step title"),
                description: z.string().describe("What you'll learn in this step"),
                duration: z.string().describe("Time for this step, e.g., '2 days'"),
                type: z
                    .enum(["theory", "practice", "project", "assessment"])
                    .describe("Type of learning activity"),
                resources: z
                    .array(
                        z.object({
                            name: z.string(),
                            url: z.string().optional(),
                        })
                    )
                    .optional(),
                completed: z.boolean().default(false).describe("Whether step is completed"),
            })
        )
        .describe("Ordered list of learning steps"),
});

type LearningPathProps = z.infer<typeof learningPathSchema>;

const getTypeConfig = (type: string) => {
    switch (type) {
        case "theory":
            return { icon: <FiBook className="w-5 h-5" />, label: "Theory" };
        case "practice":
            return { icon: <FiCode className="w-5 h-5" />, label: "Practice" };
        case "project":
            return { icon: <FiZap className="w-5 h-5" />, label: "Project" };
        case "assessment":
            return { icon: <FiFileText className="w-5 h-5" />, label: "Assessment" };
        default:
            return { icon: <FiBook className="w-5 h-5" />, label: "Learn" };
    }
};

export function LearningPath({ skill, totalDuration, steps }: LearningPathProps) {
    const completedSteps = steps.filter((s) => s.completed).length;
    const progress = Math.round((completedSteps / steps.length) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white font-sans">
                        Learning Path: {skill}
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500 font-mono">
                        <span className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {totalDuration}
                        </span>
                        <span>•</span>
                        <span>{steps.length} steps</span>
                        <span>•</span>
                        <span className="text-white">{progress}% complete</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-white"
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
                {steps.map((step, index) => {
                    const typeConfig = getTypeConfig(step.type);
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                relative pl-8 pb-4
                ${index !== steps.length - 1 ? "border-l-2 border-neutral-800" : ""}
              `}
                        >
                            {/* Step Number/Check */}
                            <div
                                className={`
                  absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center
                  ${step.completed ? "bg-white text-black" : "bg-neutral-800 border-2 border-neutral-600"}
                `}
                            >
                                {step.completed ? (
                                    <FiCheckCircle className="w-4 h-4" />
                                ) : (
                                    <span className="text-xs text-neutral-300 font-mono">{index + 1}</span>
                                )}
                            </div>

                            {/* Step Content */}
                            <div
                                className={`
                  bg-neutral-900 rounded-lg p-4 border border-neutral-800
                  ${step.completed ? "opacity-60" : ""}
                `}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-white">{typeConfig.icon}</span>
                                    <h3 className="text-lg font-semibold text-white font-sans">{step.title}</h3>
                                    <span className="ml-auto text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded font-mono">
                                        {step.duration}
                                    </span>
                                </div>

                                <p className="text-sm text-neutral-400 mb-3 font-sans">{step.description}</p>

                                {step.resources && step.resources.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {step.resources.map((resource, rIndex) => (
                                            <a
                                                key={rIndex}
                                                href={resource.url || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 transition-colors font-mono"
                                            >
                                                📎 {resource.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap gap-4 text-xs text-neutral-500 font-mono">
                <div className="flex items-center gap-1">
                    <FiBook className="w-3 h-3" />
                    <span>Theory</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiCode className="w-3 h-3" />
                    <span>Practice</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiZap className="w-3 h-3" />
                    <span>Project</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiFileText className="w-3 h-3" />
                    <span>Assessment</span>
                </div>
            </div>
        </motion.div>
    );
}
