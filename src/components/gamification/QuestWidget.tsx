"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiChevronDown, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { getQuests, getTotalXP, type Quest } from "@/lib/questStore";

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
    const [quests, setQuests] = useState<Quest[]>([]);
    const [showXPGain, setShowXPGain] = useState<number | null>(null);

    // Load quests from localStorage on mount
    const loadQuests = useCallback(() => {
        const storedQuests = getQuests();
        setQuests(storedQuests);
        setTotalXP(getTotalXP());
    }, []);

    useEffect(() => {
        loadQuests();

        // Listen for quest completion events
        const handleQuestComplete = (e: CustomEvent<{ questId: string; xp: number }>) => {
            setShowXPGain(e.detail.xp);
            loadQuests();

            // Hide XP popup after animation
            setTimeout(() => setShowXPGain(null), 2000);
        };

        const handleQuestReset = () => {
            loadQuests();
        };

        window.addEventListener("quest-completed", handleQuestComplete as EventListener);
        window.addEventListener("quest-reset", handleQuestReset);

        return () => {
            window.removeEventListener("quest-completed", handleQuestComplete as EventListener);
            window.removeEventListener("quest-reset", handleQuestReset);
        };
    }, [loadQuests]);

    const currentLevelIndex = LEVELS.findIndex((l, i) =>
        totalXP >= l.minXP && (i === LEVELS.length - 1 || totalXP < LEVELS[i + 1].minXP)
    );
    const currentLevel = LEVELS[currentLevelIndex] || LEVELS[0];
    const nextLevel = LEVELS[currentLevelIndex + 1];
    const progressToNext = nextLevel
        ? ((totalXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
        : 100;
    const completedCount = quests.filter(q => q.completed).length;

    return (
        <div className="relative">
            {/* XP Gain Popup */}
            <AnimatePresence>
                {showXPGain && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -20 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-green-500 whitespace-nowrap"
                    >
                        +{showXPGain} XP!
                    </motion.div>
                )}
            </AnimatePresence>

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
