"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Ascending Beams Background
 * Vertical lines of light rising upwards, symbolizing growth and ascent.
 * Dynamic colors based on theme, persists across theme changes.
 */
export function BeamsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    // Store theme in ref to access inside animation loop without restarting effect
    const themeRef = useRef(theme);

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    // Check if should show static background
    const showStaticBg = prefersReducedMotion || theme === 'light';

    // Update ref when theme changes
    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    // Main animation effect - always called (hooks must be unconditional)
    useEffect(() => {
        // Skip animation if showing static background
        if (showStaticBg) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Dark Mode: Cyan, Bright White, Electric Purple, Neon Green
        const darkColors = ["#ffffff", "#00ffff", "#bf00ff", "#39ff14", "#ffffff"];

        class Beam {
            x: number;
            y: number;
            length: number;
            speed: number;
            width: number;
            opacity: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 200;
                this.length = Math.random() * 150 + 50;
                this.speed = Math.random() * 2 + 0.5;
                this.width = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.color = darkColors[Math.floor(Math.random() * darkColors.length)];
            }

            update() {
                this.y -= this.speed;
                if (this.y + this.length < 0) {
                    this.y = height + Math.random() * 100;
                    this.x = Math.random() * width;
                    this.length = Math.random() * 150 + 50;
                    this.speed = Math.random() * 2 + 0.5;
                    this.opacity = Math.random() * 0.6 + 0.2;
                    this.color = darkColors[Math.floor(Math.random() * darkColors.length)];
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                const gradient = ctx.createLinearGradient(this.x, this.y + this.length, this.x, this.y);

                const hexToRgb = (hex: string) => {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : { r: 255, g: 255, b: 255 };
                };

                const rgb = hexToRgb(this.color);

                gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
                gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.width;
                ctx.moveTo(this.x, this.y + this.length);
                ctx.lineTo(this.x, this.y);
                ctx.stroke();
            }
        }

        const BEAM_COUNT = 30;
        const beams: Beam[] = [];

        for (let i = 0; i < BEAM_COUNT; i++) {
            beams.push(new Beam());
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            beams.forEach(beam => {
                beam.update();
                beam.draw(ctx);
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [showStaticBg]);

    // Conditional rendering in return (safe - all hooks already called)
    if (showStaticBg) {
        return (
            <div className="fixed inset-0 z-[-1] pointer-events-none bg-background transition-colors duration-300">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/20" />
                {/* Radial glow in center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-background transition-colors duration-300">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
}
