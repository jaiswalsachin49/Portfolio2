"use client";

import { useState } from "react";
import { Monitor, Server, Layers, Terminal } from "lucide-react";

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

export default function ServicesSection({ setCursorText }) {
    const [activeService, setActiveService] = useState("frontend");

    return (
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
                            onClick={() => {
                                const newActive = activeService === service.id ? null : service.id;
                                setActiveService(newActive);
                                setCursorText(newActive === service.id ? "Close" : "View");
                            }}
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
    );
}
