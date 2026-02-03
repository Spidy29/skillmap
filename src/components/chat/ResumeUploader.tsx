"use client";

import { useState, useRef } from "react";
import { FiFileText, FiLoader } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
    onTextExtracted: (text: string, fileName: string) => void;
    className?: string;
}

export function ResumeUploader({ onTextExtracted, className }: ResumeUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Read as text (supports .txt, .md, or pasted content saved as file)
            const text = await file.text();

            if (text.trim().length === 0) {
                alert("File is empty. Please upload a file with content.");
                return;
            }

            onTextExtracted(text, file.name);
        } catch (error) {
            console.error("Error reading file:", error);
            alert("Failed to read file. Please try a .txt file or paste your resume content.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className={cn("relative", className)}>
            <input
                ref={fileInputRef}
                type="file"
                id="resume-upload"
                accept=".txt,.md,.text"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
            />

            <label
                htmlFor="resume-upload"
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all cursor-pointer text-sm font-medium",
                    isUploading && "opacity-50 cursor-not-allowed"
                )}
            >
                {isUploading ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                ) : (
                    <FiFileText className="w-4 h-4" />
                )}
                {isUploading ? "Reading..." : "Upload Resume (.txt)"}
            </label>
        </div>
    );
}
