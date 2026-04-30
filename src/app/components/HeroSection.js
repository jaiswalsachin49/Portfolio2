"use client";

import { useEffect, useRef } from "react";
import { Layers, Twitter, Linkedin, Instagram, Github, ArrowUpRight } from "lucide-react";

export default function HeroSection({ scrollToSection }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        let animationFrame;
        let isVisible = true;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 1.5);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const vertexSrc = `attribute vec2 pos; void main() { gl_Position = vec4(pos, 0.0, 1.0); }`;
        const fragmentSrc = `
            precision highp float;
            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;
            uniform float mouseDown;
            float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
            float noise(vec2 p) { vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f); return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }   
            float fbm(vec2 p) { float v = 0.0; float amp = 0.5; mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5)); for (int i = 0; i < 3; i++) { v += amp * noise(p); p = rot * p * 2.0 + 100.0; amp *= 0.5; } return v; }
            void main() {
                vec2 uv = gl_FragCoord.xy / resolution.xy; uv.x *= resolution.x / resolution.y;
                float t = time * 0.4;
                vec2 p = uv * 2.5 - vec2(t * 0.2, 0.0);
                vec2 m = mouse; m.x *= resolution.x / resolution.y;
                vec2 mp = m * 2.5; vec2 d = p - mp; float dist = length(d);
                float falloff = smoothstep(0.5, 0.0, dist);
                float swirlStrength = falloff * (mouseDown * 1.5 + 0.3);
                float angle = atan(d.y, d.x) + swirlStrength * fbm(uv * 3.0 + t);
                vec2 swirlOffset = vec2(cos(angle), sin(angle)) * swirlStrength * 0.15;
                p += swirlOffset;
                vec2 q; q.x = fbm(p + 0.1 * t); q.y = fbm(p + vec2(1.0));
                vec2 r; r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t); r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);
                float f = fbm(p + r);
                float v = pow(f, 4.0) * 2.8;
                vec3 orange = vec3(1.0, 0.28, 0.0); vec3 bright = vec3(1.0, 0.9, 0.6);
                vec3 col = mix(vec3(0.0), orange, smoothstep(0.0, 0.65, v));
                col = mix(col, bright, smoothstep(0.65, 1.1, v));
                float vig = 1.0 - length((gl_FragCoord.xy / resolution.xy) - 0.5) * 0.5;
                col *= vig;
                gl_FragColor = vec4(col, 1.0);
            }
        `;

        const compile = (src, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
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

        const mouse = { x: 0.5, y: 0.5, down: 0 };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = 1.0 - e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", () => (mouse.down = 1));
        window.addEventListener("mouseup", () => (mouse.down = 0));

        const render = (now) => {
            if (isVisible) {
                gl.uniform1f(timeLoc, now * 0.001);
                gl.uniform2f(resLoc, canvas.width, canvas.height);
                gl.uniform2f(mouseLoc, mouse.x, mouse.y);
                gl.uniform1f(mouseDownLoc, mouse.down);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            animationFrame = requestAnimationFrame(render);
        };
        render(0);

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        const homeSection = document.getElementById("home");
        if (homeSection) observer.observe(homeSection);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", () => (mouse.down = 1));
            window.removeEventListener("mouseup", () => (mouse.down = 0));
            if (homeSection) observer.unobserve(homeSection);
        };
    }, []);

    return (
        <section id="home" className="relative w-full min-h-screen flex justify-center border-b border-white/10">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="relative z-10 w-full md:w-[60%] md:max-w-5xl h-full min-h-screen border-x border-white/10 flex flex-col bg-black/5 backdrop-blur-[2px]">
                <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                <header className="w-full flex items-center justify-between px-8 py-2 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529238/name_ob79fa.png" alt="logo" className="w-20 h-20 rounded-full object-cover"  />
                    </div>
                    <div className="hidden md:flex items-center gap-3 bg-black/60 border border-white/10 rounded-full pl-2 pr-4 py-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-xs text-gray-400">Available for projects</span>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase mb-0.5">Sonipat, Haryana</p>
                        <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">INDIA</p>
                    </div>
                    <button className="md:hidden text-white/80">
                        <Layers size={24} />
                    </button>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                    <div className="relative group">
                        <div className="absolute -inset-10 bg-orange-600/30 blur-[60px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                        <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                            <img src="https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777530331/Web_Photo_Editor_vfs6qd.jpg" alt="Sachin Jaiswal" className="w-full h-full object-cover grayscale-[0.1] contrast-125 transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                        </div>
                    </div>
                    <div className="mt-18 text-center space-y-2 relative z-10">
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-gray-400 text-sm font-medium tracking-wide">Hi, I’m Sachin Jaiswal,</p>
                            <p className="text-gray-500 text-sm font-normal tracking-wide">Working as Full Stack Developer and Freelancer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        {[
                            { Icon: Twitter, href: "https://x.com/weirdo_49" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/jasiwalsachin49/" },
                            { Icon: Instagram, href: "https://www.instagram.com/jaiswalsachin_49/" },
                            { Icon: Github, href: "https://github.com/jaiswalsachin49" },
                        ].map(({ Icon, href }, i) => (
                            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:border-black/20 transition-all duration-300 backdrop-blur-sm">
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-5 mt-10">
                        <button className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white/10 border border-white/10 text-gray-200 font-medium text-xs transition-all hover:bg-white/20 backdrop-blur-md" onClick={() => scrollToSection("about")}>
                            Get Started
                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                <ArrowUpRight size={14} />
                            </div>
                        </button>
                        <button className="px-8 py-3 rounded-full border border-white/10 text-gray-400 font-medium text-xs hover:bg-white/5 hover:text-white transition-all backdrop-blur-sm" onClick={() => scrollToSection("work")}>
                            View My Work
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
