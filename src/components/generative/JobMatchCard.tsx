"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import { FiBriefcase, FiMapPin, FiDollarSign, FiCheckCircle, FiX, FiExternalLink, FiStar } from "react-icons/fi";
import { useEffect } from "react";
import { completeQuest } from "@/lib/questStore";

// Schema for JobMatchCard component
export const jobMatchCardSchema = z.object({
    jobTitle: z.string().describe("Job title"),
    company: z.string().describe("Company name"),
    location: z.string().describe("Job location"),
    salary: z.string().describe("Salary range"),
    matchScore: z.number().min(0).max(100).describe("How well user matches this job"),
    matchedSkills: z.array(z.string()).describe("Skills user has that match"),
    missingSkills: z.array(z.string()).describe("Skills user needs to learn"),
    highlights: z.array(z.string()).describe("Job highlights/perks"),
    applyUrl: z.string().optional().describe("Application URL"),
    postedDays: z.number().describe("Days since posted"),
});

type JobMatchCardProps = z.infer<typeof jobMatchCardSchema>;

export function JobMatchCard({
    jobTitle = "Software Engineer",
    company = "Tech Company",
    location = "Remote",
    salary = "$100K - $150K",
    matchScore = 75,
    matchedSkills = [],
    missingSkills = [],
    highlights = [],
    applyUrl = "#",
    postedDays = 1,
}: Partial<JobMatchCardProps>) {
    const safeMatchedSkills = Array.isArray(matchedSkills) ? matchedSkills : [];
    const safeMissingSkills = Array.isArray(missingSkills) ? missingSkills : [];
    const safeHighlights = Array.isArray(highlights) ? highlights : [];
    const safeMatchScore = typeof matchScore === "number" ? matchScore : 0;

    // Complete job search quest when this component renders
    useEffect(() => {
        completeQuest("job");
    }, []);

    const getMatchColor = (score: number) => {
        if (score >= 80) return "text-green-400 border-green-400/50 bg-green-400/10";
        if (score >= 60) return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10";
        return "text-red-400 border-red-400/50 bg-red-400/10";
    };

    const getMatchLabel = (score: number) => {
        if (score >= 80) return "Excellent Match";
        if (score >= 60) return "Good Match";
        return "Needs Work";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="w-full max-w-lg bg-black rounded-2xl p-6 shadow-2xl border border-neutral-800 hover:border-neutral-700 transition-all"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white font-sans">{jobTitle}</h3>
                        {safeMatchScore >= 80 && <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                    </div>
                    <p className="text-neutral-400 font-medium">{company}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full border ${getMatchColor(safeMatchScore)}`}>
                    <span className="text-sm font-mono font-bold">{safeMatchScore}%</span>
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiDollarSign className="w-4 h-4" />
                    <span>{salary}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiBriefcase className="w-4 h-4" />
                    <span>{postedDays}d ago</span>
                </div>
            </div>

            {/* Match Status */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${getMatchColor(safeMatchScore)}`}>
                {getMatchLabel(safeMatchScore)}
            </div>

            {/* Matched Skills */}
            {safeMatchedSkills.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs text-neutral-500 mb-2 font-mono">✓ Skills You Have</p>
                    <div className="flex flex-wrap gap-2">
                        {safeMatchedSkills.map((skill, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded text-xs font-mono"
                            >
                                <FiCheckCircle className="w-3 h-3" />
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Missing Skills */}
            {safeMissingSkills.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs text-neutral-500 mb-2 font-mono">✗ Skills to Learn</p>
                    <div className="flex flex-wrap gap-2">
                        {safeMissingSkills.map((skill, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-xs font-mono"
                            >
                                <FiX className="w-3 h-3" />
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Highlights */}
            {safeHighlights.length > 0 && (
                <div className="mb-4 p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                    <p className="text-xs text-neutral-500 mb-2">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                        {safeHighlights.map((h, i) => (
                            <span key={i} className="text-xs text-neutral-300">
                                • {h}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-800">
                <motion.a
                    href={applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors"
                >
                    Apply Now
                    <FiExternalLink className="w-4 h-4" />
                </motion.a>
                <button className="px-4 py-2.5 bg-neutral-900 text-white rounded-lg font-medium text-sm border border-neutral-800 hover:bg-neutral-800 transition-colors">
                    Save
                </button>
            </div>
        </motion.div>
    );
}
