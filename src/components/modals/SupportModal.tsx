import { useState } from "react";
import { X, Headphones, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("tracking");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("alex@accele.demo");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage("");
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-[1.75rem] bg-white shadow-2xl border-t border-slate-200 max-h-[88%] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Mobile Sheet Handle */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-50/80 shrink-0">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
              <Headphones size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
                24/7 Operations Desk
              </p>
              <h2 className="text-base font-bold tracking-tight text-slate-950">
                Accele Logistics Support
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-3.5 overflow-y-auto overscroll-contain space-y-4 flex-1 min-h-0 pb-[max(16px,env(safe-area-inset-bottom))]">
          {/* Support channels quick row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-200 p-2.5 bg-slate-50">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Phone size={13} className="text-[#ed0b08]" />
                <span className="text-[11px] font-bold">Hotline</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">1-800-800-4366</p>
              <p className="text-[9px] text-slate-500 mt-0.5">8 AM–6 PM CST</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-2.5 bg-slate-50">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Mail size={13} className="text-[#ed0b08]" />
                <span className="text-[11px] font-bold">Priority Email</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1 truncate">support@accele.com</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Avg response &lt;15m</p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-xl bg-emerald-50 p-5 text-center text-emerald-800 border border-emerald-200/60 animate-in fade-in">
              <CheckCircle2 size={28} className="mx-auto text-emerald-600 mb-1.5" />
              <h4 className="text-sm font-bold">Support Request Dispatched</h4>
              <p className="text-xs text-emerald-700 mt-1">
                Ticket #TK-{Math.floor(10000 + Math.random() * 90000)} has been logged. Our dispatch team will follow up shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Send an Inquiry or Delivery Instruction
              </h4>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex h-9 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                >
                  <option value="tracking">Shipment Location / Delay Query</option>
                  <option value="reroute">Reroute Address / Gate Instructions</option>
                  <option value="damage">Damaged Goods / Insurance Claim</option>
                  <option value="wholesale">Wholesale Equipment Orders</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-8.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Message / Shipment Notes
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide tracking # or details about your request..."
                  className="flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                  required
                />
              </div>

              <Button type="submit" variant="brand" className="w-full font-bold h-9 text-xs">
                <Send size={14} /> Submit Support Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
