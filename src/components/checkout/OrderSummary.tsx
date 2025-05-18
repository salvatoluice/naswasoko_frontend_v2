import { ChevronDown, ChevronUp, Zap, Truck, Clock, Shield, Edit2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';

const OrderSummary = () => {
    const { cart } = useCart();
    const [isOpen, setIsOpen] = useState(true);
    const [animateTotal, setAnimateTotal] = useState(false);

    const totalSavings = cart.items.reduce((acc, item) => {
        if (item.discountPrice) {
            return acc + ((item.price - item.discountPrice) * item.quantity);
        }
        return acc;
    }, 0);

    const freeShippingThreshold = 10000;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cart.subtotal);

    const getEstimatedDelivery = () => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + (cart.subtotal > 15000 ? 2 : 4));

        return deliveryDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    useEffect(() => {
        setAnimateTotal(true);
        const timer = setTimeout(() => setAnimateTotal(false), 500);
        return () => clearTimeout(timer);
    }, [cart.total]);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
            <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-lg font-medium flex items-center gap-2">
                    <Zap size={18} className="text-primary" />
                    <span>Order Summary</span>
                    {cart.items.length > 0 && (
                        <span className="ml-1 text-sm text-neutral-500">({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</span>
                    )}
                </h2>
                <button className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="mt-5 space-y-5">
                    {/* Free shipping progress - only show if not yet qualifying */}
                    {remainingForFreeShipping > 0 && cart.items.length > 0 && (
                        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1.5">
                                <Truck size={16} className="text-blue-600" />
                                <p className="text-sm text-blue-800 font-medium">
                                    Add KSh {remainingForFreeShipping.toLocaleString()} more for free shipping
                                </p>
                            </div>
                            <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-700"
                                    style={{ width: `${(cart.subtotal / freeShippingThreshold) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {cart.items.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
                            {cart.items.map(item => (
                                <div key={item.id} className="flex gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                                    <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-200">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-neutral-600">
                                            <span>Qty: {item.quantity}</span>
                                            {item.quantity > 1 && <span>•</span>}
                                            {item.quantity > 1 && <span>KSh {(item.discountPrice || item.price).toLocaleString()} each</span>}
                                        </div>
                                        {item.discountPrice && (
                                            <div className="flex items-center gap-1 mt-1 text-xs text-primary-dark">
                                                <Tag size={12} />
                                                <span>Saved {Math.round(((item.price - item.discountPrice) / item.price) * 100)}%</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            KSh {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                                        </p>
                                        {item.discountPrice && (
                                            <p className="line-through text-neutral-400 text-xs">
                                                KSh {(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-neutral-500">Your cart is empty</p>
                        </div>
                    )}

                    {cart.items.length > 0 && (
                        <>
                            <div className="border-t border-neutral-100 pt-4 space-y-2.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600">Subtotal</span>
                                    <span>KSh {cart.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600">Shipping</span>
                                    <span>{cart.shipping === 0 ? 'Free' : `KSh ${cart.shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600">Tax (16% VAT)</span>
                                    <span>KSh {cart.tax.toLocaleString()}</span>
                                </div>

                                {totalSavings > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 font-medium">
                                        <span>You Save</span>
                                        <span>KSh {totalSavings.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className={`flex justify-between font-semibold text-lg pt-3 border-t border-neutral-200 transition-all ${animateTotal ? 'text-primary' : 'text-neutral-900'}`}>
                                    <span>Total</span>
                                    <span>KSh {cart.total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm bg-neutral-50 p-3 rounded-xl">
                                <Clock size={16} className="text-neutral-500" />
                                <div>
                                    <span className="text-neutral-700">Estimated delivery:</span>
                                    <span className="font-medium text-neutral-900 ml-1">{getEstimatedDelivery()}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 text-sm">
                                <Shield size={16} className="text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-neutral-600">
                                    All electronics come with standard manufacturer warranty. Extended coverage options available at checkout.
                                </p>
                            </div>

                            <div className="text-center pt-2">
                                <button className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:underline">
                                    <Edit2 size={14} />
                                    <span>Edit Cart</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;