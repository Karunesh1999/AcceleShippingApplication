import { useState } from "react";
import {
  initialShipments,
  initialNotifications,
  sampleAddresses,
} from "./data/shipments";
import { Shipment, AppNotification, UserAddress } from "./types";
import { Header } from "./components/Header";
import { HomeView } from "./components/HomeView";
import { ShipmentsView } from "./components/ShipmentsView";
import { TrackView } from "./components/TrackView";
import { ProfileView } from "./components/ProfileView";
import { ShipmentDetailModal } from "./components/ShipmentDetailModal";
import { CreateShipmentModal } from "./components/CreateShipmentModal";
import { QuoteCalculatorModal } from "./components/QuoteCalculatorModal";
import { SupportModal } from "./components/SupportModal";
import { SchedulePickupModal } from "./components/SchedulePickupModal";
import {
  Home as HomeIcon,
  Package,
  ScanLine,
  User,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");

  // State collections
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(initialNotifications);
  const [addresses, setAddresses] = useState<UserAddress[]>(sampleAddresses);

  // Modals state
  const [activeShipmentDetail, setActiveShipmentDetail] =
    useState<Shipment | null>(null);
  const [isCreatingShipment, setIsCreatingShipment] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isPickupOpen, setIsPickupOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyId = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(id).catch(() => {});
    showToast(`Tracking ID #${id} copied to clipboard!`);
  };

  const handleCreateShipment = (newShipment: Shipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    const newNotification: AppNotification = {
      id: `notif-${Date.now()}`,
      title: "New Shipment Dispatched",
      message: `${newShipment.item} (#${newShipment.id}) has been added to the logistics queue.`,
      time: "Just now",
      read: false,
      type: "shipment",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    showToast(`Shipment #${newShipment.id} successfully created!`);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read.");
  };

  const handleAddAddress = (newAddr: UserAddress) => {
    setAddresses((prev) => [...prev, newAddr]);
    showToast(`Facility "${newAddr.label}" saved successfully.`);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Facility removed.");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast("Default dispatch facility updated.");
  };

  const navigation = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "shipments", label: "Shipments", icon: Package },
    { key: "track", label: "Track", icon: ScanLine },
    { key: "profile", label: "Account", icon: User },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#f4f5f7] text-slate-900 selection:bg-[#ed0b08] selection:text-white antialiased flex flex-col justify-between">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full bg-slate-950 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200 w-[90%] max-w-sm justify-center">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Main App Container */}
      <div className="mx-auto w-full min-h-[100dvh] max-w-6xl bg-white shadow-[0_0_50px_rgba(15,23,42,0.04)] flex flex-col">
        {/* Header with Safe Area Top */}
        <Header
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onClearAllNotifications={handleClearAllNotifications}
          activePage={activePage}
          setActivePage={setActivePage}
          onCreateShipment={() => setIsCreatingShipment(true)}
        />

        {/* Dynamic Page Views with Bottom Padding for Mobile Nav */}
        <main className="flex-1 px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 md:pb-12">
          {activePage === "home" && (
            <HomeView
              shipments={shipments}
              onOpenShipment={(shipment) => setActiveShipmentDetail(shipment)}
              onCreateShipment={() => setIsCreatingShipment(true)}
              onTrack={() => setActivePage("track")}
              onQuote={() => setIsQuoteOpen(true)}
              onSupport={() => setIsSupportOpen(true)}
              onSchedulePickup={() => setIsPickupOpen(true)}
              onViewAllShipments={() => setActivePage("shipments")}
              onCopyId={handleCopyId}
            />
          )}

          {activePage === "shipments" && (
            <ShipmentsView
              shipments={shipments}
              onOpenShipment={(shipment) => setActiveShipmentDetail(shipment)}
              onCreateShipment={() => setIsCreatingShipment(true)}
              onCopyId={handleCopyId}
            />
          )}

          {activePage === "track" && (
            <TrackView
              shipments={shipments}
              onOpenShipment={(shipment) => setActiveShipmentDetail(shipment)}
            />
          )}

          {activePage === "profile" && (
            <ProfileView
              addresses={addresses}
              onAddAddress={handleAddAddress}
              onDeleteAddress={handleDeleteAddress}
              onSetDefaultAddress={handleSetDefaultAddress}
            />
          )}
        </main>

        {/* Footer (Desktop & Tablet) */}
        <footer className="border-t border-slate-100 bg-slate-50/80 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 hidden md:block">
          <p>© 2026 Accele Electronics, Inc. All rights reserved. 30+ Years of Quality & Automotive Innovation.</p>
        </footer>

        {/* Mobile Floating Bottom Bar with Safe Area Bottom */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200/90 bg-white/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] backdrop-blur-xl md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? "text-[#ed0b08] scale-105"
                    : "text-slate-400 hover:text-slate-700 active:scale-95"
                }`}
              >
                <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Global Modals */}
      <ShipmentDetailModal
        shipment={activeShipmentDetail}
        onClose={() => setActiveShipmentDetail(null)}
        onCopyId={handleCopyId}
      />

      <CreateShipmentModal
        isOpen={isCreatingShipment}
        onClose={() => setIsCreatingShipment(false)}
        onShipmentCreated={handleCreateShipment}
      />

      <QuoteCalculatorModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        onBookShipment={() => setIsCreatingShipment(true)}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      <SchedulePickupModal
        isOpen={isPickupOpen}
        onClose={() => setIsPickupOpen(false)}
      />
    </div>
  );
}
