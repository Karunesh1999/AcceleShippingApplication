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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

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
    <div className="space-y-6 sm:space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold text-[#ed0b08] uppercase tracking-wider">
          Accele GPS Telematics
        </span>
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
          Track a Shipment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Enter your 10-digit Accele tracking number for real-time fleet GPS coordinates and delivery updates.
        </p>
      </div>

      {/* Tracking Search Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="e.g. AC82910472"
              className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm font-mono"
            />
          </div>
          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            <Button type="submit" variant="brand" size="lg" className="font-bold sm:px-8 text-xs sm:text-sm h-11 sm:h-12 w-full justify-center">
              Track Package
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={simulateScan}
              className="gap-2 text-slate-700 text-xs sm:text-sm h-11 sm:h-12 w-full justify-center"
            >
              <Scan size={17} />
              <span>Scan Label</span>
            </Button>
          </div>
        </form>

        {/* Quick Sample IDs */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Quick IDs:</span>
          {shipments.slice(0, 3).map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectQuickId(s.id)}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-slate-700 hover:bg-red-50 hover:text-[#ed0b08] transition-colors"
            >
              #{s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Barcode Scanner Modal Simulation */}
      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 p-6 sm:p-8 text-center text-white border border-white/10 shadow-2xl">
            <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52 rounded-2xl border-2 border-red-500/80 p-3 overflow-hidden bg-black/40 flex items-center justify-center">
              {/* Scan laser line animation */}
              <div className="absolute inset-x-0 h-0.5 bg-red-500 shadow-[0_0_12px_#ed0b08] animate-bounce" />
              <Camera size={44} className="text-white/20" />
            </div>
            <p className="mt-5 text-sm font-bold">Scanning Accele Barcode...</p>
            <p className="mt-1 text-xs text-slate-400">
              Align barcode inside the camera frame
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsScanning(false)}
              className="mt-5 border-white/20 text-white hover:bg-white/10"
            >
              Cancel Scan
            </Button>
          </div>
        </div>
      )}

      {/* Matched Shipment Display */}
      {matchedShipment ? (
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-slate-950 p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="brand">{matchedShipment.status}</Badge>
                <span className="text-xs font-mono text-slate-400">
                  #{matchedShipment.id}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mt-2">
                {matchedShipment.item}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {matchedShipment.service} · Carrier: {matchedShipment.carrier}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Estimated Delivery
              </span>
              <p className="text-lg sm:text-xl font-bold text-red-400 mt-0.5">
                {matchedShipment.eta}
              </p>
            </div>
          </div>

          {/* Progress Route */}
          <div className="p-4 sm:p-6 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2 gap-2">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span className="truncate">
                  {matchedShipment.from.city}, {matchedShipment.from.state}
                </span>
              </div>
              <div className="flex items-center gap-1.5 truncate text-right">
                <MapPin size={14} className="text-[#ed0b08] shrink-0" />
                <span className="truncate">
                  {matchedShipment.to.city}, {matchedShipment.to.state}
                </span>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-[#ed0b08] rounded-full transition-all duration-700"
                style={{ width: `${matchedShipment.progress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] text-slate-400">
              <span>Dispatched</span>
              <span>In Transit ({matchedShipment.progress}%)</span>
              <span>Delivered</span>
            </div>
          </div>

          {/* Detailed Activity Stepper */}
          <div className="p-4 sm:p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Route Checkpoints
            </h4>

            <div className="space-y-4">
              {matchedShipment.steps.map((step, idx) => {
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`grid h-6 w-6 sm:h-7 sm:w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-[#ed0b08] text-white ring-4 ring-red-100"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={15} /> : idx + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <p
                          className={`text-xs sm:text-sm font-bold ${
                            isCurrent ? "text-[#ed0b08]" : "text-slate-900"
                          }`}
                        >
                          {step.title}
                        </p>
                        <span className="text-[10px] sm:text-xs text-slate-400">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">{step.location}</p>
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

          {/* Action Bar */}
          <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-end">
            <Button
              variant="brand"
              size="sm"
              onClick={() => onOpenShipment(matchedShipment)}
              className="gap-1.5 font-bold"
            >
              Full Details Modal <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center">
          <h3 className="text-base font-bold text-slate-900">Tracking Number Not Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            We could not locate shipment records matching "{searchValue}". Check the digits on your Accele shipping manifest or receipt.
          </p>
        </div>
      ) : null}
    </div>
  );
}
