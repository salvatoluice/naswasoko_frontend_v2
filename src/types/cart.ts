export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    image: string;
  }
  
  export interface Cart {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }