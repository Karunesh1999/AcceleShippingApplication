import { Shipment } from "../types";
import { Hero } from "./Hero";
import { QuickActions } from "./QuickActions";
import { ShipmentCard } from "./ShipmentCard";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface HomeViewProps {
  shipments: Shipment[];
  onOpenShipment: (shipment: Shipment) => void;
  onCreateShipment: () => void;
  onTrack: () => void;
  onQuote: () => void;
  onSupport: () => void;
  onSchedulePickup: () => void;
  onViewAllShipments: () => void;
  onCopyId: (id: string, e: React.MouseEvent) => void;
}

export function HomeView({
  shipments,
  onOpenShipment,
  onCreateShipment,
  onTrack,
  onQuote,
  onSupport,
  onSchedulePickup,
  onViewAllShipments,
  onCopyId,
}: HomeViewProps) {
  const activeShipments = shipments.filter((s) => s.status !== "Delivered");
  const displayShipments = activeShipments.length > 0 ? activeShipments.slice(0, 4) : shipments.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
            Accele Enterprise Portal
          </span>
          <h1 className="mt-0.5 text-xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Good morning, Alex
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
            Manage commercial equipment dispatch, live fleet tracking, and priority logistics.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <Hero onCreateShipment={onCreateShipment} onTrackShipment={onTrack} />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
          Quick Operations
        </h3>
        <QuickActions
          onShipNow={onCreateShipment}
          onTrack={onTrack}
          onQuote={onQuote}
          onSupport={onSupport}
          onSchedulePickup={onSchedulePickup}
        />
      </div>

      {/* Active Shipments Section */}
      <div className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950">Active Shipments</h3>
            <p className="text-xs text-slate-400 hidden xs:block">
              Live transit updates and real-time package statuses
            </p>
          </div>
          <button
            onClick={onViewAllShipments}
            className="group flex items-center gap-1 text-xs font-bold text-[#ed0b08] hover:text-red-700 transition-colors"
          >
            <span>View all ({shipments.length})</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {displayShipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              onOpen={() => onOpenShipment(shipment)}
              onCopyId={onCopyId}
            />
          ))}
        </div>
      </div>

      {/* Accele Guarantee Card */}
      <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/70 to-white p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4">
        <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-2xl bg-[#ed0b08] text-white shadow-md shadow-red-500/20">
          <ShieldCheck size={22} />
        </div>
        <div>
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#ed0b08]">
            Accele Electronics Standard
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-950 mt-0.5">
            Precision Tested Automotive Electronics
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
            Every camera, harness, and display unit undergoes circuit QA inspection prior to dispatch. Handled exclusively by certified commercial carriers.
          </p>
        </div>
      </div>
    </div>
  );
}
