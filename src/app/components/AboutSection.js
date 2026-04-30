"use client";

import { MessageSquareQuote } from "lucide-react";

export default function AboutSection() {
    return (
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
    );
}
