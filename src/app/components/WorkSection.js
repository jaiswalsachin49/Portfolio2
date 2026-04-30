"use client";

import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "FuelFlow",
        category: "Management System",
        year: "2025",
        bgColor: "bg-[#1a1a1a]",
        textColor: "text-white",
        description: "Petrol Pump Management System",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529238/FuelFlow_n5keqn.png",
        link: "https://petrol-pump-management-sys.vercel.app/dashboard"
    },
    {
        title: "Zooper",
        category: "Streaming Platform",
        year: "2025",
        bgColor: "bg-[#0f0f0f]",
        textColor: "text-orange-500",
        description: "Movie Streaming Platform",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529239/Zooper_yfpyjv.png",
        link: "https://zooper49.vercel.app/"
    },
    {
        title: "Skill Swap",
        category: "Social Platform",
        year: "2025",
        bgColor: "bg-[#000000]",
        textColor: "text-white",
        description: "Social - Skill Swapping Platform",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529238/SkillSwap_pixjav.png",
        link: "https://skillswapconstruct.vercel.app/"
    },
    {
        title: "Old Portfolio",
        category: "Portfolio",
        year: "2025",
        bgColor: "bg-[#000000]",
        textColor: "text-orange-500",
        description: "Old Portfolio",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529239/OldPortfolio_mubhsv.png",
        link: "https://portfolio-sachin49.vercel.app/"
    },
    {
        title: "Audio Profiling & Viral Track Characteristics",
        category: "Data Analytics",
        year: "2026",
        bgColor: "bg-[#000000]",
        textColor: "text-orange-500",
        description: "What makes a song go viral?",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529254/Spotify_c2irxv.png",
        link: "https://github.com/jaiswalsachin49/The-Entertainment-Media-Project.git"
    },
    {
        title: "EV Adoption Trends & Grid Impact Matrix",
        category: "Data Analytics",
        year: "2026",
        bgColor: "bg-[#000000]",
        textColor: "text-orange-500",
        description: "Impact of Electric Vehicles on Power Grid",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529254/EV_zz3vp3.png",
        link: "https://github.com/jaiswalsachin49/EV-Adoption-Trends-Grid-Impact-Matrix.git"
    },
    {
        title: "Bank Marketing Data Analysis",
        category: "Data Analytics",
        year: "2026",
        bgColor: "bg-[#000000]",
        textColor: "text-orange-500",
        description: "Analysis of Customer Data for Marketing",
        image: "https://res.cloudinary.com/dhtbkazst/image/upload/q_auto/f_auto/v1777529254/Customer_jmw8yj.png",
        link: "https://github.com/Lalith0024/Section_C_Group_11_Bank_Marketing_Dataset.git"
    }
];

export default function WorkSection() {
    return (
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

                                <button onClick={() => window.open(project.link, '_blank')} className="w-14 h-14 rounded-[1rem] border border-orange-500/30 bg-orange-500/10 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 group/btn">
                                    <ArrowUpRight size={22} className="group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
