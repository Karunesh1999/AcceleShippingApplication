import { X, Check, Truck, BookOpen, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { Product } from "../../data/products";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderOrShip: (product: Product) => void;
  onViewManual?: (model: string) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onOrderOrShip,
  onViewManual,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-[1.75rem] bg-white shadow-2xl border-t border-slate-200 max-h-[90%] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Mobile Sheet Handle */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-50/80 shrink-0">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/70 shrink-0">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                {product.brand}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-mono font-bold text-slate-500">
                PN: {product.partNumber}
              </span>
            </div>
            <h2 className="text-base font-bold tracking-tight text-slate-950 mt-0.5 truncate">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto overscroll-contain space-y-4 flex-1 min-h-0">
          {/* Price & Dealer Advantage Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 p-4 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  Tier 1 Dealer Wholesale
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-white">
                    ${product.dealerPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    MSRP ${product.msrp.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30">
                  Save ${(product.msrp - product.dealerPrice).toFixed(0)} ({Math.round(((product.msrp - product.dealerPrice) / product.msrp) * 100)}%)
                </span>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                  <Check size={12} className="text-emerald-400" /> {product.leadTime}
                </p>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Overview & Application
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Cpu size={14} className="text-[#ed0b08]" />
              Engineering Specifications
            </h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 text-xs bg-white odd:bg-slate-50/50"
                >
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="font-bold text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-3 py-2 text-xs bg-white">
                <span className="text-slate-500 font-medium">Weight & Dimensions</span>
                <span className="font-bold text-slate-900 text-right">
                  {product.weight} · {product.dimensions}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Wiring Guidance */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs mb-1">
              <BookOpen size={13} />
              <span>Installer Wiring Note</span>
            </div>
            <p className="text-[11px] text-amber-900 font-mono leading-tight">
              {product.wiringNotes}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center justify-between gap-2.5 shrink-0">
          {onViewManual && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onViewManual(product.partNumber);
              }}
              className="text-xs h-9 gap-1.5"
            >
              <BookOpen size={14} />
              <span>Wiring Guide</span>
            </Button>
          )}

          <Button
            type="button"
            variant="brand"
            size="sm"
            onClick={() => {
              onClose();
              onOrderOrShip(product);
            }}
            className="flex-1 font-bold text-xs h-9 gap-1.5 shadow-sm shadow-red-500/20"
          >
            <Truck size={14} />
            <span>Create Dispatch Order</span>
            <ArrowRight size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
}
