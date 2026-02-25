import { useState, useEffect } from "react";
import { ExternalLink, Home } from "lucide-react";

interface LinkPreviewCardProps {
    url: string;
}

interface PreviewData {
    title?: string;
    description?: string;
    image?: { url: string };
    url?: string;
}

const LinkPreviewCard = ({ url }: LinkPreviewCardProps) => {
    const [data, setData] = useState<PreviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
                const result = await response.json();

                if (result.status === "success" && result.data) {
                    setData(result.data);
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPreview();
    }, [url]);

    if (loading) {
        return (
            <div className="w-full max-w-sm h-32 rounded-xl glass-surface animate-pulse flex items-center justify-center border border-white/5 my-4">
                <Home className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                {url} <ExternalLink className="w-3 h-3" />
            </a>
        );
    }

    return (
        <a
            href={data.url || url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-sm rounded-xl overflow-hidden glass-surface hover:glow-gold transition-all duration-300 border border-white/10 my-4 group no-underline"
        >
            {data.image?.url && (
                <div className="h-40 w-full overflow-hidden relative">
                    <img
                        src={data.image.url}
                        alt={data.title || "Property Preview"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>
            )}
            <div className="p-4 relative">
                <h4 className="font-display font-bold text-foreground line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors pr-6">
                    {data.title || "View Property Listing"}
                </h4>
                {data.description && (
                    <p className="text-xs text-muted-foreground font-sans line-clamp-2 mb-3">
                        {data.description}
                    </p>
                )}
                <div className="mt-auto pt-2 border-t border-white/5 flex items-center text-xs text-primary font-medium uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
                    View Full Details <ExternalLink className="w-3 h-3" />
                </div>
            </div>
        </a>
    );
};

export default LinkPreviewCard;
