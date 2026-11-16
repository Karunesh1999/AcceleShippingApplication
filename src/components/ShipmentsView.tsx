import { useState } from "react";
import { Shipment } from "../types";
import { ShipmentCard } from "./ShipmentCard";
import { Search, Plus, PackageX, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    <div className="space-y-5 sm:space-y-6">
      {/* Title & Action */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#ed0b08] uppercase tracking-wider">
            Logistics Console
          </span>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-0.5">
            All Shipments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden xs:block">
            Real-time status overview of outgoing equipment orders.
          </p>
        </div>
        <Button variant="brand" size="sm" onClick={onCreateShipment} className="font-bold shrink-0 text-xs sm:text-sm sm:h-10">
          <Plus size={16} /> <span className="hidden xs:inline">New Shipment</span><span className="xs:hidden">Ship</span>
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracking ID, item, or city..."
            className="pl-9 sm:pl-10 h-10 sm:h-11 text-xs sm:text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm shrink-0 h-10 sm:h-11">
            <ArrowUpDown size={14} className="text-slate-400" />
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value="newest">Recent</option>
              <option value="progress">Progress %</option>
              <option value="name">Item Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setSelectedFilter(tab.label)}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3.5 py-1.5 sm:py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Shipments List */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center">
          <div className="mx-auto grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <PackageX size={26} />
          </div>
          <h3 className="mt-3.5 text-sm sm:text-base font-bold text-slate-900">No shipments found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No packages match "${searchQuery}". Try a different ID or city.`
              : "There are currently no shipments under this status."}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-3.5 text-xs"
            >
              Clear Search Query
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2">
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
