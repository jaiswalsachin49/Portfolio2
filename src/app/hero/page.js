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
    Terminal,
    Quote,
    Workflow,
    Cpu,
    Code2,
    Layout,
    Database,
    Box,
    Globe,
    Check,
    Plus,
    Minus
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
        if (typeof window === "undefined") return;
        const element = document.getElementById(id);
        if (element && typeof element.scrollIntoView === 'function') {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            console.warn(`Element with id '${id}' not found or scrollIntoView not supported.`);
        }
    };

    const sidebarItems = [
        { id: "home", label: "Home", Icon: Home },
        { id: "work", label: "Work", Icon: Briefcase },
        { id: "services", label: "Services", Icon: Sparkles },
        { id: "tech", label: "Tech Stack", Icon: Cpu },
        { id: "about", label: "About", Icon: User },
        { id: "testimonial", label: "Testimonial", Icon: MessageSquareQuote },
        { id: "pricing", label: "Pricing", Icon: CreditCard },
        { id: "faq", label: "FAQ", Icon: HelpCircle },
        { id: "contact", label: "Contact", Icon: Mail },
    ];

    const [activeService, setActiveService] = useState("frontend");
    const [cursorText, setCursorText] = useState("");
    const [activeSection, setActiveSection] = useState("home");
    const [billingCycle, setBillingCycle] = useState("standard");
    const [activeFAQ, setActiveFAQ] = useState(null);
    const [selectedBudget, setSelectedBudget] = useState("< $1,000");

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
        <div className="relative w-full bg-black text-white font-sans selection:bg-orange-500/30">
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

                    <header className="w-full flex items-center justify-between px-8 py-2 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <img src="name.png" alt="logo" className="w-20 h-20 rounded-full object-cover"  />
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
                                <img src="Web_Photo_Editor.jpg" alt="Sachin Jaiswal" className="w-full h-full object-cover grayscale-[0.1] contrast-125 transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                            </div>
                            {/* <img src="name.png" alt="Signature" className="absolute -bottom-30 -rotate-5 left-1/2 -translate-x-1/2 w-[400px] z-20 pointer-events-none drop-shadow-2xl mix-blend-lighten opacity-90" /> */}
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
                                <a key={i} href={href} target="_blank" className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:border-black/20 hover:text-black hover:bg-white transition-all duration-300 backdrop-blur-sm">
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


            <section id="tech" className="w-full flex justify-center bg-black border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[50vh] flex flex-col p-10 md:p-20">
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <div className="flex items-center gap-4 mb-20">
                        <div className="w-12 h-1 bg-blue-500 rounded-full" />
                        <h2 className="text-3xl md:text-5xl font-light text-white">Tech Stack</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {[
                            { name: "C++", desc: "System Logic", Icon: Code2 },
                            { name: "Tailwind", desc: "Styling Engine", Icon: Layout },
                            { name: "Express", desc: "Backend API", Icon: Server },
                            { name: "MongoDB", desc: "NoSQL DB", Icon: Database },
                            { name: "Python", desc: "Data & AI", Icon: Terminal },
                            { name: "JavaScript", desc: "Interactivity", Icon: Code2 },
                            { name: "Postman", desc: "API Testing", Icon: Box },
                            { name: "Next.js", desc: "React Framework", Icon: Globe },
                            { name: "React", desc: "UI Library", Icon: Workflow },
                            { name: "MySQL", desc: "Relational DB", Icon: Database },
                        ].map((tech, i) => (
                            <div key={i} className="group relative p-6 bg-zinc-900 border border-white/5 rounded-3xl flex flex-col items-center text-center hover:border-blue-500/50 transition-colors duration-500 hover:-translate-y-1">
                                <span className="text-white font-medium tracking-wide mb-6">{tech.name}</span>

                                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] transition-all duration-500">
                                    <tech.Icon size={32} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-500" />
                                </div>

                                <span className="text-xs text-gray-500 font-mono">{tech.desc}</span>
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

            {/* TESTIMONIALS SECTION (Vertical Marquee) */}
            <section id="testimonial" className="w-full flex justify-center bg-black border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[60vh] flex flex-col p-10 md:p-20 overflow-hidden">
                    <div className="flex items-center gap-4 mb-20">
                        <div className="w-12 h-1 bg-green-500 rounded-full" />
                        <h2 className="text-3xl md:text-5xl font-light text-white">Friends Say</h2>
                    </div>

                    <div className="relative w-full h-[400px] overflow-hidden mask-linear-gradient">
                        {/* Gradient Masks */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10" />

                        <div className="animate-scroll-y flex flex-col gap-8">
                            {[
                                { name: "Kushal", text: "Sachin is one of the most dedicated people I know. His ability to turn complex logic into smooth applications is just inspiring. Always there to help!", role: "Developer & Friend" },
                                { name: "Asad", text: "I've seen him debug issues for hours without losing his cool. A truly patient and skilled developer who treats every project like his own masterpiece.", role: "Developer & Friend" },
                                {name: "Ashutosh", text: "Hey! I really appreciate you helping me out with my projects and debugging all those issues. Your help has been invaluable!", role: "Developer & Friend" },
                                { name: "Kushal", text: "Sachin is one of the most dedicated people I know. His ability to turn complex logic into smooth applications is just inspiring. Always there to help!", role: "Developer & Friend" },
                                { name: "Asad", text: "I've seen him debug issues for hours without losing his cool. A truly patient and skilled developer who treats every project like his own masterpiece.", role: "Developer & Friend" },
                                {name: "Ashutosh", text: "Hey! I really appreciate you helping me out with my projects and debugging all those issues. Your help has been invaluable!", role: "Developer & Friend" },
                            ].map((review, i) => (
                                <div key={i} className="relative p-8 md:p-10 rounded-[2rem] bg-zinc-900 border border-white/5 overflow-hidden group hover:border-orange-500/30 transition-colors duration-500">
                                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-600/20 blur-[80px] rounded-full group-hover:bg-orange-600/30 transition-all duration-700" />

                                    <Quote className="absolute bottom-4 left-6 text-white/5 w-24 h-24 rotate-12" />

                                    <div className="relative z-10 flex flex-col gap-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                            <span className="text-xs uppercase tracking-widest text-white/40 font-medium">Testimonial</span>
                                        </div>

                                        <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
                                            "{review.text}"
                                        </p>

                                        <div className="mt-4 flex items-center justify-end">
                                            <div className="flex items-center gap-4 bg-white/5 pl-2 pr-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center text-orange-500 font-bold border border-white/10">
                                                    {review.name[0]}
                                                </div>
                                                <div className="text-right">
                                                    <h4 className="text-white text-sm font-medium leading-tight">{review.name}</h4>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{review.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="w-full flex justify-center bg-zinc-950 border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[80vh] flex flex-col items-center p-10 md:p-20">
                
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <h2 className="text-4xl md:text-6xl font-normal text-white mb-10 text-center">My Pricing</h2>

                    <div className="flex items-center bg-zinc-900 border border-white/10 rounded-full p-1 mb-16 relative">
                        <button
                            onClick={() => setBillingCycle("standard")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${billingCycle === "standard" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setBillingCycle("premium")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${billingCycle === "premium" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            Premium
                        </button>

                        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-800 rounded-full transition-all duration-300 ${billingCycle === "standard" ? "left-1" : "left-[calc(50%+4px)]"}`} />
                    </div>

                    <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2rem] p-2 overflow-hidden relative group hover:border-white/20 transition-colors">
                        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-orange-900/20 to-transparent opacity-50" />

                        <div className="bg-black/40 rounded-[1.5rem] p-8 md:p-10 relative z-10 h-full flex flex-col">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${billingCycle === "standard" ? "bg-white" : "bg-orange-500"}`} />
                                    <span className="text-sm text-gray-400 uppercase tracking-widest">{billingCycle === "standard" ? "Standard Plan" : "Premium Plan"}</span>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {billingCycle === "standard" ? "Have design ready to build? Or small budget?" : "Need a full-scale solution from scratch?"}
                                </p>
                            </div>

                            <div className="mb-12">
                                <span className="text-5xl md:text-7xl font-light text-white tracking-tight">
                                    {billingCycle === "standard" ? "$5" : "$15"}
                                </span>
                                <span className="text-xl text-gray-500 font-light"> / hour</span>
                            </div>

                            <div className="flex-1 space-y-4 mb-12">
                                {[
                                    billingCycle === "standard" ? "Need your wireframe" : "Full Design System included",
                                    billingCycle === "standard" ? "Design with Figma, Framer" : "Advanced Prototyping",
                                    "Implement with Webflow, React, Next.js",
                                    "Remote/Online",
                                    "Work in business days, no weekend",
                                    "Support 6 months"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check size={16} className="text-orange-500" />
                                        <span className="text-gray-400 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group/btn" onClick={()=> scrollToSection("contact")}>
                                Start a Project
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full max-w-lg mt-6 p-1 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-white/10 group cursor-pointer hover:border-white/20 transition-all">
                        <div className="bg-zinc-950/80 backdrop-blur-sm rounded-xl px-8 py-6 flex items-center justify-between" onClick={()=> scrollToSection("contact")}>
                            <span className="text-lg text-white font-light">Custom Quote</span>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowUpRight size={18} />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="w-full flex justify-center bg-black border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[60vh] flex flex-col p-10 md:p-20">
                    {/* Grid Dots */}
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <h2 className="text-4xl md:text-6xl font-normal text-white mb-20 text-center">FAQs</h2>

                    <div className="flex flex-col gap-4">
                        {[
                            { q: "What's the development progress like?", a: "I specialize in clean, scalable code and regular updates. You'll receive weekly milestone reports and have access to a live staging environment to track progress in real-time." },
                            { q: "Design delivery time estimate?", a: "Typically, a standard revision takes 2-3 business days. Full project timelines depend on scope, but I prioritize speed without compromising quality." },
                            { q: "What Service do You offer?", a: "I offer Full Stack Development (MERN), UI/UX implementation, API Testing/Integration, and Performance Optimization for modern web applications." },
                            { q: "What if I don't like design?", a: "We work iteratively. I provide initial wireframes and style guides for approval before coding. If you're not satisfied, we refine it until it matches your vision." },
                            { q: "Are there any Refund?", a: "Milestone-based payments ensure safety for both parties. If a project is cancelled before work begins on a milestone, that portion is fully refundable." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-white/10 last:border-0">
                                <button
                                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                                    className="w-full flex items-center justify-between py-8 text-left group"
                                >
                                    <span className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors">{item.q}</span>
                                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${activeFAQ === i ? "bg-white text-black rotate-180" : "bg-transparent text-white group-hover:bg-white/10"}`}>
                                        {activeFAQ === i ? <Minus size={14} /> : <Plus size={14} />}
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFAQ === i ? "max-h-40 opacity-100 pb-8" : "max-h-0 opacity-0"}`}>
                                    <p className="text-gray-500 leading-relaxed text-sm md:text-base pr-8">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-gray-500 text-sm mb-4">Do you have any other questions?</p>
                        <button onClick={() => scrollToSection("contact")} className="text-white underline underline-offset-4 hover:text-orange-500 transition-colors">Ask me directly</button>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="w-full flex justify-center bg-zinc-950 border-b border-white/10">
                <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[80vh] flex flex-col p-10 md:p-20">
                    {/* Grid Dots */}
                    <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                    <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span className="text-xs uppercase tracking-widest text-gray-500">Contact Form</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-normal text-white mb-16">Contact For Work</h2>

                    <form
                        className="flex flex-col gap-12"
                        onSubmit={(e) => {
                            e.preventDefault();
                            window.open(`mailto:sj586997@gmail.com?subject=Project Inquiry (${selectedBudget})&body=Phone: ${e.target.phone.value}%0D%0A%0D%0AMessage:%0D%0A${e.target.message.value}`);
                        }}
                    >
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Your E-mail</label>
                            <input type="email" name="email" placeholder="Enter the Email" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white/40 transition-colors placeholder:text-gray-700" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Your Phone</label>
                            <input type="tel" name="phone" placeholder="Enter Your Phone no" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white/40 transition-colors placeholder:text-gray-700" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Message</label>
                            <textarea name="message" placeholder="Describe your project..." rows={4} className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-white/40 transition-colors placeholder:text-gray-700 resize-none" />
                        </div>

                        <div className="space-y-6">
                            <label className="text-gray-200 text-base">Select your Budget</label>
                            <div className="flex flex-wrap gap-3">
                                {["< $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "> $20,000"].map((budget) => (
                                    <button
                                        key={budget}
                                        type="button"
                                        onClick={() => setSelectedBudget(budget)}
                                        className={`px-6 py-3 rounded-full border text-sm transition-all duration-300 ${selectedBudget === budget ? "bg-white text-black border-white" : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"}`}
                                    >
                                        {budget}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full md:w-auto md:self-start mt-8 bg-white text-black px-10 py-4 rounded-full font-medium flex items-center justify-between gap-8 group hover:bg-gray-200 transition-colors">
                            Send Request
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                                <ArrowUpRight size={14} />
                            </div>
                        </button>
                    </form>
                </div>
            </section>

            <footer className="w-full flex justify-center py-10 bg-black">
                <div className="text-gray-500 text-xs">
                    © 2024 Sachin Jaiswal. All rights reserved.
                </div>
            </footer>

        </div >
    );
}
