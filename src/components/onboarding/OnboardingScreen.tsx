import { useState } from "react";
import {
  Truck,
  ScanLine,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  MapPin,
  PackagePlus,
  Box,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/button";

interface OnboardingScreenProps {
  onFinish: () => void;
}

const slides = [
  {
    step: "01",
    tag: "Wholesale Catalog",
    title: "5,000+ Automotive 12V Electronics",
    description:
      "Explore commercial backup cameras, AcceleVision overhead displays, seat heater pads, and Beuler relays with Tier 1 wholesale dealer pricing.",
    highlightBadge: "35+ Years in Santa Fe Springs",
    icon: Box,
    previewContent: (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm text-left space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-[#ed0b08] font-bold text-xs">
              <Box size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">RVC180CTD Camera</p>
              <p className="text-[10px] text-slate-400">Moving Object Recognition · $169</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            In Stock
          </span>
        </div>
        <div className="rounded-xl bg-slate-50 p-2 flex items-center justify-between text-[10px] text-slate-600">
          <span>MSRP: <span className="line-through text-slate-400">$289.00</span></span>
          <span className="font-bold text-[#ed0b08]">Tier 1: $169.00 (Save 41%)</span>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    tag: "Live Telematics",
    title: "Real-Time Telematics & Milestone Tracking",
    description:
      "Track package progress across regional sorting hubs, monitor delivery vehicle couriers, and simulate barcode label scans straight from your shop.",
    highlightBadge: "GPS Route Visibility",
    icon: ScanLine,
    previewContent: (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm text-left space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700 flex items-center gap-1.5">
            <MapPin size={13} className="text-[#ed0b08]" /> Out for Delivery
          </span>
          <span className="text-[#ed0b08] font-bold">ETA Today 4:30 PM</span>
        </div>
        <div className="rounded-xl bg-slate-950 p-3 text-white space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>TRACKING ID</span>
            <span className="font-mono text-red-300 font-bold">#AC82910472</span>
          </div>
          <p className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Courier Unit #TX-482
          </p>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Dispatched (08:30 AM)</span>
          <span className="font-bold text-emerald-600">On Schedule</span>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    tag: "Technician Hub",
    title: "Wiring Manuals & Instant RMA Claims",
    description:
      "Access interactive harness pin-out schematics and wire color guides in the field, or generate instant 1-click RMA return numbers for warranty service.",
    highlightBadge: "Installer Tech Support",
    icon: ShieldCheck,
    previewContent: (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm text-left space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">RMA Authorization Ready</span>
          <span className="text-[10px] font-mono font-bold text-[#ed0b08]">RMA-ACC-89104</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>Santa Fe Springs HQ 1-Year Commercial Warranty</span>
        </div>
        <div className="rounded-lg bg-red-50 p-1.5 text-center text-[10px] font-bold text-[#ed0b08]">
          Hotline: (800) 788-1212 Ext. 170
        </div>
      </div>
    ),
  },
];

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#f8f9fa] text-slate-900 selection:bg-[#ed0b08] selection:text-white overflow-y-auto p-4 sm:p-6">
      {/* Top Bar with Logo & Skip */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <img
            src="/assets/accele-logo.png"
            alt="Accele Electronics"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>
        <button
          onClick={onFinish}
          className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer px-2.5 py-1 rounded-full hover:bg-slate-100"
        >
          Skip to Portal
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="my-auto py-4 text-center space-y-4">
        {/* Animated Icon & Badge */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="absolute -inset-2 rounded-2xl bg-red-500/10 blur-xl" />
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-950/10">
              <Icon size={24} className="text-red-400" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
            <Sparkles size={11} /> {slide.highlightBadge}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {slide.title}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed px-2">
            {slide.description}
          </p>
        </div>

        {/* Feature Preview Card */}
        <div className="pt-2">{slide.previewContent}</div>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="pb-2 space-y-4">
        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index
                  ? "w-7 bg-[#ed0b08]"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="px-3.5 text-xs font-bold h-11"
            >
              <ArrowLeft size={15} /> Back
            </Button>
          )}

          <Button
            variant="brand"
            size="lg"
            onClick={handleNext}
            className="flex-1 font-bold shadow-lg shadow-red-600/20 text-xs h-11"
          >
            {isLast ? "Enter Logistics Portal" : "Continue"}
            <ArrowRight size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
