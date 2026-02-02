"use client";

import React, { useEffect, useRef } from "react";

/**
 * Ascending Beams Background
 * Vertical lines of light rising upwards, symbolizing growth and ascent.
 * Sleek, modern, and distinct from the previous "water" effects.
 */
export function BeamsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

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
                this.opacity = Math.random() * 0.6 + 0.4; // MUCH BRIGHTER (0.4 to 1.0)

                // Cyber palette: Cyan, Bright White, Electric Purple, Neon Green
                const colors = ["#ffffff", "#00ffff", "#bf00ff", "#39ff14", "#ffffff"];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.y -= this.speed;
                // Reset if off top
                if (this.y + this.length < 0) {
                    this.y = height + Math.random() * 200;
                    this.x = Math.random() * width;
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
        const BEAM_COUNT = Math.floor(width / 15); // Density

        for (let i = 0; i < BEAM_COUNT; i++) {
            beams.push(new Beam());
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        const animate = () => {
            // Clear with trail for "warp speed" blur feeling? 
            // Nah, clean clear is crisper.
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height);

            // Optional: Background Grid for "Tech" feel behind beams
            //   ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            //   ctx.lineWidth = 1;
            //   const gridSize = 50;
            //   for(let x=0; x<width; x+=gridSize) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,height); ctx.stroke(); }
            //   for(let y=0; y<height; y+=gridSize) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke(); }

            beams.forEach(beam => {
                beam.update();
                beam.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-80"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        </div>
    );
}
