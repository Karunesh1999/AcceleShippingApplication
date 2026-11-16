import { X, BookOpen, Download, AlertCircle, Wrench, Check } from "lucide-react";
import { TechManual } from "../../data/manuals";
import { Button } from "../ui/button";

interface ManualDetailModalProps {
  manual: TechManual | null;
  onClose: () => void;
  onDownload: (title: string) => void;
}

export function ManualDetailModal({
  manual,
  onClose,
  onDownload,
}: ManualDetailModalProps) {
  if (!manual) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
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
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                {manual.docType}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                {manual.model}
              </span>
            </div>
            <h2 className="text-sm font-bold tracking-tight text-slate-950 mt-0.5 truncate">
              {manual.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Diagram & Pinouts */}
        <div className="p-4 overflow-y-auto overscroll-contain space-y-4 flex-1 min-h-0">
          {/* Summary Card */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
            <p className="font-medium">{manual.summary}</p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
              <span>Updated: {manual.updatedAt}</span>
              <span>•</span>
              <span>Doc Size: {manual.fileSize}</span>
            </div>
          </div>

          {/* Color-Coded Harness Pinout Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Wrench size={14} className="text-[#ed0b08]" />
              Wire Harness Pinout & Color Code
            </h3>

            <div className="space-y-2">
              {manual.pinouts.map((pin, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Color indicator pill */}
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: pin.colorHex }}
                      />
                      <span className="text-xs font-bold text-slate-900">
                        {pin.wireColor}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({pin.pin})
                      </span>
                    </div>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                      {pin.functionName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-5.5 leading-tight">
                    {pin.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Installer Bulletins & Field Tips */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <AlertCircle size={14} className="text-amber-500" />
              Field Installation Tips
            </h3>
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-2">
              {manual.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-950">
                  <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-tight">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center justify-between gap-2.5 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs h-9"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="brand"
            size="sm"
            onClick={() => onDownload(manual.title)}
            className="flex-1 font-bold text-xs h-9 gap-1.5 shadow-sm shadow-red-500/20"
          >
            <Download size={14} />
            <span>Download Official PDF ({manual.fileSize})</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
