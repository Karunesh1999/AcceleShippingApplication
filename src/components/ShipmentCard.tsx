import { Package, CheckCircle2, Clock, AlertTriangle, ChevronRight, Truck, ArrowRight, Copy } from "lucide-react";
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
        return <Badge variant="success">Delivered</Badge>;
      case "Processing":
        return <Badge variant="warning">Processing</Badge>;
      case "Delayed":
        return <Badge variant="destructive">Delayed</Badge>;
      default:
        return <Badge variant="brand">In Transit</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (isDelivered) return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
    if (isProcessing) return <Clock className="h-5 w-5 text-amber-600" />;
    if (isDelayed) return <AlertTriangle className="h-5 w-5 text-rose-600" />;
    return <Truck className="h-5 w-5 text-[#ed0b08]" />;
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
      className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${getIconBackground()} transition-transform group-hover:scale-105`}
          >
            {getStatusIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {shipment.category}
              </span>
            </div>
            <h4 className="truncate text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#ed0b08] transition-colors">
              {shipment.item}
            </h4>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-slate-400">
                #{shipment.id}
              </span>
              {onCopyId && (
                <button
                  type="button"
                  onClick={(e) => onCopyId(shipment.id, e)}
                  title="Copy tracking ID"
                  className="text-slate-300 hover:text-slate-600 transition-colors"
                >
                  <Copy size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1">
          {getStatusBadge()}
          <span className="text-[11px] font-medium text-slate-400">{shipment.weight}</span>
        </div>
      </div>

      {/* Route Info */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-600">
        <span className="font-semibold text-slate-800 truncate">{shipment.from.city}, {shipment.from.state}</span>
        <div className="flex items-center gap-1 text-slate-300 px-2 shrink-0">
          <span className="h-px w-6 bg-slate-200" />
          <ArrowRight size={13} className="text-slate-400" />
          <span className="h-px w-6 bg-slate-200" />
        </div>
        <span className="font-semibold text-slate-800 truncate">{shipment.to.city}, {shipment.to.state}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[11px] font-medium text-slate-400">Delivery Progress</span>
          <span className="text-[11px] font-bold text-slate-700">{shipment.progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
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
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock size={14} className="text-slate-400" />
          <span className="font-medium">{shipment.eta}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ed0b08] group-hover:translate-x-0.5 transition-transform">
          Details <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
}
