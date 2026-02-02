"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FiUpload, FiFileText, FiLoader } from "react-icons/fi";
import { cn } from "@/lib/utils";

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ResumeUploaderProps {
    onTextExtracted: (text: string, fileName: string) => void;
    className?: string;
}

export function ResumeUploader({ onTextExtracted, className }: ResumeUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }

        setIsUploading(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(" ");
                fullText += pageText + "\n";
            }

            onTextExtracted(fullText, file.name);
        } catch (error) {
            console.error("Error extracting text from PDF:", error);
            alert("Failed to read PDF. Please try another file.");
        } finally {
            setIsUploading(false);
            // Reset input
            event.target.value = "";
        }
    };

    return (
        <div className={cn("relative", className)}>
            <input
                type="file"
                id="resume-upload"
                accept=".pdf"
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
                {isUploading ? "Analyzing..." : "Upload Resume"}
            </label>
        </div>
    );
}
