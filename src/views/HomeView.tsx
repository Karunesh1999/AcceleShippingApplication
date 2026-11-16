import { Shipment } from "../types";
import { acceleProducts, Product } from "../data/products";
import { Hero } from "../components/layout/Hero";
import { QuickActions } from "../components/layout/QuickActions";
import { ShipmentCard } from "../components/layout/ShipmentCard";
import { ArrowRight, ShieldCheck, Cpu, Check, BookOpen } from "lucide-react";

interface HomeViewProps {
  shipments: Shipment[];
  onOpenShipment: (shipment: Shipment) => void;
  onCreateShipment: () => void;
  onBrowseCatalog: () => void;
  onOpenTechManuals: () => void;
  onOpenRma: () => void;
  onTrack: () => void;
  onQuote: () => void;
  onViewAllShipments: () => void;
  onCopyId: (id: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export function HomeView({
  shipments,
  onOpenShipment,
  onCreateShipment,
  onBrowseCatalog,
  onOpenTechManuals,
  onOpenRma,
  onTrack,
  onQuote,
  onViewAllShipments,
  onCopyId,
  onSelectProduct,
}: HomeViewProps) {
  const activeShipments = shipments.filter((s) => s.status !== "Delivered");
  const displayShipments = activeShipments.length > 0 ? activeShipments.slice(0, 3) : shipments.slice(0, 3);
  const featuredProducts = acceleProducts.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Accele Electronics Official Companion
        </span>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-950">
          Good morning, Alex
        </h1>
        <p className="text-[11px] text-slate-500 font-medium">
          Dealer wholesale portal, 12V tech manuals & dispatch.
        </p>
      </div>

      {/* Hero Section */}
      <Hero
        onBrowseCatalog={onBrowseCatalog}
        onCreateShipment={onCreateShipment}
      />

      {/* Quick Operations */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Quick Operations
        </h3>
        <QuickActions
          onBrowseCatalog={onBrowseCatalog}
          onShipNow={onCreateShipment}
          onTrack={onTrack}
          onTechManuals={onOpenTechManuals}
          onRmaWarranty={onOpenRma}
          onQuote={onQuote}
        />
      </div>

      {/* Featured 12V Electronics Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
              <Cpu size={14} className="text-[#ed0b08]" />
              Featured 12V Electronics
            </h3>
            <p className="text-[10px] text-slate-400">
              Commercial cameras, displays & seat heaters
            </p>
          </div>
          <button
            onClick={onBrowseCatalog}
            className="group flex items-center gap-1 text-xs font-bold text-[#ed0b08] hover:text-red-700 transition-colors cursor-pointer"
          >
            <span>Catalog ({acceleProducts.length})</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Mini Cards */}
        <div className="grid gap-2 grid-cols-1">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-slate-100 px-1 py-0.2 text-[8px] font-bold font-mono text-slate-700">
                    {prod.partNumber}
                  </span>
                  <span className="text-[9px] text-[#ed0b08] font-bold">{prod.brand}</span>
                </div>
                <p className="text-xs font-bold text-slate-900 truncate mt-0.5">
                  {prod.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {prod.specs[0]?.value}
                </p>
              </div>

              <div className="text-right shrink-0 border-l border-slate-100 pl-2.5">
                <p className="text-xs font-black text-slate-900">
                  ${prod.dealerPrice.toFixed(0)}
                </p>
                <p className="text-[9px] text-emerald-600 font-bold flex items-center justify-end gap-0.5">
                  <Check size={10} /> In Stock
                </p>
              </div>
            </div>
          ))}
        </div>
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
      <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/70 to-white p-3.5 flex items-start gap-3 shadow-2xs">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#ed0b08] text-white shadow-md shadow-red-500/20">
          <ShieldCheck size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-900">
            Accele Electronics Santa Fe Springs Guarantee
          </h4>
          <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed">
            35+ years supplying automotive 12V expediters and dealers. 1-Year Commercial Warranty on all hardware.
          </p>
        </div>
      </div>
    </div>
  );
}
