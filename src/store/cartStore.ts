// src/store/cartStore.ts

import { create } from 'zustand';
import type { Cart, CartItem } from '../types/cart';

interface CartState {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0
};

const calculateTotals = (items: CartItem[]): Pick<Cart, 'subtotal' | 'shipping' | 'tax' | 'total'> => {
  const subtotal = items.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + price * item.quantity;
  }, 0);
  
  // Simple shipping calculation - free over 5000 KSh
  const shipping = subtotal > 5000 ? 0 : 350;
  
  // Tax calculation (16% VAT in Kenya)
  const tax = Math.round(subtotal * 0.16);
  
  const total = subtotal + shipping + tax;
  
  return { subtotal, shipping, tax, total };
};

export const useCartStore = create<CartState>((set) => ({
  cart: initialCart,
  
  addToCart: (item) => set((state) => {
    // Check if item already exists in cart
    const existingItemIndex = state.cart.items.findIndex(
      (i) => i.productId === item.productId
    );
    
    let newItems;
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      newItems = [...state.cart.items];
      newItems[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item with a unique ID
      newItems = [
        ...state.cart.items,
        { ...item, id: crypto.randomUUID() }
      ];
    }
    
    return {
      cart: {
        items: newItems,
        ...calculateTotals(newItems)
      }
    };
  }),
  
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity < 1) return state;
    
    const newItems = state.cart.items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    
    return {
      cart: {
        items: newItems,
        ...calculateTotals(newItems)
      }
    };
  }),
  
  removeItem: (id) => set((state) => {
    const newItems = state.cart.items.filter((item) => item.id !== id);
    
    return {
      cart: {
        items: newItems,
        ...calculateTotals(newItems)
      }
    };
  }),
  
  clearCart: () => set({
    cart: initialCart
  })
}));