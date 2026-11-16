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
  const displayShipments = activeShipments.length > 0 ? activeShipments.slice(0, 3) : shipments.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Accele Enterprise Portal
        </span>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-950">
          Good morning, Alex
        </h1>
        <p className="text-[11px] text-slate-500 font-medium">
          Fleet dispatch & tracking operations.
        </p>
      </div>

      {/* Hero Section */}
      <Hero onCreateShipment={onCreateShipment} onTrackShipment={onTrack} />

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
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
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-950">Active Shipments</h3>
            <p className="text-[10px] text-slate-400">
              Live updates & route status
            </p>
          </div>
          <button
            onClick={onViewAllShipments}
            className="group flex items-center gap-1 text-xs font-bold text-[#ed0b08] hover:text-red-700 transition-colors cursor-pointer"
          >
            <span>All ({shipments.length})</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 1-column layout for authentic iPhone look */}
        <div className="grid gap-3 grid-cols-1">
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
      <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/70 to-white p-3.5 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#ed0b08] text-white shadow-md shadow-red-500/20">
          <ShieldCheck size={20} />
        </div>
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ed0b08]">
            Accele Standard
          </span>
          <h4 className="text-xs font-bold text-slate-950 mt-0.5">
            Precision Automotive Electronics
          </h4>
          <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed">
            Every camera and display undergoes circuit QA inspection prior to dispatch. Handled exclusively by certified carriers.
          </p>
        </div>
      </div>
    </div>
  );
}
