import { useEffect, useState } from "react";
import { ShieldCheck, Truck } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation over 2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-slate-950 text-white select-none overflow-hidden safe-top safe-bottom">
      {/* Background radial glow & pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(237,11,8,0.18)_0%,rgba(2,6,23,0.95)_70%)]" />

      {/* Subtle grid background texture */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top indicator */}
      <div className="relative z-10 pt-8 sm:pt-12 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300 backdrop-blur-md">

          Fleet Logistics Network
        </span>
      </div>

      {/* Center Brand & Emblem */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md animate-in fade-in zoom-in-95 duration-500">
        {/* Glowing emblem container */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-3xl bg-[#ed0b08]/30 blur-2xl animate-pulse" />
          <div className="relative grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900 to-slate-950 p-4 shadow-2xl">
            <img
              src="/assets/accele-mark.png"
              alt="Accele Mark"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(237,11,8,0.6)]"
              onError={(e) => {
                // fallback if image not found
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Brand Full Logo */}
        <img
          src="/assets/accele-logo.png"
          alt="Accele Electronics"
          className="h-8 sm:h-10 w-auto object-contain drop-shadow-md"
        />

        <h1 className="mt-3 text-sm sm:text-base font-bold tracking-tight text-slate-300">
          Automotive Safety & 12V Logistics Portal
        </h1>

        <p className="mt-1 text-xs text-slate-500 font-medium">
          30+ Years of Commercial Equipment Innovation
        </p>

        {/* Animated Loading Bar */}
        <div className="mt-8 w-60 sm:w-72">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-[#ed0b08] to-red-400 rounded-full transition-all duration-150 shadow-[0_0_12px_#ed0b08]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500 font-medium">
            <span>CONNECTING DISPATCH TELEMATICS...</span>
            <span className="text-red-400 font-bold">{Math.min(progress, 100)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer & Skip Action */}
      <div className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-3">
        <button
          onClick={onComplete}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer"
        >
          Skip Intro →
        </button>

        <p className="text-[10px] text-slate-600 tracking-wider">
          © 2026 Accele Electronics, Inc. · Commercial Division
        </p>
      </div>
    </div>
  );
}
