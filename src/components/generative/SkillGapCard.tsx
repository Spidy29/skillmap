"use client";

import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiClock, FiArrowRight } from "react-icons/fi";
import { z } from "zod";

// Schema for SkillGapCard component
export const skillGapCardSchema = z.object({
    skill: z.string().describe("Name of the missing or weak skill"),
    currentLevel: z
        .enum(["none", "beginner", "intermediate"])
        .describe("Current skill level"),
    requiredLevel: z
        .enum(["intermediate", "advanced", "expert"])
        .describe("Required level for target role"),
    priority: z
        .enum(["high", "medium", "low"])
        .describe("Priority to learn this skill"),
    estimatedTime: z.string().describe("Estimated time to learn, e.g., '2 weeks'"),
    reason: z.string().describe("Why this skill is needed for the target role"),
    resources: z
        .array(
            z.object({
                title: z.string(),
                type: z.enum(["course", "book", "tutorial", "documentation", "project"]),
                url: z.string().optional(),
            })
        )
        .describe("Recommended learning resources"),
});

type SkillGapCardProps = z.infer<typeof skillGapCardSchema>;

const getPriorityConfig = (priority: string) => {
    switch (priority) {
        case "high":
            return {
                color: "border-primary bg-primary/5",
                badge: "bg-foreground text-background",
                icon: <FiAlertTriangle className="w-4 h-4" />,
            };
        case "medium":
            return {
                color: "border-muted-foreground bg-muted-foreground/5",
                badge: "bg-muted-foreground text-background",
                icon: <FiClock className="w-4 h-4" />,
            };
        default:
            return {
                color: "border-border bg-muted/30",
                badge: "bg-muted text-foreground",
                icon: <FiCheckCircle className="w-4 h-4" />,
            };
    }
};

const getLevelLabel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
};

const getResourceIcon = (type: string) => {
    switch (type) {
        case "course":
            return "🎓";
        case "book":
            return "📚";
        case "tutorial":
            return "📝";
        case "documentation":
            return "📖";
        case "project":
            return "🛠️";
        default:
            return "📌";
    }
};

export function SkillGapCard({
    skill = "Unknown Skill",
    currentLevel = "none",
    requiredLevel = "advanced",
    priority = "medium",
    estimatedTime = "Unknown",
    reason = "This skill is needed for career growth.",
    resources = [],
}: Partial<SkillGapCardProps>) {
    const safeResources = Array.isArray(resources) ? resources : [];
    const priorityConfig = getPriorityConfig(priority || "medium");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`
        w-full max-w-md rounded-xl border-2 p-5 shadow-lg
        bg-card
        ${priorityConfig.color}
      `}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-foreground font-sans">{skill}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground font-mono">
                        <span className="text-muted-foreground">{getLevelLabel(currentLevel)}</span>
                        <FiArrowRight className="w-4 h-4" />
                        <span className="text-foreground">{getLevelLabel(requiredLevel)}</span>
                    </div>
                </div>

                {/* Priority Badge */}
                <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium font-mono ${priorityConfig.badge}`}
                >
                    {priorityConfig.icon}
                    {priority.toUpperCase()}
                </div>
            </div>

            {/* Reason */}
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-sans">{reason}</p>

            {/* Time Estimate */}
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground font-mono">
                <FiClock className="w-4 h-4" />
                <span>Estimated: </span>
                <span className="text-foreground font-medium">{estimatedTime}</span>
            </div>

            {/* Resources */}
            <div className="border-t border-border pt-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2 font-sans">
                    Recommended Resources:
                </h4>
                <div className="space-y-2">
                    {safeResources.map((resource, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm font-mono"
                        >
                            <span>{getResourceIcon(resource.type)}</span>
                            {resource.url ? (
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground hover:text-primary hover:underline"
                                >
                                    {resource.title}
                                </a>
                            ) : (
                                <span className="text-muted-foreground">{resource.title}</span>
                            )}
                            <span className="text-muted-foreground/70 text-xs capitalize">
                                ({resource.type})
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
