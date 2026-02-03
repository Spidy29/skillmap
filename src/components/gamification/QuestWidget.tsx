"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTarget, FiCheck, FiChevronRight, FiChevronLeft, FiAward, FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";

// Types
type Quest = {
    id: string;
    title: string;
    xp: number;
    completed: boolean;
};

type Level = {
    rank: string;
    minXP: number;
    color: string;
};

// Config
const LEVELS: Level[] = [
    { rank: "Intern", minXP: 0, color: "text-neutral-400" },
    { rank: "Junior Dev", minXP: 500, color: "text-emerald-400" },
    { rank: "Senior Dev", minXP: 1500, color: "text-blue-400" },
    { rank: "Tech Lead", minXP: 3000, color: "text-purple-400" },
    { rank: "CTO", minXP: 5000, color: "text-amber-400" },
];

export function QuestWidget() {
    const [isOpen, setIsOpen] = useState(true);
    const [totalXP, setTotalXP] = useState(0);
    const [quests, setQuests] = useState<Quest[]>([
        { id: "resume", title: "Upload Resume", xp: 500, completed: true }, // Auto-complete for demo since we just added it
        { id: "roadmap", title: "Generate Roadmap", xp: 800, completed: false },
        { id: "skill", title: "Analyze Skills", xp: 400, completed: false },
        { id: "job", title: "Find Jobs", xp: 300, completed: false },
    ]);

    // Derived state
    const currentLevelIndex = LEVELS.findIndex((l, i) =>
        totalXP >= l.minXP && (i === LEVELS.length - 1 || totalXP < LEVELS[i + 1].minXP)
    );
    const currentLevel = LEVELS[currentLevelIndex];
    const nextLevel = LEVELS[currentLevelIndex + 1];
    const progressToNext = nextLevel
        ? ((totalXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
        : 100;

    // Simulate progress for demo effect
    useEffect(() => {
        // Initial XP from "completed" quests
        const initialXP = quests.reduce((acc, q) => q.completed ? acc + q.xp : acc, 0);
        setTotalXP(initialXP);
    }, []); // Run once on mount

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed right-6 top-24 z-40 flex flex-col items-end pointer-events-none">
            {/* Pointer events auto for children so they can be clicked */}

            {/* Toggle Button / Mini Status */}
            <motion.button
                onClick={toggleOpen}
                initial={false}
                animate={{ width: isOpen ? "auto" : "auto" }}
                className="pointer-events-auto flex items-center gap-2 bg-neutral-900/90 border border-white/10 rounded-full p-1 pl-3 pr-2 backdrop-blur-md shadow-xl hover:border-emerald-500/50 transition-colors group mb-4"
            >
                <div className="flex flex-col items-start mr-2">
                    <span className={cn("text-xs font-bold uppercase tracking-wider", currentLevel.color)}>
                        {currentLevel.rank}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                        {totalXP} XP
                    </span>
                </div>

                <div className="relative w-8 h-8 flex items-center justify-center">
                    {/* Circular Progress (SVG) */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-neutral-800"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className={currentLevel.color.replace('text-', 'stroke-')} // Hacky tailwind mapping
                            strokeDasharray={`${progressToNext}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {isOpen ? <FiChevronRight className="w-4 h-4 text-white" /> : <FiChevronLeft className="w-4 h-4 text-white" />}
                    </div>
                </div>
            </motion.button>

            {/* Expanded Quest Log */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto w-72 bg-neutral-950/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl origin-top-right"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <FiTarget className="text-emerald-500" />
                                Quest Log
                            </h3>
                            <span className="text-xs text-neutral-500 font-mono">
                                Next: {nextLevel?.rank || "Max"}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {quests.map((quest) => (
                                <div
                                    key={quest.id}
                                    className={cn(
                                        "group p-3 rounded-xl border transition-all duration-300 relative overflow-hidden",
                                        quest.completed
                                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-100"
                                            : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10"
                                    )}
                                >
                                    {/* Progress Bar Background for completed items */}
                                    {quest.completed && (
                                        <motion.div
                                            layoutId={`progress-${quest.id}`}
                                            className="absolute inset-0 bg-emerald-500/10 z-0"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                        />
                                    )}

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-5 h-5 rounded-full flex items-center justify-center border",
                                                quest.completed ? "bg-emerald-500 border-emerald-500 text-black" : "border-neutral-700 bg-neutral-900"
                                            )}>
                                                {quest.completed && <FiCheck className="w-3 h-3" />}
                                            </div>
                                            <span className={cn("text-sm", quest.completed && "font-medium")}>
                                                {quest.title}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono opacity-60">
                                            +{quest.xp} XP
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 text-center">
                            <p className="text-[10px] text-neutral-500">
                                Complete quests to unlock premium features.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
