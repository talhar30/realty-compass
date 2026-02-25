import ReactMarkdown from "react-markdown";
import { Building2, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 animate-fade-up ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-secondary"
            : "bg-gradient-gold"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-secondary-foreground" />
        ) : (
          <Building2 className="w-4 h-4 text-primary-foreground" />
        )}
      </div>

      <div
        className={`flex-1 max-w-[85%] rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-secondary text-secondary-foreground rounded-tr-sm"
            : "glass-surface rounded-tl-sm"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose-chat text-sm">
            <ReactMarkdown>{content}</ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse-gold ml-1 rounded-sm" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
