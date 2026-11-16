import { useState } from "react";
import { Bell, Truck } from "lucide-react";
import { AppNotification } from "../../types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface HeaderProps {
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
  onCreateShipment: () => void;
  isIphoneMode?: boolean;
}

export function Header({
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  activePage,
  setActivePage,
  onCreateShipment,
  isIphoneMode = true,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-3.5 py-2.5">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2 transition-opacity hover:opacity-90 text-left shrink-0 cursor-pointer"
          >
            <img
              src="/assets/accele-logo.png"
              alt="Accele Electronics Logo"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </button>
        </div>

        {/* Right side actions: Notification Bell + User Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95 cursor-pointer"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#ed0b08] px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
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
                <div className="absolute right-0 top-11 z-50 w-72 xs:w-80 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-950 text-xs">Notifications</h4>
                      {unreadCount > 0 && (
                        <Badge variant="brand" className="text-[9px] py-0 px-1.5">
                          {unreadCount} new
                        </Badge>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onClearAllNotifications}
                        className="text-[10px] font-semibold text-[#ed0b08] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="mt-2.5 max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="py-4 text-center text-xs text-slate-400">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onMarkNotificationRead(n.id)}
                          className={`cursor-pointer rounded-xl p-2.5 text-left transition-colors ${
                            n.read
                              ? "bg-slate-50/70 hover:bg-slate-100/80"
                              : "bg-red-50/50 hover:bg-red-50 border border-red-100/60"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <p className="text-[11px] font-semibold text-slate-900 leading-tight">{n.title}</p>
                            <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="mt-0.5 text-[10px] text-slate-600 line-clamp-2 leading-tight">{n.message}</p>
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
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 hover:border-slate-300 transition-colors active:scale-95 cursor-pointer"
          >
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-[11px] font-bold text-white shrink-0">
              AM
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
