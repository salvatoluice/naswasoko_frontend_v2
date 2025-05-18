import { useState } from 'react';
import type { PaymentMethod, ShippingAddress } from '../types/order';
import { useCheckoutStore } from '../store/checkoutStore';

export const useCheckout = () => {
  const {
    shippingAddress,
    paymentMethod,
    orderPlaced,
    currentOrder,
    setShippingAddress,
    setPaymentMethod,
    placeOrder,
    resetCheckout
  } = useCheckoutStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await placeOrder();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    shippingAddress,
    paymentMethod,
    orderPlaced,
    currentOrder,
    isSubmitting,
    error,
    setShippingAddress: (address: ShippingAddress) => setShippingAddress(address),
    setPaymentMethod: (method: PaymentMethod) => setPaymentMethod(method),
    placeOrder: handlePlaceOrder,
    resetCheckout
  };
};