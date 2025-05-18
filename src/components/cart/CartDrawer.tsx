
import { X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cart, totalItems, updateQuantity, removeItem } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
            <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-lg flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-medium">Your Cart ({totalItems} items)</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100">
                        <X size={20} />
                    </button>
                </div>

                {cart.items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                            <ShoppingBag size={24} className="text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                        <p className="text-neutral-600 text-center mb-4">
                            Looks like you haven't added any products to your cart yet.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.items.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>

                        <div className="p-4 border-t space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Subtotal</span>
                                    <span>KSh {cart.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Shipping</span>
                                    <span>{cart.shipping === 0 ? 'Free' : `KSh ${cart.shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Tax (16% VAT)</span>
                                    <span>KSh {cart.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>KSh {cart.total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="block w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium text-center"
                            >
                                Checkout
                            </Link>

                            <button
                                onClick={onClose}
                                className="w-full bg-white border border-neutral-300 hover:bg-neutral-100 py-3 rounded-lg font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;