import { Bot, Zap, Shield } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={{
      background: "rgba(255,255,255,0.03)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
    }}>
      {/* Top gradient line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, #6C63FF, transparent)"
      }} />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "14px",
            background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(108,99,255,0.4)"
          }}>
            <Bot size={18} color="white" />
          </div>
          <div style={{
            position: "absolute", bottom: "-2px", right: "-2px",
            width: "12px", height: "12px", background: "#4ade80",
            borderRadius: "50%", border: "2px solid #080810"
          }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "16px", color: "white", lineHeight: 1 }}>
            Nexus <span style={{
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>AI</span>
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginTop: "3px", letterSpacing: "2px" }}>
            SUPPORT ASSISTANT
          </div>
        </div>
      </div>

      {/* Center badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "100px", padding: "6px 16px"
      }}>
        <Zap size={11} color="#00D4FF" />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
          llama-3.3-70b
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: "6px", height: "6px", background: "#4ade80",
            borderRadius: "50%", animation: "pulse 2s ease-in-out infinite"
          }} />
          <span style={{ fontSize: "12px", color: "#4ade80", fontFamily: "monospace" }}>Online</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px", padding: "6px 12px"
        }}>
          <Shield size={11} color="#6C63FF" />
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>Encrypted</span>
        </div>
      </div>
    </nav>
  );
}