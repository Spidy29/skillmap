"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { FiTrendingUp, FiDollarSign, FiCalendar } from "react-icons/fi";

// Schema for SalaryProjection component
export const salaryProjectionSchema = z.object({
    currentRole: z.string().describe("Current role"),
    targetRole: z.string().describe("Target role"),
    currentSalary: z.number().describe("Current salary in USD"),
    projectedSalary: z.number().describe("Projected salary after reaching target"),
    timeline: z
        .array(
            z.object({
                month: z.string().describe("Month label"),
                current: z.number().describe("Current path salary"),
                projected: z.number().describe("With upskilling salary"),
            })
        )
        .describe("Salary projection over time"),
    salaryIncrease: z.number().describe("Percentage salary increase"),
    timeToReach: z.string().describe("Time to reach target role"),
});

type SalaryProjectionProps = z.infer<typeof salaryProjectionSchema>;

export function SalaryProjection({
    currentRole = "Current Role",
    targetRole = "Target Role",
    currentSalary = 50000,
    projectedSalary = 80000,
    timeline = [],
    salaryIncrease = 0,
    timeToReach = "12 months",
}: Partial<SalaryProjectionProps>) {
    const safeTimeline = Array.isArray(timeline) ? timeline : [];
    const safeIncrease = typeof salaryIncrease === "number" ? salaryIncrease : 0;

    const formatCurrency = (value: number) => {
        return `$${(value / 1000).toFixed(0)}K`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white font-sans">Salary Projection</h2>
                    <p className="text-neutral-500 text-sm font-mono mt-1">
                        {currentRole} → {targetRole}
                    </p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-green-500">
                        <FiTrendingUp className="w-5 h-5" />
                        <span className="text-xl font-bold font-mono">+{safeIncrease}%</span>
                    </div>
                    <p className="text-neutral-500 text-xs">potential increase</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
                        <FiDollarSign className="w-3 h-3" />
                        Current
                    </div>
                    <p className="text-xl font-bold text-neutral-400 font-mono">
                        {formatCurrency(currentSalary)}
                    </p>
                </div>
                <div className="bg-neutral-900 rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
                        <FiDollarSign className="w-3 h-3" />
                        Target
                    </div>
                    <p className="text-xl font-bold text-white font-mono">
                        {formatCurrency(projectedSalary)}
                    </p>
                </div>
                <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center gap-2 text-neutral-500 text-xs mb-1">
                        <FiCalendar className="w-3 h-3" />
                        Timeline
                    </div>
                    <p className="text-xl font-bold text-neutral-400 font-mono">{timeToReach}</p>
                </div>
            </div>

            {/* Area Chart */}
            <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={safeTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#525252" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#525252" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                        <XAxis dataKey="month" stroke="#525252" tick={{ fontSize: 10 }} />
                        <YAxis
                            stroke="#525252"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(v) => `$${v / 1000}K`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#171717",
                                border: "1px solid #404040",
                                borderRadius: "8px",
                            }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                        />
                        <Area
                            type="monotone"
                            dataKey="current"
                            stroke="#525252"
                            fill="url(#currentGradient)"
                            name="Current Path"
                        />
                        <Area
                            type="monotone"
                            dataKey="projected"
                            stroke="#ffffff"
                            fill="url(#projectedGradient)"
                            name="With Upskilling"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white" />
                    <span className="text-neutral-400 font-mono">With Upskilling</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <span className="text-neutral-400 font-mono">Current Path</span>
                </div>
            </div>
        </motion.div>
    );
}
