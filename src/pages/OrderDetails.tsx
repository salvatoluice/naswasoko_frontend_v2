import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Package,
    MapPin,
    CreditCard,
    Check,
    Truck,
    HelpCircle,
    Share2,
    Download,
    Repeat,
    Star,
    ShoppingBag,
    AlertTriangle,
    ChevronRight,
    Undo2,
    Phone
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

// Order status type
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order interface
interface OrderItem {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    canReturn?: boolean;
}

interface Order {
    id: string;
    orderNumber: string;
    date: Date;
    status: OrderStatus;
    estimatedDelivery?: Date;
    deliveredDate?: Date;
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
    discount?: number;
    paymentMethod: {
        type: 'card' | 'mpesa' | 'bank';
        details: string;
        last4?: string;
    };
    shippingAddress: {
        fullName: string;
        line1: string;
        line2?: string;
        city: string;
        county: string;
        postalCode: string;
        phone: string;
    };
    items: OrderItem[];
    tracking?: {
        number: string;
        carrier: string;
        url?: string;
        events?: {
            date: Date;
            status: string;
            location?: string;
        }[];
    };
    notes?: string;
}

// Mock order data - would come from an API in a real app
const mockOrders: Record<string, Order> = {
    'ord1': {
        id: 'ord1',
        orderNumber: 'ORD-78965',
        date: new Date(2025, 4, 10), // May 10, 2025
        status: 'delivered',
        estimatedDelivery: new Date(2025, 4, 15),
        deliveredDate: new Date(2025, 4, 13),
        total: 142499,
        subtotal: 129999 + 12500,
        tax: 20769,
        shipping: 0,
        discount: 10000,
        paymentMethod: {
            type: 'card',
            details: 'Visa ending in 4242',
            last4: '4242'
        },
        shippingAddress: {
            fullName: 'John Doe',
            line1: '123 Main Street',
            line2: 'Apartment 4B',
            city: 'Nairobi',
            county: 'Nairobi',
            postalCode: '00100',
            phone: '+254712345678'
        },
        items: [
            {
                id: 'item1',
                productId: 'prod1',
                name: 'Premium 4K OLED Smart TV 55"',
                quantity: 1,
                price: 129999,
                image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000',
                canReturn: true
            },
            {
                id: 'item2',
                productId: 'prod2',
                name: 'Wireless Charging Pad',
                quantity: 1,
                price: 12500,
                image: 'https://images.unsplash.com/photo-1600490722773-35753a5d9b51',
                canReturn: true
            }
        ],
        tracking: {
            number: 'TK-456789012',
            carrier: 'FastShip Express',
            url: 'https://example.com/track',
            events: [
                {
                    date: new Date(2025, 4, 11, 9, 30),
                    status: 'Order processed',
                    location: 'Nairobi Warehouse'
                },
                {
                    date: new Date(2025, 4, 12, 11, 15),
                    status: 'In transit',
                    location: 'Nairobi'
                },
                {
                    date: new Date(2025, 4, 13, 14, 45),
                    status: 'Delivered',
                    location: 'Nairobi'
                }
            ]
        }
    },
    'ord2': {
        id: 'ord2',
        orderNumber: 'ORD-65432',
        date: new Date(2025, 4, 5), // May 5, 2025
        status: 'shipped',
        estimatedDelivery: new Date(2025, 4, 20),
        total: 24999,
        subtotal: 24999,
        tax: 3999,
        shipping: 0,
        paymentMethod: {
            type: 'mpesa',
            details: 'M-Pesa',
        },
        shippingAddress: {
            fullName: 'John Doe',
            line1: '123 Main Street',
            line2: 'Apartment 4B',
            city: 'Nairobi',
            county: 'Nairobi',
            postalCode: '00100',
            phone: '+254712345678'
        },
        items: [
            {
                id: 'item3',
                productId: 'prod3',
                name: 'Noise-Cancelling Headphones',
                quantity: 1,
                price: 24999,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000'
            }
        ],
        tracking: {
            number: 'TK-987654321',
            carrier: 'FastShip Express',
            events: [
                {
                    date: new Date(2025, 4, 6, 10, 0),
                    status: 'Order processed',
                    location: 'Nairobi Warehouse'
                },
                {
                    date: new Date(2025, 4, 8, 9, 30),
                    status: 'In transit',
                    location: 'Mombasa'
                }
            ]
        }
    }
};

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

    // Fetch order data
    useEffect(() => {
        if (!id) {
            navigate('/account', { replace: true });
            return;
        }

        // Simulate API call
        const fetchOrder = async () => {
            setIsLoading(true);
            try {
                // In a real app, you'd fetch from an API
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

                if (mockOrders[id]) {
                    setOrder(mockOrders[id]);
                } else {
                    // Order not found
                    navigate('/account', { replace: true });
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [id, navigate]);

    // Add all items to cart (reorder)
    const handleReorder = () => {
        if (!order) return;

        order.items.forEach(item => {
            addToCart({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            });
        });

        // Show success message or redirect to cart
        navigate('/cart');
    };

    // Handle initiating a return
    const handleInitiateReturn = (item: OrderItem) => {
        setSelectedItem(item);
        setShowReturnModal(true);
    };

    // Status badge component
    const StatusBadge = ({ status }: { status: OrderStatus }) => {
        const statusConfig = {
            pending: { color: 'bg-neutral-100 text-neutral-700', text: 'Pending' },
            processing: { color: 'bg-blue-50 text-blue-700', text: 'Processing' },
            shipped: { color: 'bg-amber-50 text-amber-700', text: 'Shipped' },
            delivered: { color: 'bg-green-50 text-green-700', text: 'Delivered' },
            cancelled: { color: 'bg-red-50 text-red-700', text: 'Cancelled' }
        };

        const config = statusConfig[status];

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    // Protect this page - require authentication
    // In a real app, you'd implement proper route guards
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-neutral-50 py-12">
                <div className="container-custom">
                    <div className="bg-white rounded-2xl p-8 shadow-sm text-center max-w-md mx-auto">
                        <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-medium mb-4">Authentication Required</h1>
                        <p className="text-neutral-600 mb-6">
                            Please sign in to view your order details.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/10 hover:bg-primary-dark transition-colors"
                        >
                            <span>Sign In</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 py-12">
                <div className="container-custom">
                    <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-neutral-600">Loading order details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Order not found
    if (!order) {
        return (
            <div className="min-h-screen bg-neutral-50 py-12">
                <div className="container-custom">
                    <div className="bg-white rounded-2xl p-8 shadow-sm text-center max-w-md mx-auto">
                        <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-medium mb-4">Order Not Found</h1>
                        <p className="text-neutral-600 mb-6">
                            The order you're looking for doesn't exist or may have been removed.
                        </p>
                        <Link
                            to="/account"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/10 hover:bg-primary-dark transition-colors"
                        >
                            <span>Back to Account</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container-custom">
                {/* Back navigation */}
                <div className="mb-8">
                    <Link
                        to="/account"
                        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Orders</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-medium mb-1">Order #{order.orderNumber}</h1>
                            <p className="text-neutral-600">
                                Placed on {order.date.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <StatusBadge status={order.status} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order status and tracking */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                                <Package size={18} className="text-primary" />
                                <span>Order Status</span>
                            </h2>

                            {/* Delivery timeline */}
                            <div className="relative mb-8">
                                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-neutral-200"></div>

                                {order.tracking?.events && order.tracking.events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-6 relative mb-6 last:mb-0"
                                    >
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 ${index === 0
                                            ? 'bg-green-100 text-green-600'
                                            : index === order.tracking!.events!.length - 1 && order.status === 'delivered'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-white border-2 border-neutral-200'
                                            }`}>
                                            {index === 0 || (index === order.tracking!.events!.length - 1 && order.status === 'delivered') ? (
                                                <Check size={14} />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-medium text-neutral-900">{event.status}</p>
                                            <div className="flex items-center gap-6 text-sm text-neutral-600">
                                                <span>
                                                    {event.date.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                    {' '}
                                                    {event.date.toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                                {event.location && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {event.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Estimated delivery if not delivered yet */}
                                {order.status !== 'delivered' && order.status !== 'cancelled' && order.estimatedDelivery && (
                                    <div className="flex items-start gap-6 relative">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white border-2 border-neutral-200 z-10">
                                            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-medium text-neutral-900">Estimated Delivery</p>
                                            <div className="flex items-center text-sm text-neutral-600">
                                                <span>
                                                    {order.estimatedDelivery.toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Tracking information */}
                            {order.tracking && (
                                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-neutral-600 mb-1">Tracking Number</p>
                                            <p className="font-medium">{order.tracking.number}</p>
                                            <p className="text-sm text-neutral-600 mt-1">{order.tracking.carrier}</p>
                                        </div>

                                        {order.tracking.url && (
                                            <a
                                                href={order.tracking.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50"
                                            >
                                                <Truck size={16} className="text-primary" />
                                                <span>Track Package</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order items */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-primary" />
                                <span>Order Items</span>
                            </h2>

                            <div className="divide-y divide-neutral-100">
                                {order.items.map(item => (
                                    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-medium">{item.name}</h3>
                                                        <p className="text-sm text-neutral-600">
                                                            Quantity: {item.quantity} • KSh {item.price.toLocaleString()} each
                                                        </p>
                                                    </div>
                                                    <p className="font-medium whitespace-nowrap">
                                                        KSh {(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>

                                                {/* Item actions */}
                                                <div className="flex flex-wrap gap-3 mt-3">
                                                    <Link
                                                        to={`/products/${item.productId}`}
                                                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                                                    >
                                                        <span>View Product</span>
                                                    </Link>

                                                    <button
                                                        onClick={() => addToCart({
                                                            productId: item.productId,
                                                            name: item.name,
                                                            price: item.price,
                                                            quantity: 1,
                                                            image: item.image
                                                        })}
                                                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                                                    >
                                                        <span>Buy Again</span>
                                                    </button>

                                                    {order.status === 'delivered' && item.canReturn && (
                                                        <button
                                                            onClick={() => handleInitiateReturn(item)}
                                                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                                                        >
                                                            <Undo2 size={14} />
                                                            <span>Return Item</span>
                                                        </button>
                                                    )}

                                                    <button
                                                        className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                                                    >
                                                        <Star size={14} />
                                                        <span>Write Review</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1/3 width */}
                    <div className="space-y-6">
                        {/* Order summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                            <div className="space-y-3 pb-4 border-b border-neutral-100">
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Subtotal</span>
                                    <span>KSh {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Shipping</span>
                                    <span>{order.shipping === 0 ? 'Free' : `KSh ${order.shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-600">Tax (16% VAT)</span>
                                    <span>KSh {order.tax.toLocaleString()}</span>
                                </div>

                                {order.discount && order.discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-KSh {order.discount.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between font-medium text-lg pt-4">
                                <span>Total</span>
                                <span>KSh {order.total.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Shipping info */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <MapPin size={18} className="text-primary" />
                                <span>Shipping Address</span>
                            </h2>

                            <div className="text-neutral-700">
                                <p className="font-medium">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.line1}</p>
                                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                                <p>{order.shippingAddress.city}, {order.shippingAddress.county} {order.shippingAddress.postalCode}</p>
                                <p className="mt-2">{order.shippingAddress.phone}</p>
                            </div>
                        </div>

                        {/* Payment info */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <CreditCard size={18} className="text-primary" />
                                <span>Payment Information</span>
                            </h2>

                            <div className="text-neutral-700">
                                <p>
                                    <span className="text-neutral-600">Payment Method:</span>{' '}
                                    {order.paymentMethod.type === 'card'
                                        ? `Credit Card (${order.paymentMethod.details})`
                                        : order.paymentMethod.type === 'mpesa'
                                            ? 'M-Pesa'
                                            : 'Bank Transfer'}
                                </p>
                                <p className="mt-2 text-green-600 font-medium">Paid</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4">Order Actions</h2>

                            <div className="space-y-3">
                                <button
                                    onClick={handleReorder}
                                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                                >
                                    <Repeat size={16} />
                                    <span>Reorder All Items</span>
                                </button>

                                <button
                                    className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-200 py-3 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                                >
                                    <Download size={16} />
                                    <span>Download Invoice</span>
                                </button>

                                <button
                                    className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-200 py-3 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                                >
                                    <Share2 size={16} />
                                    <span>Share Order Details</span>
                                </button>
                            </div>
                        </div>

                        {/* Help & Support */}
                        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <HelpCircle size={18} className="text-primary" />
                                <span>Need Help?</span>
                            </h2>

                            <p className="text-neutral-700 mb-4">
                                If you have questions about this order or need assistance with returns or exchanges, our support team is here to help.
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="tel:+254712345678"
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark"
                                >
                                    <Phone size={16} />
                                    <span>+254 712 345 678</span>
                                </a>

                                <Link
                                    to="/support"
                                    className="inline-flex items-center gap-1 text-primary hover:text-primary-dark"
                                >
                                    <span>Visit Support Center</span>
                                    <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Return modal */}
            {showReturnModal && selectedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn">
                        <h3 className="text-xl font-medium mb-2">Return Item</h3>
                        <p className="text-neutral-600 mb-4">
                            Do you want to initiate a return for {selectedItem.name}?
                        </p>

                        <div className="bg-neutral-50 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0">
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium">{selectedItem.name}</p>
                                <p className="text-sm text-neutral-600">
                                    Qty: {selectedItem.quantity} • KSh {selectedItem.price.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-neutral-600 mb-6">
                            Please select a reason for your return:
                        </p>

                        <div className="space-y-2 mb-6">
                            {['Item damaged', 'Wrong item received', 'No longer needed', 'Other'].map((reason) => (
                                <label key={reason} className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
                                    <input type="radio" name="returnReason" value={reason} className="text-primary" />
                                    <span>{reason}</span>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowReturnModal(false)}
                                className="flex-1 py-3 border border-neutral-200 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Process return logic would go here
                                    setShowReturnModal(false);

                                    // For demo, just close the modal
                                    // In a real app, you'd submit the return request
                                }}
                                className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                            >
                                Submit Return
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;