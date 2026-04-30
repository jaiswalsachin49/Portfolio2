"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    { q: "What's the development progress like?", a: "I specialize in clean, scalable code and regular updates. You'll receive weekly milestone reports and have access to a live staging environment to track progress in real-time." },
    { q: "Design delivery time estimate?", a: "Typically, a standard revision takes 2-3 business days. Full project timelines depend on scope, but I prioritize speed without compromising quality." },
    { q: "What Service do You offer?", a: "I offer Full Stack Development (MERN), UI/UX implementation, API Testing/Integration, and Performance Optimization for modern web applications." },
    { q: "What if I don't like design?", a: "We work iteratively. I provide initial wireframes and style guides for approval before coding. If you're not satisfied, we refine it until it matches your vision." },
    { q: "Are there any Refund?", a: "Milestone-based payments ensure safety for both parties. If a project is cancelled before work begins on a milestone, that portion is fully refundable." }
];

export default function FAQSection({ scrollToSection }) {
    const [activeFAQ, setActiveFAQ] = useState(null);

    return (
        <section id="faq" className="w-full flex justify-center bg-black border-b border-white/10">
            <div className="relative w-full md:w-[60%] md:max-w-5xl border-x border-white/10 min-h-[60vh] flex flex-col p-10 md:p-20">
                {/* Grid Dots */}
                <div className="absolute top-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                <div className="absolute top-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                <div className="absolute bottom-0 left-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />
                <div className="absolute bottom-0 right-[-2.5px] w-1.5 h-1.5 bg-white opacity-80 rounded-full" />

                <h2 className="text-4xl md:text-6xl font-normal text-white mb-20 text-center">FAQs</h2>

                <div className="flex flex-col gap-4">
                    {faqs.map((item, i) => (
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
    );
}
