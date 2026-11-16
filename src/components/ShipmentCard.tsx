import { CheckCircle2, Clock, AlertTriangle, ChevronRight, Truck, ArrowRight, Copy } from "lucide-react";
import { Shipment } from "../types";
import { Badge } from "./ui/badge";

interface ShipmentCardProps {
  shipment: Shipment;
  onOpen: () => void;
  onCopyId?: (id: string, e: React.MouseEvent) => void;
}

export function ShipmentCard({ shipment, onOpen, onCopyId }: ShipmentCardProps) {
  const isDelivered = shipment.status === "Delivered";
  const isProcessing = shipment.status === "Processing";
  const isDelayed = shipment.status === "Delayed";

  const getStatusBadge = () => {
    switch (shipment.status) {
      case "Delivered":
        return <Badge variant="success" className="text-[10px] py-0 px-2">Delivered</Badge>;
      case "Processing":
        return <Badge variant="warning" className="text-[10px] py-0 px-2">Processing</Badge>;
      case "Delayed":
        return <Badge variant="destructive" className="text-[10px] py-0 px-2">Delayed</Badge>;
      default:
        return <Badge variant="brand" className="text-[10px] py-0 px-2">In Transit</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (isDelivered) return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />;
    if (isProcessing) return <Clock className="h-4.5 w-4.5 text-amber-600" />;
    if (isDelayed) return <AlertTriangle className="h-4.5 w-4.5 text-rose-600" />;
    return <Truck className="h-4.5 w-4.5 text-[#ed0b08]" />;
  };

  const getIconBackground = () => {
    if (isDelivered) return "bg-emerald-50 border-emerald-100";
    if (isProcessing) return "bg-amber-50 border-amber-100";
    if (isDelayed) return "bg-rose-50 border-rose-100";
    return "bg-red-50 border-red-100";
  };

  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-xs transition-all duration-200 hover:border-red-200 active:scale-[0.99]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5 min-w-0">
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${getIconBackground()} transition-transform group-hover:scale-105`}
          >
            {getStatusIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
              {shipment.category}
            </span>
            <h4 className="truncate text-xs font-bold text-slate-900 group-hover:text-[#ed0b08] transition-colors">
              {shipment.item}
            </h4>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-medium text-slate-400">
                #{shipment.id}
              </span>
              {onCopyId && (
                <button
                  type="button"
                  onClick={(e) => onCopyId(shipment.id, e)}
                  title="Copy tracking ID"
                  className="text-slate-300 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <Copy size={11} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1">
          {getStatusBadge()}
          <span className="text-[10px] font-medium text-slate-400">{shipment.weight}</span>
        </div>
      </div>

      {/* Route Info */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600">
        <span className="font-semibold text-slate-800 truncate">{shipment.from.city}, {shipment.from.state}</span>
        <div className="flex items-center gap-1 text-slate-300 px-1.5 shrink-0">
          <span className="h-px w-4 bg-slate-200" />
          <ArrowRight size={11} className="text-slate-400" />
          <span className="h-px w-4 bg-slate-200" />
        </div>
        <span className="font-semibold text-slate-800 truncate">{shipment.to.city}, {shipment.to.state}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="font-medium text-slate-400">Progress</span>
          <span className="font-bold text-slate-700">{shipment.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isDelivered
                ? "bg-emerald-500"
                : isDelayed
                ? "bg-rose-500"
                : "bg-gradient-to-r from-red-500 to-[#ed0b08]"
            }`}
            style={{ width: `${shipment.progress}%` }}
          />
        </div>
      </div>

      {/* Bottom info */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
        <div className="flex items-center gap-1 text-slate-500">
          <Clock size={12} className="text-slate-400" />
          <span className="font-medium text-[10px]">{shipment.eta}</span>
        </div>
        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#ed0b08] group-hover:translate-x-0.5 transition-transform">
          Details <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}
