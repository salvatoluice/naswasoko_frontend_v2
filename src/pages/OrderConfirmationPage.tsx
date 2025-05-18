import { Link, Navigate } from 'react-router-dom';
import {
    CheckCircle,
    Zap,
    Package,
    Clock,
    ChevronRight,
    CreditCard,
    Mail,
    Download,
    Phone,
    MapPin,
    Shield,
    Headphones,
    Truck,
    AlertCircle
} from 'lucide-react';
import { useCheckout } from '../hooks/useCheckout';
import { useState, useEffect } from 'react';

const OrderConfirmationPage = () => {
    const { currentOrder } = useCheckout();
    const [showAnimation, setShowAnimation] = useState(true);

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAnimation(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!currentOrder) {
        return <Navigate to="/" />;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Success Animation */}
            {showAnimation && (
                <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fadeOut">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                        <CheckCircle size={48} className="text-primary animate-scaleIn" />
                    </div>
                    <h2 className="text-2xl font-medium animate-fadeIn">Order Confirmed!</h2>
                </div>
            )}

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-5 border border-green-100 shadow-sm">
                        <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Thank You for Your Order!</h1>
                    <p className="text-neutral-600 max-w-lg mx-auto">
                        Your order for electronics and appliances has been confirmed. We've sent a detailed receipt to your email at <span className="font-medium text-neutral-800">{currentOrder.shippingAddress.email}</span>.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10">
                        <Zap size={120} />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Package size={18} className="text-primary" />
                                <h2 className="font-semibold">Order #{currentOrder.id.substring(0, 8).toUpperCase()}</h2>
                            </div>
                            <p className="text-sm text-neutral-600 mb-3">
                                Placed on {formatDate(new Date(currentOrder.createdAt))}
                            </p>
                            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                <CheckCircle size={12} />
                                <span>Order Confirmed</span>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 border border-primary/10 space-y-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Truck size={16} className="text-primary" />
                                <h3 className="font-medium text-sm">Estimated Delivery</h3>
                            </div>
                            <p className="font-semibold text-lg">{formatDate(estimatedDelivery)}</p>
                            <p className="text-xs text-neutral-600">Delivery via Naswasoko Premium Shipping</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Clock size={18} className="text-primary" />
                        <span>Order Progress</span>
                    </h2>

                    <div className="relative">
                        <div className="absolute left-3.5 top-4 bottom-4 w-px bg-neutral-200"></div>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start relative z-10">
                                <div className="w-7 h-7 rounded-full bg-green-100 border-2 border-white flex items-center justify-center shadow-sm">
                                    <CheckCircle size={14} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Order Confirmed</p>
                                    <p className="text-sm text-neutral-500">{new Date(currentOrder.createdAt).toLocaleTimeString()} today</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative z-10">
                                <div className="w-7 h-7 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center shadow-sm">
                                    <Package size={14} className="text-neutral-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-600">Processing</p>
                                    <p className="text-sm text-neutral-500">Your order is being prepared</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative z-10">
                                <div className="w-7 h-7 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center shadow-sm">
                                    <Truck size={14} className="text-neutral-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-600">Shipping</p>
                                    <p className="text-sm text-neutral-500">Estimated in 2-3 days</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start relative z-10">
                                <div className="w-7 h-7 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center shadow-sm">
                                    <Headphones size={14} className="text-neutral-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-600">Delivered</p>
                                    <p className="text-sm text-neutral-500">Estimated by {formatDate(estimatedDelivery)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        <span>Order Summary</span>
                    </h2>

                    <div className="space-y-4">
                        {currentOrder.items.map(item => (
                            <div key={item.id} className="flex gap-4 p-4 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors">
                                <div className="w-16 h-16 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-neutral-900 truncate">{item.name}</h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                                        <p className="text-neutral-500">Qty: {item.quantity}</p>
                                        {item.discountPrice && (
                                            <p className="text-primary flex items-center gap-1">
                                                <Zap size={12} />
                                                <span>Saved {Math.round(((item.price - item.discountPrice) / item.price) * 100)}%</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        KSh {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                                    </p>
                                    {item.discountPrice && (
                                        <p className="line-through text-neutral-400 text-sm">
                                            KSh {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin size={16} className="text-neutral-500" />
                            <h3 className="font-medium">Shipping Information</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <p className="font-medium">
                                {currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}
                            </p>
                            <p className="text-neutral-700">
                                {currentOrder.shippingAddress.address}<br />
                                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.county} {currentOrder.shippingAddress.postalCode}
                            </p>
                            <div className="flex items-center gap-2 text-neutral-600">
                                <Phone size={14} />
                                <span>{currentOrder.shippingAddress.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-600">
                                <Mail size={14} />
                                <span>{currentOrder.shippingAddress.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard size={16} className="text-neutral-500" />
                            <h3 className="font-medium">Payment Information</h3>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-neutral-600">Payment Method</span>
                                <span className="font-medium">
                                    {currentOrder.paymentMethod === 'mpesa' ? 'M-Pesa' :
                                        currentOrder.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-neutral-600">Payment Status</span>
                                <span className="font-medium text-green-600">Paid</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-neutral-600">Transaction ID</span>
                                <span className="font-medium">{currentOrder.id.substring(0, 10).toUpperCase()}</span>
                            </div>

                            <div className="pt-2 mt-2 border-t border-neutral-200">
                                <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>KSh {currentOrder.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600 mt-1">
                                    <span>Shipping</span>
                                    <span>{currentOrder.shipping === 0 ? 'Free' : `KSh ${currentOrder.shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600 mt-1">
                                    <span>Tax (16% VAT)</span>
                                    <span>KSh {currentOrder.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-medium mt-2 pt-2 border-t border-neutral-200">
                                    <span>Total</span>
                                    <span>KSh {currentOrder.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield size={18} className="text-blue-600" />
                        <h3 className="font-medium text-blue-800">Warranty & Support</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white bg-opacity-60 rounded-xl p-3 border border-blue-100">
                            <p className="font-medium text-blue-800 mb-1">Manufacturer Warranty</p>
                            <p className="text-neutral-700">All electronics come with standard manufacturer warranty. Keep your invoice for warranty claims.</p>
                        </div>

                        <div className="bg-white bg-opacity-60 rounded-xl p-3 border border-blue-100">
                            <p className="font-medium text-blue-800 mb-1">Technical Support</p>
                            <p className="text-neutral-700">Need help with setup? Our tech support team is available 7 days a week.</p>
                            <a href="tel:+254712345678" className="text-blue-600 font-medium inline-flex items-center gap-1 mt-1 hover:text-blue-700">
                                <Phone size={14} />
                                <span>+254 712 345 678</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3 text-sm text-neutral-600 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                        <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <p>For large appliances or TVs, our delivery team will contact you 24 hours in advance to confirm delivery details and any installation requirements.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            to="/orders/track"
                            className="px-6 py-3.5 border border-neutral-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
                        >
                            <Truck size={18} className="text-primary" />
                            <span>Track Order</span>
                        </Link>

                        <Link
                            to="/"
                            className="px-6 py-3.5 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-lg shadow-primary/10"
                        >
                            <span>Continue Shopping</span>
                            <ChevronRight size={18} />
                        </Link>

                        <button
                            className="px-6 py-3.5 border border-neutral-200 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
                        >
                            <Download size={18} />
                            <span>Download Invoice</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
