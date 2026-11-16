import { useState } from "react";
import { X, Calculator, Truck, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-t-[2rem] sm:rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90dvh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Pull / Drag Indicator for Mobile */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-slate-50/70">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 bg-slate-50/70">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
              <Calculator size={19} />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ed0b08]">
                Rate Estimator
              </p>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950">
                Shipping Quote Calculator
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]">
          <form onSubmit={handleCalculate} className="space-y-3.5 sm:space-y-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Origin ZIP Code
                </label>
                <Input
                  value={originZip}
                  onChange={(e) => setOriginZip(e.target.value)}
                  placeholder="77081"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Destination ZIP Code
                </label>
                <Input
                  value={destZip}
                  onChange={(e) => setDestZip(e.target.value)}
                  placeholder="e.g. 90210"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Estimated Weight (lbs)
                </label>
                <Input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="5"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Package Packaging
                </label>
                <div className="relative">
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-8 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08] appearance-none"
                  >
                    <option value="box">Standard Electronics Box</option>
                    <option value="pallet">Commercial Bulk Pallet</option>
                    <option value="envelope">Padded Parts Mailer</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="brand" className="w-full font-bold h-11">
              Calculate Instant Quotes
            </Button>
          </form>

          {results && (
            <div className="mt-5 space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Available Shipping Options
              </h4>

              <div className="space-y-2.5">
                {/* Option 1: Ground */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 sm:p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-slate-100 text-slate-700 shrink-0">
                      <Truck size={17} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Accele Ground</p>
                      <p className="text-[11px] text-slate-400">3–5 Business Days</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base sm:text-lg font-black text-slate-900">${results.ground}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookShipment();
                      }}
                      className="text-xs font-bold text-[#ed0b08] hover:underline"
                    >
                      Select & Ship
                    </button>
                  </div>
                </div>

                {/* Option 2: 2-Day Air */}
                <div className="flex items-center justify-between rounded-xl border-2 border-red-500/80 bg-red-50/20 p-3.5 sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-[#ed0b08] text-white shrink-0">
                      <Sparkles size={17} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs sm:text-sm font-bold text-slate-900">Accele 2-Day</p>
                        <span className="rounded-full bg-[#ed0b08] px-1.5 py-0.2 text-[9px] font-bold text-white">
                          Popular
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">2 Business Days Guaranteed</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base sm:text-lg font-black text-[#ed0b08]">${results.priority}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookShipment();
                      }}
                      className="text-xs font-bold text-[#ed0b08] hover:underline"
                    >
                      Select & Ship
                    </button>
                  </div>
                </div>

                {/* Option 3: Overnight Express */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 sm:p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-slate-900 text-white shrink-0">
                      <Truck size={17} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Accele Next-Day Air</p>
                      <p className="text-[11px] text-slate-400">Next Morning by 10:30 AM</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base sm:text-lg font-black text-slate-900">${results.express}</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookShipment();
                      }}
                      className="text-xs font-bold text-[#ed0b08] hover:underline"
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
