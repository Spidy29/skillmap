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

export function LearningPath({
    skill = "Skill",
    totalDuration = "4 weeks",
    steps = []
}: Partial<LearningPathProps>) {
    const safeSteps = Array.isArray(steps) ? steps : [];
    const completedSteps = safeSteps.filter((s) => s.completed).length;
    const progress = safeSteps.length > 0 ? Math.round((completedSteps / safeSteps.length) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-card rounded-2xl p-6 shadow-2xl border border-border"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground font-sans">
                        Learning Path: {skill}
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground font-mono">
                        <span className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {totalDuration}
                        </span>
                        <span>•</span>
                        <span>{steps.length} steps</span>
                        <span>•</span>
                        <span className="text-foreground">{progress}% complete</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-foreground"
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
                {safeSteps.map((step, index) => {
                    const typeConfig = getTypeConfig(step.type);
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                relative pl-8 pb-4
                ${index !== safeSteps.length - 1 ? "border-l-2 border-border" : ""}
              `}
                        >
                            {/* Step Number/Check */}
                            <div
                                className={`
                  absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center
                  ${step.completed ? "bg-foreground text-background" : "bg-muted border-2 border-border"}
                `}
                            >
                                {step.completed ? (
                                    <FiCheckCircle className="w-4 h-4" />
                                ) : (
                                    <span className="text-xs text-muted-foreground font-mono">{index + 1}</span>
                                )}
                            </div>

                            {/* Step Content */}
                            <div
                                className={`
                  bg-muted/50 rounded-lg p-4 border border-border
                  ${step.completed ? "opacity-60" : ""}
                `}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-foreground">{typeConfig.icon}</span>
                                    <h3 className="text-lg font-semibold text-foreground font-sans">{step.title}</h3>
                                    <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono">
                                        {step.duration}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3 font-sans">{step.description}</p>

                                {step.resources && step.resources.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {step.resources.map((resource, rIndex) => (
                                            <a
                                                key={rIndex}
                                                href={resource.url || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs bg-muted text-foreground px-2 py-1 rounded hover:bg-muted/80 transition-colors font-mono"
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
            <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground font-mono">
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
