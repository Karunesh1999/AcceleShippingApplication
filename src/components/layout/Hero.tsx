import { ArrowRight, Sparkles, Truck, BookOpen } from "lucide-react";
import { Button } from "../ui/button";

interface HeroProps {
  onBrowseCatalog: () => void;
  onCreateShipment: () => void;
}

export function Hero({ onBrowseCatalog, onCreateShipment }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/10">
      <div className="relative z-10 flex min-h-[210px] flex-col justify-between p-4 bg-gradient-to-r from-slate-950 via-[#0d1322] to-slate-950">
        {/* Top badge */}
        <div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur-md text-red-200">
            <Sparkles size={11} className="text-red-400 shrink-0" />
            35+ Years Mobile Electronics
          </span>
        </div>

        {/* Center content */}
        <div className="mt-2.5">
          <h2 className="text-lg font-extrabold tracking-tight leading-tight">
            Automotive Electronics &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#ed0b08]">
              Wholesale Fleet Dispatch
            </span>
          </h2>
          <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
            Official companion app: 5,000+ commercial cameras, AcceleVision displays, wiring manuals & live tracking.
          </p>

          <div className="mt-3.5 flex items-center gap-2">
            <Button
              variant="brand"
              size="sm"
              onClick={onBrowseCatalog}
              className="gap-1.5 font-bold shadow-md shadow-red-900/40 text-xs h-9 px-3.5"
            >
              Browse Catalog <ArrowRight size={13} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCreateShipment}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm text-xs h-9 px-3"
            >
              Ship Equipment
            </Button>
          </div>
        </div>

        {/* Quick Highlights / Metrics row */}
        <div className="mt-3.5 pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/10 text-red-400">
              <BookOpen size={13} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">5,000+ Items</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Wiring Schematics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/10 text-emerald-400">
              <Truck size={13} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Tier 1 Dealer</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Same-Day Dispatch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
