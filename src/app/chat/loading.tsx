"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            {/* Animated Loader */}
            <div className="text-center">
                <motion.div
                    className="flex items-center justify-center gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-white"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-neutral-500 text-sm font-mono"
                >
                    Loading SkillMap AI...
                </motion.p>
            </div>
        </div>
    );
}
