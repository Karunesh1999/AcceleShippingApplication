import { useState } from "react";
import {
  X,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  Printer,
  Check,
} from "lucide-react";
import { Shipment } from "../types";
import { Button } from "./ui/button";

interface ShipmentDetailModalProps {
  shipment: Shipment | null;
  onClose: () => void;
  onCopyId: (id: string) => void;
}

export function ShipmentDetailModal({
  shipment,
  onClose,
  onCopyId,
}: ShipmentDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [printed, setPrinted] = useState(false);

  if (!shipment) return null;

  const isDelivered = shipment.status === "Delivered";

  const handleCopy = () => {
    onCopyId(shipment.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    setPrinted(true);
    setTimeout(() => setPrinted(false), 2500);
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

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/70 shrink-0">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                {shipment.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-mono font-medium text-slate-500">
                #{shipment.id}
              </span>
            </div>
            <h2 className="text-base font-bold tracking-tight text-slate-950 mt-0.5 truncate">
              {shipment.item}
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
        <div className="p-3.5 overflow-y-auto overscroll-contain space-y-4 flex-1 min-h-0">
          {/* Status Banner */}
          <div className="rounded-xl bg-slate-950 p-3.5 text-white">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Current Status
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isDelivered ? "bg-emerald-400" : "bg-red-500 animate-pulse"
                    }`}
                  />
                  <h3 className="text-sm font-bold">{shipment.status}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Estimated Arrival
                </p>
                <p className="text-xs font-bold text-red-300 mt-0.5">
                  {shipment.eta}
                </p>
              </div>
            </div>

            {/* Visual Route */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-white text-[11px] truncate">{shipment.from.city}, {shipment.from.state}</p>
                  <p className="text-[9px] text-slate-400 truncate">{shipment.from.name || "Origin Hub"}</p>
                </div>
                <div className="px-2 flex items-center justify-center gap-1 text-slate-400 shrink-0">
                  <span className="h-px w-4 bg-white/20" />
                  <Truck size={14} className="text-red-400" />
                  <span className="h-px w-4 bg-white/20" />
                </div>
                <div className="text-right min-w-0">
                  <p className="font-semibold text-white text-[11px] truncate">{shipment.to.city}, {shipment.to.state}</p>
                  <p className="text-[9px] text-slate-400 truncate">{shipment.to.name || "Destination"}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full rounded-full ${
                    isDelivered ? "bg-emerald-400" : "bg-[#ed0b08]"
                  }`}
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Key Package Specifications - 2x2 compact grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
              <p className="text-[10px] font-medium text-slate-400">Carrier Service</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{shipment.service}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
              <p className="text-[10px] font-medium text-slate-400">Weight</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{shipment.weight}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
              <p className="text-[10px] font-medium text-slate-400">Dimensions</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                {shipment.dimensions || "10 x 8 x 5 in"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
              <p className="text-[10px] font-medium text-slate-400">Declared Value</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                ${shipment.declaredValue ? shipment.declaredValue.toFixed(2) : "199.00"}
              </p>
            </div>
          </div>

          {/* Addresses Detail - Stacked single column */}
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="rounded-xl border border-slate-200/80 p-3 bg-slate-50/50">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <MapPin size={13} className="text-slate-500 shrink-0" />
                <span className="text-[10px] uppercase tracking-wider">SHIP FROM</span>
              </div>
              <p className="font-bold text-slate-900">{shipment.from.name || "Accele Fulfillment Hub"}</p>
              <p className="text-slate-600 mt-0.5 text-[11px]">{shipment.from.address || "4810 Westpark Dr"}</p>
              <p className="text-slate-600 text-[11px]">{shipment.from.city}, {shipment.from.state} {shipment.from.zip}</p>
            </div>

            <div className="rounded-xl border border-slate-200/80 p-3 bg-white">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <MapPin size={13} className="text-[#ed0b08] shrink-0" />
                <span className="text-[10px] uppercase tracking-wider">SHIP TO</span>
              </div>
              <p className="font-bold text-slate-900">{shipment.to.name || "Delivery Destination"}</p>
              <p className="text-slate-600 mt-0.5 text-[11px]">{shipment.to.address || "Commercial Address"}</p>
              <p className="text-slate-600 text-[11px]">{shipment.to.city}, {shipment.to.state} {shipment.to.zip}</p>
            </div>
          </div>

          {/* Timeline History */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <Clock size={15} className="text-[#ed0b08]" />
              Tracking Activity History
            </h4>

            <div className="space-y-3.5 pl-1">
              {shipment.steps.map((step, index) => {
                const isCurrent = step.status === "current";
                const isCompleted = step.status === "completed";
                const isPending = step.status === "pending";

                return (
                  <div key={index} className="flex gap-2.5">
                    <div className="flex flex-col items-center">
                      <div
                        className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : isCurrent
                            ? "bg-[#ed0b08] text-white ring-3 ring-red-100 animate-pulse"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      {index < shipment.steps.length - 1 && (
                        <div
                          className={`w-0.5 my-1 flex-1 min-h-[22px] ${
                            isCompleted ? "bg-emerald-300" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <p
                          className={`text-xs font-bold ${
                            isCurrent ? "text-[#ed0b08]" : isPending ? "text-slate-400" : "text-slate-900"
                          }`}
                        >
                          {step.title}
                        </p>
                        <span className="text-[10px] font-medium text-slate-400">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                        {step.location}
                      </p>
                      {step.description && (
                        <p className="mt-1 text-[11px] text-slate-600 bg-slate-50 rounded-lg p-2 border border-slate-100">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions with Safe Area Bottom */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))] shrink-0">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="text-xs h-8 px-2.5"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy ID
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs h-8 px-2.5"
            >
              <Printer size={13} />
              {printed ? "Printing..." : "Print"}
            </Button>
          </div>

          <Button variant="default" size="sm" onClick={onClose} className="text-xs px-4 h-8 font-bold">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
