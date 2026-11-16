import { useState } from "react";
import { Shipment } from "../types";
import {
  Search,
  Scan,
  CheckCircle2,
  MapPin,
  Camera,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

interface TrackViewProps {
  shipments: Shipment[];
  onOpenShipment: (shipment: Shipment) => void;
}

export function TrackView({ shipments, onOpenShipment }: TrackViewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [matchedShipment, setMatchedShipment] = useState<Shipment | null>(shipments[0] || null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const term = searchValue.trim().toLowerCase();
    const found = shipments.find(
      (s) =>
        s.id.toLowerCase() === term ||
        s.item.toLowerCase().includes(term) ||
        s.to.city.toLowerCase().includes(term)
    );

    setMatchedShipment(found || null);
  };

  const handleSelectQuickId = (id: string) => {
    setSearchValue(id);
    const found = shipments.find((s) => s.id === id);
    setMatchedShipment(found || null);
    setHasSearched(true);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleSelectQuickId(shipments[0]?.id || "AC82910472");
    }, 1800);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-[#ed0b08] uppercase tracking-wider">
          GPS Telematics
        </span>
        <h2 className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
          Track a Shipment
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Enter tracking # for real-time fleet GPS coordinates.
        </p>
      </div>

      {/* Tracking Search Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-xs space-y-2.5">
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="e.g. AC82910472"
              className="pl-8.5 h-9 text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="submit" variant="brand" size="sm" className="font-bold text-xs h-9">
              Track
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={simulateScan}
              className="gap-1.5 text-slate-700 text-xs h-9"
            >
              <Scan size={14} />
              <span>Scan Barcode</span>
            </Button>
          </div>
        </form>

        {/* Quick Sample IDs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-medium">Quick IDs:</span>
          {shipments.slice(0, 3).map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectQuickId(s.id)}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700 hover:bg-red-50 hover:text-[#ed0b08] transition-colors cursor-pointer"
            >
              #{s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Barcode Scanner Modal Simulation */}
      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xs rounded-3xl bg-slate-900 p-5 text-center text-white border border-white/10 shadow-2xl">
            <div className="relative mx-auto h-36 w-36 rounded-2xl border-2 border-red-500/80 p-2 overflow-hidden bg-black/40 flex items-center justify-center">
              <div className="absolute inset-x-0 h-0.5 bg-red-500 shadow-[0_0_12px_#ed0b08] animate-bounce" />
              <Camera size={36} className="text-white/20" />
            </div>
            <p className="mt-4 text-xs font-bold">Scanning Accele Barcode...</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsScanning(false)}
              className="mt-4 border-white/20 text-white hover:bg-white/10 text-xs h-8"
            >
              Cancel Scan
            </Button>
          </div>
        </div>
      )}

      {/* Matched Shipment Display */}
      {matchedShipment ? (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          {/* Header */}
          <div className="bg-slate-950 p-3.5 text-white">
            <div className="flex items-center justify-between">
              <Badge variant="brand" className="text-[9px] py-0 px-1.5">{matchedShipment.status}</Badge>
              <span className="text-[10px] font-mono text-slate-400">
                #{matchedShipment.id}
              </span>
            </div>
            <h3 className="text-sm font-bold mt-1.5 truncate">
              {matchedShipment.item}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {matchedShipment.service}
            </p>
            <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-[10px]">
              <span className="text-slate-400">Estimated Delivery:</span>
              <span className="font-bold text-red-300">{matchedShipment.eta}</span>
            </div>
          </div>

          {/* Progress Route */}
          <div className="p-3.5 border-b border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5 gap-2">
              <div className="flex items-center gap-1 truncate">
                <MapPin size={12} className="text-slate-400 shrink-0" />
                <span className="truncate">{matchedShipment.from.city}, {matchedShipment.from.state}</span>
              </div>
              <div className="flex items-center gap-1 truncate text-right">
                <MapPin size={12} className="text-[#ed0b08] shrink-0" />
                <span className="truncate">{matchedShipment.to.city}, {matchedShipment.to.state}</span>
              </div>
            </div>

            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-[#ed0b08] rounded-full transition-all duration-700"
                style={{ width: `${matchedShipment.progress}%` }}
              />
            </div>
          </div>

          {/* Stepper */}
          <div className="p-3.5 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Checkpoints
            </h4>

            <div className="space-y-3">
              {matchedShipment.steps.slice(0, 3).map((step, idx) => {
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-[#ed0b08] text-white ring-2 ring-red-100"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={12} /> : idx + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p
                          className={`text-xs font-bold truncate ${
                            isCurrent ? "text-[#ed0b08]" : "text-slate-900"
                          }`}
                        >
                          {step.title}
                        </p>
                        <span className="text-[9px] text-slate-400 shrink-0">{step.timestamp}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{step.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action */}
          <div className="bg-slate-50 p-2.5 border-t border-slate-100 flex items-center justify-end">
            <Button
              variant="brand"
              size="sm"
              onClick={() => onOpenShipment(matchedShipment)}
              className="gap-1 font-bold text-xs h-8"
            >
              Full Details <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <h3 className="text-xs font-bold text-slate-900">Tracking Number Not Found</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">
            No records for "{searchValue}".
          </p>
        </div>
      ) : null}
    </div>
  );
}
