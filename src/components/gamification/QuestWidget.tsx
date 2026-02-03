"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiChevronDown, FiCheck } from "react-icons/fi";
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
};

// Config
const LEVELS: Level[] = [
    { rank: "Beginner", minXP: 0 },
    { rank: "Explorer", minXP: 500 },
    { rank: "Achiever", minXP: 1500 },
    { rank: "Expert", minXP: 3000 },
    { rank: "Master", minXP: 5000 },
];

export function QuestWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [totalXP, setTotalXP] = useState(0);
    const [quests] = useState<Quest[]>([
        { id: "resume", title: "Upload Resume", xp: 500, completed: true },
        { id: "roadmap", title: "Generate Roadmap", xp: 800, completed: false },
        { id: "skill", title: "Analyze Skills", xp: 400, completed: false },
        { id: "job", title: "Find Jobs", xp: 300, completed: false },
    ]);

    const currentLevelIndex = LEVELS.findIndex((l, i) =>
        totalXP >= l.minXP && (i === LEVELS.length - 1 || totalXP < LEVELS[i + 1].minXP)
    );
    const currentLevel = LEVELS[currentLevelIndex];
    const nextLevel = LEVELS[currentLevelIndex + 1];
    const progressToNext = nextLevel
        ? ((totalXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
        : 100;
    const completedCount = quests.filter(q => q.completed).length;

    useEffect(() => {
        const initialXP = quests.reduce((acc, q) => q.completed ? acc + q.xp : acc, 0);
        setTotalXP(initialXP);
    }, []);

    return (
        <div className="relative">
            {/* Main Button with Shiny Effect */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                    "bg-neutral-900/80 border-white/10 hover:border-white/20",
                    "text-white backdrop-blur-sm"
                )}
            >
                {/* Shiny shimmer effect */}
                <div
                    className="absolute inset-0 -translate-x-full animate-shimmer"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    }}
                />

                <FiAward className="w-4 h-4 text-white/60" />
                <span className="text-xs font-mono text-white/80">{totalXP} XP</span>
                <span className="text-[10px] text-white/30">•</span>
                <span className="text-xs text-white/50">{currentLevel.rank}</span>
                <FiChevronDown className={cn(
                    "w-3 h-3 text-white/40 transition-transform",
                    isOpen && "rotate-180"
                )} />
            </motion.button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-12 right-0 w-56 bg-black/95 border border-white/10 rounded-xl p-3 backdrop-blur-xl shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                            <div>
                                <p className="text-xs font-medium text-white">{currentLevel.rank}</p>
                                <p className="text-[10px] text-white/60 font-mono">
                                    {nextLevel ? `${nextLevel.minXP - totalXP} XP to next` : "Max"}
                                </p>
                            </div>
                            <p className="text-sm font-bold text-white font-mono">{totalXP}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-white/10 rounded-full mb-3 overflow-hidden">
                            <motion.div
                                className="h-full bg-white/50 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressToNext}%` }}
                            />
                        </div>

                        {/* Quests */}
                        <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2">
                            {completedCount}/{quests.length} Complete
                        </p>
                        <div className="space-y-1">
                            {quests.map((quest) => (
                                <div
                                    key={quest.id}
                                    className={cn(
                                        "flex items-center justify-between py-1.5 px-2 rounded text-[11px]",
                                        quest.completed ? "text-white/70" : "text-white/50"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-3 h-3 rounded-full flex items-center justify-center border",
                                            quest.completed ? "bg-white/20 border-white/30" : "border-white/20"
                                        )}>
                                            {quest.completed && <FiCheck className="w-2 h-2" />}
                                        </div>
                                        <span className={quest.completed ? "line-through" : ""}>
                                            {quest.title}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-white/40">+{quest.xp}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

