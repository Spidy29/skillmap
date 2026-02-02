"use client";

import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCircle,
  FiTarget,
  FiTrendingUp,
  FiBook,
} from "react-icons/fi";
import { z } from "zod";

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
      return "bg-white text-black";
    case "advanced":
      return "bg-neutral-200 text-black";
    case "intermediate":
      return "bg-neutral-400 text-black";
    case "beginner":
      return "bg-neutral-600 text-white";
    case "missing":
      return "bg-neutral-800 text-white border border-neutral-600";
    default:
      return "bg-neutral-700 text-white";
  }
};

const getRequiredIcon = (required: string) => {
  switch (required) {
    case "required":
      return <FiTarget className="w-4 h-4 text-white" />;
    case "recommended":
      return <FiTrendingUp className="w-4 h-4 text-neutral-400" />;
    default:
      return <FiBook className="w-4 h-4 text-neutral-500" />;
  }
};

export function SkillTree({
  title,
  currentRole,
  targetRole,
  categories,
  overallReadiness,
}: SkillTreeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-sans">{title}</h2>
          <p className="text-neutral-500 text-sm mt-1 font-mono">
            <span className="text-neutral-300">{currentRole}</span>
            <span className="mx-2">→</span>
            <span className="text-white font-medium">{targetRole}</span>
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
                stroke="#262626"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                stroke="#ffffff"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={220}
                initial={{ strokeDashoffset: 220 }}
                animate={{ strokeDashoffset: 220 - (220 * overallReadiness) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white font-mono">{overallReadiness}%</span>
            </div>
          </div>
          <span className="text-xs text-neutral-500 mt-1">Ready</span>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-4">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-neutral-900 rounded-xl p-4 border border-neutral-800"
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2 font-sans">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
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
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <span>Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-200"></div>
          <span>Advanced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-400"></div>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
          <span>Beginner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-600"></div>
          <span>Missing</span>
        </div>
      </div>
    </motion.div>
  );
}
