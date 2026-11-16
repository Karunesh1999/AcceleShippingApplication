import { useState } from "react";
import { X, CalendarClock, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SchedulePickupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulePickupModal({ isOpen, onClose }: SchedulePickupModalProps) {
  const [scheduled, setScheduled] = useState(false);
  const [warehouse, setWarehouse] = useState("Houston Hub (4810 Westpark Dr)");
  const [date, setDate] = useState("2026-11-17");
  const [timeWindow, setTimeWindow] = useState("morning");
  const [packageCount, setPackageCount] = useState("3");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-[1.75rem] bg-white shadow-2xl border-t border-slate-200 max-h-[88%] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Mobile Sheet Handle */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-50/80 shrink-0">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
              <CalendarClock size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                Courier Sweep
              </p>
              <h2 className="text-base font-bold tracking-tight text-slate-950">
                Schedule Warehouse Pickup
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-3.5 overflow-y-auto overscroll-contain space-y-3.5 flex-1 min-h-0 pb-[max(16px,env(safe-area-inset-bottom))]">
          {scheduled ? (
            <div className="rounded-xl bg-emerald-50 p-5 text-center text-emerald-800 border border-emerald-200/60 animate-in fade-in">
              <CheckCircle2 size={28} className="mx-auto text-emerald-600 mb-1.5" />
              <h4 className="text-sm font-bold">Pickup Confirmed!</h4>
              <p className="text-xs text-emerald-700 mt-1">
                A courier route unit has been assigned for {date} during the {timeWindow} window.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Pickup Location / Facility
                </label>
                <select
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className="flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                >
                  <option value="Houston Hub (4810 Westpark Dr)">
                    Houston Hub (4810 Westpark Dr, TX)
                  </option>
                  <option value="La Mirada Branch (14500 Firestone Blvd)">
                    La Mirada Outfitting (14500 Firestone Blvd, CA)
                  </option>
                  <option value="Richmond Annex (220 Commerce Way)">
                    Richmond Regional (220 Commerce Way, VA)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Pickup Date
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="h-8.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value)}
                    className="flex h-8.5 w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                  >
                    <option value="morning">Morning (9 AM–12 PM)</option>
                    <option value="afternoon">Afternoon (1 PM–4:30 PM)</option>
                    <option value="evening">Late Sweep (4:30 PM–6 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Estimated Number of Boxes / Pallets
                </label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={packageCount}
                  onChange={(e) => setPackageCount(e.target.value)}
                  required
                  className="h-8.5 text-xs"
                />
              </div>

              <Button type="submit" variant="brand" className="w-full font-bold h-9 text-xs">
                <Truck size={14} /> Confirm Fleet Pickup
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
