import type { ShippingAddress } from "./order";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    addresses: ShippingAddress[];
  }