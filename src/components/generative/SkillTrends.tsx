"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";

// Schema for SkillTrends component
export const skillTrendsSchema = z.object({
    title: z.string().describe("Title of the trends chart"),
    timeframe: z.string().describe("Timeframe like 'Last 12 months'"),
    skills: z
        .array(
            z.object({
                name: z.string().describe("Skill name"),
                trend: z.enum(["rising", "falling", "stable"]).describe("Overall trend direction"),
                growthRate: z.number().describe("Growth rate percentage"),
                currentDemand: z.number().min(0).max(100).describe("Current demand score"),
                data: z.array(
                    z.object({
                        month: z.string(),
                        value: z.number(),
                    })
                ).describe("Monthly demand data"),
            })
        )
        .describe("Skills with their trend data"),
    insights: z.array(z.string()).describe("Key market insights"),
});

type SkillTrendsProps = z.infer<typeof skillTrendsSchema>;

const COLORS = ["#ffffff", "#a855f7", "#3b82f6", "#22c55e", "#eab308"];

export function SkillTrends({
    title = "Skill Market Trends",
    timeframe = "Last 12 months",
    skills = [],
    insights = [],
}: Partial<SkillTrendsProps>) {
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeInsights = Array.isArray(insights) ? insights : [];

    // Combine all skill data for the chart
    const chartData = safeSkills.length > 0 && safeSkills[0].data
        ? safeSkills[0].data.map((d, i) => {
            const point: Record<string, string | number> = { month: d.month };
            safeSkills.forEach((skill) => {
                if (skill.data && skill.data[i]) {
                    point[skill.name] = skill.data[i].value;
                }
            });
            return point;
        })
        : [];

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "rising":
                return <FiTrendingUp className="w-4 h-4 text-green-400" />;
            case "falling":
                return <FiTrendingDown className="w-4 h-4 text-red-400" />;
            default:
                return <FiMinus className="w-4 h-4 text-neutral-400" />;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case "rising":
                return "text-green-400";
            case "falling":
                return "text-red-400";
            default:
                return "text-neutral-400";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white font-sans">{title}</h2>
                    <p className="text-neutral-500 text-sm font-mono mt-1">{timeframe}</p>
                </div>
                <div className="px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800">
                    <span className="text-xs text-neutral-400 font-mono">📊 Market Data</span>
                </div>
            </div>

            {/* Line Chart */}
            <div className="h-64 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                        <XAxis dataKey="month" stroke="#525252" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#525252" tick={{ fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#171717",
                                border: "1px solid #404040",
                                borderRadius: "8px",
                            }}
                        />
                        {safeSkills.map((skill, index) => (
                            <Line
                                key={skill.name}
                                type="monotone"
                                dataKey={skill.name}
                                stroke={COLORS[index % COLORS.length]}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Skills Legend with Stats */}
            <div className="space-y-3 mb-6">
                {safeSkills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-800"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-white font-medium font-sans">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <span className="text-xs text-neutral-500 block">Demand</span>
                                <span className="text-sm font-mono text-white">{skill.currentDemand}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {getTrendIcon(skill.trend)}
                                <span className={`text-sm font-mono ${getTrendColor(skill.trend)}`}>
                                    {skill.growthRate > 0 ? "+" : ""}
                                    {skill.growthRate}%
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Insights */}
            {safeInsights.length > 0 && (
                <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-700">
                    <h3 className="text-sm font-medium text-neutral-300 mb-2 font-sans">💡 Market Insights</h3>
                    <ul className="space-y-1">
                        {safeInsights.map((insight, i) => (
                            <li key={i} className="text-sm text-neutral-500 font-sans">
                                • {insight}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
}
