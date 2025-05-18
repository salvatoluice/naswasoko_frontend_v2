import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
    product: Product;
    featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
    // Ensure product exists to prevent TypeError
    if (!product || !product.id) {
        console.error("ProductCard received invalid product data:", product);
        return <div className="bg-white rounded-xl p-4 text-center">Product data unavailable</div>;
    }

    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const { addToCart } = useCart();
    const cardRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        cardRef.current?.classList.add('scale-95');
        setTimeout(() => {
            cardRef.current?.classList.remove('scale-95');
        }, 200);

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: 1,
            image: product.images && product.images.length > 0 ? product.images[0] : ''
        });
    };

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const calculateDiscount = () => {
        if (!product.discountPrice) return 0;
        return Math.round(((product.price - product.discountPrice) / product.price) * 100);
    };

    // Safety check for product images
    const images = product.images && product.images.length > 0 ? product.images : [''];
    const hasMultipleImages = images.length > 1;

    if (featured) {
        return (
            <Link to={`/products/${product.id}`}>
                <div
                    ref={cardRef}
                    className="h-full rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-full relative bg-neutral-100 overflow-hidden">
                            <div className="aspect-video md:aspect-auto md:h-full">
                                {hasMultipleImages ? (
                                    <>
                                        {images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image || '/placeholder-image.png'}
                                                alt={`${product.name} - View ${index + 1}`}
                                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeImage === index ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                            />
                                        ))}

                                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveImage(index);
                                                    }}
                                                    className={`w-2 h-2 rounded-full transition-all ${activeImage === index ? 'bg-white w-6' : 'bg-white/60'
                                                        }`}
                                                    aria-label={`View image ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        src={images[0] || '/placeholder-image.png'}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="absolute top-3 left-3 z-10">
                                <span className="inline-block bg-white py-1 px-3 rounded-full text-xs uppercase tracking-wider font-medium shadow-sm">
                                    Featured
                                </span>
                            </div>

                            {product.discountPrice && (
                                <div className="absolute top-3 right-3 z-10">
                                    <span className="inline-block bg-primary text-white py-1 px-3 rounded-full text-xs font-medium shadow-sm">
                                        {calculateDiscount()}% Off
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div>
            <div
                ref={cardRef}
                onClick={() => navigate(`/products/${product.id}`)}
                className="h-full bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-neutral-100 group relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
                    {hasMultipleImages ? (
                        <>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image || '/placeholder-image.png'}
                                    alt={`${product.name} - View ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${activeImage === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                        }`}
                                />
                            ))}

                            {isHovered && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveImage(index);
                                            }}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${activeImage === index ? 'bg-white w-4' : 'bg-white/60'
                                                }`}
                                            aria-label={`View image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <img
                            src={images[0] || '/placeholder-image.png'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}

                    <div
                        className={`absolute top-3 right-3 flex flex-col space-y-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <button
                            onClick={toggleFavorite}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                            <Heart
                                size={16}
                                className={isFavorite ? "fill-red-500 text-red-500" : "text-neutral-500"}
                            />
                        </button>

                        <button
                            onClick={handleAddToCart}
                            aria-label="Add to cart"
                            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all hover:bg-primary hover:text-white"
                        >
                            <ShoppingBag size={16} />
                        </button>

                        <Link
                            to={`/products/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Quick view"
                            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all group"
                        >
                            <Eye size={16} />
                        </Link>
                    </div>

                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product.discountPrice && (
                            <span className="inline-block bg-primary text-white px-2 py-1 text-xs font-medium rounded">
                                {calculateDiscount()}% OFF
                            </span>
                        )}

                        {product.featured && (
                            <span className="inline-block bg-neutral-800 text-white px-2 py-1 text-xs font-medium rounded">
                                Featured
                            </span>
                        )}

                        {!product.inStock && (
                            <span className="inline-block bg-neutral-600 text-white px-2 py-1 text-xs font-medium rounded">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <div
                        className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'
                            }`}
                    >
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-white hover:bg-neutral-100 text-neutral-900 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <ShoppingBag size={16} />
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-neutral-900 line-clamp-1">{product.name}</h3>

                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs text-neutral-600">4.8</span>
                        </div>
                    </div>

                    <p className="text-sm text-neutral-600 mb-2 line-clamp-1">
                        {product.description ? product.description.substring(0, 60) : "No description available"}
                    </p>

                    <div className="flex items-baseline gap-2">
                        {product.discountPrice ? (
                            <>
                                <span className="text-primary font-medium">KSh {product.discountPrice.toLocaleString()}</span>
                                <span className="text-neutral-500 text-sm line-through">KSh {product.price.toLocaleString()}</span>
                            </>
                        ) : (
                            <span className="font-medium">KSh {product.price.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;