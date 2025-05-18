// src/types/product.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    tags: string[];
    featured: boolean;
    inStock: boolean;
  }
  
  // src/types/cart.ts
  export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface Cart {
    items: CartItem[];
    subtotal: number;
    total: number;
  }