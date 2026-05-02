export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 msg-enter">
      <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center flex-shrink-0 glow-purple">
        <span className="text-sm">🤖</span>
      </div>
      <div className="glass-strong rounded-2xl rounded-bl-sm px-5 py-4">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF]"
              style={{
                animation: "bounce-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}