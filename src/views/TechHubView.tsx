import { useState } from "react";
import {
  Wrench,
  BookOpen,
  ShieldCheck,
  Search,
  Download,
  Phone,
  Mail,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { techManuals, TechManual } from "../data/manuals";
import { RmaClaim } from "../data/rma";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

interface TechHubViewProps {
  rmaClaims: RmaClaim[];
  onOpenManual: (manual: TechManual) => void;
  onOpenNewRma: () => void;
  onDownloadManual: (title: string) => void;
}

export function TechHubView({
  rmaClaims,
  onOpenManual,
  onOpenNewRma,
  onDownloadManual,
}: TechHubViewProps) {
  const [subTab, setSubTab] = useState<"manuals" | "rma">("manuals");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredManuals = techManuals.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Title & Navigation */}
      <div>
        <span className="text-[10px] font-bold text-[#ed0b08] uppercase tracking-wider">
          Installer & Service Center
        </span>
        <h2 className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
          Technician Hub & Warranty
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Wiring Schematics, PDF Manuals & RMA Claims
        </p>
      </div>

      {/* Sub-Tab Switcher */}
      <div className="grid grid-cols-2 rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
        <button
          onClick={() => setSubTab("manuals")}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            subTab === "manuals"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen size={13} className={subTab === "manuals" ? "text-[#ed0b08]" : ""} />
          <span>Wiring & Manuals</span>
        </button>
        <button
          onClick={() => setSubTab("rma")}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            subTab === "rma"
              ? "bg-white text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck size={13} className={subTab === "rma" ? "text-[#ed0b08]" : ""} />
          <span>RMA & Warranty</span>
          {rmaClaims.length > 0 && (
            <span className="h-4 min-w-4 px-1 rounded-full bg-[#ed0b08] text-[9px] font-bold text-white flex items-center justify-center">
              {rmaClaims.length}
            </span>
          )}
        </button>
      </div>

      {/* SUB-TAB 1: WIRING & MANUALS */}
      {subTab === "manuals" && (
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diagram by model (RVC180, HEAT-200, LCD102)..."
              className="pl-8.5 h-9 text-xs bg-white"
            />
          </div>

          {/* Quick Notice */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-[11px] text-slate-600 flex items-start gap-2">
            <Wrench size={14} className="text-[#ed0b08] shrink-0 mt-0.5" />
            <span>
              Tap any manual to view wire color codes, trigger logic, and bench test calibration notes.
            </span>
          </div>

          {/* Manuals List */}
          <div className="space-y-2.5">
            {filteredManuals.map((manual) => (
              <div
                key={manual.id}
                onClick={() => onOpenManual(manual)}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold font-mono text-slate-800">
                      {manual.model}
                    </span>
                    <span className="text-[10px] text-slate-400">{manual.category}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 font-mono">
                    {manual.fileSize}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {manual.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                    {manual.summary}
                  </p>
                </div>

                {/* Wire color preview bar */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-[9px] uppercase font-semibold">Harness:</span>
                    {manual.pinouts.slice(0, 4).map((p, idx) => (
                      <span
                        key={idx}
                        className="h-2.5 w-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: p.colorHex }}
                        title={`${p.pin}: ${p.wireColor} (${p.functionName})`}
                      />
                    ))}
                    <span className="text-slate-400 text-[9px] ml-0.5">+{manual.pinouts.length} pins</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#ed0b08] font-bold text-[10px]">
                    <span>View Diagram</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: RMA & WARRANTY */}
      {subTab === "rma" && (
        <div className="space-y-3">
          {/* Top Action Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Warranty Return Claims
            </h3>
            <Button
              variant="brand"
              size="sm"
              onClick={onOpenNewRma}
              className="text-xs h-8 px-2.5 font-bold gap-1"
            >
              <Plus size={13} />
              <span>New RMA</span>
            </Button>
          </div>

          {/* Warranty Terms Card */}
          <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/70 to-white p-3.5 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#ed0b08]" />
              <h4 className="text-xs font-bold text-slate-900">
                Accele 1-Year Limited Commercial Warranty
              </h4>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              All authorized dealer equipment is covered against manufacturing defects. Tier 1 partners qualify for 30-day advance cross-ship replacements.
            </p>
          </div>

          {/* Claims List */}
          <div className="space-y-2.5">
            {rmaClaims.map((claim) => (
              <div
                key={claim.id}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-bold font-mono text-white">
                      {claim.id}
                    </span>
                    <span className="text-[10px] text-slate-400">{claim.createdAt}</span>
                  </div>
                  <Badge variant="brand" className="text-[9px] py-0 px-1.5">
                    {claim.status}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{claim.productName}</h4>
                  <p className="text-[10px] font-mono text-slate-500">
                    Model: {claim.partNumber} · S/N: {claim.serialNumber}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-2 border border-slate-100 text-[10px] space-y-1">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold">Issue:</span>
                    <span className="text-[#ed0b08] font-bold">{claim.issueType}</span>
                  </div>
                  <p className="text-slate-500 leading-tight">
                    <span className="font-semibold text-slate-700">Resolution:</span> {claim.resolution}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Santa Fe Springs Tech Hotline */}
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-3.5 text-white space-y-2 mt-4">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Santa Fe Springs HQ Tech Support</span>
            </h4>
            <p className="text-[10px] text-slate-300">
              Need on-bench diagnostic help? Talk directly with Accele master 12V technicians:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:18007881212"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 p-2 text-xs font-bold text-white transition-colors"
              >
                <Phone size={12} className="text-[#ed0b08]" />
                <span>(800) 788-1212</span>
              </a>
              <a
                href="mailto:techsupport@accele.com"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 p-2 text-xs font-bold text-white transition-colors"
              >
                <Mail size={12} className="text-[#ed0b08]" />
                <span>Tech Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
