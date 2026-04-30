"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor({ cursorText }) {
    const cursorRef = useRef(null);

    useEffect(() => {
        let cursorFrame;
        const cursorLink = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const cursorTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const moveCursor = (e) => {
            cursorTarget.x = e.clientX;
            cursorTarget.y = e.clientY;
        };

        const renderCursor = () => {
            if (cursorRef.current) {
                // Lerp for buttery-smooth follow (0.25 = fast tracking)
                cursorLink.x += (cursorTarget.x - cursorLink.x) * 0.25;
                cursorLink.y += (cursorTarget.y - cursorLink.y) * 0.25;
                cursorRef.current.style.transform = `translate(${cursorLink.x}px, ${cursorLink.y}px) translate(-50%, -50%)`;
            }
            cursorFrame = requestAnimationFrame(renderCursor);
        };

        window.addEventListener("mousemove", moveCursor);
        renderCursor();

        return () => {
            cancelAnimationFrame(cursorFrame);
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`fixed rounded-full pointer-events-none z-[60] flex items-center justify-center text-black text-[10px] font-bold tracking-widest transition-[width,height,background-color,box-shadow,scale,mix-blend-mode] duration-300 ${cursorText ? "w-20 h-20 bg-white mix-blend-normal shadow-2xl scale-100" : "w-5 h-5 bg-white mix-blend-difference shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
                }`}
            style={{ top: 0, left: 0 }}
        >
            {cursorText}
        </div>
    );
}
