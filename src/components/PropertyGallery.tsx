import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const images = [
  { src: property1, label: "Luxury Apartments" },
  { src: property2, label: "Beachfront Villas" },
  { src: property3, label: "City Penthouses" },
  { src: property4, label: "Family Homes" },
];

const PropertyGallery = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top-left */}
      <div className="absolute -top-10 -left-10 w-72 h-48 rounded-2xl overflow-hidden opacity-[0.07] rotate-[-8deg]">
        <img src={images[0].src} alt={images[0].label} className="w-full h-full object-cover" />
      </div>
      {/* Top-right */}
      <div className="absolute -top-6 -right-16 w-80 h-52 rounded-2xl overflow-hidden opacity-[0.06] rotate-[6deg]">
        <img src={images[1].src} alt={images[1].label} className="w-full h-full object-cover" />
      </div>
      {/* Bottom-left */}
      <div className="absolute -bottom-8 -left-14 w-72 h-48 rounded-2xl overflow-hidden opacity-[0.06] rotate-[5deg]">
        <img src={images[2].src} alt={images[2].label} className="w-full h-full object-cover" />
      </div>
      {/* Bottom-right */}
      <div className="absolute -bottom-12 -right-10 w-80 h-52 rounded-2xl overflow-hidden opacity-[0.07] rotate-[-4deg]">
        <img src={images[3].src} alt={images[3].label} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default PropertyGallery;
