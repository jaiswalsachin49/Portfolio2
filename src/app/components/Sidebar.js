"use client";

import {
    Home,
    Briefcase,
    Sparkles,
    User,
    MessageSquareQuote,
    CreditCard,
    HelpCircle,
    Mail,
    Cpu
} from "lucide-react";

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

export default function Sidebar({ activeSection, scrollToSection }) {
    return (
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
    );
}
