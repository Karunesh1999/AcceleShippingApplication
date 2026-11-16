import { ArrowRight, ShieldCheck, Sparkles, Truck, Clock } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  onCreateShipment: () => void;
  onTrackShipment: () => void;
}

export function Hero({ onCreateShipment, onTrackShipment }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-900/10">
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

      <div className="relative z-10 flex min-h-[250px] sm:min-h-[290px] flex-col justify-between p-5 sm:p-8 lg:p-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent">
        {/* Top badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] backdrop-blur-md text-red-200">
            <Sparkles size={12} className="text-red-400 shrink-0" />
            30+ Years Automotive Quality
          </span>
        </div>

        {/* Center content */}
        <div className="mt-4 sm:mt-6 max-w-xl">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.18] sm:leading-[1.15]">
            Commercial Grade Electronics.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#ed0b08]">
              Precision Fast Shipping.
            </span>
          </h1>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
            Direct tracking and priority dispatch for commercial cameras, mobile video, power harnesses, and automotive accessories.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3">
            <Button
              variant="brand"
              size="lg"
              onClick={onCreateShipment}
              className="gap-2.5 font-bold shadow-lg shadow-red-900/40 text-xs sm:text-sm w-full xs:w-auto justify-center"
            >
              Start New Shipment <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onTrackShipment}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm text-xs sm:text-sm w-full xs:w-auto justify-center"
            >
              Quick Track
            </Button>
          </div>
        </div>

        {/* Quick Highlights / Metrics row */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-red-400">
              <Truck size={17} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">99.8%</p>
              <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider">On-Time Fleet</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-400">
              <Clock size={17} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">Same-Day</p>
              <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider">Cutoff 4 PM</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">100% Insured</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Accele Cargo Care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
