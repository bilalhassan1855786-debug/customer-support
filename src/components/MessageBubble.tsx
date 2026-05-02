"use client";
import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { Bot, User, Copy, Check } from "lucide-react";

interface Props { message: Message; }

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTime(new Date(message.timestamp).toLocaleTimeString([], {
      hour: "2-digit", minute: "2-digit",
    }));
  }, [message.timestamp]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-end gap-3 msg-enter group ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
        isUser
          ? "bg-gradient-to-br from-[#FF6584] to-[#6C63FF]"
          : "bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] glow-purple"
      }`}>
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      <div className={`max-w-[78%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        {/* Name */}
        <span className="text-[10px] text-white/25 font-mono px-1">
          {isUser ? "You" : "Nexus AI"}
        </span>

        {/* Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-[#6C63FF] to-[#5B54E8] text-white rounded-br-sm shadow-lg glow-purple"
            : "glass-strong text-white/85 rounded-bl-sm"
        }`}>
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute -top-2 -right-2 w-6 h-6 glass rounded-lg items-center justify-center text-white/40 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden sm:flex"
          >
            {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
          </button>

          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Time */}
        <span className="text-[10px] text-white/20 font-mono px-1">{time}</span>
      </div>
    </div>
  );
}