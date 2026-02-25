import { useRef, useEffect, useState } from "react";
import { RotateCcw, Building2, MessageSquare, ClipboardList, Compass } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import LoadingIndicator from "@/components/LoadingIndicator";
import WelcomeScreen from "@/components/WelcomeScreen";
import PropertyProfiler from "@/components/PropertyProfiler";
import DynamicBackground from "@/components/DynamicBackground";
import ExploreMode from "@/components/ExploreMode";
import { useChat } from "@/hooks/useChat";

type Mode = "chat" | "profiler" | "explore";

const Index = () => {
  const { messages, isLoading, sendMessage, resetChat } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("chat");

  useEffect(() => {
    if (scrollRef.current && mode === "chat") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, mode]);

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex flex-col h-screen bg-transparent overflow-hidden selection:bg-primary/30">
      <DynamicBackground />

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/5 bg-background/60 backdrop-blur-xl z-20 shadow-sm">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setMode("explore")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
            <Building2 className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-tight tracking-wide">
              Estate<span className="text-gradient-gold">AI</span>
            </h1>
            <p className="text-[10px] uppercase text-muted-foreground font-sans tracking-widest font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Concierge
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-1 glass-surface rounded-xl p-1.5 shadow-inner">
          <button
            onClick={() => setMode("explore")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold transition-all duration-300 ${mode === "explore"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            <Compass className="w-4 h-4" />
            Explore
          </button>
          <button
            onClick={() => setMode("chat")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold transition-all duration-300 ${mode === "chat"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={() => setMode("profiler")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold transition-all duration-300 ${mode === "profiler"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            <ClipboardList className="w-4 h-4" />
            Profiler
          </button>
        </div>

        <div className="w-[120px] flex justify-end">
          {mode === "chat" && hasMessages && (
            <button
              onClick={resetChat}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all font-sans"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </header>

      {mode === "chat" && (
        <>
          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
            {!hasMessages ? (
              <WelcomeScreen onSuggestionClick={sendMessage} />
            ) : (
              <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    isStreaming={isLoading && msg.role === "assistant" && msg.id === messages[messages.length - 1]?.id}
                  />
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <LoadingIndicator />
                )}
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex-shrink-0 max-w-3xl mx-auto w-full px-4 pb-6 pt-2 relative z-20">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            <p className="text-center text-[11px] text-muted-foreground/70 mt-3 font-sans tracking-wide">
              EstateAI searches real listings to find your perfect property. AI accuracy may vary.
            </p>
          </div>
        </>
      )}

      {mode === "profiler" && <PropertyProfiler />}

      {mode === "explore" && <ExploreMode />}
    </div>
  );
};

export default Index;
