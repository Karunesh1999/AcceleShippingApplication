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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-t-[2rem] sm:rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90dvh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Pull / Drag Indicator for Mobile */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-slate-50/70">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 bg-slate-50/70">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ed0b08]">
                {shipment.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono font-medium text-slate-500">
                #{shipment.id}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-950 mt-0.5 truncate">
              {shipment.item}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {/* Status Banner */}
          <div className="rounded-2xl bg-slate-950 p-4 sm:p-5 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Current Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isDelivered ? "bg-emerald-400" : "bg-red-500 animate-pulse"
                    }`}
                  />
                  <h3 className="text-base sm:text-lg font-bold">{shipment.status}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Estimated Arrival
                </p>
                <p className="text-sm sm:text-lg font-bold text-red-300 mt-0.5 sm:mt-1">
                  {shipment.eta}
                </p>
              </div>
            </div>

            {/* Visual Route */}
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2 gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{shipment.from.city}, {shipment.from.state}</p>
                  <p className="text-[10px] text-slate-400 truncate">{shipment.from.name || "Origin Hub"}</p>
                </div>
                <div className="px-2 sm:px-4 flex items-center justify-center gap-1.5 text-slate-400 shrink-0">
                  <span className="h-px w-4 sm:w-10 bg-white/20" />
                  <Truck size={16} className="text-red-400" />
                  <span className="h-px w-4 sm:w-10 bg-white/20" />
                </div>
                <div className="text-right min-w-0">
                  <p className="font-semibold text-white truncate">{shipment.to.city}, {shipment.to.state}</p>
                  <p className="text-[10px] text-slate-400 truncate">{shipment.to.name || "Destination"}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full ${
                    isDelivered ? "bg-emerald-400" : "bg-[#ed0b08]"
                  }`}
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Key Package Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-400">Carrier Service</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5 sm:mt-1 truncate">{shipment.service}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-400">Weight</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5 sm:mt-1">{shipment.weight}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-400">Dimensions</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5 sm:mt-1">
                {shipment.dimensions || "10 x 8 x 5 in"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 sm:p-3">
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-400">Declared Value</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5 sm:mt-1">
                ${shipment.declaredValue ? shipment.declaredValue.toFixed(2) : "199.00"}
              </p>
            </div>
          </div>

          {/* Addresses Detail */}
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200/80 p-3.5">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <MapPin size={13} className="text-slate-500" />
                <span>SHIP FROM</span>
              </div>
              <p className="font-bold text-slate-900">{shipment.from.name || "Accele Fulfillment Hub"}</p>
              <p className="text-slate-600 mt-0.5">{shipment.from.address || "4810 Westpark Dr"}</p>
              <p className="text-slate-600">{shipment.from.city}, {shipment.from.state} {shipment.from.zip}</p>
            </div>

            <div className="rounded-xl border border-slate-200/80 p-3.5">
              <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
                <MapPin size={13} className="text-[#ed0b08]" />
                <span>SHIP TO</span>
              </div>
              <p className="font-bold text-slate-900">{shipment.to.name || "Delivery Destination"}</p>
              <p className="text-slate-600 mt-0.5">{shipment.to.address || "Commercial Address"}</p>
              <p className="text-slate-600">{shipment.to.city}, {shipment.to.state} {shipment.to.zip}</p>
            </div>
          </div>

          {/* Timeline History */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Clock size={16} className="text-[#ed0b08]" />
              Tracking Activity History
            </h4>

            <div className="space-y-4 pl-1">
              {shipment.steps.map((step, index) => {
                const isCurrent = step.status === "current";
                const isCompleted = step.status === "completed";
                const isPending = step.status === "pending";

                return (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full text-[11px] sm:text-xs font-bold ${
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : isCurrent
                            ? "bg-[#ed0b08] text-white ring-4 ring-red-100 animate-pulse"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      {index < shipment.steps.length - 1 && (
                        <div
                          className={`w-0.5 my-1 flex-1 min-h-[26px] ${
                            isCompleted ? "bg-emerald-300" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-2 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <p
                          className={`text-xs sm:text-sm font-bold ${
                            isCurrent ? "text-[#ed0b08]" : isPending ? "text-slate-400" : "text-slate-900"
                          }`}
                        >
                          {step.title}
                        </p>
                        <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">
                        {step.location}
                      </p>
                      {step.description && (
                        <p className="mt-1 text-[11px] sm:text-xs text-slate-600 bg-slate-50 rounded-lg p-2 border border-slate-100">
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
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100 bg-slate-50/80 px-5 sm:px-6 py-3.5 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="text-xs"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy ID
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-xs"
            >
              <Printer size={14} />
              {printed ? "Printing..." : "Print Label"}
            </Button>
          </div>

          <Button variant="default" size="sm" onClick={onClose} className="text-xs px-5">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
