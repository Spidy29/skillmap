"use client";

/**
 * Quest Store - Manages quest progress with localStorage persistence
 * Uses browser events for cross-component communication
 */

export type QuestId = "resume" | "roadmap" | "skill" | "job";

export type Quest = {
    id: QuestId;
    title: string;
    xp: number;
    completed: boolean;
};

const STORAGE_KEY = "ascend_quests";

const DEFAULT_QUESTS: Quest[] = [
    { id: "resume", title: "Upload Resume", xp: 500, completed: false },
    { id: "roadmap", title: "Generate Roadmap", xp: 800, completed: false },
    { id: "skill", title: "Analyze Skills", xp: 400, completed: false },
    { id: "job", title: "Find Jobs", xp: 300, completed: false },
];

// Get quests from localStorage
export function getQuests(): Quest[] {
    if (typeof window === "undefined") return DEFAULT_QUESTS;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTS));
        return DEFAULT_QUESTS;
    }

    try {
        return JSON.parse(stored);
    } catch {
        return DEFAULT_QUESTS;
    }
}

// Complete a quest by ID
export function completeQuest(questId: QuestId): void {
    if (typeof window === "undefined") return;

    const quests = getQuests();
    const quest = quests.find((q) => q.id === questId);

    if (quest && !quest.completed) {
        quest.completed = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quests));

        // Dispatch custom event for QuestWidget to listen
        window.dispatchEvent(
            new CustomEvent("quest-completed", {
                detail: { questId, xp: quest.xp },
            })
        );
    }
}

// Reset all quests (for testing)
export function resetQuests(): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTS));
    window.dispatchEvent(new CustomEvent("quest-reset"));
}

// Get total XP
export function getTotalXP(): number {
    return getQuests().reduce((acc, q) => (q.completed ? acc + q.xp : acc), 0);
}
