import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-brand-dark" />

      {/* Ambient orb 1 — gold */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-[orb1_18s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, rgb(212,175,55) 0%, transparent 70%)",
          top: "-10%",
          right: "5%",
          filter: "blur(80px)",
          animation: "orb1 18s ease-in-out infinite",
        }}
      />

      {/* Ambient orb 2 — dark green */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgb(6,29,27) 0%, rgb(20,41,40) 50%, transparent 70%)",
          bottom: "-5%",
          left: "10%",
          filter: "blur(60px)",
          animation: "orb2 22s ease-in-out infinite",
        }}
      />

      {/* Ambient orb 3 — subtle gold mid */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgb(160,128,20) 0%, transparent 70%)",
          top: "30%",
          left: "25%",
          filter: "blur(100px)",
          animation: "orb3 26s ease-in-out infinite",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Spotlight cursor overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            rgba(212, 175, 55, 0.08) 0%,
            rgba(212, 175, 55, 0.03) 30%,
            transparent 60%
          )`,
        }}
      />

      {/* Dark vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(6,29,27,0.6) 100%)",
        }}
      />

      <style>{`
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.08); }
          66% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(50px, -40px) scale(1.1); }
          70% { transform: translate(-30px, 20px) scale(0.92); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(30px, 50px) scale(1.05); }
          60% { transform: translate(-50px, -30px) scale(0.98); }
        }
      `}</style>
    </div>
  );
}
