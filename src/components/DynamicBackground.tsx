import { useState, useEffect } from "react";

// Using existing assets for the rotating wallpaper
import bg1 from "@/assets/hero-bg.jpg"; // Evening cityscape
import bg2 from "@/assets/property-1.jpg"; // Luxury interior/exterior
import bg3 from "@/assets/property-5.jpg"; // City skyline

const backgrounds = [bg1, bg2, bg3];
const CHANGE_INTERVAL = 15000; // 15 seconds per wallpaper

const DynamicBackground = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        }, CHANGE_INTERVAL);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none bg-background overflow-hidden">
            {backgrounds.map((bg, idx) => (
                <div
                    key={bg}
                    className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${idx === currentIndex ? "opacity-30 lg:opacity-40" : "opacity-0"
                        }`}
                >
                    <img
                        src={bg}
                        alt="Dynamic Real Estate Background"
                        className="w-full h-full object-cover animate-scroll-up-slow scale-110"
                        style={{
                            animationDuration: '120s',
                            filter: 'brightness(0.6) contrast(1.2)'
                        }}
                    />
                </div>
            ))}
            {/* Base noise/gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent,hsl(var(--background))_80%)] z-10" />
        </div>
    );
};

export default DynamicBackground;
