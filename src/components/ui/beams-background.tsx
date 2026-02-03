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

    // Update ref when theme changes
    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Dark Mode: Cyan, Bright White, Electric Purple, Neon Green
        const darkColors = ["#ffffff", "#00ffff", "#bf00ff", "#39ff14", "#ffffff"];
        // Light Mode: Deep Blue, Purple, Dark Teal (visible on white)
        const lightColors = ["#0ea5e9", "#7c3aed", "#0d9488", "#2563eb", "#4f46e5"];

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
                this.y = height + Math.random() * 200; // Start below screen
                this.length = Math.random() * 150 + 50;
                this.speed = Math.random() * 2 + 0.5;
                this.width = Math.random() * 2 + 0.5;
                this.reset(true); // Initial reset
            }

            reset(initial = false) {
                const currentTheme = themeRef.current;
                const isDark = currentTheme === "dark";
                const palette = isDark ? darkColors : lightColors;

                // If not initial reset, we only pick new color when it goes off screen
                // But initially we need to set color
                this.opacity = isDark ? (Math.random() * 0.6 + 0.2) : (Math.random() * 0.5 + 0.3);
                this.color = palette[Math.floor(Math.random() * palette.length)];
            }

            update() {
                this.y -= this.speed;
                // Reset if off top
                if (this.y + this.length < 0) {
                    this.y = height + Math.random() * 200;
                    this.x = Math.random() * width;
                    // Reset props for variety
                    this.length = Math.random() * 150 + 50;
                    this.speed = Math.random() * 2 + 0.5;
                    this.reset(); // usage of current theme happens here
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                // Gradient fade for the trail
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
                gradient.addColorStop(0, "rgba(0,0,0,0)"); // Top fade
                gradient.addColorStop(0.5, this.hexToRgbA(this.color, this.opacity)); // Middle bright
                gradient.addColorStop(1, "rgba(0,0,0,0)"); // Bottom fade

                ctx.fillStyle = gradient;
                ctx.fillRect(this.x, this.y, this.width, this.length);
            }

            hexToRgbA(hex: string, alpha: number) {
                let c: any;
                if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                    c = hex.substring(1).split('');
                    if (c.length == 3) {
                        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                    }
                    c = '0x' + c.join('');
                    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
                }
                return 'rgba(255,255,255,' + alpha + ')';
            }
        }

        // Create beams
        const beams: Beam[] = [];
        // Use density for larger screen, ensuring enough beams
        const BEAM_COUNT = Math.floor(width / 15);

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
            // Clear canvas completely to let CSS background show through
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
    }, []); // Empty dependency array = RUN ONCE, NEVER RESTART

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-background transition-colors duration-300">
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
}
