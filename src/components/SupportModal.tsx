import { useState } from "react";
import { X, Headphones, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-t-[2rem] sm:rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90dvh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Mobile Sheet Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden bg-slate-50/70">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 bg-slate-50/70">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-red-100 text-[#ed0b08] shrink-0">
              <Headphones size={19} />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#ed0b08]">
                24/7 Operations Desk
              </p>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950">
                Accele Logistics Support
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]">
          {/* Support channels quick row */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-3.5 sm:p-4 bg-slate-50">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={15} className="text-[#ed0b08]" />
                <span className="text-xs font-bold">Dispatch Hotline</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mt-1.5">1-800-800-4366</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Mon–Fri: 8 AM–6 PM CST</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-3.5 sm:p-4 bg-slate-50">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={15} className="text-[#ed0b08]" />
                <span className="text-xs font-bold">Priority Email</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mt-1.5">support@accele.com</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Avg response under 15m</p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800 border border-emerald-200/60 animate-in fade-in">
              <CheckCircle2 size={32} className="mx-auto text-emerald-600 mb-2" />
              <h4 className="text-sm sm:text-base font-bold">Support Request Dispatched</h4>
              <p className="text-xs text-emerald-700 mt-1">
                Ticket #TK-{Math.floor(10000 + Math.random() * 90000)} has been logged. Our dispatch team will follow up shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Send an Inquiry or Delivery Instruction
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                >
                  <option value="tracking">Shipment Location / Delay Query</option>
                  <option value="reroute">Reroute Address or Gate Instructions</option>
                  <option value="damage">Damaged Goods / Insurance Claim</option>
                  <option value="wholesale">Wholesale Equipment Orders</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Message / Shipment Notes
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide tracking # or details about your request..."
                  className="flex w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ed0b08]/20 focus:border-[#ed0b08]"
                  required
                />
              </div>

              <Button type="submit" variant="brand" className="w-full font-bold h-11">
                <Send size={15} /> Submit Support Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
