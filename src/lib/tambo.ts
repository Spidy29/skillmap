/**
 * @file tambo.ts
 * @description Central configuration file for SkillMap - Career Growth Companion
 *
 * This file registers all Tambo components and tools for the SkillMap app.
 */

import {
  SkillTree,
  skillTreeSchema,
  SkillGapCard,
  skillGapCardSchema,
  LearningPath,
  learningPathSchema,
  ProgressMeter,
  progressMeterSchema,
} from "@/components/generative";
import type { TamboComponent, TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * Local Tools - Functions that run in the browser
 */

// Tool to analyze resume text and extract skills
const analyzeResume = async (params: { resumeText: string }) => {
  // This would normally call an API, but for the hackathon we'll simulate
  const techKeywords = [
    "react", "node", "typescript", "javascript", "python", "java",
    "aws", "docker", "kubernetes", "sql", "mongodb", "redis",
    "git", "ci/cd", "rest api", "graphql", "nextjs", "express",
    "html", "css", "tailwind", "figma", "agile", "scrum"
  ];

  const resumeLower = params.resumeText.toLowerCase();
  const foundSkills = techKeywords.filter(skill => resumeLower.includes(skill));

  return {
    extractedSkills: foundSkills,
    yearsOfExperience: Math.floor(Math.random() * 5) + 1,
    currentLevel: foundSkills.length > 10 ? "senior" : foundSkills.length > 5 ? "mid" : "junior",
  };
};

// Tool to get job market requirements for a role
const getJobRequirements = async (params: { targetRole: string; location?: string }) => {
  // Simulated job market data
  const roleRequirements: Record<string, string[]> = {
    "full-stack developer": ["react", "node", "typescript", "sql", "docker", "aws", "git", "rest api"],
    "frontend developer": ["react", "typescript", "css", "tailwind", "nextjs", "figma", "testing"],
    "backend developer": ["node", "python", "sql", "docker", "kubernetes", "aws", "redis", "graphql"],
    "data scientist": ["python", "sql", "machine learning", "tensorflow", "pandas", "statistics"],
    "devops engineer": ["docker", "kubernetes", "aws", "terraform", "ci/cd", "linux", "monitoring"],
    "sde-2": ["system design", "dsa", "react", "node", "typescript", "sql", "docker", "aws"],
  };

  const roleLower = params.targetRole.toLowerCase();
  const requirements = roleRequirements[roleLower] || ["programming", "problem solving", "communication"];

  return {
    role: params.targetRole,
    requiredSkills: requirements,
    averageSalary: "$80,000 - $150,000",
    demandLevel: "high",
  };
};

// Tool to generate learning resources for a skill
const getLearningResources = async (params: { skill: string; level: string }) => {
  const resources = [
    { name: "Official Documentation", type: "documentation", url: "#" },
    { name: `${params.skill} Crash Course - YouTube`, type: "tutorial", url: "#" },
    { name: `Complete ${params.skill} Bootcamp - Udemy`, type: "course", url: "#" },
    { name: `Build a project with ${params.skill}`, type: "project", url: "#" },
  ];

  return {
    skill: params.skill,
    resources,
    estimatedTime: params.level === "beginner" ? "4 weeks" : "2 weeks",
  };
};

export const tools: TamboTool[] = [
  {
    name: "analyzeResume",
    description: "Analyzes resume text to extract skills, experience level, and current capabilities. Use this when user provides their resume or describes their background.",
    tool: analyzeResume,
    inputSchema: z.object({
      resumeText: z.string().describe("The full text content of the resume"),
    }),
    outputSchema: z.object({
      extractedSkills: z.array(z.string()),
      yearsOfExperience: z.number(),
      currentLevel: z.enum(["junior", "mid", "senior"]),
    }),
  },
  {
    name: "getJobRequirements",
    description: "Gets the required skills and market data for a target job role. Use this when user mentions their career goal or target position.",
    tool: getJobRequirements,
    inputSchema: z.object({
      targetRole: z.string().describe("The target job role like 'Full-Stack Developer' or 'SDE-2'"),
      location: z.string().optional().describe("Optional location for localized data"),
    }),
    outputSchema: z.object({
      role: z.string(),
      requiredSkills: z.array(z.string()),
      averageSalary: z.string(),
      demandLevel: z.enum(["high", "medium", "low"]),
    }),
  },
  {
    name: "getLearningResources",
    description: "Gets recommended learning resources for a specific skill. Use this when user wants to learn a particular skill.",
    tool: getLearningResources,
    inputSchema: z.object({
      skill: z.string().describe("The skill to find resources for"),
      level: z.enum(["beginner", "intermediate", "advanced"]).describe("User's current level in this skill"),
    }),
    outputSchema: z.object({
      skill: z.string(),
      resources: z.array(z.object({
        name: z.string(),
        type: z.enum(["course", "book", "tutorial", "documentation", "project"]),
        url: z.string().optional(),
      })),
      estimatedTime: z.string(),
    }),
  },
];

/**
 * Tambo Components - AI-rendered UI components
 */
export const components: TamboComponent[] = [
  {
    name: "SkillTree",
    description: "A visual skill tree component that shows all user skills organized by category with their current levels and importance for target role. Use this to give an overview of the user's skill landscape.",
    component: SkillTree,
    propsSchema: skillTreeSchema,
  },
  {
    name: "SkillGapCard",
    description: "A card component that highlights a specific missing or weak skill with priority level, time estimate, and learning resources. Use this to focus on one skill gap at a time.",
    component: SkillGapCard,
    propsSchema: skillGapCardSchema,
  },
  {
    name: "LearningPath",
    description: "A step-by-step learning roadmap component for a specific skill with theory, practice, project, and assessment stages. Use this when user wants to know HOW to learn a skill.",
    component: LearningPath,
    propsSchema: learningPathSchema,
  },
  {
    name: "ProgressMeter",
    description: "A progress visualization component showing overall career readiness with category breakdowns, trends, and next milestone. Use this to show how ready the user is for their target role.",
    component: ProgressMeter,
    propsSchema: progressMeterSchema,
  },
];
