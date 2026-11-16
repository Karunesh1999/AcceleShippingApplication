import { useState } from "react";
import { Shipment } from "../types";
import { ShipmentCard } from "../components/layout/ShipmentCard";
import { Search, Plus, PackageX, ArrowUpDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface ShipmentsViewProps {
  shipments: Shipment[];
  onOpenShipment: (shipment: Shipment) => void;
  onCreateShipment: () => void;
  onCopyId: (id: string, e: React.MouseEvent) => void;
}

export function ShipmentsView({
  shipments,
  onOpenShipment,
  onCreateShipment,
  onCopyId,
}: ShipmentsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"newest" | "progress" | "name">("newest");

  // Filtering
  const filtered = shipments.filter((s) => {
    const matchesFilter =
      selectedFilter === "All" ? true : s.status.toLowerCase() === selectedFilter.toLowerCase();

    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.from.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.to.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress;
    if (sortBy === "name") return a.item.localeCompare(b.item);
    return 0;
  });

  const filterTabs = [
    { label: "All", count: shipments.length },
    {
      label: "In transit",
      count: shipments.filter((s) => s.status === "In transit").length,
    },
    {
      label: "Processing",
      count: shipments.filter((s) => s.status === "Processing").length,
    },
    {
      label: "Delivered",
      count: shipments.filter((s) => s.status === "Delivered").length,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Title & Action */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-[#ed0b08] uppercase tracking-wider">
            Logistics Console
          </span>
          <h2 className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
            All Shipments
          </h2>
        </div>
        <Button variant="brand" size="sm" onClick={onCreateShipment} className="font-bold shrink-0 text-xs h-8 px-2.5">
          <Plus size={14} /> New Ship
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-2">
        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ID, item, or city..."
            className="pl-8.5 h-9 text-xs"
          />
        </div>

        {/* Sort and Filters */}
        <div className="flex items-center justify-between gap-1.5">
          {/* Status Filter Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none flex-1">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setSelectedFilter(tab.label)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1 py-0.2 text-[9px] font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-600 shadow-xs shrink-0 h-7.5">
            <ArrowUpDown size={11} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value="newest">Recent</option>
              <option value="progress">Progress</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipments List */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-400">
            <PackageX size={20} />
          </div>
          <h3 className="mt-2.5 text-xs font-bold text-slate-900">No shipments found</h3>
          <p className="mt-0.5 text-[10px] text-slate-500">
            {searchQuery
              ? `No packages match "${searchQuery}".`
              : "No shipments under this status."}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-2.5 text-[10px] h-7 px-2.5"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1">
          {sorted.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              onOpen={() => onOpenShipment(shipment)}
              onCopyId={onCopyId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
