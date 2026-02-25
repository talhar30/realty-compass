import { useRef, useEffect } from "react";
import { RotateCcw, Building2 } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import LoadingIndicator from "@/components/LoadingIndicator";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, isLoading, sendMessage, resetChat } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground leading-tight">
              Estate<span className="text-gradient-gold">AI</span>
            </h1>
            <p className="text-xs text-muted-foreground font-sans">Property Concierge</p>
          </div>
        </div>
        {hasMessages && (
          <button
            onClick={resetChat}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
          >
            <RotateCcw className="w-4 h-4" />
            New Search
          </button>
        )}
      </header>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <WelcomeScreen onSuggestionClick={sendMessage} />
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
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
      <div className="flex-shrink-0 max-w-3xl mx-auto w-full px-4 pb-5 pt-2">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
        <p className="text-center text-xs text-muted-foreground mt-3 font-sans">
          EstateAI searches real listings to find your perfect property
        </p>
      </div>
    </div>
  );
};

export default Index;
