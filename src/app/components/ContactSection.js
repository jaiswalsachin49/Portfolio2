"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
    const [selectedBudget, setSelectedBudget] = useState("< $1,000");
    const [formSubmitted, setFormSubmitted] = useState(false);

    return (
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
                        const email = e.target.email.value;
                        const phone = e.target.phone.value;
                        const message = e.target.message.value;
                        window.open(`mailto:sj586997@gmail.com?subject=Project Inquiry (${selectedBudget})&body=From: ${encodeURIComponent(email)}%0D%0APhone: ${encodeURIComponent(phone)}%0D%0ABudget: ${encodeURIComponent(selectedBudget)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`);
                        setFormSubmitted(true);
                        setTimeout(() => setFormSubmitted(false), 3000);
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
                            {["< $50", "$50 - $75", "$75 - $100", "$100 - $150", "> $150"].map((budget) => (
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

                    <button type="submit" className={`w-full md:w-auto md:self-start mt-8 px-10 py-4 rounded-full font-medium flex items-center justify-between gap-8 group transition-all duration-300 ${formSubmitted ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}>
                        {formSubmitted ? '✓ Request Sent!' : 'Send Request'}
                        {!formSubmitted && (
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                                <ArrowUpRight size={14} />
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
