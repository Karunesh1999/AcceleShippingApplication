import { useState } from "react";
import {
  X,
  MapPin,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Shipment } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShipmentCreated: (shipment: Shipment) => void;
}

const productPresets = [
  {
    name: "RVC180CTD Commercial Camera",
    category: "Commercial Cameras & Safety",
    weight: "3.2 lbs",
    dimensions: "10 x 8 x 6 in",
    value: 249.0,
  },
  {
    name: "AcceleVision 10.1\" High-Res Display",
    category: "Mobile Displays & Video",
    weight: "5.5 lbs",
    dimensions: "15 x 11 x 4 in",
    value: 389.0,
  },
  {
    name: "Dual USB 3.0 Fast Charge Vehicle Kit",
    category: "Power Accessories & Wiring",
    weight: "1.1 lbs",
    dimensions: "7 x 5 x 3 in",
    value: 49.95,
  },
  {
    name: "4K Commercial Dashcam with Cloud GPS",
    category: "Dashcams & Fleet Video",
    weight: "2.4 lbs",
    dimensions: "9 x 6 x 4 in",
    value: 289.0,
  },
  {
    name: "Custom Fleet Electronic Equipment",
    category: "Custom Hardware",
    weight: "4.0 lbs",
    dimensions: "12 x 8 x 6 in",
    value: 199.0,
  },
];

const shippingServices = [
  {
    id: "ground",
    name: "Accele Ground Parcel",
    eta: "3–4 Business Days",
    basePrice: 16.5,
    description: "Economical fleet transport with standard tracking.",
  },
  {
    id: "priority",
    name: "Accele Priority 2-Day Air",
    eta: "2 Business Days",
    basePrice: 28.5,
    popular: true,
    description: "Guaranteed 2-day delivery across 48 contiguous states.",
  },
  {
    id: "overnight",
    name: "Accele Overnight Express",
    eta: "Next Morning by 10:30 AM",
    basePrice: 48.0,
    description: "Priority air cargo dispatch with real-time GPS telemetry.",
  },
];

export function CreateShipmentModal({
  isOpen,
  onClose,
  onShipmentCreated,
}: CreateShipmentModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [createdShipment, setCreatedShipment] = useState<Shipment | null>(null);

  // Form State
  const [itemIndex, setItemIndex] = useState(0);
  const [customItem, setCustomItem] = useState("");
  const [selectedService, setSelectedService] = useState("priority");
  const [includeInsurance, setIncludeInsurance] = useState(true);

  // Origin
  const [fromCity, setFromCity] = useState("Houston");
  const [fromState, setFromState] = useState("TX");
  const [fromAddress, setFromAddress] = useState("Accele Distribution Hub, 4810 Westpark Dr");
  const [fromZip, setFromZip] = useState("77081");

  // Destination
  const [toName, setToName] = useState("");
  const [toCity, setToCity] = useState("");
  const [toState, setToState] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [toZip, setToZip] = useState("");

  if (!isOpen) return null;

  const currentPreset = productPresets[itemIndex];
  const itemName = itemIndex === 4 && customItem.trim() ? customItem : currentPreset.name;

  const currentService =
    shippingServices.find((s) => s.id === selectedService) || shippingServices[1];

  const calculatedRate =
    currentService.basePrice + (includeInsurance ? 4.5 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomIdNumber = Math.floor(10000000 + Math.random() * 90000000);
    const newId = `AC${randomIdNumber}`;

    const newShipment: Shipment = {
      id: newId,
      item: itemName,
      category: currentPreset.category,
      status: "Processing",
      eta: currentService.eta,
      from: {
        city: fromCity || "Houston",
        state: fromState || "TX",
        address: fromAddress,
        zip: fromZip,
        name: "Accele Warehouse Logistics",
      },
      to: {
        city: toCity || "Dallas",
        state: toState || "TX",
        address: toAddress || "1200 Commercial Blvd",
        zip: toZip || "75001",
        name: toName || "Commercial Receiver",
      },
      progress: 15,
      carrier: "Accele Logistics",
      service: currentService.name,
      weight: currentPreset.weight,
      dimensions: currentPreset.dimensions,
      declaredValue: currentPreset.value,
      rate: calculatedRate,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      referenceNumber: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      steps: [
        {
          title: "Order Dispatched & Manifest Created",
          location: `${fromCity}, ${fromState}`,
          timestamp: "Just now",
          status: "current",
          description: "Shipping label printed, placed in staging bay for next carrier sweep.",
        },
        {
          title: "Pickup & Carrier Scan",
          location: `${fromCity} Logistics Hub, ${fromState}`,
          timestamp: "Scheduled today",
          status: "pending",
        },
        {
          title: "In Transit to Sort Hub",
          location: "Regional Sorting Facility",
          timestamp: "Pending",
          status: "pending",
        },
        {
          title: "Delivery at Destination",
          location: `${toCity || "Destination"}, ${toState || "State"}`,
          timestamp: `Est. ${currentService.eta}`,
          status: "pending",
        },
      ],
    };

    setCreatedShipment(newShipment);
    onShipmentCreated(newShipment);
    setStep("success");
  };

  const handleResetAndClose = () => {
    setStep("form");
    setCreatedShipment(null);
    setToName("");
    setToAddress("");
    setToCity("");
    setToState("");
    setToZip("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={handleResetAndClose}
    >
      <div
        className="w-full max-w-2xl rounded-t-[2rem] sm:rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90dvh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Mobile Sheet Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-slate-50/70">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {step === "success" && createdShipment ? (
          <div className="p-5 sm:p-8 text-center space-y-5 sm:space-y-6 overflow-y-auto pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]">
            <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-6 sm:ring-8 ring-emerald-50/50">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <Sparkles size={13} /> Label Generated
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mt-2">
                Shipment Dispatched Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Tracking number registered on the Accele Logistics network.
              </p>
            </div>

            {/* Generated Label Card */}
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 sm:p-6 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Truck size={17} className="text-[#ed0b08]" />
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    Accele Priority Logistics
                  </span>
                </div>
                <Badge variant="brand" className="text-[10px] sm:text-xs">{createdShipment.service}</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400 font-semibold text-[10px] uppercase">SHIP TO:</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {createdShipment.to.name}
                  </p>
                  <p className="text-slate-600">{createdShipment.to.address}</p>
                  <p className="text-slate-600">
                    {createdShipment.to.city}, {createdShipment.to.state}{" "}
                    {createdShipment.to.zip}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-semibold text-[10px] uppercase">ITEM DETAILS:</p>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">
                    {createdShipment.item}
                  </p>
                  <p className="text-slate-600">
                    Weight: {createdShipment.weight}
                  </p>
                  <p className="text-slate-600 font-semibold">
                    Rate: ${createdShipment.rate?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col items-center justify-center">
                <p className="text-xs font-mono font-bold tracking-widest text-slate-800">
                  {createdShipment.id}
                </p>
                {/* Barcode visual */}
                <div className="mt-2 flex h-9 sm:h-10 w-full max-w-[260px] items-center justify-between px-2 bg-white rounded border border-slate-200">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 sm:h-7 bg-slate-900 ${
                        i % 3 === 0 ? "w-1" : i % 5 === 0 ? "w-0.5" : "w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-8"
              >
                View in Shipments List
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[90dvh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 bg-slate-50/70 shrink-0">
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ed0b08]">
                  New Dispatch
                </p>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-950 mt-0.5">
                  Create a Shipment
                </h2>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Select Accele Equipment / Package
                </label>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                  {productPresets.map((preset, idx) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setItemIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        itemIndex === idx
                          ? "border-[#ed0b08] bg-red-50/50 ring-2 ring-red-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {preset.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {preset.category} · {preset.weight}
                      </p>
                    </button>
                  ))}
                </div>
                {itemIndex === 4 && (
                  <div className="mt-3">
                    <Input
                      placeholder="Enter custom equipment name / model..."
                      value={customItem}
                      onChange={(e) => setCustomItem(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Sender & Recipient */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Sender */}
                <div className="rounded-2xl border border-slate-200 p-3.5 sm:p-4 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-2.5">
                    <MapPin size={15} className="text-slate-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Origin Dispatch Hub
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">Facility / Street</span>
                      <Input
                        value={fromAddress}
                        onChange={(e) => setFromAddress(e.target.value)}
                        required
                        className="h-9 text-xs mt-0.5"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <span className="text-[10px] font-semibold text-slate-500">City, State</span>
                        <Input
                          value={`${fromCity}, ${fromState}`}
                          onChange={(e) => {
                            const [c, s] = e.target.value.split(",");
                            setFromCity(c ? c.trim() : "Houston");
                            setFromState(s ? s.trim() : "TX");
                          }}
                          required
                          className="h-9 text-xs mt-0.5"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500">ZIP</span>
                        <Input
                          value={fromZip}
                          onChange={(e) => setFromZip(e.target.value)}
                          required
                          className="h-9 text-xs mt-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div className="rounded-2xl border border-slate-200 p-3.5 sm:p-4 bg-white">
                  <div className="flex items-center gap-2 mb-2.5">
                    <MapPin size={15} className="text-[#ed0b08]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Destination Receiver
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">Recipient / Dealer Name</span>
                      <Input
                        placeholder="e.g. Metro Auto Electronics Inc"
                        value={toName}
                        onChange={(e) => setToName(e.target.value)}
                        required
                        className="h-9 text-xs mt-0.5"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">Delivery Street Address</span>
                      <Input
                        placeholder="e.g. 1820 Commercial Parkway"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                        required
                        className="h-9 text-xs mt-0.5"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <span className="text-[10px] font-semibold text-slate-500">City, State</span>
                        <Input
                          placeholder="Austin, TX"
                          value={toCity ? `${toCity}, ${toState}` : ""}
                          onChange={(e) => {
                            const parts = e.target.value.split(",");
                            setToCity(parts[0] ? parts[0].trim() : "");
                            setToState(parts[1] ? parts[1].trim() : "TX");
                          }}
                          required
                          className="h-9 text-xs mt-0.5"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500">ZIP</span>
                        <Input
                          placeholder="78701"
                          value={toZip}
                          onChange={(e) => setToZip(e.target.value)}
                          required
                          className="h-9 text-xs mt-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  2. Choose Shipping Service Level
                </label>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                  {shippingServices.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id)}
                      className={`relative p-3 rounded-xl border text-left transition-all ${
                        selectedService === srv.id
                          ? "border-[#ed0b08] bg-red-50/50 ring-2 ring-red-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {srv.popular && (
                        <span className="absolute top-2 right-2 rounded-full bg-[#ed0b08] text-white text-[9px] font-bold px-1.5 py-0.2">
                          Popular
                        </span>
                      )}
                      <p className="text-xs font-bold text-slate-900">{srv.name}</p>
                      <p className="text-sm font-extrabold text-[#ed0b08] mt-0.5">
                        ${srv.basePrice.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{srv.eta}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insurance option */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3 sm:p-4 bg-slate-50 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-red-100 text-[#ed0b08] shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Accele Cargo Protection (+$4.50)
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Full replacement guarantee against transit damage.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-[#ed0b08] focus:ring-red-500 accent-[#ed0b08] shrink-0"
                />
              </div>

              {/* Rate Summary */}
              <div className="rounded-2xl bg-slate-950 p-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Total Shipping Charge
                  </p>
                  <p className="text-xs text-red-300 mt-0.5 truncate">
                    {currentService.name}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl sm:text-2xl font-black">${calculatedRate.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer with Safe Area Bottom */}
            <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 bg-slate-50/80 px-5 sm:px-6 py-3.5 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetAndClose}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" className="px-5 font-bold">
                Confirm & Create <ArrowRight size={14} />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
