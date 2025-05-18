import type { CartItem } from "./cart";

  
export type PaymentMethod = 'mpesa' | 'card' | 'bank';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  createdAt: string;
}
