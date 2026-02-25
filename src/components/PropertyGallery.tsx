import { useEffect, useState } from "react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";

const row1 = [
  { src: property1, label: "Luxury Apartments" },
  { src: property5, label: "City Skyline" },
  { src: property3, label: "City Penthouses" },
  { src: property7, label: "Family Homes" },
  { src: property1, label: "Luxury Apartments" },
  { src: property5, label: "City Skyline" },
  { src: property3, label: "City Penthouses" },
  { src: property7, label: "Family Homes" },
];

const row2 = [
  { src: property2, label: "Beachfront Villas" },
  { src: property6, label: "Mediterranean Villa" },
  { src: property4, label: "Modern Homes" },
  { src: property8, label: "Loft Living" },
  { src: property2, label: "Beachfront Villas" },
  { src: property6, label: "Mediterranean Villa" },
  { src: property4, label: "Modern Homes" },
  { src: property8, label: "Loft Living" },
];

const row3 = [
  { src: property3, label: "City Penthouses" },
  { src: property8, label: "Loft Living" },
  { src: property1, label: "Luxury Apartments" },
  { src: property6, label: "Mediterranean Villa" },
  { src: property3, label: "City Penthouses" },
  { src: property8, label: "Loft Living" },
  { src: property1, label: "Luxury Apartments" },
  { src: property6, label: "Mediterranean Villa" },
];

const PropertyGallery = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Gradient overlays for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />

      {/* Rolling rows container */}
      <div
        className="absolute inset-0 flex flex-col justify-center gap-4 transition-opacity duration-1000"
        style={{ opacity: mounted ? 0.12 : 0 }}
      >
        {/* Row 1 - scrolls left */}
        <div className="flex gap-4 animate-scroll-left">
          {row1.map((img, i) => (
            <div key={`r1-${i}`} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Row 2 - scrolls right */}
        <div className="flex gap-4 animate-scroll-right">
          {row2.map((img, i) => (
            <div key={`r2-${i}`} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Row 3 - scrolls left slower */}
        <div className="flex gap-4 animate-scroll-left-slow">
          {row3.map((img, i) => (
            <div key={`r3-${i}`} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-primary/20 animate-float-1 z-20" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/15 animate-float-2 z-20" />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-primary/20 animate-float-3 z-20" />
      <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 rounded-full bg-primary/25 animate-float-1 z-20" />
    </div>
  );
};

export default PropertyGallery;
