import { useState } from "react";
import { UserAddress } from "../types";
import {
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface ProfileViewProps {
  addresses: UserAddress[];
  onAddAddress: (addr: UserAddress) => void;
  onDeleteAddress: (id: string) => void;
  onSetDefaultAddress: (id: string) => void;
}

export function ProfileView({
  addresses,
  onAddAddress,
  onDeleteAddress,
  onSetDefaultAddress,
}: ProfileViewProps) {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newName, setNewName] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoInsuranceEnabled, setAutoInsuranceEnabled] = useState(true);

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const addr: UserAddress = {
      id: `addr-${Date.now()}`,
      label: newLabel || "Additional Facility",
      name: newName || "Receiving Dock",
      street: newStreet,
      city: newCity,
      state: newState,
      zip: newZip,
      phone: newPhone || "(800) 555-0199",
      isDefault: false,
    };
    onAddAddress(addr);
    setShowAddAddress(false);
    setNewLabel("");
    setNewName("");
    setNewStreet("");
    setNewCity("");
    setNewState("");
    setNewZip("");
    setNewPhone("");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold text-[#ed0b08] uppercase tracking-wider">
          Account & Logistics Profile
        </span>
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
          Alex Morgan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Operations Lead · Accele Electronics Texas Logistics Center
        </p>
      </div>

      {/* Account Overview Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="grid h-13 w-13 sm:h-16 sm:w-16 place-items-center rounded-2xl bg-slate-950 text-lg sm:text-xl font-extrabold text-white shrink-0">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Alex Morgan</h3>
              <Badge variant="brand" className="text-[10px] sm:text-xs">Enterprise Tier 1</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">alex.morgan@accele.com</p>
            <p className="text-[11px] text-slate-400">Account ID: #ACC-49102-TX</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-3.5 md:pt-0 md:pl-6">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400">Monthly Dispatches</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-950 mt-0.5">148 Units</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400">Preferred Speed</p>
            <p className="text-lg sm:text-xl font-extrabold text-[#ed0b08] mt-0.5">2-Day Air</p>
          </div>
        </div>
      </div>

      {/* Saved Facilities / Addresses */}
      <div className="space-y-3.5 sm:space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950">Saved Facilities & Warehouses</h3>
            <p className="text-xs text-slate-400 hidden xs:block">
              Preset dispatch hubs and verified delivery destinations
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="text-xs font-bold gap-1 shrink-0"
          >
            <Plus size={14} /> Add Address
          </Button>
        </div>

        {/* Add Address Form Accordion */}
        {showAddAddress && (
          <form
            onSubmit={handleCreateAddress}
            className="rounded-2xl border border-red-200 bg-red-50/20 p-4 sm:p-5 space-y-3.5 sm:space-y-4 animate-in fade-in"
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ed0b08]">
              Register New Facility / Address
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Location Nickname
                </label>
                <Input
                  placeholder="e.g. Dallas Fleet Outfitter"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Contact Person / Dock Lead
                </label>
                <Input
                  placeholder="e.g. John Miller"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Street Address
              </label>
              <Input
                placeholder="e.g. 5200 Industrial Way, Bay 3"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <Input
                  placeholder="Dallas"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
                <Input
                  placeholder="TX"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ZIP</label>
                <Input
                  placeholder="75201"
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddAddress(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm">
                Save Facility
              </Button>
            </div>
          </form>
        )}

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all bg-white ${
                addr.isDefault
                  ? "border-red-200 ring-2 ring-red-500/10 shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-red-100 text-[#ed0b08] text-[9px] font-bold px-2 py-0.5">
                        Default Origin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{addr.name}</p>
                </div>
                {!addr.isDefault && (
                  <button
                    onClick={() => onDeleteAddress(addr.id)}
                    className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                    title="Delete address"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <div className="mt-3 text-xs text-slate-600">
                <p>{addr.street}</p>
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
                <p className="text-slate-400 mt-1">{addr.phone}</p>
              </div>

              {!addr.isDefault && (
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onSetDefaultAddress(addr.id)}
                    className="text-xs font-semibold text-[#ed0b08] hover:underline"
                  >
                    Set as default dispatch
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preferences & Settings */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-950">Shipping Preferences</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 gap-3">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">Real-time SMS & Email Tracking Alerts</p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Receive notifications when shipment changes checkpoints.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-[#ed0b08] focus:ring-red-500 accent-[#ed0b08] shrink-0"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 gap-3">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">Auto-Apply Cargo Protection</p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Automatically add declared value protection for high-value displays and commercial cameras.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoInsuranceEnabled}
              onChange={(e) => setAutoInsuranceEnabled(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-[#ed0b08] focus:ring-red-500 accent-[#ed0b08] shrink-0"
            />
          </div>
        </div>
      </div>

      {/* 30-Year Accele Electronics Heritage */}
      <div className="rounded-2xl sm:rounded-3xl bg-slate-950 p-5 sm:p-6 text-white space-y-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#ed0b08]" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
            Accele Electronics Heritage
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold">Trusted by Commercial Fleets Since 1990</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          For over three decades, Accele Electronics has engineered automotive safety, 12V mobile entertainment, and commercial vehicle monitoring technology. Our dedicated logistics network ensures critical fleet components reach dealers, outfitting depots, and municipal fleets on time.
        </p>
      </div>
    </div>
  );
}
