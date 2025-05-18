// src/pages/WishlistPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag,
    Heart,
    Trash2,
    ChevronRight,
    ArrowRight,
    Star,
    Zap
} from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface WishlistItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    discountPrice?: number;
    description?: string;
    image: string;
    category?: string;
    inStock?: boolean;
    dateAdded: Date;
}

const useWishlistPlaceholder = () => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
        {
            id: 'wish1',
            productId: 'prod1',
            name: 'Premium 4K Smart TV',
            price: 75000,
            discountPrice: 69999,
            description: 'Ultra-thin 55" OLED Smart TV with AI-powered image processing',
            image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000',
            category: 'TVs & Displays',
            inStock: true,
            dateAdded: new Date(2025, 4, 10)
        },
        {
            id: 'wish2',
            productId: 'prod2',
            name: 'Wireless Noise-Cancelling Headphones',
            price: 24999,
            description: 'Premium wireless headphones with adaptive noise cancellation',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
            category: 'Audio',
            inStock: true,
            dateAdded: new Date(2025, 4, 12)
        },
        {
            id: 'wish3',
            productId: 'prod3',
            name: 'Smart Home Hub Controller',
            price: 12500,
            discountPrice: 9999,
            description: 'Central control unit for all your smart home devices',
            image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000',
            category: 'Smart Home',
            inStock: true,
            dateAdded: new Date(2025, 4, 15)
        }
    ]);

    const removeFromWishlist = (id: string) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return {
        wishlistItems,
        removeFromWishlist,
        clearWishlist,
        totalItems: wishlistItems.length
    };
};

const WishlistPage = () => {
    // You would replace this with your actual hook
    const { wishlistItems, removeFromWishlist, clearWishlist, totalItems } = useWishlistPlaceholder();
    const { addToCart } = useCart();
    const [isRemoving, setIsRemoving] = useState<string | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // Calculate total potential savings
    const totalSavings = wishlistItems.reduce((acc, item) => {
        if (item.discountPrice) {
            return acc + (item.price - item.discountPrice);
        }
        return acc;
    }, 0);

    const handleRemove = (id: string) => {
        setIsRemoving(id);
        setTimeout(() => {
            removeFromWishlist(id);
            setIsRemoving(null);
        }, 300);
    };

    const handleAddToCart = (item: WishlistItem) => {
        addToCart({
            productId: item.productId,
            name: item.name,
            price: item.price,
            discountPrice: item.discountPrice,
            quantity: 1,
            image: item.image
        });
        // Optionally, you could also remove from wishlist
        // removeFromWishlist(item.id);
    };

    // Sort wishlist items by date added (newest first)
    const sortedItems = [...wishlistItems].sort((a, b) =>
        b.dateAdded.getTime() - a.dateAdded.getTime()
    );

    return (
        <div className="py-12 bg-white min-h-screen">
            <div className="container-custom">
                {/* Header with breadcrumbs */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="font-medium text-neutral-800">Wishlist</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Heart size={22} className="text-primary" />
                                <h1 className="text-2xl md:text-3xl font-medium">My Wishlist</h1>
                            </div>
                            <p className="text-neutral-600 mt-1">
                                {totalItems > 0
                                    ? `${totalItems} item${totalItems !== 1 ? 's' : ''} saved for later`
                                    : 'Your wishlist is empty'}
                            </p>
                        </div>

                        {totalItems > 0 && (
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="text-sm text-neutral-600 hover:text-red-500 transition-colors flex items-center gap-1"
                            >
                                <Trash2 size={16} />
                                <span>Clear All</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Empty state */}
                {totalItems === 0 && (
                    <div className="bg-neutral-50 rounded-2xl p-8 text-center my-8">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart size={24} className="text-neutral-400" />
                        </div>
                        <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
                        <p className="text-neutral-600 max-w-md mx-auto mb-6">
                            Browse our collection and save your favorite electronics and appliances for later.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                        >
                            <span>Explore Products</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}

                {/* Wishlist items */}
                {totalItems > 0 && (
                    <>
                        {/* Savings summary */}
                        {totalSavings > 0 && (
                            <div className="mb-6 bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Zap size={16} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-green-800">Potential Savings</p>
                                    <p className="text-sm text-green-700">
                                        You could save up to KSh {totalSavings.toLocaleString()} on your wishlist items
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Items grid/list */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {sortedItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${isRemoving === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                                        }`}
                                >
                                    <div className="relative aspect-[3/2] bg-neutral-50 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />

                                        {item.discountPrice && (
                                            <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-lg font-medium">
                                                {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                                            </div>
                                        )}

                                        {!item.inStock && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <p className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                                    Out of Stock
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs text-neutral-500">
                                                {item.category || 'Electronics'}
                                            </p>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star size={12} fill="currentColor" />
                                                <span className="text-xs text-neutral-600">4.8</span>
                                            </div>
                                        </div>

                                        <h3 className="font-medium text-lg mb-1 line-clamp-1">{item.name}</h3>

                                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                                            {item.description || 'No description available'}
                                        </p>

                                        <div className="flex items-baseline gap-2 mb-4">
                                            {item.discountPrice ? (
                                                <>
                                                    <span className="text-primary font-medium">KSh {item.discountPrice.toLocaleString()}</span>
                                                    <span className="text-neutral-500 text-sm line-through">KSh {item.price.toLocaleString()}</span>
                                                </>
                                            ) : (
                                                <span className="font-medium">KSh {item.price.toLocaleString()}</span>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                disabled={!item.inStock}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${item.inStock
                                                        ? 'bg-primary text-white hover:bg-primary-dark'
                                                        : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                <ShoppingBag size={16} />
                                                <span>Add to Cart</span>
                                            </button>

                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="p-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                                                aria-label="Remove from wishlist"
                                            >
                                                <Trash2 size={18} className="text-neutral-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Suggestion to explore more */}
                        <div className="bg-neutral-50 rounded-xl p-6 text-center">
                            <p className="text-neutral-700 mb-4">Looking for more options?</p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-white border border-neutral-200 px-6 py-3 rounded-xl font-medium hover:bg-neutral-100 transition-colors"
                            >
                                <span>Explore More Products</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Clear wishlist confirmation modal */}
            {showClearConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fadeIn">
                        <h3 className="text-xl font-medium mb-3">Clear Wishlist?</h3>
                        <p className="text-neutral-600 mb-6">
                            Are you sure you want to remove all items from your wishlist? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="flex-1 py-3 border border-neutral-200 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    clearWishlist();
                                    setShowClearConfirm(false);
                                }}
                                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;