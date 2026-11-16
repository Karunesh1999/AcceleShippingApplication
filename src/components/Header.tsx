import { useState } from "react";
import { Bell, Truck } from "lucide-react";
import { AppNotification } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface HeaderProps {
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
  onCreateShipment: () => void;
}

export function Header({
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  activePage,
  setActivePage,
  onCreateShipment,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 sm:gap-6 min-w-0">
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90 text-left shrink-0"
          >
            <img
              src="/assets/accele-logo.png"
              alt="Accele Electronics Logo"
              className="h-7 sm:h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="hidden lg:block border-l border-slate-200 pl-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ed0b08] block leading-none">
                Logistics & Fleet Portal
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {[
              { id: "home", label: "Overview" },
              { id: "shipments", label: "My Shipments" },
              { id: "track", label: "Live Tracking" },
              { id: "profile", label: "Account" },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActivePage(nav.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === nav.id
                    ? "bg-slate-100 text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Button
            variant="brand"
            size="sm"
            onClick={onCreateShipment}
            className="hidden sm:inline-flex text-xs font-bold shadow-sm"
          >
            <Truck className="h-3.5 w-3.5" />
            + New Shipment
          </Button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-[#ed0b08] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-16 sm:top-12 z-50 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-w-sm sm:max-w-none mx-auto sm:mx-0">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-950 text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <Badge variant="brand" className="text-[10px] py-0 px-1.5">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onClearAllNotifications}
                        className="text-[11px] font-semibold text-[#ed0b08] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="mt-3 max-h-[60vh] sm:max-h-80 overflow-y-auto space-y-2.5">
                    {notifications.length === 0 ? (
                      <p className="py-6 text-center text-xs text-slate-400">
                        No notifications at the moment
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead(n.id)}
                          className={`cursor-pointer rounded-xl p-3 text-left transition-colors ${
                            n.read
                              ? "bg-slate-50/70 hover:bg-slate-100/80"
                              : "bg-red-50/50 hover:bg-red-50 border border-red-100/60"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User profile pill */}
          <button
            onClick={() => setActivePage("profile")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 sm:px-2.5 sm:py-1.5 hover:border-slate-300 transition-colors active:scale-95"
          >
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-xs font-bold text-white shrink-0">
              AM
            </div>
            <div className="hidden sm:block text-left pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight">Alex Morgan</p>
              <p className="text-[10px] text-slate-400 leading-none">Houston Hub</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
