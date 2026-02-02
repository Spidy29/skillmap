"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import { FiClock, FiBook, FiCode, FiPlay, FiCheckSquare, FiCoffee } from "react-icons/fi";

// Schema for WeeklySchedule component
export const weeklyScheduleSchema = z.object({
    weekNumber: z.number().describe("Current week number"),
    skill: z.string().describe("Skill being learned this week"),
    totalHours: z.number().describe("Total learning hours this week"),
    days: z
        .array(
            z.object({
                day: z.string().describe("Day name like 'Monday'"),
                blocks: z.array(
                    z.object({
                        time: z.string().describe("Time slot like '9:00 AM - 10:00 AM'"),
                        activity: z.string().describe("What to do"),
                        type: z.enum(["theory", "practice", "project", "review", "break"]).describe("Activity type"),
                        duration: z.string().describe("Duration in minutes or hours"),
                        completed: z.boolean().describe("Whether this block is completed"),
                    })
                ),
            })
        )
        .describe("Schedule for each day"),
    weeklyGoal: z.string().describe("Goal for this week"),
    progress: z.number().min(0).max(100).describe("Weekly progress percentage"),
});

type WeeklyScheduleProps = z.infer<typeof weeklyScheduleSchema>;

export function WeeklySchedule({
    weekNumber = 1,
    skill = "Docker",
    totalHours = 10,
    days = [],
    weeklyGoal = "Complete fundamentals",
    progress = 40,
}: Partial<WeeklyScheduleProps>) {
    const safeDays = Array.isArray(days) ? days : [];
    const safeProgress = typeof progress === "number" ? progress : 0;

    const getTypeConfig = (type: string) => {
        switch (type) {
            case "theory":
                return { icon: <FiBook className="w-4 h-4" />, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
            case "practice":
                return { icon: <FiCode className="w-4 h-4" />, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
            case "project":
                return { icon: <FiPlay className="w-4 h-4" />, color: "bg-green-500/20 text-green-400 border-green-500/30" };
            case "review":
                return { icon: <FiCheckSquare className="w-4 h-4" />, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
            case "break":
                return { icon: <FiCoffee className="w-4 h-4" />, color: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30" };
            default:
                return { icon: <FiClock className="w-4 h-4" />, color: "bg-neutral-500/20 text-neutral-400" };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="px-3 py-1 bg-white text-black rounded-full text-xs font-bold font-mono">
                            WEEK {weekNumber}
                        </span>
                        <h2 className="text-2xl font-bold text-white font-sans">{skill}</h2>
                    </div>
                    <p className="text-neutral-500 text-sm font-sans">{weeklyGoal}</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2 text-neutral-400">
                        <FiClock className="w-4 h-4" />
                        <span className="font-mono">{totalHours}h total</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-neutral-500">Weekly Progress</span>
                    <span className="text-xs text-white font-mono">{safeProgress}%</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${safeProgress}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-white to-neutral-400 rounded-full"
                    />
                </div>
            </div>

            {/* Schedule Grid */}
            <div className="space-y-4">
                {safeDays.map((day, dayIndex) => {
                    const safeBlocks = Array.isArray(day.blocks) ? day.blocks : [];
                    return (
                        <motion.div
                            key={dayIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: dayIndex * 0.1 }}
                            className="border border-neutral-800 rounded-xl overflow-hidden"
                        >
                            {/* Day Header */}
                            <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800">
                                <span className="text-sm font-medium text-white font-sans">{day.day}</span>
                            </div>

                            {/* Time Blocks */}
                            <div className="p-3 space-y-2">
                                {safeBlocks.map((block, blockIndex) => {
                                    const config = getTypeConfig(block.type);
                                    return (
                                        <div
                                            key={blockIndex}
                                            className={`flex items-center justify-between p-3 rounded-lg border ${block.completed
                                                    ? "bg-neutral-900/50 border-neutral-800 opacity-60"
                                                    : "bg-neutral-900 border-neutral-800"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg border ${config.color}`}>
                                                    {config.icon}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-medium font-sans ${block.completed ? "text-neutral-500 line-through" : "text-white"}`}>
                                                        {block.activity}
                                                    </p>
                                                    <p className="text-xs text-neutral-600 font-mono">{block.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-neutral-500 font-mono">{block.duration}</span>
                                                {block.completed && (
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                                        <FiCheckSquare className="w-3 h-3 text-green-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
                {[
                    { type: "theory", label: "Theory" },
                    { type: "practice", label: "Practice" },
                    { type: "project", label: "Project" },
                    { type: "review", label: "Review" },
                ].map((item) => {
                    const config = getTypeConfig(item.type);
                    return (
                        <div key={item.type} className="flex items-center gap-2">
                            <div className={`p-1 rounded border ${config.color}`}>{config.icon}</div>
                            <span className="text-neutral-500">{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
