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
      description: "Create dispatch order",
      action: onShipNow,
      badge: "Fast",
    },
    {
      icon: Search,
      title: "Track Package",
      description: "Live GPS & route status",
      action: onTrack,
    },
    {
      icon: Calculator,
      title: "Get Quote",
      description: "Instant rate estimator",
      action: onQuote,
    },
    {
      icon: Headphones,
      title: "Support",
      description: "Mon–Fri, 8 AM–6 PM",
      action: onSupport,
    },
    {
      icon: CalendarClock,
      title: "Pickup Request",
      description: "Schedule warehouse sweep",
      action: onSchedulePickup,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {actions.map((act, index) => {
        const Icon = act.icon;
        const isLastOnMobile = index === actions.length - 1;
        return (
          <button
            key={act.title}
            onClick={act.action}
            className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-md cursor-pointer active:scale-[0.98] ${
              isLastOnMobile ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            {act.badge && (
              <span className="absolute top-3 right-3 rounded-full bg-red-50 text-[#ed0b08] font-bold text-[9px] px-2 py-0.5 border border-red-100">
                {act.badge}
              </span>
            )}
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-[#ed0b08]">
              <Icon size={19} />
            </div>
            <div className="mt-3.5 sm:mt-4">
              <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#ed0b08] transition-colors leading-tight">
                {act.title}
              </span>
              <span className="mt-0.5 block text-[10px] sm:text-[11px] text-slate-400 font-medium leading-tight">
                {act.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
