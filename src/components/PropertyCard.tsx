import { MapPin, BedDouble, Bath, Square } from "lucide-react";

interface PropertyCardProps {
    image: string;
    price: string;
    title: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    tag?: string;
    onClick?: () => void;
}

const PropertyCard = ({ image, price, title, location, beds, baths, sqft, tag, onClick }: PropertyCardProps) => {
    return (
        <div
            className="group glass-surface rounded-2xl overflow-hidden hover:glow-gold transition-all duration-300 w-full cursor-pointer"
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />

                {tag && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider font-sans">
                        {tag}
                    </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <div className="font-display text-xl font-bold text-white drop-shadow-md">
                        {price}
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-sans tracking-wide truncate">{location}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div className="flex items-center justify-between text-muted-foreground font-sans">
                    <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-primary/70" />
                        <span className="text-xs font-medium">{beds} <span className="text-[10px] opacity-70">Beds</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-primary/70" />
                        <span className="text-xs font-medium">{baths} <span className="text-[10px] opacity-70">Baths</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Square className="w-4 h-4 text-primary/70" />
                        <span className="text-xs font-medium">{sqft} <span className="text-[10px] opacity-70">SqFt</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
