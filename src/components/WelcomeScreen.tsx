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
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-md mb-8 rounded-2xl overflow-hidden glow-gold">
        <img
          src={heroBg}
          alt="Luxury real estate cityscape at golden hour"
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Estate<span className="text-gradient-gold">AI</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your intelligent property concierge
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm text-center max-w-sm mb-8 font-sans">
        Tell me what you're looking for — location, budget, vibe, and any special needs. I'll find and compare the best real listings for you.
      </p>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {suggestions.map((s) => (
          <button
            key={s.title}
            onClick={() => onSuggestionClick(s.desc)}
            className="glass-surface rounded-xl p-4 text-left transition-all hover:border-primary/40 hover:glow-gold group"
          >
            <s.icon className="w-5 h-5 text-primary mb-2 transition-transform group-hover:scale-110" />
            <p className="text-sm font-medium text-foreground font-sans">{s.title}</p>
            <p className="text-xs text-muted-foreground mt-1 font-sans">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
