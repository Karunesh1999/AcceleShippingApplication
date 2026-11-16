import { useState } from "react";
import { UserAddress } from "../types";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

interface ProfileViewProps {
  addresses: UserAddress[];
  onAddAddress: (addr: UserAddress) => void;
  onDeleteAddress: (id: string) => void;
  onSetDefaultAddress: (id: string) => void;
  onRestartOnboarding?: () => void;
  onRestartSplash?: () => void;
}

export function ProfileView({
  addresses,
  onAddAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  onRestartOnboarding,
  onRestartSplash,
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
    <div className="space-y-4">
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-[#ed0b08] uppercase tracking-wider">
          Account Profile
        </span>
        <h2 className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
          Alex Morgan
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Operations Lead · Texas Logistics Center
        </p>
      </div>

      {/* Account Overview Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-sm font-extrabold text-white shrink-0">
            AM
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-xs font-bold text-slate-900 leading-tight">Alex Morgan</h3>
              <Badge variant="brand" className="text-[8px] py-0 px-1">Tier 1</Badge>
            </div>
            <p className="text-[10px] text-slate-500 leading-none mt-1">alex.morgan@accele.com</p>
            <p className="text-[9px] text-slate-400 mt-0.5">#ACC-49102-TX</p>
          </div>
        </div>

        <div className="text-right border-l border-slate-100 pl-3">
          <p className="text-[9px] font-semibold text-slate-400">Monthly Ship</p>
          <p className="text-sm font-extrabold text-[#ed0b08]">148 Units</p>
        </div>
      </div>

      {/* Saved Facilities */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-bold text-slate-950">Saved Facilities</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="text-[10px] font-bold gap-1 h-7 px-2"
          >
            <Plus size={12} /> Add
          </Button>
        </div>

        {/* Add Address Form Accordion */}
        {showAddAddress && (
          <form
            onSubmit={handleCreateAddress}
            className="rounded-2xl border border-red-200 bg-red-50/20 p-3 space-y-2.5 animate-in fade-in"
          >
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#ed0b08]">
              Register New Facility
            </h4>

            <div>
              <Input
                placeholder="Facility Name (e.g. Dallas Outfitter)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                required
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Input
                placeholder="Contact Person (e.g. John Miller)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Input
                placeholder="Street (e.g. 5200 Industrial Way)"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                required
                className="h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <Input
                placeholder="City"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                required
                className="h-8 text-xs"
              />
              <Input
                placeholder="TX"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                required
                className="h-8 text-xs"
              />
              <Input
                placeholder="ZIP"
                value={newZip}
                onChange={(e) => setNewZip(e.target.value)}
                required
                className="h-8 text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-1.5 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddAddress(false)}
                className="text-[10px] h-7 px-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" className="text-[10px] h-7 px-3">
                Save
              </Button>
            </div>
          </form>
        )}

        <div className="grid gap-2 grid-cols-1">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`rounded-2xl border p-3 transition-all bg-white ${
                addr.isDefault
                  ? "border-red-200 ring-2 ring-red-500/10 shadow-xs"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-red-100 text-[#ed0b08] text-[8px] font-bold px-1.5 py-0.2">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">{addr.name}</p>
                </div>
                {!addr.isDefault && (
                  <button
                    onClick={() => onDeleteAddress(addr.id)}
                    className="text-slate-300 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                    title="Delete address"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>

              <div className="mt-2 text-[10px] text-slate-600">
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.zip}</p>
              </div>

              {!addr.isDefault && (
                <div className="mt-2 pt-1.5 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => onSetDefaultAddress(addr.id)}
                    className="text-[10px] font-semibold text-[#ed0b08] hover:underline cursor-pointer"
                  >
                    Set as default dispatch
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preferences & Tour Buttons */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-3">
        <h3 className="text-xs font-bold text-slate-950">Preferences</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 gap-2">
            <div>
              <p className="text-[11px] font-bold text-slate-900">SMS Tracking Alerts</p>
              <p className="text-[9px] text-slate-500">Milestone checkpoint notifications.</p>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#ed0b08] focus:ring-red-500 accent-[#ed0b08] shrink-0"
            />
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100 gap-2">
            <div>
              <p className="text-[11px] font-bold text-slate-900">Auto Cargo Protection</p>
              <p className="text-[9px] text-slate-500">Declared value insurance guarantee.</p>
            </div>
            <input
              type="checkbox"
              checked={autoInsuranceEnabled}
              onChange={(e) => setAutoInsuranceEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#ed0b08] focus:ring-red-500 accent-[#ed0b08] shrink-0"
            />
          </div>

          <div className="pt-1 flex flex-wrap gap-2">
            {onRestartOnboarding && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRestartOnboarding}
                className="text-[10px] font-bold gap-1 h-7 px-2.5"
              >
                <Sparkles size={12} className="text-[#ed0b08]" /> Replay Tour
              </Button>
            )}
            {onRestartSplash && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRestartSplash}
                className="text-[10px] font-bold gap-1 text-slate-600 h-7 px-2"
              >
                <RotateCcw size={12} /> Splash
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Heritage */}
      <div className="rounded-2xl bg-slate-950 p-3.5 text-white space-y-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#ed0b08]" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Accele Heritage
          </span>
        </div>
        <p className="text-xs font-bold">Trusted Since 1990</p>
        <p className="text-[10px] text-slate-300 leading-relaxed">
          30+ years engineering automotive safety & commercial mobile video.
        </p>
      </div>
    </div>
  );
}
