export interface PinoutItem {
  pin: string;
  wireColor: string;
  colorHex: string;
  functionName: string;
  notes: string;
}

export interface TechManual {
  id: string;
  title: string;
  model: string;
  category: "Cameras" | "Displays" | "Seat Heaters" | "Relays" | "Sensors";
  fileSize: string;
  docType: "Wiring Diagram" | "Installation Manual" | "Tech Bulletin";
  updatedAt: string;
  summary: string;
  pinouts: PinoutItem[];
  tips: string[];
}

export const techManuals: TechManual[] = [
  {
    id: "man-rvc180",
    title: "RVC180CTD Commercial Camera Wiring & Trigger Diagram",
    model: "RVC-180CTD",
    category: "Cameras",
    fileSize: "1.4 MB PDF",
    docType: "Wiring Diagram",
    updatedAt: "Oct 2026",
    summary: "Complete harness pin-out, moving object radar calibration loop, and reverse gear trigger tie-in instructions.",
    pinouts: [
      {
        pin: "Pin 1",
        wireColor: "Red",
        colorHex: "#ef4444",
        functionName: "+12V Switched Power",
        notes: "Connect to reverse light power or switched accessory circuit via 2A fuse.",
      },
      {
        pin: "Pin 2",
        wireColor: "Black",
        colorHex: "#1e293b",
        functionName: "Chassis Ground",
        notes: "Attach directly to vehicle bare metal ground lug.",
      },
      {
        pin: "Pin 3",
        wireColor: "Green",
        colorHex: "#22c55e",
        functionName: "MOR Alarm Trigger",
        notes: "Triggers external cab buzzer or dash LED when moving pedestrian is spotted.",
      },
      {
        pin: "Pin 4",
        wireColor: "Yellow RCA",
        colorHex: "#eab308",
        functionName: "Video Signal (+) / Shield (-)",
        notes: "Connect to monitor Reverse Camera Video IN.",
      },
    ],
    tips: [
      "Cut the white wire loop on the camera head to mirror/flip image for front-view mounting.",
      "Cut the blue wire loop to turn off parking distance grid lines.",
      "Ensure aviation 4-pin collar is tightly hand-screwed and weatherproof gasket is seated.",
    ],
  },
  {
    id: "man-heat200",
    title: "HEAT-200 Carbon Fiber Seat Heater Installation & Switch Harness",
    model: "HEAT-200",
    category: "Seat Heaters",
    fileSize: "2.1 MB PDF",
    docType: "Installation Manual",
    updatedAt: "Aug 2026",
    summary: "Seat upholstery disassembly, carbon element trimming safety rules, and illuminated rocker switch wiring.",
    pinouts: [
      {
        pin: "Terminal 1",
        wireColor: "Red (Heavy 14AWG)",
        colorHex: "#ef4444",
        functionName: "+12V Switched ACC (Main)",
        notes: "Must connect to a minimum 10A (dual seat: 20A) switched ignition circuit.",
      },
      {
        pin: "Terminal 2",
        wireColor: "Black (14AWG)",
        colorHex: "#0f172a",
        functionName: "Chassis Ground",
        notes: "Secure under clean factory floor bolt with star washer.",
      },
      {
        pin: "Terminal 3",
        wireColor: "Orange (18AWG)",
        colorHex: "#f97316",
        functionName: "Dash Illumination",
        notes: "Optional wire: lights up switch backlight with parking lights.",
      },
    ],
    tips: [
      "Never cut the copper heating bus bars running along the edges of the pads.",
      "Always route harness under seat rails leaving enough slack for seat sliding adjustments.",
      "Bimetallic thermostats must sit flat against foam padding directly under the fabric.",
    ],
  },
  {
    id: "man-lcd102",
    title: "LCD102FL Overhead Flip-Down Video & Dome Light Wiring",
    model: "LCD-102FL",
    category: "Displays",
    fileSize: "3.2 MB PDF",
    docType: "Wiring Diagram",
    updatedAt: "Sep 2026",
    summary: "Headliner mounting plate template, dual HDMI input routing, and positive/negative dome trigger logic.",
    pinouts: [
      {
        pin: "Wire 1",
        wireColor: "Yellow",
        colorHex: "#eab308",
        functionName: "+12V Constant Battery",
        notes: "Preserves user clock, screen color calibration, and last memory state.",
      },
      {
        pin: "Wire 2",
        wireColor: "Red",
        colorHex: "#ef4444",
        functionName: "+12V Switched ACC",
        notes: "Controls monitor automatic power-up/down sequence.",
      },
      {
        pin: "Wire 3",
        wireColor: "White",
        colorHex: "#64748b",
        functionName: "Door Trigger (Selectable +/-)",
        notes: "Connect to factory interior BCM dome light wire for synchronized light.",
      },
    ],
    tips: [
      "Use the included metal roof support bracket to prevent monitor shaking over road bumps.",
      "Set the dome light slide switch to (+) or (-) based on vehicle BCM polarity testing.",
    ],
  },
  {
    id: "man-bu5084",
    title: "Beuler BU-5084 40/60A Relay Terminal Pinout & Automotive Isolation Guide",
    model: "BU-5084",
    category: "Relays",
    fileSize: "850 KB PDF",
    docType: "Tech Bulletin",
    updatedAt: "Nov 2026",
    summary: "Standard 5-pin Bosch relay schematics for auxiliary light isolation, starter interrupt, and polarity inversion.",
    pinouts: [
      {
        pin: "Pin 30",
        wireColor: "Blue",
        colorHex: "#3b82f6",
        functionName: "Common Contact (Fused Supply)",
        notes: "Direct high-current feed from battery via appropriate inline fuse.",
      },
      {
        pin: "Pin 87",
        wireColor: "Red",
        colorHex: "#ef4444",
        functionName: "Normally Open (N.O.) Load",
        notes: "Sends power to accessory (lights, horns, seat heaters) when coil energizes.",
      },
      {
        pin: "Pin 87a",
        wireColor: "Grey",
        colorHex: "#94a3b8",
        functionName: "Normally Closed (N.C.)",
        notes: "Carries current when relay is resting (de-energized).",
      },
      {
        pin: "Pin 85",
        wireColor: "Black",
        colorHex: "#0f172a",
        functionName: "Coil Ground / Trigger (-)",
        notes: "Connect to ground switch or alarm negative output.",
      },
      {
        pin: "Pin 86",
        wireColor: "Yellow",
        colorHex: "#eab308",
        functionName: "Coil Power (+12V)",
        notes: "Switched low-current trigger circuit to activate the relay.",
      },
    ],
    tips: [
      "Always mount relay with terminals facing downward to prevent moisture pooling inside harness.",
      "Install a quenching diode (1N4004) across Pin 85 and 86 to eliminate inductive voltage spikes.",
    ],
  },
];
