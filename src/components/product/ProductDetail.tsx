import { useState } from 'react';
import {
    Heart,
    ShoppingBag,
    Minus,
    Plus,
    Share2,
    ArrowLeft,
    Star,
    Shield,
    Truck,
    Sparkles,
    Check,
    HelpCircle,
    Cpu,
    BarChart4,
    Headphones,
    BatteryFull
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types/product';

interface ProductDetailProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const techSpecs = {
        dimensions: "23.5 × 68.3 × 41.2 cm",
        weight: "2.8 kg",
        connectivity: "Wi-Fi 6, Bluetooth 5.2, HDMI 2.1",
        powerConsumption: "65W typical, 0.5W standby",
        modelNumber: "TX-750B Pro",
        warranty: "2 years manufacturer warranty"
    };

    const features = [
        "4K Ultra HD Resolution",
        "Smart Voice Control Integration",
        "Energy Efficient Design (A+ Rated)",
        "Automatic Software Updates",
        "Compatible with all major streaming services"
    ];

    const handleQuantityChange = (amount: number) => {
        const newQuantity = quantity + amount;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity,
            image: product.images[0]
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-neutral-600 hover:text-primary mb-8 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Products</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="aspect-square bg-neutral-50 rounded-3xl overflow-hidden relative group border border-neutral-100 shadow-sm">
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {product.featured && (
                            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                                <Sparkles size={12} className="text-primary-light" />
                                <span>Premium Series</span>
                            </div>
                        )}

                        {product.discountPrice && (
                            <div className="absolute top-4 right-4 bg-primary-light text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                            </div>
                        )}
                    </div>

                    {product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 px-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`
                    relative rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300
                    ${activeImage === index
                                            ? 'ring-2 ring-primary shadow-md w-20 h-20'
                                            : 'opacity-60 hover:opacity-90 w-16 h-16'}
                  `}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} - View ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {activeImage === index && (
                                        <div className="absolute inset-0 border-2 border-primary rounded-2xl"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100">
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-primary" />
                            <span>Key Features</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="mt-0.5">
                                        <Check size={16} className="text-primary" />
                                    </div>
                                    <span className="text-neutral-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    {/* Basic Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={16}
                                        className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-neutral-500">4.8 (127 reviews)</span>
                        </div>

                        <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
                        <p className="text-sm text-neutral-500 mb-4">Model: {techSpecs.modelNumber} • In Stock: {product.inStock ? 'Yes' : 'No'}</p>

                        <div className="flex items-baseline gap-3 mb-6">
                            {product.discountPrice ? (
                                <>
                                    <span className="text-2xl font-bold text-neutral-900">KSh {product.discountPrice.toLocaleString()}</span>
                                    <span className="text-neutral-500 line-through text-lg">KSh {product.price.toLocaleString()}</span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold text-neutral-900">KSh {product.price.toLocaleString()}</span>
                            )}
                        </div>
                    </div>

                    {/* Product Actions */}
                    <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                        {/* Color/Variant Selection if applicable */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-neutral-700 mb-3">Select Variant:</p>
                            <div className="flex flex-wrap gap-3">
                                {['Black', 'Silver', 'White'].map((color) => (
                                    <button
                                        key={color}
                                        className={`px-4 py-2 rounded-xl text-sm transition-all ${color === 'Black'
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-neutral-700 mb-3">Quantity:</p>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-10 rounded-l-xl bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={16} className={quantity <= 1 ? 'text-neutral-300' : 'text-neutral-700'} />
                                </button>
                                <div className="h-10 px-6 flex items-center justify-center border-t border-b border-neutral-200 bg-white">
                                    <span className="font-medium">{quantity}</span>
                                </div>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 rounded-r-xl bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                >
                                    <Plus size={16} className="text-neutral-700" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="bg-primary hover:bg-primary-dark text-white py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/10 group"
                            >
                                <ShoppingBag size={18} />
                                <span>Add to Cart</span>
                                <span className="text-sm opacity-70">• KSh {(product.discountPrice || product.price).toLocaleString()}</span>
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`flex-1 py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all ${isFavorite
                                            ? 'bg-red-50 text-red-500 border border-red-200'
                                            : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
                                        }`}
                                >
                                    <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                                    <span>Wishlist</span>
                                </button>

                                <button
                                    className="flex-1 py-3 bg-white border border-neutral-200 rounded-2xl font-medium flex items-center justify-center gap-2 text-neutral-700 hover:border-neutral-300 transition-colors"
                                >
                                    <Share2 size={18} />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Shipping & Returns */}
                    <div className="space-y-4 p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Truck size={18} />
                            </div>
                            <div>
                                <h3 className="font-medium">Fast Delivery</h3>
                                <p className="text-sm text-neutral-600">Free delivery in Nairobi (1-2 days), KSh 350 for rest of Kenya (3-5 days)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Shield size={18} />
                            </div>
                            <div>
                                <h3 className="font-medium">Warranty Coverage</h3>
                                <p className="text-sm text-neutral-600">2-year manufacturer warranty with option to extend</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <HelpCircle size={18} />
                            </div>
                            <div>
                                <h3 className="font-medium">30-Day Returns</h3>
                                <p className="text-sm text-neutral-600">Easy returns within 30 days of purchase</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12">
                {/* Tab Navigation */}
                <div className="flex border-b border-neutral-200 mb-8">
                    {['description', 'specifications', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === tab
                                    ? 'text-primary'
                                    : 'text-neutral-500 hover:text-neutral-800'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="pb-16">
                    {/* Description Tab */}
                    {activeTab === 'description' && (
                        <div className="prose max-w-none">
                            <p className="text-neutral-700 leading-relaxed mb-6">{product.description}</p>
                            <p className="text-neutral-700 leading-relaxed mb-6">
                                Experience cutting-edge technology with this premium electronic device. Designed for the modern home, it combines sleek aesthetics with powerful performance to deliver an exceptional user experience.
                            </p>
                            <p className="text-neutral-700 leading-relaxed">
                                The latest model includes advanced features like voice control, smart connectivity, and energy-efficient operation, making it an essential addition to any tech-savvy household.
                            </p>
                        </div>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <Cpu size={18} className="text-primary" />
                                        <span>Technical Specifications</span>
                                    </h3>
                                    <div className="bg-neutral-50 rounded-2xl divide-y divide-neutral-100">
                                        {Object.entries(techSpecs).map(([key, value]) => (
                                            <div key={key} className="flex py-3 px-4">
                                                <span className="text-sm text-neutral-500 w-1/3 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="text-sm font-medium flex-1">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <BatteryFull size={18} className="text-primary" />
                                        <span>Power & Efficiency</span>
                                    </h3>
                                    <div className="bg-neutral-50 rounded-2xl p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                <span className="text-emerald-700 font-bold text-sm">A+</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-sm">Energy Efficiency Rating</h4>
                                                <p className="text-xs text-neutral-500">Low power consumption, eco-friendly</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-neutral-600">Average annual electricity consumption: 65 kWh</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <Headphones size={18} className="text-primary" />
                                        <span>Compatibility</span>
                                    </h3>
                                    <div className="bg-neutral-50 rounded-2xl p-4">
                                        <div className="space-y-3">
                                            <p className="text-sm text-neutral-700">Compatible with:</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['iOS', 'Android', 'Windows', 'macOS'].map((os) => (
                                                    <div key={os} className="flex items-center gap-2">
                                                        <Check size={16} className="text-primary" />
                                                        <span className="text-sm">{os}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-sm text-neutral-500 mt-2">
                                                Connects via Bluetooth 5.2, Wi-Fi, or HDMI
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <BarChart4 size={18} className="text-primary" />
                                        <span>In The Box</span>
                                    </h3>
                                    <div className="bg-neutral-50 rounded-2xl p-4">
                                        <ul className="space-y-2">
                                            {[
                                                'Main Device Unit',
                                                'Power Adapter',
                                                'HDMI Cable',
                                                'Remote Control',
                                                'User Manual',
                                                'Warranty Card'
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-center gap-2 text-sm">
                                                    <Check size={16} className="text-primary" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-medium mb-1">Customer Reviews</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={16}
                                                    className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-neutral-600">Based on 127 reviews</span>
                                    </div>
                                </div>

                                <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                                    Write a Review
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Sample reviews */}
                                {[
                                    {
                                        name: "Michael K.",
                                        date: "May 10, 2025",
                                        rating: 5,
                                        comment: "Excellent product! The display quality is outstanding and setup was a breeze. Highly recommend for anyone looking to upgrade their home entertainment system."
                                    },
                                    {
                                        name: "Sarah L.",
                                        date: "April 28, 2025",
                                        rating: 4,
                                        comment: "Very good device with great features. The only reason I'm not giving 5 stars is because the app could be more intuitive. Otherwise, performance is excellent and I'm happy with my purchase."
                                    }
                                ].map((review, index) => (
                                    <div key={index} className="border border-neutral-100 rounded-2xl p-5 bg-white">
                                        <div className="flex justify-between mb-3">
                                            <div>
                                                <h4 className="font-medium">{review.name}</h4>
                                                <p className="text-sm text-neutral-500">{review.date}</p>
                                            </div>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={14}
                                                        className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-neutral-700 text-sm">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;