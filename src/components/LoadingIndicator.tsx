const LoadingIndicator = () => {
  return (
    <div className="flex gap-4 animate-fade-up">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center">
        <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
      </div>
      <div className="glass-surface rounded-2xl rounded-tl-sm px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-gold" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-gold" style={{ animationDelay: "300ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-gold" style={{ animationDelay: "600ms" }} />
          </div>
          <span className="text-sm text-muted-foreground font-sans">Searching properties...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
