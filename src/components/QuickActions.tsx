import { PackagePlus, Search, Calculator, Headphones, CalendarClock } from "lucide-react";

interface QuickActionsProps {
  onShipNow: () => void;
  onTrack: () => void;
  onQuote: () => void;
  onSupport: () => void;
  onSchedulePickup: () => void;
}

export function QuickActions({
  onShipNow,
  onTrack,
  onQuote,
  onSupport,
  onSchedulePickup,
}: QuickActionsProps) {
  const actions = [
    {
      icon: PackagePlus,
      title: "Ship Now",
      description: "Create order",
      action: onShipNow,
      badge: "Fast",
    },
    {
      icon: Search,
      title: "Track Package",
      description: "Live GPS",
      action: onTrack,
    },
    {
      icon: Calculator,
      title: "Get Quote",
      description: "Rate estimate",
      action: onQuote,
    },
    {
      icon: Headphones,
      title: "Support",
      description: "8 AM–6 PM",
      action: onSupport,
    },
    {
      icon: CalendarClock,
      title: "Pickup Request",
      description: "Warehouse sweep",
      action: onSchedulePickup,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {actions.map((act, index) => {
        const Icon = act.icon;
        const isLast = index === actions.length - 1;
        return (
          <button
            key={act.title}
            onClick={act.action}
            className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-3 text-left transition-all duration-200 hover:border-red-200 hover:shadow-xs cursor-pointer active:scale-[0.98] ${
              isLast ? "col-span-2" : ""
            }`}
          >
            {act.badge && (
              <span className="absolute top-2.5 right-2.5 rounded-full bg-red-50 text-[#ed0b08] font-bold text-[9px] px-1.5 py-0.2 border border-red-100">
                {act.badge}
              </span>
            )}
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-[#ed0b08]">
              <Icon size={18} />
            </div>
            <div className="mt-2.5">
              <span className="block text-xs font-bold text-slate-900 group-hover:text-[#ed0b08] transition-colors leading-tight">
                {act.title}
              </span>
              <span className="mt-0.5 block text-[10px] text-slate-400 font-medium leading-tight">
                {act.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
