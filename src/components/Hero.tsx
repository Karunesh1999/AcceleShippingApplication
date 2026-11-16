import { ArrowRight, Sparkles, Truck, Clock } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  onCreateShipment: () => void;
  onTrackShipment: () => void;
}

export function Hero({ onCreateShipment, onTrackShipment }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/10">
      {/* Background visual with subtle gradient */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="/assets/accele-hero.jpg"
          alt="Accele Fleet Logistics"
          className="h-full w-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[220px] flex-col justify-between p-4 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent">
        {/* Top badge */}
        <div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur-md text-red-200">
            <Sparkles size={11} className="text-red-400 shrink-0" />
            30+ Years Quality
          </span>
        </div>

        {/* Center content */}
        <div className="mt-3">
          <h2 className="text-lg font-extrabold tracking-tight leading-tight">
            Commercial Grade Electronics.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#ed0b08]">
              Precision Fast Shipping.
            </span>
          </h2>
          <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed">
            Priority dispatch for commercial cameras, mobile video, and 12V harnesses.
          </p>

          <div className="mt-3.5 flex items-center gap-2">
            <Button
              variant="brand"
              size="sm"
              onClick={onCreateShipment}
              className="gap-1.5 font-bold shadow-md shadow-red-900/40 text-xs h-9 px-3.5"
            >
              Ship Now <ArrowRight size={13} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onTrackShipment}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm text-xs h-9 px-3"
            >
              Track
            </Button>
          </div>
        </div>

        {/* Quick Highlights / Metrics row */}
        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-red-400">
              <Truck size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">99.8%</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">On-Time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-emerald-400">
              <Clock size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Same-Day</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Cutoff 4 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
