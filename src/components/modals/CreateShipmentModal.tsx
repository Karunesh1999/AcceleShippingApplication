import { useState } from "react";
import {
  X,
  MapPin,
  Truck,
  CheckCircle2,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Shipment } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

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
      className="fixed inset-0 z-50 flex flex-col bg-[#f8f9fa] text-slate-900 animate-in slide-in-from-bottom duration-200 h-full w-full overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {step === "success" && createdShipment ? (
        <div className="flex-1 min-h-0 flex flex-col justify-between p-4 overflow-y-auto">
          <div className="p-2 text-center space-y-4 my-auto">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 size={13} /> Label Generated
              </span>
              <h2 className="text-xl font-bold text-slate-950 mt-1.5">
                Shipment Dispatched Successfully!
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xs mx-auto">
                Tracking number registered on the Accele Logistics network.
              </p>
            </div>

            {/* Generated Label Card */}
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4 text-left space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Truck size={16} className="text-[#ed0b08]" />
                  <span className="font-bold text-xs text-slate-900">
                    Accele Priority Logistics
                  </span>
                </div>
                <Badge variant="brand" className="text-[10px]">{createdShipment.service}</Badge>
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div>
                  <p className="text-slate-400 font-semibold text-[10px] uppercase">SHIP TO:</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {createdShipment.to.name}
                  </p>
                  <p className="text-slate-600 text-xs">{createdShipment.to.address}</p>
                  <p className="text-slate-600 text-xs">
                    {createdShipment.to.city}, {createdShipment.to.state}{" "}
                    {createdShipment.to.zip}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-semibold text-[10px] uppercase">ITEM DETAILS:</p>
                  <p className="font-bold text-slate-900 mt-0.5 truncate text-xs">
                    {createdShipment.item}
                  </p>
                  <p className="text-slate-600 text-xs">
                    Weight: {createdShipment.weight} · Rate: ${createdShipment.rate?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex flex-col items-center justify-center">
                <p className="text-xs font-mono font-bold tracking-widest text-slate-800">
                  {createdShipment.id}
                </p>
                {/* Barcode visual */}
                <div className="mt-2 flex h-8 w-full max-w-[240px] items-center justify-between px-2 bg-slate-50 rounded border border-slate-200">
                  {Array.from({ length: 34 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-5.5 bg-slate-900 ${
                        i % 3 === 0 ? "w-1" : i % 5 === 0 ? "w-0.5" : "w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-[max(12px,env(safe-area-inset-bottom))]">
            <Button
              variant="default"
              size="lg"
              onClick={handleResetAndClose}
              className="w-full font-bold text-xs h-11"
            >
              View in Shipments List
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {/* Complete Page Header */}
          <div className="flex items-center justify-between border-b border-slate-200/90 bg-white px-4 py-3 shrink-0 shadow-xs z-10">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
                <Truck size={17} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                  New Dispatch
                </p>
                <h2 className="text-base font-bold tracking-tight text-slate-950 leading-tight">
                  Create a Shipment
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Fully Scrollable Form Body - Everything is 100% visible */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4 pb-16">
            {/* 1. Product Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  1. Select Equipment / Cargo
                </label>
                <span className="text-[10px] text-slate-400 font-medium">5 Presets</span>
              </div>
              <div className="grid gap-2 grid-cols-1">
                {productPresets.map((preset, idx) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setItemIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      itemIndex === idx
                        ? "border-[#ed0b08] bg-red-50/60 ring-2 ring-red-500/20 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {preset.name}
                      </p>
                      <span className="text-[10px] font-semibold text-slate-500 shrink-0">
                        {preset.weight}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {preset.category} · ${preset.value.toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
              {itemIndex === 4 && (
                <div className="mt-2">
                  <Input
                    placeholder="Enter custom equipment name / model..."
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    required
                    className="h-9 text-xs bg-white"
                  />
                </div>
              )}
            </div>

            {/* 2. Addresses: Origin & Destination */}
            <div className="grid grid-cols-1 gap-3">
              {/* Origin Hub */}
              <div className="rounded-2xl border border-slate-200 p-3 bg-white shadow-xs space-y-2">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <MapPin size={14} className="text-slate-500 shrink-0" />
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Origin Dispatch Hub
                  </h4>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500">Facility / Street</span>
                  <Input
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    required
                    className="h-8.5 text-xs mt-0.5 bg-slate-50/70"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
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
                      className="h-8.5 text-xs mt-0.5 bg-slate-50/70"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500">ZIP</span>
                    <Input
                      value={fromZip}
                      onChange={(e) => setFromZip(e.target.value)}
                      required
                      className="h-8.5 text-xs mt-0.5 bg-slate-50/70"
                    />
                  </div>
                </div>
              </div>

              {/* Destination Receiver - Fully visible with clear City & ZIP */}
              <div className="rounded-2xl border-2 border-red-100 bg-white p-3 shadow-xs space-y-2">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <MapPin size={14} className="text-[#ed0b08] shrink-0" />
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#ed0b08]">
                    Destination Receiver
                  </h4>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-600">Recipient / Dealer Name</span>
                  <Input
                    placeholder="e.g. Metro Auto Electronics Inc"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    required
                    className="h-8.5 text-xs mt-0.5"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-600">Delivery Street Address</span>
                  <Input
                    placeholder="e.g. 1820 Commercial Parkway"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    required
                    className="h-8.5 text-xs mt-0.5"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="col-span-2">
                    <span className="text-[10px] font-semibold text-slate-600">City, State</span>
                    <Input
                      placeholder="Austin, TX"
                      value={toCity ? `${toCity}, ${toState}` : ""}
                      onChange={(e) => {
                        const parts = e.target.value.split(",");
                        setToCity(parts[0] ? parts[0].trim() : "");
                        setToState(parts[1] ? parts[1].trim() : "TX");
                      }}
                      required
                      className="h-8.5 text-xs mt-0.5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-600">ZIP</span>
                    <Input
                      placeholder="78701"
                      value={toZip}
                      onChange={(e) => setToZip(e.target.value)}
                      required
                      className="h-8.5 text-xs mt-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Choose Shipping Service Level */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                3. Shipping Service Level
              </label>
              <div className="grid gap-2 grid-cols-1">
                {shippingServices.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`relative p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedService === srv.id
                        ? "border-[#ed0b08] bg-red-50/60 ring-2 ring-red-500/20 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900">{srv.name}</p>
                        {srv.popular && (
                          <span className="rounded-full bg-[#ed0b08] text-white text-[9px] font-bold px-1.5 py-0.2">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{srv.eta}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-extrabold text-[#ed0b08]">
                        ${srv.basePrice.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Insurance Option */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-2.5 bg-white shadow-xs gap-2">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-red-100 text-[#ed0b08] shrink-0">
                  <Shield size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Accele Cargo Protection (+$4.50)
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Full replacement guarantee against transit damage.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeInsurance}
                onChange={(e) => setIncludeInsurance(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-300 text-[#ed0b08] focus:ring-red-500 accent-[#ed0b08] shrink-0 cursor-pointer"
              />
            </div>

            {/* 5. Rate Summary Box */}
            <div className="rounded-2xl bg-slate-950 p-3.5 text-white flex items-center justify-between shadow-md">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Total Calculated Charge
                </p>
                <p className="text-xs text-red-300 mt-0.5 truncate">
                  {currentService.name} {includeInsurance ? "+ Insurance" : ""}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xl font-black">${calculatedRate.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Pinned Bottom Actions Bar */}
          <div className="border-t border-slate-200/90 bg-white px-4 py-2.5 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] shrink-0 z-10">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Total</p>
              <p className="text-base font-black text-slate-950 leading-tight">
                ${calculatedRate.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetAndClose}
                className="text-xs h-9 px-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="brand"
                size="sm"
                className="px-4 font-bold text-xs h-9 shadow-sm shadow-red-500/20"
              >
                Confirm & Create <ArrowRight size={13} />
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
