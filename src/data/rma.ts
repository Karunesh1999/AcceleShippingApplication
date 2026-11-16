export interface RmaClaim {
  id: string;
  serialNumber: string;
  productName: string;
  partNumber: string;
  issueType: "No Video Signal" | "Power Failure" | "Physical Defect" | "Audio Distortion" | "Bench Test DOA";
  status: "RMA Approved" | "Under Evaluation" | "Replacement Dispatched" | "Pending Review";
  createdAt: string;
  dealerName: string;
  resolution: string;
  shippingHub: string;
}

export const initialRmaClaims: RmaClaim[] = [
  {
    id: "RMA-ACC-89104",
    serialNumber: "SN-RVC-2026-9041",
    productName: "Commercial Moving Object Camera",
    partNumber: "RVC-180CTD",
    issueType: "No Video Signal",
    status: "RMA Approved",
    createdAt: "Nov 12, 2026",
    dealerName: "Metro Auto Electronics Inc",
    resolution: "Pre-paid return shipping label generated. Awaiting unit inspection at Santa Fe Springs, CA.",
    shippingHub: "Santa Fe Springs Facility (9130 Norwalk Blvd, CA)",
  },
  {
    id: "RMA-ACC-78219",
    serialNumber: "SN-LCD-102FL-3301",
    productName: "AcceleVision 10.2\" Overhead Display",
    partNumber: "LCD-102FL",
    issueType: "Power Failure",
    status: "Replacement Dispatched",
    createdAt: "Nov 04, 2026",
    dealerName: "Lone Star Fleet Outfitters",
    resolution: "Replacement unit dispatched via Accele Priority Air. Tracking #AC82910472.",
    shippingHub: "Houston Distribution Hub (4810 Westpark Dr, TX)",
  },
];
