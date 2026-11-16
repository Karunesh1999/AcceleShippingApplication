import { useState } from "react";
import { X, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { RmaClaim } from "../../data/rma";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface RmaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimSubmitted: (claim: RmaClaim) => void;
}

export function RmaModal({ isOpen, onClose, onClaimSubmitted }: RmaModalProps) {
  const [model, setModel] = useState("RVC-180CTD");
  const [productName, setProductName] = useState("Commercial Moving Object Camera");
  const [serialNumber, setSerialNumber] = useState("");
  const [issueType, setIssueType] = useState<RmaClaim["issueType"]>("No Video Signal");
  const [dealerFacility, setDealerFacility] = useState("Texas Logistics Hub (Houston)");
  const [notes, setNotes] = useState("");
  const [submittedRma, setSubmittedRma] = useState<RmaClaim | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRmaNumber = Math.floor(10000 + Math.random() * 90000);
    const newClaim: RmaClaim = {
      id: `RMA-ACC-${randomRmaNumber}`,
      serialNumber: serialNumber || `SN-${model}-7719`,
      productName,
      partNumber: model,
      issueType,
      status: "RMA Approved",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      dealerName: "Alex Morgan · Texas Logistics",
      resolution: "Pre-paid return shipping label generated. Ship defective unit to Santa Fe Springs HQ within 14 days.",
      shippingHub: "Santa Fe Springs Facility (9130 Norwalk Blvd, CA)",
    };

    setSubmittedRma(newClaim);
    onClaimSubmitted(newClaim);
  };

  const handleReset = () => {
    setSubmittedRma(null);
    setSerialNumber("");
    setNotes("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={handleReset}
    >
      <div
        className="w-full rounded-t-[1.75rem] bg-white shadow-2xl border-t border-slate-200 max-h-[90%] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Mobile Sheet Handle */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-50/80 shrink-0">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                Accele Warranty Service
              </p>
              <h2 className="text-base font-bold tracking-tight text-slate-950">
                File RMA Return Claim
              </h2>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto overscroll-contain space-y-4 flex-1 min-h-0">
          {submittedRma ? (
            <div className="space-y-4 text-center py-2">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-6 ring-emerald-50/50">
                <CheckCircle2 size={26} />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  RMA Number Authorized
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {submittedRma.id}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authorized return for: {submittedRma.productName} ({submittedRma.partNumber})
                </p>
              </div>

              {/* Instructions Box */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-left text-xs space-y-2">
                <p className="font-bold text-slate-900">Return Instructions:</p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  <li>Pack defective unit with original wiring harness if possible.</li>
                  <li>Write <span className="font-bold text-slate-900 font-mono">{submittedRma.id}</span> clearly on the outside of the box.</li>
                  <li>Ship to: <span className="font-bold text-slate-900">Accele Electronics RMA Dept, 9130 Norwalk Blvd, Santa Fe Springs, CA 90670</span>.</li>
                </ol>
              </div>

              <Button
                variant="brand"
                onClick={handleReset}
                className="w-full font-bold text-xs h-10"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Equipment Model / Part Number
                </label>
                <select
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    if (e.target.value === "RVC-180CTD") setProductName("Commercial Moving Object Camera");
                    else if (e.target.value === "LCD-102FL") setProductName("AcceleVision 10.2\" Overhead Display");
                    else if (e.target.value === "HEAT-200") setProductName("Dual-Temp Carbon Fiber Seat Heater");
                    else if (e.target.value === "MDVR-4000") setProductName("4-Channel Fleet Mobile DVR");
                    else setProductName("Beuler High-Current Relay");
                  }}
                  className="flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                >
                  <option value="RVC-180CTD">RVC-180CTD - Commercial Moving Object Camera</option>
                  <option value="LCD-102FL">LCD-102FL - AcceleVision 10.2" Overhead Display</option>
                  <option value="HEAT-200">HEAT-200 - Carbon Fiber Seat Heater Kit</option>
                  <option value="MDVR-4000">MDVR-4000 - 4-Channel Mobile DVR with GPS</option>
                  <option value="BU-5084">BU-5084 - Beuler 40/60A Weatherproof Relay</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Serial Number (Barcode on Unit / Box)
                </label>
                <Input
                  placeholder="e.g. SN-RVC-2026-9041"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  required
                  className="h-8.5 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Bench Test Defect / Failure Mode
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value as any)}
                  className="flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                >
                  <option value="No Video Signal">No Video Signal / Blank Black Screen</option>
                  <option value="Power Failure">Power Failure / Unit Does Not Turn On</option>
                  <option value="Physical Defect">Physical Defect / Loose Housing</option>
                  <option value="Audio Distortion">Audio Noise / Buzzer Failure</option>
                  <option value="Bench Test DOA">Bench Test DOA (Dead on Arrival)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Dispatch Facility / Origin
                </label>
                <Input
                  value={dealerFacility}
                  onChange={(e) => setDealerFacility(e.target.value)}
                  required
                  className="h-8.5 text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Technician Notes & Test Voltage
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Bench tested on regulated 13.8V bench supply..."
                  className="flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                className="w-full font-bold h-9 text-xs gap-1.5 shadow-sm shadow-red-500/20"
              >
                <span>Authorize RMA & Generate Label</span>
                <ArrowRight size={13} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
