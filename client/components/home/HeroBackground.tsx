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
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-brand-dark" />

      {/* Static orb 1 — gold, top right */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgb(212,175,55) 0%, transparent 70%)",
          top: "-10%",
          right: "5%",
          filter: "blur(80px)",
        }}
      />

      {/* Static orb 2 — dark teal, bottom left */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgb(20,41,40) 0%, rgb(6,29,27) 50%, transparent 70%)",
          bottom: "-5%",
          left: "10%",
          filter: "blur(60px)",
        }}
      />

      {/* Static orb 3 — subtle gold mid */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgb(160,128,20) 0%, transparent 70%)",
          top: "30%",
          left: "25%",
          filter: "blur(100px)",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mouse-driven spotlight — moves only on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(212, 175, 55, 0.10) 0%,
            rgba(212, 175, 55, 0.04) 35%,
            transparent 60%
          )`,
        }}
      />

      {/* Dark vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,29,27,0.7) 100%)",
        }}
      />
    </div>
  );
}
