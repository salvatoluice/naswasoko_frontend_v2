
import { useCartStore } from '../store/cartStore';
import type { CartItem } from '../types/cart';

export const useCart = () => {
  const { cart, addToCart, updateQuantity, removeItem, clearCart } = useCartStore();
  
  return {
    cart,
    totalItems: cart.items.reduce((total: any, item: any) => total + item.quantity, 0),
    addToCart: (item: Omit<CartItem, 'id'>) => addToCart(item),
    updateQuantity,
    removeItem,
    clearCart
  };
};