import { X, ShoppingBag, ArrowRight, ChevronRight, Zap, CreditCard, Clock, Gift, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cart, totalItems, updateQuantity, removeItem } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle animation states for smooth opening/closing
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    const handleTransitionEnd = () => {
        if (!isOpen) {
            setIsAnimating(false);
        }
    };

    if (!isOpen && !isAnimating) return null;

    // Delivery time estimation based on cart value
    const deliveryTime = cart.subtotal > 15000 ? "Next-day delivery available" : "2-3 business days";

    // Calculate remaining amount for free shipping
    const freeShippingThreshold = 10000;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cart.subtotal);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop with blur effect */}
            <div
                className={`absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            ></div>

            {/* Cart drawer */}
            <div
                className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                onTransitionEnd={handleTransitionEnd}
            >
                {/* Header */}
                <div className="p-5 border-b border-neutral-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-primary" />
                        <h2 className="font-medium text-lg">Your Cart ({totalItems} items)</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={18} />
                    </button>
                </div>

                {cart.items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6 border border-neutral-100">
                            <ShoppingBag size={32} className="text-neutral-300" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                        <p className="text-neutral-500 text-center mb-8 max-w-xs">
                            Looks like you haven't added any electronics or appliances to your cart yet.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/10 hover:bg-primary-dark transition-colors"
                        >
                            <span>Browse Products</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Cart items */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-3 px-5">
                            {/* Free shipping progress notification */}
                            {remainingForFreeShipping > 0 && (
                                <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-blue-100 rounded-lg">
                                            <Gift size={16} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-800 font-medium">
                                                Add KSh {remainingForFreeShipping.toLocaleString()} more for free shipping
                                            </p>
                                            <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${(cart.subtotal / freeShippingThreshold) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Cart items */}
                            {cart.items.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}

                            {/* Limited time offers */}
                            <div className="bg-neutral-50 rounded-xl p-4 mt-4 border border-neutral-100">
                                <div className="flex items-start gap-3">
                                    <div className="p-1.5 bg-amber-100 rounded-lg">
                                        <Clock size={16} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-neutral-800">Limited-time offer</p>
                                        <p className="text-xs text-neutral-600 mt-0.5">Add a protection plan to eligible electronics for 15% off</p>
                                    </div>
                                    <button className="text-xs text-primary font-medium ml-auto">Add</button>
                                </div>
                            </div>
                        </div>

                        {/* Checkout section */}
                        <div className="border-t border-neutral-100 bg-white">
                            {/* Order summary */}
                            <div className="p-5 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Subtotal</span>
                                        <span className="font-medium">KSh {cart.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Shipping</span>
                                        <span className="font-medium">{cart.shipping === 0 ? 'Free' : `KSh ${cart.shipping.toLocaleString()}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-500">Tax (16% VAT)</span>
                                        <span className="font-medium">KSh {cart.tax.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between font-medium text-lg pt-3 border-t border-neutral-100">
                                        <span>Total</span>
                                        <span>KSh {cart.total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Delivery estimate */}
                                <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-2.5 rounded-lg">
                                    <Clock size={15} />
                                    <span>{deliveryTime}</span>
                                </div>

                                {/* Checkout buttons */}
                                <div className="space-y-3 pt-2">
                                    <Link
                                        to="/checkout"
                                        onClick={onClose}
                                        className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-medium text-center transition-colors shadow-lg shadow-primary/10 group"
                                    >
                                        <CreditCard size={18} />
                                        <span>Checkout Securely</span>
                                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </Link>

                                    <button
                                        onClick={onClose}
                                        className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 py-3 rounded-xl font-medium transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>

                            {/* Security badges */}
                            <div className="px-5 pb-5 pt-1">
                                <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                                    <div className="flex items-center gap-1">
                                        <CreditCard size={14} />
                                        <span>Secure Checkout</span>
                                    </div>
                                    <div className="h-4 w-px bg-neutral-200"></div>
                                    <div className="flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        <span>Money-Back Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;