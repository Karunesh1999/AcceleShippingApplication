import { useState, useEffect } from "react";
import {
  initialShipments,
  initialNotifications,
  sampleAddresses,
} from "./data/shipments";
import { acceleProducts, Product } from "./data/products";
import { techManuals, TechManual } from "./data/manuals";
import { initialRmaClaims, RmaClaim } from "./data/rma";
import { Shipment, AppNotification, UserAddress } from "./types";
import { SplashScreen } from "./components/onboarding/SplashScreen";
import { OnboardingScreen } from "./components/onboarding/OnboardingScreen";
import { Header } from "./components/layout/Header";
import { HomeView } from "./views/HomeView";
import { CatalogView } from "./views/CatalogView";
import { ShipmentsView } from "./views/ShipmentsView";
import { TechHubView } from "./views/TechHubView";
import { TrackView } from "./views/TrackView";
import { ProfileView } from "./views/ProfileView";
import { ShipmentDetailModal } from "./components/modals/ShipmentDetailModal";
import { CreateShipmentModal } from "./components/modals/CreateShipmentModal";
import { QuoteCalculatorModal } from "./components/modals/QuoteCalculatorModal";
import { SupportModal } from "./components/modals/SupportModal";
import { SchedulePickupModal } from "./components/modals/SchedulePickupModal";
import { ProductDetailModal } from "./components/modals/ProductDetailModal";
import { ManualDetailModal } from "./components/modals/ManualDetailModal";
import { RmaModal } from "./components/modals/RmaModal";
import { Iphone } from "./components/ui/iphone";
import {
  Home as HomeIcon,
  Grid,
  Package,
  Wrench,
  User,
  CheckCircle2,
  Smartphone,
  Maximize2,
} from "lucide-react";

export default function App() {
  // App initialization flow: splash -> onboarding -> app
  const [flowState, setFlowState] = useState<"splash" | "onboarding" | "app">(
    "splash"
  );
  const [activePage, setActivePage] = useState<string>("home");

  // State to track whether user is inspecting or on mobile screen
  const [isMobileOrInspecting, setIsMobileOrInspecting] = useState(false);
  // Manual override toggle if user explicitly wants to switch
  const [manualFrameToggle, setManualFrameToggle] = useState<boolean | null>(null);

  useEffect(() => {
    const evaluateScreen = () => {
      // Mobile screen or DevTools device mode (width < 900px)
      const isMobileWidth = window.innerWidth < 900;
      // DevTools docked open detection (difference between outer and inner window dimensions)
      const isDockedDevTools =
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160;

      setIsMobileOrInspecting(isMobileWidth || isDockedDevTools);
    };

    evaluateScreen();
    window.addEventListener("resize", evaluateScreen);

    // Detect F12 key or Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Inspect shortcuts)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "i", "J", "j", "C", "c"].includes(e.key))
      ) {
        setIsMobileOrInspecting(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", evaluateScreen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Determine whether to display inside iPhone wrapper
  const showIphoneWrapper =
    manualFrameToggle !== null ? manualFrameToggle : !isMobileOrInspecting;

  // Collections state
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [notifications, setNotifications] =
    useState<AppNotification[]>(initialNotifications);
  const [addresses, setAddresses] = useState<UserAddress[]>(sampleAddresses);
  const [rmaClaims, setRmaClaims] = useState<RmaClaim[]>(initialRmaClaims);

  // Modals state
  const [activeShipmentDetail, setActiveShipmentDetail] =
    useState<Shipment | null>(null);
  const [isCreatingShipment, setIsCreatingShipment] = useState(false);
  const [preselectedItem, setPreselectedItem] = useState<string | undefined>(undefined);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isPickupOpen, setIsPickupOpen] = useState(false);

  // New Brand Companion Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedManual, setSelectedManual] = useState<TechManual | null>(null);
  const [isRmaOpen, setIsRmaOpen] = useState(false);

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
      title: "New Dispatch Order Created",
      message: `${newShipment.item} (#${newShipment.id}) dispatched to carrier queue.`,
      time: "Just now",
      read: false,
      type: "shipment",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    showToast(`Shipment #${newShipment.id} successfully created!`);
  };

  const handleRmaSubmitted = (newClaim: RmaClaim) => {
    setRmaClaims((prev) => [newClaim, ...prev]);
    const newNotification: AppNotification = {
      id: `notif-${Date.now()}`,
      title: "RMA Authorization Issued",
      message: `${newClaim.id} authorized for ${newClaim.partNumber}. Return label ready.`,
      time: "Just now",
      read: false,
      type: "alert",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    showToast(`RMA #${newClaim.id} authorized by Santa Fe Springs HQ.`);
  };

  const handleDownloadManual = (title: string) => {
    showToast(`PDF Downloaded: ${title.slice(0, 32)}...`);
  };

  const handleViewManualByModel = (partNumber: string) => {
    const found = techManuals.find(
      (m) =>
        m.model.toLowerCase().includes(partNumber.toLowerCase()) ||
        partNumber.toLowerCase().includes(m.model.toLowerCase())
    );
    setSelectedManual(found || techManuals[0]);
  };

  const handleDispatchProduct = (product: Product) => {
    setPreselectedItem(product.name);
    setIsCreatingShipment(true);
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

  // 5-Tab Official Accele Companion Navigation
  const navigation = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "catalog", label: "Catalog", icon: Grid },
    { key: "shipments", label: "Logistics", icon: Package },
    { key: "techhub", label: "Tech Hub", icon: Wrench },
    { key: "profile", label: "Account", icon: User },
  ];

  // Core application content (Splash, Onboarding, or Portal)
  const appContent = (
    <div className="relative min-h-full w-full bg-[#f8f9fa] text-slate-900 selection:bg-[#ed0b08] selection:text-white flex flex-col justify-between">
      {/* 1. Splash Screen */}
      {flowState === "splash" && (
        <SplashScreen onComplete={() => setFlowState("onboarding")} />
      )}

      {/* 2. Onboarding Carousel Screen */}
      {flowState === "onboarding" && (
        <OnboardingScreen onFinish={() => setFlowState("app")} />
      )}

      {/* 3. Main Logistics & Brand Portal */}
      {flowState === "app" && (
        <>
          {/* Toast popup */}
          {toastMessage && (
            <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200 w-[90%] max-w-xs justify-center">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span className="truncate">{toastMessage}</span>
            </div>
          )}

          <div className="w-full flex-1 flex flex-col">
            {/* Header */}
            <Header
              notifications={notifications}
              onMarkNotificationRead={handleMarkNotificationRead}
              onClearAllNotifications={handleClearAllNotifications}
              activePage={activePage}
              setActivePage={setActivePage}
              onCreateShipment={() => {
                setPreselectedItem(undefined);
                setIsCreatingShipment(true);
              }}
            />

            {/* Main Views Container */}
            <main className="flex-1 px-3 sm:px-4 pt-3 pb-24">
              {activePage === "home" && (
                <HomeView
                  shipments={shipments}
                  onOpenShipment={(shipment) => setActiveShipmentDetail(shipment)}
                  onCreateShipment={() => {
                    setPreselectedItem(undefined);
                    setIsCreatingShipment(true);
                  }}
                  onBrowseCatalog={() => setActivePage("catalog")}
                  onOpenTechManuals={() => setActivePage("techhub")}
                  onOpenRma={() => setIsRmaOpen(true)}
                  onTrack={() => setActivePage("shipments")}
                  onQuote={() => setIsQuoteOpen(true)}
                  onViewAllShipments={() => setActivePage("shipments")}
                  onCopyId={handleCopyId}
                  onSelectProduct={(product) => setSelectedProduct(product)}
                />
              )}

              {activePage === "catalog" && (
                <CatalogView
                  onSelectProduct={(product) => setSelectedProduct(product)}
                  onDispatchProduct={handleDispatchProduct}
                  onViewManual={handleViewManualByModel}
                />
              )}

              {activePage === "shipments" && (
                <ShipmentsView
                  shipments={shipments}
                  onOpenShipment={(shipment) => setActiveShipmentDetail(shipment)}
                  onCreateShipment={() => {
                    setPreselectedItem(undefined);
                    setIsCreatingShipment(true);
                  }}
                  onCopyId={handleCopyId}
                />
              )}

              {activePage === "techhub" && (
                <TechHubView
                  rmaClaims={rmaClaims}
                  onOpenManual={(manual) => setSelectedManual(manual)}
                  onOpenNewRma={() => setIsRmaOpen(true)}
                  onDownloadManual={handleDownloadManual}
                />
              )}

              {activePage === "profile" && (
                <ProfileView
                  addresses={addresses}
                  onAddAddress={handleAddAddress}
                  onDeleteAddress={handleDeleteAddress}
                  onSetDefaultAddress={handleSetDefaultAddress}
                  onRestartOnboarding={() => setFlowState("onboarding")}
                  onRestartSplash={() => setFlowState("splash")}
                />
              )}
            </main>

            {/* Mobile Bottom Navigation Bar (5 Standard iOS Tabs) */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200/90 bg-white/95 px-1 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActivePage(item.key)}
                    className={`flex min-w-[50px] flex-col items-center gap-1 rounded-xl px-1.5 py-1 text-[9px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "text-[#ed0b08] scale-105"
                        : "text-slate-400 hover:text-slate-700 active:scale-95"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
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
            onClose={() => {
              setIsCreatingShipment(false);
              setPreselectedItem(undefined);
            }}
            onShipmentCreated={handleCreateShipment}
          />

          <QuoteCalculatorModal
            isOpen={isQuoteOpen}
            onClose={() => setIsQuoteOpen(false)}
            onBookShipment={() => {
              setPreselectedItem(undefined);
              setIsCreatingShipment(true);
            }}
          />

          <SupportModal
            isOpen={isSupportOpen}
            onClose={() => setIsSupportOpen(false)}
          />

          <SchedulePickupModal
            isOpen={isPickupOpen}
            onClose={() => setIsPickupOpen(false)}
          />

          {/* Option B: Brand Companion Modals */}
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onOrderOrShip={handleDispatchProduct}
            onViewManual={handleViewManualByModel}
          />

          <ManualDetailModal
            manual={selectedManual}
            onClose={() => setSelectedManual(null)}
            onDownload={handleDownloadManual}
          />

          <RmaModal
            isOpen={isRmaOpen}
            onClose={() => setIsRmaOpen(false)}
            onClaimSubmitted={handleRmaSubmitted}
          />
        </>
      )}
    </div>
  );

  /* Case 1: When on Mobile, Inspecting / F12 pressed -> HIDE iPhone wrapper, render native 100% full screen */
  if (!showIphoneWrapper) {
    return (
      <div className="min-h-[100dvh] w-full bg-[#f8f9fa] text-slate-900 safe-top safe-bottom flex flex-col justify-between">
        {/* Floating Desktop Restore Button if in DevTools mode */}
        {isMobileOrInspecting && (
          <button
            onClick={() => setManualFrameToggle(true)}
            className="fixed bottom-18 right-3 z-50 flex items-center gap-1.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white px-3 py-1.5 text-[10px] font-bold shadow-lg backdrop-blur-md border border-white/20 transition-all opacity-70 hover:opacity-100 cursor-pointer"
            title="Switch back to iPhone Wrapper View"
          >
            <Smartphone size={13} className="text-[#ed0b08]" />
            <span>iPhone Frame</span>
          </button>
        )}
        {appContent}
      </div>
    );
  }

  /* Case 2: On Normal Desktop Screen -> Render inside realistic iPhone 16 Pro mockup wrapper */
  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 text-white flex flex-col justify-center items-center selection:bg-[#ed0b08] selection:text-white p-2 sm:p-4 lg:p-6 overflow-x-hidden">
      {/* Main Canvas: Centered iPhone Frame */}
      <div className="flex-1 w-full flex items-center justify-center py-2 sm:py-4">
        <div className="w-[min(425px,94vw)] max-h-[880px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] transition-all duration-300">
          <Iphone className="shadow-2xl">
            {appContent}
          </Iphone>
        </div>
      </div>

      {/* Studio Footer */}
      <footer className="w-full max-w-4xl pt-3 border-t border-white/10 flex flex-col xs:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 shrink-0">
        <p>© 2026 Accele Electronics Inc. · Santa Fe Springs, CA · (800) 788-1212</p>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span>Official 12V Mobile App</span>
          <span>•</span>
          <span>F12 to inspect native mobile</span>
        </div>
      </footer>
    </div>
  );
}
