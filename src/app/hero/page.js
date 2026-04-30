"use client";

import { useEffect, useState } from "react";
import CustomCursor from "../components/CustomCursor";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import WorkSection from "../components/WorkSection";
import ServicesSection from "../components/ServicesSection";
import TechStackSection from "../components/TechStackSection";
import AboutSection from "../components/AboutSection";
import TestimonialSection from "../components/TestimonialSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Hero() {
    const [activeSection, setActiveSection] = useState("home");
    const [cursorText, setCursorText] = useState("");

    const scrollToSection = (id) => {
        if (typeof window === "undefined") return;
        const element = document.getElementById(id);
        if (element && typeof element.scrollIntoView === 'function') {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            console.warn(`Element with id '${id}' not found or scrollIntoView not supported.`);
        }
    };

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

        const sections = [
            "home", "work", "services", "tech", "about", "testimonial", "pricing", "faq", "contact"
        ];

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative w-full bg-black text-white font-sans selection:bg-orange-500/30">
            <CustomCursor cursorText={cursorText} />
            <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

            <HeroSection scrollToSection={scrollToSection} />
            <WorkSection />
            <ServicesSection setCursorText={setCursorText} />
            <TechStackSection />
            <AboutSection />
            <TestimonialSection />
            <PricingSection scrollToSection={scrollToSection} />
            <FAQSection scrollToSection={scrollToSection} />
            <ContactSection />
            <Footer />
        </div>
    );
}
