// src/pages/AccountDashboard.tsx

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
    Package,
    User,
    Settings,
    CreditCard,
    LogOut,
    MapPin,
    Bell,
    Heart,
    ShoppingBag,
    Shield,
    ChevronRight,
    Clock,
    AlertTriangle,
    Zap,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';

// Sample order type
interface Order {
    id: string;
    orderNumber: string;
    date: Date;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    tracking?: string;
}

const AccountDashboard = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const { wishlistItems } = useWishlist();
    const { cart } = useCart();
    const navigate = useNavigate();

    // Active tab state
    const [activeTab, setActiveTab] = useState('dashboard');

    // Sample orders
    const [orders, setOrders] = useState<Order[]>([
        {
            id: 'ord1',
            orderNumber: 'ORD-78965',
            date: new Date(2025, 4, 10),
            status: 'delivered',
            total: 142500,
            items: [
                {
                    id: 'item1',
                    name: 'Premium 4K OLED Smart TV',
                    quantity: 1,
                    price: 129999,
                    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571'
                },
                {
                    id: 'item2',
                    name: 'Wireless Charging Pad',
                    quantity: 1,
                    price: 12500,
                    image: 'https://images.unsplash.com/photo-1600490722773-35753a5d9b51'
                }
            ]
        },
        {
            id: 'ord2',
            orderNumber: 'ORD-65432',
            date: new Date(2025, 4, 5), // May 5, 2025
            status: 'shipped',
            total: 24999,
            tracking: 'KE98765432',
            items: [
                {
                    id: 'item3',
                    name: 'Noise-Cancelling Headphones',
                    quantity: 1,
                    price: 24999,
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
                }
            ]
        }
    ]);

    // Redirect if not authenticated
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" state={{ from: { pathname: '/account' } }} />;
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Status badge component
    const StatusBadge = ({ status }: { status: Order['status'] }) => {
        const statusConfig = {
            pending: { color: 'bg-neutral-100 text-neutral-700', text: 'Pending' },
            processing: { color: 'bg-blue-50 text-blue-700', text: 'Processing' },
            shipped: { color: 'bg-amber-50 text-amber-700', text: 'Shipped' },
            delivered: { color: 'bg-green-50 text-green-700', text: 'Delivered' },
            cancelled: { color: 'bg-red-50 text-red-700', text: 'Cancelled' }
        };

        const config = statusConfig[status];

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    function onOpenCart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        navigate('/cart');
    }
    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User size={24} />
                                    )}
                                </div>
                                <div>
                                    <h2 className="font-medium">
                                        {user?.firstName} {user?.lastName}
                                    </h2>
                                    <p className="text-sm text-neutral-600">{user?.email}</p>
                                </div>
                            </div>

                            {user?.isVerified ? (
                                <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg px-3 py-2 text-sm">
                                    <Shield size={16} />
                                    <span>Verified Account</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 rounded-lg px-3 py-2 text-sm">
                                    <AlertTriangle size={16} />
                                    <span>Please verify your email</span>
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                            <div className="p-1">
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${activeTab === 'dashboard'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-neutral-50 text-neutral-700'
                                        }`}
                                >
                                    <User size={18} />
                                    <span>Dashboard</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${activeTab === 'orders'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-neutral-50 text-neutral-700'
                                        }`}
                                >
                                    <Package size={18} />
                                    <span>My Orders</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${activeTab === 'addresses'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-neutral-50 text-neutral-700'
                                        }`}
                                >
                                    <MapPin size={18} />
                                    <span>Addresses</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('payment')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${activeTab === 'payment'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-neutral-50 text-neutral-700'
                                        }`}
                                >
                                    <CreditCard size={18} />
                                    <span>Payment Methods</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${activeTab === 'notifications'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-neutral-50 text-neutral-700'
                                        }`}
                                >
                                    <Bell size={18} />
                                    <span>Notifications</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${activeTab === 'settings'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-neutral-50 text-neutral-700'
                                        }`}
                                >
                                    <Settings size={18} />
                                    <span>Account Settings</span>
                                </button>
                            </div>

                            <div className="border-t border-neutral-100 p-4">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-left"
                                >
                                    <LogOut size={18} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </nav>

                        {/* Help card */}
                        <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                                <Zap size={18} className="text-primary" />
                                <span>Need help?</span>
                            </h3>
                            <p className="text-sm text-neutral-700 mb-3">
                                Our support team is available 24/7 to assist you with any issues.
                            </p>
                            <Link
                                to="/support"
                                className="text-sm text-primary font-medium hover:text-primary-dark flex items-center gap-1"
                            >
                                <span>Contact Support</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        {/* Dashboard tab */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-medium">Account Dashboard</h1>

                                {/* Quick stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-neutral-600 text-sm">Total Orders</p>
                                                <p className="text-2xl font-medium">{orders.length}</p>
                                            </div>
                                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                                <Package size={20} />
                                            </div>
                                        </div>
                                        <Link
                                            to="#"
                                            onClick={() => setActiveTab('orders')}
                                            className="text-sm text-primary flex items-center gap-1 mt-4"
                                        >
                                            <span>View all orders</span>
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>

                                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-neutral-600 text-sm">Wishlist</p>
                                                <p className="text-2xl font-medium">{wishlistItems.length}</p>
                                            </div>
                                            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                                                <Heart size={20} />
                                            </div>
                                        </div>
                                        <Link
                                            to="/wishlist"
                                            className="text-sm text-primary flex items-center gap-1 mt-4"
                                        >
                                            <span>View wishlist</span>
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>

                                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-neutral-600 text-sm">Cart</p>
                                                <p className="text-2xl font-medium">{cart.items.length}</p>
                                            </div>
                                            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                                                <ShoppingBag size={20} />
                                            </div>
                                        </div>
                                        <button
                                            onClick={onOpenCart}
                                            className="text-sm text-primary flex items-center gap-1 mt-4"
                                        >
                                            <span>View cart</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Recent orders */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-medium mb-4">Recent Orders</h2>

                                    {orders.length === 0 ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Package size={24} className="text-neutral-400" />
                                            </div>
                                            <h3 className="font-medium mb-2">No orders yet</h3>
                                            <p className="text-neutral-600 mb-4">
                                                You haven't placed any orders yet.
                                            </p>
                                            <Link
                                                to="/products"
                                                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl"
                                            >
                                                <span>Start Shopping</span>
                                                <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.slice(0, 3).map(order => (
                                                <div
                                                    key={order.id}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                                                >
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="font-medium">Order #{order.orderNumber}</p>
                                                            <StatusBadge status={order.status} />
                                                        </div>
                                                        <p className="text-sm text-neutral-600">
                                                            {order.date.toLocaleDateString()} • KSh {order.total.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {/* Order thumbnail */}
                                                        <div className="flex -space-x-2">
                                                            {order.items.slice(0, 2).map((item, index) => (
                                                                <div
                                                                    key={item.id}
                                                                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-white"
                                                                    style={{ zIndex: order.items.length - index }}
                                                                >
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ))}
                                                            {order.items.length > 2 && (
                                                                <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center text-xs font-medium">
                                                                    +{order.items.length - 2}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <Link
                                                            to={`/orders/${order.id}`}
                                                            className="text-sm text-primary font-medium hover:text-primary-dark"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}

                                            {orders.length > 3 && (
                                                <div className="text-center pt-4">
                                                    <button
                                                        onClick={() => setActiveTab('orders')}
                                                        className="text-primary hover:text-primary-dark font-medium text-sm"
                                                    >
                                                        View all orders
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Recommended products - placeholder */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-medium">Recommended For You</h2>
                                        <Link
                                            to="/products"
                                            className="text-sm text-primary hover:text-primary-dark"
                                        >
                                            View all
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {[1, 2, 3].map(index => (
                                            <div
                                                key={index}
                                                className="bg-neutral-50 rounded-xl p-1"
                                            >
                                                <div className="aspect-[4/3] bg-neutral-100 rounded-lg mb-2"></div>
                                                <div className="p-2">
                                                    <div className="w-2/3 h-4 bg-neutral-200 rounded mb-1"></div>
                                                    <div className="w-1/2 h-4 bg-neutral-200 rounded"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders tab */}
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-medium">My Orders</h1>

                                {orders.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package size={32} className="text-neutral-400" />
                                        </div>
                                        <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                                        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                                            You haven't placed any orders yet. Browse our products and find something you'll love.
                                        </p>
                                        <Link
                                            to="/products"
                                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/10 hover:bg-primary-dark transition-colors"
                                        >
                                            <span>Start Shopping</span>
                                            <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        {/* Order filters - placeholder */}
                                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 flex-nowrap">
                                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm whitespace-nowrap">
                                                All Orders
                                            </button>
                                            <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 whitespace-nowrap">
                                                Processing
                                            </button>
                                            <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 whitespace-nowrap">
                                                Shipped
                                            </button>
                                            <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 whitespace-nowrap">
                                                Delivered
                                            </button>
                                            <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50 whitespace-nowrap">
                                                Cancelled
                                            </button>
                                        </div>

                                        {/* Orders list */}
                                        <div className="space-y-6">
                                            {orders.map(order => (
                                                <div
                                                    key={order.id}
                                                    className="border border-neutral-200 rounded-xl overflow-hidden"
                                                >
                                                    {/* Order header */}
                                                    <div className="bg-neutral-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <p className="font-medium">Order #{order.orderNumber}</p>
                                                                <StatusBadge status={order.status} />
                                                            </div>
                                                            <p className="text-sm text-neutral-600">
                                                                {order.date.toLocaleDateString()} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • KSh {order.total.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {order.status === 'shipped' && order.tracking && (
                                                                <div className="text-sm bg-blue-50 text-blue-700 py-1 px-3 rounded-full flex items-center gap-1">
                                                                    <Clock size={14} />
                                                                    <span>Tracking: {order.tracking}</span>
                                                                </div>
                                                            )}
                                                            <Link
                                                                to={`/orders/${order.id}`}
                                                                className="text-sm bg-primary/10 text-primary py-1 px-3 rounded-lg font-medium hover:bg-primary/20 transition-colors"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Order items */}
                                                    <div className="divide-y divide-neutral-100">
                                                        {order.items.map(item => (
                                                            <div
                                                                key={item.id}
                                                                className="p-4 flex gap-4"
                                                            >
                                                                <div className="w-16 h-16 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0">
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="font-medium">{item.name}</h3>
                                                                    <p className="text-sm text-neutral-600">
                                                                        Qty: {item.quantity} • KSh {item.price.toLocaleString()}
                                                                    </p>
                                                                    <div className="flex gap-3 mt-2">
                                                                        {order.status === 'delivered' && (
                                                                            <button className="text-sm text-primary hover:text-primary-dark">
                                                                                Write a Review
                                                                            </button>
                                                                        )}
                                                                        <button className="text-sm text-neutral-700 hover:text-neutral-900">
                                                                            Buy Again
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Other tabs - placeholders */}
                        {activeTab === 'addresses' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h1 className="text-2xl font-medium mb-6">My Addresses</h1>
                                <p className="text-neutral-600">Address management will be implemented here.</p>
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h1 className="text-2xl font-medium mb-6">Payment Methods</h1>
                                <p className="text-neutral-600">Payment method management will be implemented here.</p>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h1 className="text-2xl font-medium mb-6">Notifications</h1>
                                <p className="text-neutral-600">Notification preferences will be implemented here.</p>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h1 className="text-2xl font-medium mb-6">Account Settings</h1>
                                <p className="text-neutral-600">Account settings will be implemented here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;