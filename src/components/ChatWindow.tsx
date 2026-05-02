"use client";
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { Trash2, Download, Sparkles, MessageSquare } from "lucide-react";

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "👋 Hey there! I'm Nexus, your AI support assistant.\n\nI'm powered by Llama 3.3 and ready to help you with anything. What can I do for you today?",
  timestamp: new Date(),
};

const QUICK_REPLIES = [
  "🚀 How do I get started?",
  "💳 I have a billing issue",
  "📦 Track my order",
  "🧑‍💼 Talk to a human",
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg]
            .filter((m) => m.role !== "system")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      }]);
    } catch (err) {
      setError("Connection failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([WELCOME]);

  const exportChat = () => {
    const text = messages.map((m) => `[${m.role.toUpperCase()}]\n${m.content}`).join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nexus-chat.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-2 text-white/30">
          <MessageSquare size={13} />
          <span className="text-xs font-mono">{messages.length - 1} messages</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={exportChat}
            className="p-2 rounded-xl text-white/25 hover:text-white/70 hover:bg-white/5 transition-all"
            title="Export">
            <Download size={13} />
          </button>
          <button onClick={clearChat}
            className="p-2 rounded-xl text-white/25 hover:text-[#FF6584] hover:bg-[#FF6584]/10 transition-all"
            title="Clear chat">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="flex justify-center">
            <span className="text-xs text-[#FF6584] font-mono glass px-4 py-2 rounded-xl border border-[#FF6584]/20">
              ⚠️ {error}
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={12} className="text-[#6C63FF]" />
            <span className="text-[10px] text-white/30 font-mono tracking-wider">QUICK ACTIONS</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                disabled={isLoading}
                className="glass text-xs text-white/60 hover:text-white hover:border-[#6C63FF]/40 hover:bg-[#6C63FF]/10 px-3 py-2.5 rounded-xl transition-all text-left border border-white/5"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}