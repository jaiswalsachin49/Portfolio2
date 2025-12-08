"use client";

import { useRef, useEffect } from "react";

export default function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);
        const vertices = new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const vertexSrc = `
            attribute vec2 pos;
            void main() {
                gl_Position = vec4(pos, 0.0, 1.0);
            }
        `;

        const fragmentSrc = `
            precision highp float;

            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;
            uniform float mouseDown;

            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(
                    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
                u.y);
            }

            float fbm(vec2 p) {
                float v = 0.0;
                float amp = 0.5;
                mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
                for (int i = 0; i < 3; i++) {
                    v += amp * noise(p);
                    p = rot * p * 2.0 + 100.0;
                    amp *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                uv.x *= resolution.x / resolution.y;

                float t = time * 0.4;

                // original warp space
                vec2 p = uv * 2.5 - vec2(t * 0.2, 0.0);

                // -------------------------
                // MOUSE INTERACTION ADDED
                // -------------------------
                vec2 m = mouse;
                m.x *= resolution.x / resolution.y;

                // Scale mouse coords into p-space
                vec2 mp = m * 2.5;

                vec2 d = p - mp;
                float dist = length(d);

                // Smooth falloff for swirl area
                float falloff = smoothstep(0.5, 0.0, dist);

                // Swirl factor
                float swirlStrength = falloff * (mouseDown * 1.5 + 0.3);

                float angle = atan(d.y, d.x) + swirlStrength * fbm(uv * 3.0 + t);
                vec2 swirlOffset = vec2(cos(angle), sin(angle)) * swirlStrength * 0.15;

                // Apply swirl to domain warp input
                p += swirlOffset;

                // -------------------------
                // ORIGINAL SMOKE STEPS
                // -------------------------

                vec2 q;
                q.x = fbm(p + 0.1 * t);
                q.y = fbm(p + vec2(1.0));

                vec2 r;
                r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
                r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

                float f = fbm(p + r);

                float v = pow(f, 4.0) * 2.8;

                vec3 orange = vec3(1.0, 0.28, 0.0);
                vec3 bright = vec3(1.0, 0.9, 0.6);

                vec3 col = mix(vec3(0.0), orange, smoothstep(0.0, 0.65, v));
                col = mix(col, bright, smoothstep(0.65, 1.1, v));

                // Vignette
                float vig = 1.0 - length((gl_FragCoord.xy / resolution.xy) - 0.5) * 0.5;
                col *= vig;

                gl_FragColor = vec4(col, 1.0);
            }
        `;

        const compile = (src, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        };

        const vs = compile(vertexSrc, gl.VERTEX_SHADER);
        const fs = compile(fragmentSrc, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const posLoc = gl.getAttribLocation(program, "pos");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const timeLoc = gl.getUniformLocation(program, "time");
        const resLoc = gl.getUniformLocation(program, "resolution");
        const mouseLoc = gl.getUniformLocation(program, "mouse");
        const mouseDownLoc = gl.getUniformLocation(program, "mouseDown");

        // Track mouse
        const mouse = { x: 0.5, y: 0.5, down: 0 };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = 1.0 - e.clientY / window.innerHeight;
        });

        window.addEventListener("mousedown", () => (mouse.down = 1));
        window.addEventListener("mouseup", () => (mouse.down = 0));

        let animationFrame;
        const render = (now) => {
            gl.uniform1f(timeLoc, now * 0.001);
            gl.uniform2f(resLoc, canvas.width, canvas.height);
            gl.uniform2f(mouseLoc, mouse.x, mouse.y);
            gl.uniform1f(mouseDownLoc, mouse.down);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrame = requestAnimationFrame(render);
        };

        render(0);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-black text-white">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full block" />
            <div className="w-full h-28 md:h-20 border-b border-white/10 z-20 flex justify-center relative">
                <div className="relative border-x border-white/10 w-full md:w-[60%] h-full">
                    <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-50"></div>
                    <div className="absolute top-0 right-0 w-1 h-1 bg-white opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-white opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-white opacity-50"></div>

                    <div className="flex items-center justify-between px-4 md:px-10 h-full md:flex-row flex-col md:gap-0 gap-2">
                        <div className="text-xl leading-none font-medium">Sachin Jaiswal</div>
                        <div className="flex items-center justify-center gap-2 rounded-3xl border border-white/10 px-3 py-1 bg-black/50 backdrop-blur-sm my-2 md:my-0">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-xs text-gray-300">Available for Work</p>
                        </div>
                        <div className="flex flex-col md:text-right text-center text-xs md:min-w-max text-gray-400">
                            <p>SONIPAT</p>
                            <p>INDIA</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 h-[calc(100vh-28px)] md:h-[calc(100vh-20px)] flex items-center justify-center">
            </div>
        </div>
    );
}
