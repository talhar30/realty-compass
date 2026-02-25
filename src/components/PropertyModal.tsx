import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, BedDouble, Bath, Square, Calendar, Phone, Mail, Sparkles } from "lucide-react";

export interface PropertyDetails {
    image: string;
    price: string;
    title: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    tag?: string;
    platformUrl?: string;
}

interface PropertyModalProps {
    property: PropertyDetails | null;
    isOpen: boolean;
    onClose: () => void;
}

const PropertyModal = ({ property, isOpen, onClose }: PropertyModalProps) => {
    if (!property) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-card border-border/50 text-foreground gap-0 shadow-2xl z-50">
                <div className="relative h-72 w-full">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                    {property.tag && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-lg">
                            {property.tag}
                        </div>
                    )}

                    <div className="absolute bottom-4 left-6">
                        <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">
                            {property.price}
                        </h2>
                    </div>
                </div>

                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-bold flex items-center gap-2">
                            {property.title} <Sparkles className="w-5 h-5 text-primary" />
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground flex items-center gap-1.5 font-sans text-sm mt-1">
                            <MapPin className="w-4 h-4" />
                            {property.location}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-4 gap-4 py-6 border-y border-border/50 my-6">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <BedDouble className="w-6 h-6 text-primary" />
                            <span className="text-lg font-bold">{property.beds}</span>
                            <span className="text-xs text-muted-foreground font-sans uppercase">Beds</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <Bath className="w-6 h-6 text-primary" />
                            <span className="text-lg font-bold">{property.baths}</span>
                            <span className="text-xs text-muted-foreground font-sans uppercase">Baths</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <Square className="w-6 h-6 text-primary" />
                            <span className="text-lg font-bold">{property.sqft}</span>
                            <span className="text-xs text-muted-foreground font-sans uppercase">SqFt</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1">
                            <Calendar className="w-6 h-6 text-primary" />
                            <span className="text-lg font-bold lg:whitespace-nowrap">Built '22</span>
                            <span className="text-xs text-muted-foreground font-sans uppercase">Year</span>
                        </div>
                    </div>

                    <div className="flex gap-6 mb-8">
                        <div className="flex-1">
                            <p className="text-sm text-foreground/80 font-sans leading-relaxed mb-4">
                                This exceptional property offers a rare combination of modern luxury and perfect location.
                                Featuring high-end finishes throughout, an open-concept floor plan ideal for entertaining,
                                and breathtaking views. A true masterpiece ready for its next owner.
                            </p>
                        </div>
                        <div className="w-1/3 rounded-xl overflow-hidden glass-surface relative border border-white/5 flex items-center justify-center group cursor-pointer h-32">
                            <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/basic-v2/256/0/0/0.png')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 bg-background/20" />
                            <div className="z-10 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
                                <MapPin className="w-3 h-3 text-primary" /> View Map
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {property.platformUrl ? (
                            <a
                                href={property.platformUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl transition-all hover:opacity-90 hover:glow-gold flex items-center justify-center gap-2 font-sans"
                            >
                                <Phone className="w-4 h-4" />
                                Contact Agent on Original Listing
                            </a>
                        ) : (
                            <button className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl transition-all hover:opacity-90 hover:glow-gold flex items-center justify-center gap-2 font-sans">
                                <Phone className="w-4 h-4" />
                                Contact Agent
                            </button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PropertyModal;
