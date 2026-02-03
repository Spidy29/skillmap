"use client";

import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-all"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {theme === "dark" ? (
                <FiSun className="w-4 h-4 text-yellow-400" />
            ) : (
                <FiMoon className="w-4 h-4 text-neutral-700" />
            )}
        </motion.button>
    );
}
