"use client";

import React, { useEffect, useRef } from "react";

/**
 * Realistic Fluid Background using WebGL
 * Renders a smooth, flowing liquid effect using GLSL shaders.
 */
export function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        // Vertex Shader: Simple full-screen quad
        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        // Fragment Shader: Liquid Noise Effect
        // Uses a pseudo-noise function to create flowing "water" patterns
        const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Simple pseudo-random hash
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // 2D Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      // Fractal Brownian Motion (layered noise)
      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.2;

        // Mouse interaction (distort UV based on mouse)
        float mouseDist = distance(uv, u_mouse);
        vec2 interact = (uv - u_mouse) * (1.0 - smoothstep(0.0, 0.5, mouseDist));
        
        // Fluid warping
        // We distort the coordinate space with noise to simulate flow
        vec2 q = vec2(0.0);
        q.x = fbm(uv + 0.00 * t);
        q.y = fbm(uv + vec2(1.0));

        vec2 r = vec2(0.0);
        r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t + interact.x);
        r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t + interact.y);

        float f = fbm(uv + r);

        // Color Palette (Cyber/Liquid)
        // Mixing deep blacks/blues/cyans
        vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(0.1, 0.15, 0.2), clamp((f*f)*4.0, 0.0, 1.0));
        color = mix(color, vec3(0.0, 0.4, 0.5), clamp(length(q), 0.0, 1.0));
        color = mix(color, vec3(0.66, 1.0, 1.0), clamp(length(r.x), 0.0, 1.0));

        // Vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.5;
        color *= vignette;

        gl_FragColor = vec4((f*f*f + 0.6 * f*f + 0.5 * f) * color, 1.0);
      }
    `;

        // Helper to compile shader
        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Set up quad buffer
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1,
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Uniforms
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const mouseLocation = gl.getUniformLocation(program, "u_mouse");

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalized mouse coords (0.0 to 1.0)
            mouseX = e.clientX / window.innerWidth;
            mouseY = 1.0 - e.clientY / window.innerHeight; // WebGL Y is inverted
            // Account for aspect ratio in js to pass correct to shader? 
            // Shader handles 'uv.x *= aspect', so pass 0-1 matches uv space somewhat.
            // Actually, just passing normalized is fine if shader accounts for it.
            // Let's correct X for aspect in shader, so mouse should be passed adjusted?
            // Let's just pass plain normalized and align shader.
            mouseX *= (window.innerWidth / window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener("resize", resize);
        resize();

        let startTime = performance.now();
        const render = () => {
            const currentTime = (performance.now() - startTime) / 1000;
            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform2f(mouseLocation, mouseX, mouseY);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-40"
        />
    );
}
