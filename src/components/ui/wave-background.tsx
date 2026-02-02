"use client";

import React, { useEffect, useRef } from "react";

/**
 * Realistic Propagating Water Background
 * Uses the 2D Wave Equation (Coupled Oscillator) to create real ripples 
 * that travel across the grid when disturbed.
 */
export function WaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Grid Configuration
        const SEPARATION = 40;
        const COLS = 60;
        const ROWS = 60;

        // Physics Configuration
        // Lower these for "slower" liquid
        const DAMPING = 0.96; // Energy loss per frame (0.9-0.99)
        const WAVE_SPEED = 0.02; // Propagation speed (lower = slower waves)
        const MOUSE_RADIUS = 4; // Grid cells radius
        const MOUSE_FORCE = 50; // Initial push height

        // We need 2D arrays to track state for neighbors
        const gridPoints: { x: number, y: number, height: number, velocity: number, screenX: number, screenY: number }[][] = [];

        // Initialize Grid
        for (let ix = 0; ix < COLS; ix++) {
            gridPoints[ix] = [];
            for (let iy = 0; iy < ROWS; iy++) {
                const x = ix * SEPARATION - ((COLS * SEPARATION) / 2);
                const z = iy * SEPARATION - ((ROWS * SEPARATION) / 2);
                gridPoints[ix][iy] = {
                    x: x,          // 3D world x
                    y: z,          // 3D world z (depth)
                    height: 0,     // 3D world y (height)
                    velocity: 0,
                    screenX: 0,
                    screenY: 0
                };
            }
        }

        let mouseX = -10000;
        let mouseY = -10000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX - width / 2;
            mouseY = e.clientY - height / 2;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX - width / 2;
                mouseY = e.touches[0].clientY - height / 2;
            }
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("resize", handleResize);

        const animate = () => {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height);

            const fov = 400;

            // 1. Physics Update Loop (Wave Equation)
            for (let ix = 1; ix < COLS - 1; ix++) {
                for (let iy = 1; iy < ROWS - 1; iy++) {
                    const p = gridPoints[ix][iy];

                    // Calculate average height of neighbors
                    const avgHeight = (
                        gridPoints[ix - 1][iy].height +
                        gridPoints[ix + 1][iy].height +
                        gridPoints[ix][iy - 1].height +
                        gridPoints[ix][iy + 1].height
                    ) / 4;

                    // Acceleration towards the average (Smoothing/Propagation)
                    // This is a simplified wave equation
                    p.velocity += (avgHeight - p.height) * WAVE_SPEED;
                    p.velocity *= DAMPING;
                }
            }

            // 2. Apply Velocity & Interaction & Projection
            for (let ix = 0; ix < COLS; ix++) {
                for (let iy = 0; iy < ROWS; iy++) {
                    const p = gridPoints[ix][iy];

                    // Update height
                    if (ix > 0 && ix < COLS - 1 && iy > 0 && iy < ROWS - 1) {
                        p.height += p.velocity;
                    }

                    // Projection
                    const angleX = 0.4; // Tilt
                    const rx = p.x;
                    const ry = p.height * Math.cos(angleX) - p.y * Math.sin(angleX);
                    const rz = p.height * Math.sin(angleX) + p.y * Math.cos(angleX) + 900;

                    const projScale = fov / (fov + rz);
                    p.screenX = rx * projScale + width / 2;
                    p.screenY = ry * projScale + height / 2;

                    // Mouse Interaction
                    // If mouse is close to this projected point, push it down
                    const dx = mouseX + width / 2 - p.screenX;
                    const dy = mouseY + height / 2 - p.screenY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 40) { // Interaction Radius in pixels
                        // Smooth push
                        const force = (40 - dist) / 40;
                        p.velocity -= force * 5; // Push down
                    }
                }
            }

            // 3. Render
            // Rendering points
            ctx.fillStyle = "white";
            for (let ix = 0; ix < COLS; ix++) {
                for (let iy = 0; iy < ROWS; iy++) {
                    const p = gridPoints[ix][iy];
                    // Depth check for rendering
                    // We re-calculate rz roughly for opacity? 
                    // We can just use the Y index for poor-man's depth since it's a tilted plane
                    const alpha = 0.1 + (iy / ROWS) * 0.5; // Fade backend

                    // Size based on depth (iy)
                    const size = 0.5 + (iy / ROWS) * 1.5;

                    ctx.globalAlpha = alpha;
                    ctx.beginPath();
                    ctx.arc(p.screenX, p.screenY, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
