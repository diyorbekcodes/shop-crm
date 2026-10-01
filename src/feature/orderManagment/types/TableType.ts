// ==========================
// Enums / Union types
// ==========================
export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "CASH_ON_DELIVERY" | "CARD" | "ONLINE";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

// ==========================
// Nested objects
// ==========================
export interface AddressSnapshot {
  city: string;
  house: string;
  title: string;
  street: string;
}

export interface CustomerSnapshot {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  productName: string;
  productSku: string;
  productImage: string;
  attributes: Record<string, unknown> | null;
  price: number;
  quantity: number;
  total: number;
}

export interface StatusHistoryEntry {
  id: string;
  orderId: string;
  status: OrderStatus;
  comment: string | null;
  changedBy: string;
  adminId: string | null;
  createdAt: string;
}

export interface OrderUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ==========================
// Main Order type (backend)
// ==========================
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponId: string | null;
  addressSnapshot: AddressSnapshot;
  customerSnapshot: CustomerSnapshot;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  statusHistory: StatusHistoryEntry[];
  user: OrderUser;
}

// ==========================
// API response wrapper
// ==========================
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  meta: Meta;
}

// ==========================
// Table row type (frontend, jadval uchun)
// ==========================
export interface ProductTableRow {
  key: string;
  no: number;
  orderId: string;
  product: string;
  image?: string;
  date: string;
  price: number;
  payment: PaymentMethod | "-";
  status: OrderStatus;
}
