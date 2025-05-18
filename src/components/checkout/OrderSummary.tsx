
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const OrderSummary = () => {
    const { cart } = useCart();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-neutral-50 rounded-xl p-6">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-lg font-medium">Order Summary</h2>
                <button className="p-1">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {isOpen && (
                <div className="mt-4 space-y-4">
                    <div className="max-h-80 overflow-y-auto space-y-3">
                        {cart.items.map(item => (
                            <div key={item.id} className="flex gap-3">
                                <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium mt-1">
                                        KSh {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
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
                        <div className="flex justify-between font-medium text-base pt-2 border-t">
                            <span>Total</span>
                            <span>KSh {cart.total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;