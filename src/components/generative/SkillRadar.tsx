"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

// Schema for SkillRadar component
export const skillRadarSchema = z.object({
    title: z.string().describe("Title of the radar chart"),
    targetRole: z.string().describe("Target role being analyzed"),
    skills: z
        .array(
            z.object({
                skill: z.string().describe("Skill name"),
                current: z.number().min(0).max(100).describe("Current skill level 0-100"),
                required: z.number().min(0).max(100).describe("Required level for target role"),
            })
        )
        .describe("Array of skills with current and required levels"),
    overallMatch: z.number().min(0).max(100).describe("Overall match percentage"),
});

type SkillRadarProps = z.infer<typeof skillRadarSchema>;

export function SkillRadar({
    title = "Skill Radar",
    targetRole = "Target Role",
    skills = [],
    overallMatch = 0,
}: Partial<SkillRadarProps>) {
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeMatch = typeof overallMatch === "number" ? overallMatch : 0;

    // Transform data for recharts
    const chartData = safeSkills.map((s) => ({
        skill: s.skill,
        current: s.current,
        required: s.required,
    }));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white font-sans">{title}</h2>
                <p className="text-neutral-500 text-sm font-mono mt-1">for {targetRole}</p>
            </div>

            {/* Radar Chart */}
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="#404040" />
                        <PolarAngleAxis
                            dataKey="skill"
                            tick={{ fill: "#a3a3a3", fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: "#525252", fontSize: 10 }}
                        />
                        <Radar
                            name="Required"
                            dataKey="required"
                            stroke="#525252"
                            fill="#525252"
                            fillOpacity={0.3}
                        />
                        <Radar
                            name="Current"
                            dataKey="current"
                            stroke="#ffffff"
                            fill="#ffffff"
                            fillOpacity={0.5}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#171717",
                                border: "1px solid #404040",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#ffffff" }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Match Score */}
            <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white" />
                    <span className="text-sm text-neutral-400 font-mono">Your Skills</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <span className="text-sm text-neutral-400 font-mono">Required</span>
                </div>
            </div>

            {/* Overall Match */}
            <div className="mt-6 text-center">
                <span className="text-4xl font-bold text-white font-mono">{safeMatch}%</span>
                <p className="text-neutral-500 text-sm mt-1">Role Match</p>
            </div>
        </motion.div>
    );
}
