import { Building2, MapPin, DollarSign, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const suggestions = [
  {
    icon: MapPin,
    title: "Beach Vacation",
    desc: "Find a beachfront rental in Miami for a family trip",
  },
  {
    icon: Building2,
    title: "City Apartment",
    desc: "Search for a 2BR apartment to buy in Manhattan",
  },
  {
    icon: DollarSign,
    title: "Investment Property",
    desc: "Find rental properties with high ROI in Austin",
  },
  {
    icon: Users,
    title: "Group Stay",
    desc: "Book a large villa for a friend group in Bali",
  },
];

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const WelcomeScreen = ({ onSuggestionClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-up w-full max-w-2xl mx-auto">
      <div className="relative w-full mb-10 rounded-3xl overflow-hidden glow-gold shadow-2xl group">
        <img
          src={heroBg}
          alt="Luxury real estate"
          className="w-full h-56 object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground tracking-tight drop-shadow-md">
              Estate<span className="text-gradient-gold">AI</span>
            </h1>
            <p className="text-sm text-foreground/80 mt-1 font-sans tracking-wide max-w-xs drop-shadow">
              Your intelligent property concierge. Search the market via natural conversation.
            </p>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-sm text-center max-w-md mb-8 font-sans leading-relaxed">
        Describe your dream property. Include details like <span className="text-primary/90 font-medium">location, budget, vibe</span>, or <span className="text-primary/90 font-medium">special requirements</span> and I'll find the best matches.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(s.desc)}
            className="flex items-start gap-3 glass-surface rounded-xl p-4 text-left transition-all duration-300 hover:border-primary/40 hover:glow-gold hover:-translate-y-1 group bg-background/40"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground font-sans tracking-wide">{s.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-sans leading-snug">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
