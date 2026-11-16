export type ShipmentStatus =
  | "In transit"
  | "Delivered"
  | "Processing"
  | "Out for delivery"
  | "Delayed";

export interface ShipmentStep {
  title: string;
  location: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
  description?: string;
}

export interface LocationDetail {
  city: string;
  state: string;
  address?: string;
  zip?: string;
  name?: string;
}

export interface Shipment {
  id: string;
  item: string;
  category: string;
  status: ShipmentStatus;
  eta: string;
  from: LocationDetail;
  to: LocationDetail;
  progress: number;
  carrier: string;
  service: string;
  weight: string;
  dimensions?: string;
  declaredValue?: number;
  rate?: number;
  createdAt: string;
  referenceNumber?: string;
  steps: ShipmentStep[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "shipment" | "alert" | "delivery" | "promo";
}

export interface UserAddress {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export interface RateQuoteOption {
  id: string;
  name: string;
  speed: string;
  cost: number;
  estimatedDelivery: string;
  popular?: boolean;
}
