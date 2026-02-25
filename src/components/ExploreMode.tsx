import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import PropertyCard from "./PropertyCard";
import PropertyModal, { PropertyDetails } from "./PropertyModal";
import { ChevronRight, Sparkles } from "lucide-react";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";

const featuredProperties = [
    { image: property3, price: "$4,500,000", title: "Paramount Penthouse", location: "Miami, FL", beds: 4, baths: 4.5, sqft: 3200, tag: "Exclusive", platformUrl: "https://www.zillow.com" },
    { image: property2, price: "$2,850,000", title: "Oceanfront Villa", location: "Malibu, CA", beds: 3, baths: 3, sqft: 2800, tag: "Trending", platformUrl: "https://www.realtor.com" },
    { image: property5, price: "$1,950,000", title: "Skyline Loft", location: "Manhattan, NY", beds: 2, baths: 2, sqft: 1800, tag: "New Listing", platformUrl: "https://www.redfin.com" },
    { image: property7, price: "$3,200,000", title: "Modern Estate", location: "Austin, TX", beds: 5, baths: 6, sqft: 4500, tag: "Price Drop", platformUrl: "https://www.trulia.com" },
];

const initialDiscover = [
    { image: property1, price: "$8,500/mo", title: "Luxury Condo", location: "Downtown LA, CA", beds: 2, baths: 2, sqft: 1500, platformUrl: "https://www.zillow.com" },
    { image: property4, price: "$12,000/mo", title: "Designer Home", location: "Beverly Hills, CA", beds: 4, baths: 3.5, sqft: 3100, platformUrl: "https://www.realtor.com" },
    { image: property6, price: "$950,000", title: "Mediterranean Gem", location: "Scottsdale, AZ", beds: 3, baths: 2.5, sqft: 2400, platformUrl: "https://www.redfin.com" },
    { image: property8, price: "$1,750,000", title: "Industrial Loft", location: "Chicago, IL", beds: 2, baths: 2, sqft: 2100, platformUrl: "https://www.trulia.com" },
];

const extraDiscover = [
    { image: property5, price: "$3,400,000", title: "High-Rise Haven", location: "Miami, FL", beds: 3, baths: 3.5, sqft: 2600, platformUrl: "https://www.zillow.com" },
    { image: property2, price: "$2,100,000", title: "Beachfront Bliss", location: "San Diego, CA", beds: 3, baths: 2, sqft: 1950, platformUrl: "https://www.realtor.com" },
    { image: property7, price: "$1,450,000", title: "Suburban Oasis", location: "Dallas, TX", beds: 4, baths: 3, sqft: 3200, platformUrl: "https://www.redfin.com" },
    { image: property3, price: "$5,200,000", title: "City Penthouse", location: "Seattle, WA", beds: 4, baths: 4, sqft: 4100, platformUrl: "https://www.trulia.com" },
];

const ExploreMode = () => {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
    });

    const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);
    const [discoverList, setDiscoverList] = useState(initialDiscover);
    const [hasMore, setHasMore] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");

    const handleLoadMore = () => {
        setDiscoverList((prev) => [...prev, ...extraDiscover]);
        setHasMore(false);
    };

    const filters = ["All", "Houses", "Condos", "For Rent"];

    const filteredDiscoverList = discoverList.filter((prop) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "For Rent") return prop.price.includes("/mo");
        if (activeFilter === "Condos") return prop.title.includes("Condo") || prop.title.includes("Loft") || prop.title.includes("Penthouse");
        if (activeFilter === "Houses") return prop.title.includes("Home") || prop.title.includes("Villa") || prop.title.includes("Estate") || prop.title.includes("Gem") || prop.title.includes("Oasis") || prop.title.includes("Haven");
        return true;
    });

    return (
        <>
            <div className="flex-1 overflow-y-auto w-full relative z-10 pb-20">
                <div className="max-w-6xl mx-auto px-6 py-6 space-y-12 animate-fade-up">

                    {/* Featured Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                <h2 className="font-display text-2xl font-bold text-foreground">Featured Properties</h2>
                            </div>
                            <button className="text-sm text-primary hover:text-primary/80 font-medium font-sans flex items-center gap-1 group">
                                View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-5 cursor-grab active:cursor-grabbing pb-4 pl-1 pt-1">
                                {featuredProperties.map((prop, idx) => (
                                    <div key={idx} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                                        <PropertyCard
                                            {...prop}
                                            onClick={() => setSelectedProperty(prop)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Discover Grid Section */}
                    <section>
                        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="font-display text-2xl font-bold text-foreground mb-1">Discover</h2>
                                <p className="text-muted-foreground font-sans text-sm">Explore curated listings based on your preferences</p>
                            </div>

                            {/* Filter Pills */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all whitespace-nowrap ${activeFilter === filter
                                                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                                                : "glass-surface text-muted-foreground hover:text-foreground hover:bg-white/10"
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredDiscoverList.map((prop, idx) => (
                                <PropertyCard
                                    key={`disc-${idx}`}
                                    {...prop}
                                    onClick={() => setSelectedProperty(prop)}
                                />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="glass-surface px-8 py-3 rounded-xl font-sans font-medium hover:bg-primary hover:text-primary-foreground hover:glow-gold transition-all duration-300"
                                >
                                    Load More Listings
                                </button>
                            </div>
                        )}
                    </section>

                </div>
            </div>

            <PropertyModal
                property={selectedProperty}
                isOpen={!!selectedProperty}
                onClose={() => setSelectedProperty(null)}
            />
        </>
    );
};

export default ExploreMode;
