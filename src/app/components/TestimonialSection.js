"use client";

import { Quote } from "lucide-react";

const reviews = [
    { name: "Kushal", text: "Sachin is one of the most dedicated people I know. His ability to turn complex logic into smooth applications is just inspiring. Always there to help!", role: "Developer & Friend" },
    { name: "Asad", text: "I've seen him debug issues for hours without losing his cool. A truly patient and skilled developer who treats every project like his own masterpiece.", role: "Developer & Friend" },
    { name: "Ashutosh", text: "Hey! I really appreciate you helping me out with my projects and debugging all those issues. Your help has been invaluable!", role: "Developer & Friend" },
    { name: "Kushal", text: "Sachin is one of the most dedicated people I know. His ability to turn complex logic into smooth applications is just inspiring. Always there to help!", role: "Developer & Friend" },
    { name: "Asad", text: "I've seen him debug issues for hours without losing his cool. A truly patient and skilled developer who treats every project like his own masterpiece.", role: "Developer & Friend" },
    { name: "Ashutosh", text: "Hey! I really appreciate you helping me out with my projects and debugging all those issues. Your help has been invaluable!", role: "Developer & Friend" },
];

export default function TestimonialSection() {
    return (
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
                        {reviews.map((review, i) => (
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
    );
}
