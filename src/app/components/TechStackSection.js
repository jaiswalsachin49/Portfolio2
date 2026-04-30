"use client";

import { Code2, Layout, Server, Database, Terminal, Box, Globe, Workflow } from "lucide-react";

export default function TechStackSection() {
    return (
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
    );
}
