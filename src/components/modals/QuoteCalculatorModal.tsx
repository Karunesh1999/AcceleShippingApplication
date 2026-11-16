import { useState } from "react";
import { X, Calculator, Truck, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookShipment: () => void;
}

export function QuoteCalculatorModal({
  isOpen,
  onClose,
  onBookShipment,
}: QuoteCalculatorModalProps) {
  const [originZip, setOriginZip] = useState("77081");
  const [destZip, setDestZip] = useState("");
  const [weight, setWeight] = useState("5");
  const [packageType, setPackageType] = useState("box");
  const [results, setResults] = useState<null | {
    ground: number;
    priority: number;
    express: number;
  }>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight) || 5;
    const baseGround = 12.0 + w * 1.5;
    const basePriority = 22.0 + w * 2.1;
    const baseExpress = 40.0 + w * 3.5;

    setResults({
      ground: parseFloat(baseGround.toFixed(2)),
      priority: parseFloat(basePriority.toFixed(2)),
      express: parseFloat(baseExpress.toFixed(2)),
    });
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
        {/* iOS Pull / Drag Indicator for Mobile */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-50/80 shrink-0">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
              <Calculator size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                Rate Estimator
              </p>
              <h2 className="text-base font-bold tracking-tight text-slate-950">
                Shipping Quote Calculator
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

        <div className="p-3.5 overflow-y-auto overscroll-contain space-y-4 flex-1 min-h-0 pb-[max(16px,env(safe-area-inset-bottom))]">
          <form onSubmit={handleCalculate} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Origin ZIP
                </label>
                <Input
                  value={originZip}
                  onChange={(e) => setOriginZip(e.target.value)}
                  placeholder="77081"
                  required
                  className="h-8.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Dest ZIP
                </label>
                <Input
                  value={destZip}
                  onChange={(e) => setDestZip(e.target.value)}
                  placeholder="e.g. 90210"
                  required
                  className="h-8.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Weight (lbs)
                </label>
                <Input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="5"
                  required
                  className="h-8.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Packaging
                </label>
                <div className="relative">
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="flex h-8.5 w-full rounded-xl border border-slate-200 bg-white px-2.5 pr-7 py-1 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08] appearance-none"
                  >
                    <option value="box">Box</option>
                    <option value="pallet">Bulk Pallet</option>
                    <option value="envelope">Padded Mailer</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="brand" className="w-full font-bold h-9 text-xs">
              Calculate Instant Quotes
            </Button>
          </form>

          {results && (
            <div className="mt-4 space-y-2.5 pt-3 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Available Shipping Options
              </h4>

              <div className="space-y-2">
                {/* Option 1: Ground */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-2.5 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-700 shrink-0">
                      <Truck size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Accele Ground</p>
                      <p className="text-[10px] text-slate-400">3–5 Business Days</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-slate-900">${results.ground}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookShipment();
                      }}
                      className="text-[11px] font-bold text-[#ed0b08] hover:underline"
                    >
                      Select & Ship
                    </button>
                  </div>
                </div>

                {/* Option 2: 2-Day Air */}
                <div className="flex items-center justify-between rounded-xl border-2 border-red-500/80 bg-red-50/20 p-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#ed0b08] text-white shrink-0">
                      <Truck size={15} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-slate-900">Accele 2-Day</p>
                        <span className="rounded-full bg-[#ed0b08] px-1 py-0.2 text-[8px] font-bold text-white">
                          Popular
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">2 Business Days</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-[#ed0b08]">${results.priority}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookShipment();
                      }}
                      className="text-[11px] font-bold text-[#ed0b08] hover:underline"
                    >
                      Select & Ship
                    </button>
                  </div>
                </div>

                {/* Option 3: Overnight Express */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-2.5 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-white shrink-0">
                      <Truck size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Accele Next-Day</p>
                      <p className="text-[10px] text-slate-400">Next Morning by 10:30 AM</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-slate-900">${results.express}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookShipment();
                      }}
                      className="text-[11px] font-bold text-[#ed0b08] hover:underline"
                    >
                      Select & Ship
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
