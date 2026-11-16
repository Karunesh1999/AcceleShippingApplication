import { useState } from "react";
import { Search, Sparkles, Filter, ChevronRight, Check, BookOpen, Truck } from "lucide-react";
import { acceleProducts, Product } from "../data/products";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

interface CatalogViewProps {
  onSelectProduct: (product: Product) => void;
  onDispatchProduct: (product: Product) => void;
  onViewManual: (partNumber: string) => void;
}

export function CatalogView({
  onSelectProduct,
  onDispatchProduct,
  onViewManual,
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Cameras & ADAS",
    "Displays & Monitors",
    "Sensors & Dashcams",
    "Comfort & Convenience",
    "Power & Relays",
  ];

  const filteredProducts = acceleProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Title & Tier Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-[#ed0b08] uppercase tracking-wider">
            Accele Electronics Catalog
          </span>
          <h2 className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
            Automotive Electronics
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            12-Volt Mobile Video, Safety, Cameras & Upfitting
          </p>
        </div>
        <Badge variant="brand" className="text-[9px] py-0.5 px-2 shrink-0">
          Tier 1 Wholesale
        </Badge>
      </div>

      {/* Dealer Pricing Alert Banner */}
      <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/80 to-white p-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#ed0b08] text-white shrink-0">
            <Sparkles size={14} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">
              Authorized Wholesale Active
            </p>
            <p className="text-[10px] text-slate-500">
              Save up to 45% off MSRP on bulk dispatch orders
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search camera, monitor, sensor, part #..."
          className="pl-8.5 h-9 text-xs bg-white"
        />
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
          <span>Showing {filteredProducts.length} items</span>
          <span>Santa Fe Springs, CA Stock</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-xs font-bold text-slate-900">No equipment matches query</p>
            <p className="text-[10px] text-slate-400 mt-1">Try another part number or reset category filter.</p>
          </div>
        ) : (
          <div className="grid gap-2.5 grid-cols-1">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative rounded-2xl border border-slate-200 bg-white p-3 shadow-xs hover:border-slate-300 transition-all cursor-pointer space-y-2.5"
              >
                {/* Header row: Brand & Part Number + Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold font-mono text-slate-700">
                      {product.partNumber}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {product.brand}
                    </span>
                  </div>
                  {product.badge && (
                    <span className="rounded-full bg-red-50 text-[#ed0b08] text-[9px] font-bold px-2 py-0.5 border border-red-200">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Name & Description */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#ed0b08] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                    {product.description}
                  </p>
                </div>

                {/* Price and Stock Row */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-extrabold text-slate-900">
                        ${product.dealerPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        MSRP ${product.msrp.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
                      <Check size={10} /> {product.leadTime}
                    </span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onViewManual(product.partNumber)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="View Wiring Manual"
                    >
                      <BookOpen size={13} />
                    </button>
                    <button
                      onClick={() => onDispatchProduct(product)}
                      className="flex items-center gap-1 rounded-lg bg-[#ed0b08] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-2xs hover:bg-red-700 active:scale-95 transition-all"
                    >
                      <Truck size={12} />
                      <span>Dispatch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
