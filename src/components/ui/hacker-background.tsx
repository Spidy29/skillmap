"use client";

import React, { useEffect, useRef } from "react";

/**
 * Neural Skill Network Background
 * Renders floating nodes (skills) connected by lines (relationships).
 * Simulates a knowledge graph or neural network.
 */
export function HackerBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Configuration
        const PARTICLE_COUNT = Math.floor((width * height) / 15000); // Responsive count
        const CONNECTION_DISTANCE = 150;
        const MOUSE_DISTANCE = 250;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // Slow, gentle drift
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update(mouseX: number, mouseY: number) {
                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse interaction: slight repulsion/attraction? 
                // Let's do gentle attraction for "focus" feel
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_DISTANCE) {
                    // Subtle pull
                    const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE;
                    this.x += dx * force * 0.02;
                    this.y += dy * force * 0.02;
                }
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx!.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-spawn particles for new size to maintain density
            const newCount = Math.floor((width * height) / 15000);
            particles.length = 0;
            for (let i = 0; i < newCount; i++) {
                particles.push(new Particle());
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update all particles
            particles.forEach(p => p.update(mouseX, mouseY));

            // Draw connections
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.draw();

                // Check connections with other particles
                // Optimization: only check particles after this one (j > i)
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        // Opacity based on distance
                        const alpha = 1 - (dist / CONNECTION_DISTANCE);

                        // Mouse proximity boost
                        // Connection lines glow when near mouse
                        const mouseDx = (p1.x + p2.x) / 2 - mouseX;
                        const mouseDy = (p1.y + p2.y) / 2 - mouseY;
                        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

                        let finalAlpha = alpha * 0.15; // Base faint visibility
                        if (mouseDist < MOUSE_DISTANCE) {
                            finalAlpha += (1 - mouseDist / MOUSE_DISTANCE) * 0.4;
                        }

                        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(finalAlpha, 0.8)})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse if close
                const dx = p1.x - mouseX;
                const dy = p1.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_DISTANCE) {
                    const alpha = 1 - (dist / MOUSE_DISTANCE);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`; // Faint line to mouse
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-50"
        />
    );
}
