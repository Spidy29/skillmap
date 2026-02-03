"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiChevronDown, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

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
                    "bg-card/80 border-border hover:border-foreground/20",
                    "text-foreground backdrop-blur-sm"
                )}
            >
                {/* Shiny shimmer effect */}
                <div
                    className="absolute inset-0 -translate-x-full animate-shimmer"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(128,128,128,0.15) 50%, transparent 100%)',
                    }}
                />

                <FiAward className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-mono text-foreground/80">{totalXP} XP</span>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{currentLevel.rank}</span>
                <FiChevronDown className={cn(
                    "w-3 h-3 text-muted-foreground transition-transform",
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
                        className="absolute top-12 right-0 w-56 bg-card border border-border rounded-xl p-3 backdrop-blur-xl shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
                            <div>
                                <p className="text-xs font-medium text-foreground">{currentLevel.rank}</p>
                                <p className="text-[10px] text-muted-foreground font-mono">
                                    {nextLevel ? `${nextLevel.minXP - totalXP} XP to next` : "Max"}
                                </p>
                            </div>
                            <p className="text-sm font-bold text-foreground font-mono">{totalXP}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-muted rounded-full mb-3 overflow-hidden">
                            <motion.div
                                className="h-full bg-foreground/50 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressToNext}%` }}
                            />
                        </div>

                        {/* Quests */}
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                            {completedCount}/{quests.length} Complete
                        </p>
                        <div className="space-y-1">
                            {quests.map((quest) => (
                                <div
                                    key={quest.id}
                                    className={cn(
                                        "flex items-center justify-between py-1.5 px-2 rounded text-[11px]",
                                        quest.completed ? "text-foreground/70" : "text-muted-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-3 h-3 rounded-full flex items-center justify-center border",
                                            quest.completed ? "bg-foreground/20 border-foreground/30" : "border-border"
                                        )}>
                                            {quest.completed && <FiCheck className="w-2 h-2" />}
                                        </div>
                                        <span className={quest.completed ? "line-through" : ""}>
                                            {quest.title}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-muted-foreground">+{quest.xp}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
