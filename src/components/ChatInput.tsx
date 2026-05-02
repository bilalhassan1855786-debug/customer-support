"use client";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Send, Mic, Paperclip } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 flex-shrink-0 relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="glass-strong rounded-2xl px-4 py-3 flex items-end gap-3 focus-within:border-[#6C63FF]/40 transition-all duration-300">
        {/* Left icons */}
        <button
          aria-label="Attach file"
          className="text-white/20 hover:text-white/50 transition-colors mb-0.5 flex-shrink-0"
        >
          <Paperclip size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-white placeholder-white/20 text-sm resize-none outline-none leading-relaxed"
          style={{ maxHeight: "120px", fontFamily: "'Outfit', sans-serif" }}
        />

        {/* Right icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            aria-label="Voice input"
            className="text-white/20 hover:text-[#00D4FF] transition-colors mb-0.5"
          >
            <Mic size={16} />
          </button>

          <button
            onClick={handleSend}
            disabled={disabled || !text.trim()}
            aria-label="Send message"
            className="btn-primary w-9 h-9 rounded-xl flex items-center justify-center text-white"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-white/15 font-mono mt-2 tracking-wider">
        ENTER TO SEND · SHIFT+ENTER FOR NEW LINE
      </p>
    </div>
  );
}