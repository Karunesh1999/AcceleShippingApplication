export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  partNumber: string;
  category: "Cameras & ADAS" | "Displays & Monitors" | "Sensors & Dashcams" | "Comfort & Convenience" | "Power & Relays";
  brand: "AcceleVision" | "Optix 360" | "Beuler" | "Accele Electronics";
  msrp: number;
  dealerPrice: number;
  description: string;
  specs: ProductSpec[];
  inStock: boolean;
  leadTime: string;
  weight: string;
  dimensions: string;
  badge?: string;
  wiringNotes: string;
}

export const acceleProducts: Product[] = [
  {
    id: "RVC180CTD",
    name: "Commercial Moving Object Camera",
    partNumber: "RVC-180CTD",
    category: "Cameras & ADAS",
    brand: "Optix 360",
    msrp: 289.0,
    dealerPrice: 169.0,
    badge: "Top Seller",
    description: "Heavy-duty commercial backup camera featuring AI Moving Object Recognition (MOR) with active audible and visual overlay alerts for fleet safety.",
    weight: "3.2 lbs",
    dimensions: "10 x 8 x 6 in",
    inStock: true,
    leadTime: "Same Day Dispatch",
    wiringNotes: "4-Pin Aviation DIN connector. Red: +12V Reverse, Black: Chassis GND, Green: MOR Trigger.",
    specs: [
      { label: "Viewing Angle", value: "180° Ultra-Wide Diagonal" },
      { label: "Night Vision", value: "0.01 Lux Starlight Sensor" },
      { label: "Weatherproof Rating", value: "IP69K Waterproof Submersible" },
      { label: "Operating Voltage", value: "9V–36V Commercial DC" },
      { label: "Output Format", value: "AHD 1080p / CVBS Switchable" },
    ],
  },
  {
    id: "LCD102FL",
    name: "AcceleVision 10.2\" Overhead Monitor",
    partNumber: "LCD-102FL",
    category: "Displays & Monitors",
    brand: "AcceleVision",
    msrp: 449.0,
    dealerPrice: 289.0,
    badge: "Flagship",
    description: "Slimline high-definition flip-down overhead monitor featuring dual HDMI inputs, USB playback, and integrated twin LED interior dome lights.",
    weight: "5.5 lbs",
    dimensions: "15 x 11 x 4 in",
    inStock: true,
    leadTime: "Same Day Dispatch",
    wiringNotes: "Red: +12V ACC, Yellow: +12V Constant BATT, Black: GND, White: Door Trigger (+/-).",
    specs: [
      { label: "Panel Size", value: "10.2\" TFT Active Matrix" },
      { label: "Resolution", value: "1920 x 1080 Full HD" },
      { label: "Video Inputs", value: "2x HDMI, 1x RCA A/V Input" },
      { label: "Audio Output", value: "Built-in FM Modulator + IR Transmitter" },
      { label: "Chassis", value: "Low-Profile Satin Black & Titanium Bezels" },
    ],
  },
  {
    id: "HEAT-200",
    name: "Dual-Temp Carbon Fiber Seat Heater Kit",
    partNumber: "HEAT-200",
    category: "Comfort & Convenience",
    brand: "Accele Electronics",
    msrp: 149.0,
    dealerPrice: 79.0,
    badge: "Installer Favorite",
    description: "OEM-grade carbon fiber heating element kit for driver and passenger seats with two-stage illuminated round rocker switch.",
    weight: "2.1 lbs",
    dimensions: "12 x 9 x 3 in",
    inStock: true,
    leadTime: "In Stock (180+ units)",
    wiringNotes: "Connect red to fused 10A switched ACC circuit. Black to solid metal ground.",
    specs: [
      { label: "Element Material", value: "Trimmable Carbon Fiber Mesh" },
      { label: "Temperature Range", value: "High: 140°F / Low: 115°F" },
      { label: "Thermal Cutoff", value: "Dual Bimetal Safety Thermostats" },
      { label: "Harness Length", value: "90-inch Plug-and-Play Quick Disconnect" },
    ],
  },
  {
    id: "MDVR-4000",
    name: "4-Channel Fleet Mobile DVR with Cloud GPS",
    partNumber: "MDVR-4000",
    category: "Sensors & Dashcams",
    brand: "Optix 360",
    msrp: 599.0,
    dealerPrice: 389.0,
    badge: "Commercial Grade",
    description: "Ruggedized 4-camera mobile digital video recorder with dual SD card lockbox, shock absorption housing, and real-time GPS telemetry logging.",
    weight: "4.8 lbs",
    dimensions: "14 x 10 x 5 in",
    inStock: true,
    leadTime: "1–2 Business Days",
    wiringNotes: "Wire yellow to constant battery, red to ACC, black to ground, green to right blinker, blue to left blinker.",
    specs: [
      { label: "Channel Count", value: "4x 1080p AHD Aviation Inputs" },
      { label: "Storage", value: "Dual SDXC Slots (Up to 1TB Total)" },
      { label: "Telemetry", value: "Built-in GPS + G-Sensor 3-Axis" },
      { label: "Key Lock", value: "Anti-Tamper Front Security Door" },
    ],
  },
  {
    id: "USBD-QC3",
    name: "Fast Charge QC 3.0 / USB-C Vehicle Kit",
    partNumber: "USBD-QC3",
    category: "Power & Relays",
    brand: "Accele Electronics",
    msrp: 49.95,
    dealerPrice: 24.5,
    description: "Flush-mount automotive dashboard dual charger with Qualcomm Quick Charge 3.0 and USB-C Power Delivery 30W output.",
    weight: "0.8 lbs",
    dimensions: "6 x 4 x 2 in",
    inStock: true,
    leadTime: "Same Day Dispatch",
    wiringNotes: "Direct 12V/24V fused input with inline noise choke filter.",
    specs: [
      { label: "Ports", value: "1x USB-A (QC 3.0) + 1x USB-C (PD 30W)" },
      { label: "Mounting Hole", value: "Standard 1-1/8\" (28mm) Round" },
      { label: "Indicator", value: "Soft Blue LED Backlight" },
      { label: "Protection", value: "Over-Voltage, Over-Current, Thermal" },
    ],
  },
  {
    id: "BU-5084",
    name: "Beuler 40/60A Weatherproof Bosch Relay",
    partNumber: "BU-5084",
    category: "Power & Relays",
    brand: "Beuler",
    msrp: 14.95,
    dealerPrice: 6.8,
    description: "Industry-standard Beuler heavy-duty automotive relay with sealed waterproof skirt, mounting tab, and silver-tin oxide contact pads.",
    weight: "0.4 lbs",
    dimensions: "5 x 3 x 2 in",
    inStock: true,
    leadTime: "Bulk Stock (500+)",
    wiringNotes: "Pin 85: Coil (-), Pin 86: Coil (+), Pin 30: Common Supply, Pin 87: N.O., Pin 87a: N.C.",
    specs: [
      { label: "Current Rating", value: "40A Continuous / 60A Inrush Peak" },
      { label: "Coil Voltage", value: "12V DC (Nominal)" },
      { label: "Enclosure", value: "IP67 Sealed Housing with Gasket" },
    ],
  },
  {
    id: "PARK-4000",
    name: "Front & Rear Ultrasonic Parking Sensor Kit",
    partNumber: "PARK-4000",
    category: "Sensors & Dashcams",
    brand: "Accele Electronics",
    msrp: 179.0,
    dealerPrice: 99.0,
    description: "Eight-sensor obstacle detection system with slim dashboard digital distance display and multi-stage audio buzzer warning.",
    weight: "2.4 lbs",
    dimensions: "11 x 8 x 4 in",
    inStock: true,
    leadTime: "Same Day Dispatch",
    wiringNotes: "Front sensors trigger upon brake press for 15s. Rear sensors trigger with reverse gear engagement.",
    specs: [
      { label: "Sensors", value: "8x OEM Paintable 18.5mm Capsules" },
      { label: "Detection Range", value: "0.3m – 2.5m (1ft – 8ft)" },
      { label: "Buzzer Volume", value: "3-Stage Adjustable (Off, Low, High)" },
    ],
  },
  {
    id: "MR-430",
    name: "OEM-Replacement 4.3\" Mirror Monitor",
    partNumber: "MR-430",
    category: "Displays & Monitors",
    brand: "AcceleVision",
    msrp: 199.0,
    dealerPrice: 119.0,
    description: "Direct OEM windshield mount replacement mirror with high-brightness 4.3-inch auto-dimming LCD screen that disappears when not in reverse.",
    weight: "2.2 lbs",
    dimensions: "12 x 5 x 4 in",
    inStock: true,
    leadTime: "Same Day Dispatch",
    wiringNotes: "Standard OEM bracket #1 included. Video 1: Aux / DVR, Video 2: Reverse Priority.",
    specs: [
      { label: "Display Size", value: "4.3\" High-Luminance TFT (1000 Nits)" },
      { label: "Auto-Dimming", value: "Dual Light Sensors Front & Rear" },
      { label: "Inputs", value: "2x Auto-Switching Composite RCA" },
    ],
  },
];
