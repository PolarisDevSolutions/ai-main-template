import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;
    let rafId: number;
    let active = false;

    // Listen on the window so mouse position is tracked even over text/form
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!active) {
        active = true;
        animate();
      }
    };

    // Lerp toward target for smooth following
    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.07;
      currentY += dy * 0.07;
      container.style.setProperty("--mouse-x", `${currentX.toFixed(2)}%`);
      container.style.setProperty("--mouse-y", `${currentY.toFixed(2)}%`);
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        active = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-brand-dark" />

      {/* Static orb 1 — gold, top right */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgb(212,175,55) 0%, transparent 70%)",
          top: "-5%",
          right: "8%",
          filter: "blur(70px)",
        }}
      />

      {/* Static orb 2 — teal, bottom left */}
      <div
        className="absolute w-[260px] h-[260px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgb(20,60,55) 0%, transparent 70%)",
          bottom: "-5%",
          left: "12%",
          filter: "blur(60px)",
        }}
      />

      {/* Static orb 3 — subtle gold centre-left */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-12"
        style={{
          background: "radial-gradient(circle, rgb(160,128,20) 0%, transparent 70%)",
          top: "35%",
          left: "20%",
          filter: "blur(80px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Smooth mouse spotlight — always pointer-events-none */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            320px circle at var(--mouse-x) var(--mouse-y),
            rgba(212, 175, 55, 0.09) 0%,
            rgba(212, 175, 55, 0.03) 45%,
            transparent 65%
          )`,
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(6,29,27,0.65) 100%)",
        }}
      />
    </div>
  );
}
