"use client";

import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";

export default function PricingSection({ scrollToSection }) {
    const [billingCycle, setBillingCycle] = useState("standard");

    return (
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

                        <button className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group/btn" onClick={() => scrollToSection("contact")}>
                            Start a Project
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-lg mt-6 p-1 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-white/10 group cursor-pointer hover:border-white/20 transition-all">
                    <div className="bg-zinc-950/80 backdrop-blur-sm rounded-xl px-8 py-6 flex items-center justify-between" onClick={() => scrollToSection("contact")}>
                        <span className="text-lg text-white font-light">Custom Quote</span>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
