import { useState } from "react";
import {
  Truck,
  ScanLine,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  PackagePlus,
  Box,
} from "lucide-react";
import { Button } from "./ui/button";

interface OnboardingScreenProps {
  onFinish: () => void;
}

const slides = [
  {
    step: "01",
    tag: "Commercial Electronics",
    title: "Commercial Fleet & Automotive Vision",
    description:
      "Priority logistics and order tracking designed specifically for Accele commercial backup cameras, AcceleVision displays, dashcams, and 12V wiring harnesses.",
    highlightBadge: "30+ Years of Manufacturing",
    icon: Truck,
    previewContent: (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm text-left space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-[#ed0b08] font-bold text-xs">
              <Box size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">RVC180CTD Camera</p>
              <p className="text-[10px] text-slate-400">Automotive Vision · #AC82910472</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            QA Passed
          </span>
        </div>
        <div className="rounded-xl bg-slate-50 p-2.5 flex items-center justify-between text-[11px] text-slate-600">
          <span className="font-semibold text-slate-800">Houston Hub, TX</span>
          <ArrowRight size={12} className="text-slate-400" />
          <span className="font-semibold text-slate-800">Austin, TX</span>
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
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-[#ed0b08] rounded-full w-[75%]" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Dispatched (08:30 AM)</span>
          <span className="font-bold text-slate-700">Courier Unit #TX-482</span>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    tag: "Fleet Dispatch",
    title: "Instant Shipping Quotes & Pickup Sweeps",
    description:
      "Generate instant rate estimates for Ground, 2-Day Air, and Overnight Express. Schedule warehouse courier sweeps and auto-insure high-value monitors.",
    highlightBadge: "100% Insured Cargo Care",
    icon: PackagePlus,
    previewContent: (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm text-left space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">Accele Priority 2-Day Air</span>
          <span className="text-sm font-black text-[#ed0b08]">$28.50</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
          <span>Includes Cargo Damage Protection & Direct Signature</span>
        </div>
        <div className="rounded-lg bg-red-50 p-2 text-center text-[10px] font-bold text-[#ed0b08]">
          Same-Day Dispatch Cutoff: 4:00 PM CST
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
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#f8f9fa] text-slate-900 selection:bg-[#ed0b08] selection:text-white safe-top safe-bottom overflow-y-auto">
      {/* Top Bar with Logo & Skip */}
      <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-7">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/accele-logo.png"
            alt="Accele Electronics"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </div>
        <button
          onClick={onFinish}
          className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-slate-100"
        >
          Skip to Portal
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="my-auto px-5 sm:px-8 py-6 max-w-lg mx-auto w-full text-center">
        {/* Animated Icon & Badge */}
        <div className="flex flex-col items-center">
          <div className="relative mb-5">
            <div className="absolute -inset-2 rounded-2xl bg-red-500/10 blur-xl" />
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-950/10">
              <Icon size={28} className="text-red-400" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
            <Sparkles size={11} /> {slide.highlightBadge}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mt-5 space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            {slide.description}
          </p>
        </div>

        {/* Interactive Feature Preview Card */}
        <div className="mt-6 transform transition-all duration-300">
          {slide.previewContent}
        </div>
      </div>

      {/* Bottom Navigation & Pagination Controls */}
      <div className="px-5 sm:px-8 pb-7 sm:pb-9 max-w-lg mx-auto w-full">
        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index
                  ? "w-8 bg-[#ed0b08]"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="px-4 text-xs font-bold"
            >
              <ArrowLeft size={16} /> Back
            </Button>
          )}

          <Button
            variant="brand"
            size="lg"
            onClick={handleNext}
            className="flex-1 font-bold shadow-lg shadow-red-600/20 text-xs sm:text-sm h-12"
          >
            {isLast ? "Enter Logistics Portal" : "Continue"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
