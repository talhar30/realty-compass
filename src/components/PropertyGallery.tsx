import { useEffect, useState } from "react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";

// Duplicate and shuffle for continuous seamless scrolling
const images = [
  property1, property2, property3, property4,
  property5, property6, property7, property8
];

const getColumnImages = (offset: number) => {
  const col = [...images];
  for (let i = 0; i < offset; i++) {
    col.push(col.shift()!);
  }
  // Double up to ensure seamless scroll
  return [...col, ...col, ...col];
};

const col1 = getColumnImages(0);
const col2 = getColumnImages(3);
const col3 = getColumnImages(5);
const col4 = getColumnImages(1);
const col5 = getColumnImages(6);
const col6 = getColumnImages(2);
const col7 = getColumnImages(4);

const PropertyGallery = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 perspective-[1000px]">
      {/* Soft gradient mask for edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,hsl(var(--background))_80%)] z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10" />

      {/* Isometric 3D Container */}
      <div
        className="absolute w-[150vw] h-[150vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] flex justify-center gap-6 transition-opacity duration-1000"
        style={{
          opacity: mounted ? 0.2 : 0,
          transform: `translate(-50%, -45%) rotateX(60deg) rotateZ(-35deg) scale(1.15)`,
          transformOrigin: "center center",
        }}
      >
        {/* Column 1 - scrolls up */}
        <div className="flex flex-col gap-6 -mt-[20vh] h-max animate-scroll-up-slow">
          {col1.map((src, i) => (
            <div key={`c1-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Column 2 - scrolls down */}
        <div className="flex flex-col gap-6 -mt-[40vh] h-max animate-scroll-down">
          {col2.map((src, i) => (
            <div key={`c2-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Column 3 - scrolls up */}
        <div className="flex flex-col gap-6 h-max animate-scroll-up">
          {col3.map((src, i) => (
            <div key={`c3-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Column 4 - scrolls down */}
        <div className="flex flex-col gap-6 -mt-[30vh] h-max animate-scroll-down-slow">
          {col4.map((src, i) => (
            <div key={`c4-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Column 5 - scrolls up */}
        <div className="flex flex-col gap-6 -mt-[10vh] h-max animate-scroll-up">
          {col5.map((src, i) => (
            <div key={`c5-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Column 6 - scrolls down */}
        <div className="flex flex-col gap-6 -mt-[50vh] h-max animate-scroll-down">
          {col6.map((src, i) => (
            <div key={`c6-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Column 7 - scrolls up */}
        <div className="flex flex-col gap-6 -mt-[5vh] h-max animate-scroll-up-slow">
          {col7.map((src, i) => (
            <div key={`c7-${i}`} className="w-56 h-72 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
              <img src={src} className="w-full h-full object-cover" loading="lazy" alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles remain */}
      <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-primary/30 animate-float-1 z-20 shadow-[0_0_10px_hsl(var(--primary))]" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-primary/20 animate-float-2 z-20 shadow-[0_0_10px_hsl(var(--primary))]" />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-primary/30 animate-float-3 z-20 shadow-[0_0_10px_hsl(var(--primary))]" />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-primary/40 animate-float-1 z-20 shadow-[0_0_8px_hsl(var(--primary))]" />
    </div>
  );
};

export default PropertyGallery;
