"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
} from "recharts";

// Schema for SkillComparison component
export const skillComparisonSchema = z.object({
    title: z.string().describe("Title of the comparison chart"),
    targetRole: z.string().describe("Target role"),
    skills: z
        .array(
            z.object({
                name: z.string().describe("Skill name"),
                yourLevel: z.number().min(0).max(100).describe("Your skill level"),
                marketAvg: z.number().min(0).max(100).describe("Market average for this role"),
                topPerformers: z.number().min(0).max(100).describe("Top performers level"),
            })
        )
        .describe("Skills to compare"),
    verdict: z.string().describe("Overall verdict about readiness"),
});

type SkillComparisonProps = z.infer<typeof skillComparisonSchema>;

export function SkillComparison({
    title = "Skill Comparison",
    targetRole = "Target Role",
    skills = [],
    verdict = "",
}: Partial<SkillComparisonProps>) {
    const safeSkills = Array.isArray(skills) ? skills : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white font-sans">{title}</h2>
                <p className="text-neutral-500 text-sm font-mono mt-1">vs Market for {targetRole}</p>
            </div>

            {/* Bar Chart */}
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={safeSkills}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                        <XAxis type="number" domain={[0, 100]} stroke="#525252" />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: "#a3a3a3", fontSize: 12 }}
                            width={75}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#171717",
                                border: "1px solid #404040",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#ffffff" }}
                        />
                        <ReferenceLine x={75} stroke="#22c55e" strokeDasharray="3 3" label="" />
                        <Bar dataKey="marketAvg" fill="#404040" radius={[0, 4, 4, 0]} name="Market Avg" />
                        <Bar dataKey="yourLevel" radius={[0, 4, 4, 0]} name="Your Level">
                            {safeSkills.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.yourLevel >= entry.marketAvg ? "#ffffff" : "#737373"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-white" />
                    <span className="text-neutral-400 font-mono">Your Level</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-neutral-600" />
                    <span className="text-neutral-400 font-mono">Market Avg</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-green-500" />
                    <span className="text-neutral-400 font-mono">Hire Line (75%)</span>
                </div>
            </div>

            {/* Verdict */}
            {verdict && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-neutral-900 rounded-xl border border-neutral-800"
                >
                    <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                        💡 {verdict}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
