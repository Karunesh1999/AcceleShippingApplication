import {
  PackagePlus,
  Search,
  BookOpen,
  ShieldCheck,
  Calculator,
  Grid,
} from "lucide-react";

interface QuickActionsProps {
  onBrowseCatalog: () => void;
  onShipNow: () => void;
  onTrack: () => void;
  onTechManuals: () => void;
  onRmaWarranty: () => void;
  onQuote: () => void;
}

export function QuickActions({
  onBrowseCatalog,
  onShipNow,
  onTrack,
  onTechManuals,
  onRmaWarranty,
  onQuote,
}: QuickActionsProps) {
  const actions = [
    {
      icon: Grid,
      title: "12V Catalog",
      description: "5,000+ products",
      action: onBrowseCatalog,
      badge: "Wholesale",
    },
    {
      icon: PackagePlus,
      title: "Dispatch",
      description: "Create order",
      action: onShipNow,
      badge: "Fast",
    },
    {
      icon: BookOpen,
      title: "Wiring Manuals",
      description: "PIN schematics",
      action: onTechManuals,
    },
    {
      icon: Search,
      title: "Track Fleet",
      description: "Live GPS cargo",
      action: onTrack,
    },
    {
      icon: ShieldCheck,
      title: "RMA Claims",
      description: "Warranty service",
      action: onRmaWarranty,
    },
    {
      icon: Calculator,
      title: "Rate Quote",
      description: "Instant estimate",
      action: onQuote,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.title}
            onClick={act.action}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-3 text-left transition-all duration-200 hover:border-red-200 hover:shadow-xs cursor-pointer active:scale-[0.98]"
          >
            {act.badge && (
              <span className="absolute top-2.5 right-2.5 rounded-full bg-red-50 text-[#ed0b08] font-bold text-[9px] px-1.5 py-0.2 border border-red-100">
                {act.badge}
              </span>
            )}
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-[#ed0b08]">
              <Icon size={16} />
            </div>
            <div className="mt-2">
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
