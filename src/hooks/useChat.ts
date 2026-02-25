import { useState, useCallback, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const API_BASE = "https://agents.toolhouse.ai/9c8ce16e-2444-4148-8e19-bea7545a6313";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const runIdRef = useRef<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const isFirstMessage = !runIdRef.current;
      const url = isFirstMessage ? API_BASE : `${API_BASE}/${runIdRef.current}`;
      const method = isFirstMessage ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      // Capture run ID from first request
      if (isFirstMessage) {
        const newRunId = response.headers.get("X-Toolhouse-Run-ID");
        if (newRunId) {
          runIdRef.current = newRunId;
        }
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content: "I apologize, but I encountered an error while searching for properties. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    runIdRef.current = null;
  }, []);

  return { messages, isLoading, sendMessage, resetChat };
}
