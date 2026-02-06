"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCircle,
  FiTarget,
  FiTrendingUp,
  FiBook,
} from "react-icons/fi";
import { z } from "zod";
import { completeQuest } from "@/lib/questStore";

// Schema for SkillTree component
export const skillTreeSchema = z.object({
  title: z.string().describe("Title of the skill tree visualization"),
  currentRole: z.string().describe("User's current role"),
  targetRole: z.string().describe("User's target role"),
  categories: z
    .array(
      z.object({
        name: z.string().describe("Category name like 'Backend', 'Frontend'"),
        skills: z.array(
          z.object({
            name: z.string().describe("Skill name"),
            level: z
              .enum(["missing", "beginner", "intermediate", "advanced", "expert"])
              .describe("Current skill level"),
            required: z
              .enum(["required", "recommended", "optional"])
              .describe("How important this skill is for target role"),
            priority: z.number().min(1).max(5).describe("Learning priority 1-5"),
          })
        ),
      })
    )
    .describe("Categories of skills"),
  overallReadiness: z
    .number()
    .min(0)
    .max(100)
    .describe("Overall readiness percentage for target role"),
});

type SkillTreeProps = z.infer<typeof skillTreeSchema>;

const getLevelColor = (level: string) => {
  switch (level) {
    case "expert":
      return "bg-foreground text-background";
    case "advanced":
      return "bg-foreground/80 text-background";
    case "intermediate":
      return "bg-muted-foreground text-background";
    case "beginner":
      return "bg-muted text-foreground";
    case "missing":
      return "bg-card text-muted-foreground border border-border";
    default:
      return "bg-muted text-foreground";
  }
};

const getRequiredIcon = (required: string) => {
  switch (required) {
    case "required":
      return <FiTarget className="w-4 h-4 text-primary" />;
    case "recommended":
      return <FiTrendingUp className="w-4 h-4 text-muted-foreground" />;
    default:
      return <FiBook className="w-4 h-4 text-muted-foreground/70" />;
  }
};

export function SkillTree({
  title = "Skill Analysis",
  currentRole = "Current Role",
  targetRole = "Target Role",
  categories = [],
  overallReadiness = 0,
}: Partial<SkillTreeProps>) {
  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeReadiness = typeof overallReadiness === 'number' ? overallReadiness : 0;

  // Complete "skill" quest when this component renders
  useEffect(() => {
    completeQuest("skill");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-card rounded-2xl p-6 shadow-2xl border border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground font-sans">{title}</h2>
          <p className="text-muted-foreground text-sm mt-1 font-mono">
            <span className="text-muted-foreground">{currentRole}</span>
            <span className="mx-2">→</span>
            <span className="text-foreground font-medium">{targetRole}</span>
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="35"
                className="stroke-muted"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                className="stroke-foreground"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={220}
                initial={{ strokeDashoffset: 220 }}
                animate={{ strokeDashoffset: 220 - (220 * safeReadiness) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground font-mono">{safeReadiness}%</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground mt-1">Ready</span>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-4">
        {safeCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-muted/50 rounded-xl p-4 border border-border"
          >
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2 font-sans">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-2">
              {(Array.isArray(category.skills) ? category.skills : []).map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg
                    ${getLevelColor(skill.level)}
                    cursor-pointer hover:scale-105 transition-transform font-mono text-sm
                  `}
                  title={`Priority: ${skill.priority} | ${skill.required}`}
                >
                  {skill.level === "missing" || skill.level === "beginner" ? (
                    <FiCircle className="w-4 h-4" />
                  ) : (
                    <FiCheckCircle className="w-4 h-4" />
                  )}
                  <span className="font-medium">{skill.name}</span>
                  {getRequiredIcon(skill.required)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground"></div>
          <span>Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground/80"></div>
          <span>Advanced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted"></div>
          <span>Beginner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-card border border-border"></div>
          <span>Missing</span>
        </div>
      </div>
    </motion.div>
  );
}
