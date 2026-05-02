import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden" style={{background: "#080810"}}>

      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)", top: "-100px", left: "-100px"}} />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", bottom: "-80px", right: "-80px"}} />
      <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{background: "radial-gradient(circle, rgba(255,101,132,0.06) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{backgroundImage: "linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px"}} />

      <Navbar />
      <ChatWindow />
    </div>
  );
}