"use client";

import { useRef, useEffect, useState } from "react";
import {
    Home,
    Briefcase,
    Sparkles,
    User,
    MessageSquareQuote,
    CreditCard,
    HelpCircle,
    Mail,
    Twitter,
    Linkedin,
    Instagram,
    Github,
    ArrowUpRight,
    Layers,
    Monitor,
    Server,
    Smartphone,
    Terminal
} from "lucide-react";

export default function Hero() {
    const canvasRef = useRef(null);
    const cursorRef = useRef(null);

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
            if (homeSection) observer.unobserve(homeSection);
        };
    }, []);

    useEffect(() => {
        let cursorFrame;
        const cursorLink = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const cursorTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const moveCursor = (e) => {
            cursorTarget.x = e.clientX;
            cursorTarget.y = e.clientY;
        };

        const renderCursor = () => {
            if (cursorRef.current) {
                cursorLink.x = cursorTarget.x;
                cursorLink.y = cursorTarget.y;
                cursorRef.current.style.transform = `translate(${cursorLink.x}px, ${cursorLink.y}px) translate(-50%, -50%)`;
            }
            cursorFrame = requestAnimationFrame(renderCursor);
        };

        window.addEventListener("mousemove", moveCursor);
        renderCursor();

        return () => {
            cancelAnimationFrame(cursorFrame);
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const sidebarItems = [
        { id: "home", label: "Home", Icon: Home },
        { id: "work", label: "Work", Icon: Briefcase },
        { id: "services", label: "Services", Icon: Sparkles },
        { id: "about", label: "About", Icon: User },
        { id: "testimonial", label: "Testimonial", Icon: MessageSquareQuote },
        { id: "pricing", label: "Pricing", Icon: CreditCard },
        { id: "faq", label: "FAQ", Icon: HelpCircle },
        { id: "contact", label: "Contact", Icon: Mail },
    ];

    const [activeService, setActiveService] = useState("frontend");
    const [cursorText, setCursorText] = useState("");
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" }
        );

        sidebarItems.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const services = [
        {
            id: "frontend",
            title: "Front-end Dev",
            description: "React, Next.js, Tailwind CSS, Responsive Design",
            Icon: Monitor
        },
        {
            id: "backend",
            title: "Backend Dev",
            description: "Node.js, Express, PostgreSQL, MongoDB, System Architecture",
            Icon: Server
        },
        {
            id: "fullstack",
            title: "Fullstack Dev",
            description: "End-to-End Solutions, API Integration, Deployment",
            Icon: Layers
        },
        {
            id: "testing",
            title: "API Testing",
            description: "Postman, Debugging, Performance Optimization, Security",
            Icon: Terminal
        }
    ];

    const projects = [
        {
            title: "FuelFlow",
            category: "Management System",
            year: "2025",
            bgColor: "bg-[#1a1a1a]",
            textColor: "text-white",
            description: "Petrol Pump Management System",
            image: "FuelFlow.png",
            link: "https://petrol-pump-management-sys.vercel.app/dashboard"
        },
        {
            title: "Zooper",
            category: "Streaming Platform",
            year: "2025",
            bgColor: "bg-[#0f0f0f]",
            textColor: "text-orange-500",
            description: "Movie Streaming Platform",
            image: "Zooper.png",
            link: "https://zooper49.vercel.app/"
        },
        {
            title: "Skill Swap",
            category: "Social Platform",
            year: "2025",
            bgColor: "bg-[#000000]",
            textColor: "text-white",
            description: "Social - Skill Swapping Platform",
            image: "SkillSwap.png",
            link: "https://skillswapconstruct.vercel.app/"
        },
        {
            title: "Old Portfolio",
            category: "Portfolio",
            year: "2025",
            bgColor: "bg-[#000000]",
            textColor: "text-orange-500",
            description: "Old Portfolio",
            image: "OldPortfolio.png",
            link: "https://portfolio-sachin49.vercel.app/"
        }
    ];

    return (
        <div className="relative w-full bg-black text-white font-sans selection:bg-orange-500/30 cursor-none">
            <div
                ref={cursorRef}
                className={`fixed rounded-full pointer-events-none z-[60] flex items-center justify-center text-black text-[10px] font-bold tracking-widest transition-all duration-300 ${cursorText ? "w-20 h-20 bg-white mix-blend-normal shadow-2xl scale-100" : "w-5 h-5 bg-white mix-blend-difference shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
                    }`}
                style={{ top: 0, left: 0 }}
            >
                {cursorText}
            </div>

            <div className="hidden md:flex flex-col gap-6 fixed right-10 top-1/2 -translate-y-1/2 z-50">
                <div className="flex flex-col gap-5 bg-white/5 backdrop-blur-2xl border border-white/10 py-1 px-1 rounded-full shadow-2xl">
                    {sidebarItems.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group ${activeSection === id
                                    ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110"
                                }`}
                        >
                            <Icon size={18} />
                            <span className="absolute right-12 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>



            <section id="home" className="relative w-full min-h-screen flex justify-center border-b border-white/10">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                </div>

                <div className="relative z-10 w-full md:w-[60%] md:max-w-5xl h-full min-h-screen border-x border-white/10 flex flex-col bg-black/5 backdrop-blur-[2px]">
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <header className="w-full flex items-center justify-between px-8 py-8 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold tracking-tight">Sachin</span>
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
                                <img src="photo.png" alt="Sachin Jaiswal" className="w-full h-full object-cover grayscale-[0.2] contrast-125 transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                            </div>
                            <img src="name.png" alt="Signature" className="absolute -bottom-30 -rotate-5 left-1/2 -translate-x-1/2 w-[400px] z-20 pointer-events-none drop-shadow-2xl mix-blend-lighten opacity-90" />
                        </div>
                        <div className="mt-18 text-center space-y-2 relative z-10">
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-gray-400 text-sm font-medium tracking-wide">Hi, I’m Sachin Jaiswal,</p>
                                <p className="text-gray-500 text-sm font-normal tracking-wide">Working as Web-designer and Developer</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                            {[
                                { Icon: Twitter, href: "https://x.com/weirdo_49" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/in/jasiwalsachin49/" },
                                { Icon: Instagram, href: "https://www.instagram.com/jaiswalsachin_49/" },
                                { Icon: Github, href: "https://github.com/jaiswalsachin49" },
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-5 mt-10">
                            <button className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white/10 border border-white/10 text-gray-200 font-medium text-xs transition-all hover:bg-white/20 backdrop-blur-md" onClick={() => scrollIntoView("about")}>
                                Get Started
                                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <ArrowUpRight size={14} />
                                </div>
                            </button>
                            <button className="px-8 py-3 rounded-full border border-white/10 text-gray-400 font-medium text-xs hover:bg-white/5 hover:text-white transition-all backdrop-blur-sm" onClick={() => scrollIntoView("work")}>
                                View My Work
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="work" className="w-full flex justify-center bg-zinc-950 border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 flex flex-col p-8 md:p-12 pb-32">
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <div className="flex items-center gap-4 mb-20">
                        <div className="w-12 h-1 bg-orange-500 rounded-full" />
                        <h2 className="text-3xl md:text-5xl font-light text-white">Selected Work</h2>
                    </div>

                    <div className="flex flex-col gap-10">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={`sticky top-24 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 ${project.bgColor} h-[550px] relative group transition-transform duration-500`}
                                style={{ top: `calc(10vh + ${index * 60}px)` }}
                            >
                                <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 pointer-events-none" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] flex items-center justify-between z-20 hover:bg-white/10 transition-colors duration-300">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-white/50">
                                            <span>{project.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-orange-500" />
                                            <span className="bg-white/10 px-2 py-0.5 rounded text-white/80">{project.year}</span>
                                        </div>
                                        <h3 className={`text-3xl md:text-4xl font-semibold leading-none ${project.textColor === 'text-orange-500' ? 'text-orange-500' : 'text-white'}`}>
                                            {project.title}
                                        </h3>
                                    </div>

                                    <button className="w-14 h-14 rounded-[1rem] border border-orange-500/30 bg-orange-500/10 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group/btn">
                                        <ArrowUpRight size={22} className="group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" onClick={() => window.open(project.link, '_blank')} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="services" className="w-full flex justify-center bg-black border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[70vh] flex flex-col p-10 md:p-20">
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <div className="flex items-center gap-4 mb-20">
                        <div className="w-12 h-1 bg-orange-500 rounded-full" />
                        <h2 className="text-3xl md:text-5xl font-light text-white">My Services</h2>
                    </div>

                    <div className="flex flex-col">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onMouseEnter={() => setCursorText(activeService === service.id ? "Close" : "View")}
                                onMouseLeave={() => setCursorText("")}
                                onClick={() => setActiveService(service.id)}
                                className={`group py-10 border-b border-white/10 cursor-pointer transition-all duration-500 ${activeService === service.id ? "opacity-100" : "opacity-40 hover:opacity-70"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-4 md:gap-8">
                                        <h3 className={`text-4xl md:text-6xl font-normal transition-all duration-500 ${activeService === service.id ? "text-white scale-105 origin-left" : "text-gray-400"}`}>
                                            {service.title}
                                        </h3>
                                        <span className={`text-xs font-mono transition-colors duration-300 ${activeService === service.id ? "text-orange-500" : "text-gray-600"}`}>
                                            <service.Icon size={24} />
                                        </span>
                                    </div>
                                    {activeService === service.id && (
                                        <div className="hidden md:flex w-16 h-16 bg-zinc-900 border border-white/10 rounded-full items-center justify-center animate-pulse">
                                            <service.Icon size={32} className="text-orange-500" />
                                        </div>
                                    )}
                                </div>

                                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeService === service.id ? "max-h-[200px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}`}>
                                    <div className="pl-2 md:pl-4 border-l border-white/20 ml-2 md:ml-4">
                                        <ul className="space-y-2">
                                            {service.description.split(',').map((item, i) => (
                                                <li key={i} className="text-gray-400 text-sm md:text-base flex items-center gap-2">
                                                    <span className="w-1 h-1 bg-orange-500 rounded-full" />
                                                    {item.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="w-full flex justify-center bg-zinc-950 border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[60vh] flex flex-col p-10 md:p-20">
                    {/* Grid Dots */}
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <div className="flex items-center gap-4 mb-16">
                        <div className="hidden md:block w-12 h-0.5 bg-orange-500/50" />
                        <span className="text-orange-500 font-mono text-sm tracking-wider uppercase">Values & Story</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 relative z-10">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                                More than just <br />
                                <span className="opacity-50">lines of code.</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed font-light">
                                I am <span className="text-white font-medium">Sachin Jaiswal</span>—more like a family man, friendly, hardworking, and eager to learn.
                            </p>
                            <p className="text-gray-400 leading-relaxed font-light">
                                Growing up far from the world of code, I never imagined technology would one day become my canvas. From school days filled with cricket matches, to a college journey where lines of HTML and CSS gave me goosebumps—my fascination with how things work behind the screen only grew stronger.
                            </p>
                        </div>

                        <div className="space-y-8 md:pt-20">
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl relative group hover:bg-white/10 transition-colors duration-500">
                                <MessageSquareQuote className="absolute top-8 right-8 text-orange-500/20 w-12 h-12 group-hover:text-orange-500/40 transition-colors" />
                                <p className="text-gray-300 italic leading-relaxed relative z-10">
                                    "Without a tech background in my family, every new framework, every working project felt like discovering a new superpower. And the best part? Sharing these small wins with my true <span className="text-orange-500 font-semibold">friends</span> and family, who cheered for every line of code that finally worked."
                                </p>
                            </div>
                            <p className="text-gray-500 text-sm tracking-wide">
                                This is just the start of my story.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* REUSABLE SECTION COMPONENT for Others */}
            {[
                { id: "testimonial", title: "Client Stories", bg: "bg-black" },
                { id: "pricing", title: "Pricing Plans", bg: "bg-zinc-950" },
                { id: "faq", title: "Common Questions", bg: "bg-black" },
                { id: "contact", title: "Let's Talk", bg: "bg-zinc-950" },
            ].map((section) => (
                <section key={section.id} id={section.id} className={`w-full flex justify-center border-b border-white/10 ${section.bg}`}>
                    <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[50vh] flex flex-col p-10 md:p-20">
                        <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                        <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                        <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                        <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                        <h2 className="text-4xl md:text-5xl font-light mb-8 opacity-90">{section.title}</h2>
                        <div className="w-20 h-1 bg-orange-500 mb-8" />
                        <p className="text-gray-400 max-w-lg leading-relaxed">
                            Content for {section.title} will go here. This layout maintains the continuous vertical grid lines from the hero section down to the footer.
                        </p>
                    </div>
                </section>
            ))}

            <footer className="w-full flex justify-center py-10 bg-black">
                <div className="text-gray-500 text-xs">
                    © 2024 Sachin Jaiswal. All rights reserved.
                </div>
            </footer>

        </div>
    );
}
