import { create } from 'zustand';
import { useCartStore } from './cartStore';
import type { Order, PaymentMethod, ShippingAddress } from '../types/order';

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod;
  orderPlaced: boolean;
  currentOrder: Order | null;
  
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  placeOrder: () => Promise<Order>;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  shippingAddress: null,
  paymentMethod: 'mpesa',
  orderPlaced: false,
  currentOrder: null,
  
  setShippingAddress: (address) => set({ shippingAddress: address }),
  
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  
  placeOrder: async () => {
    const { cart } = useCartStore.getState();
    const { shippingAddress, paymentMethod } = useCheckoutStore.getState();
    
    if (!shippingAddress) {
      throw new Error('Shipping address is required');
    }
    
    // Create new order
    const newOrder: Order = {
      id: crypto.randomUUID(),
      items: [...cart.items],
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      tax: cart.tax,
      total: cart.total,
      paymentMethod,
      shippingAddress,
      createdAt: new Date().toISOString()
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update state
    set({
      currentOrder: newOrder,
      orderPlaced: true
    });
    
    // Clear cart
    useCartStore.getState().clearCart();
    
    return newOrder;
  },
  
  resetCheckout: () => set({
    shippingAddress: null,
    orderPlaced: false,
    currentOrder: null
  })
}));