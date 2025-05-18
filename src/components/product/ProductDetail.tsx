import { useState } from 'react';
import { Heart, ShoppingBag, Minus, Plus, Share2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types/product';

interface ProductDetailProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

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
        <div className="max-w-6xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6"
            >
                <ArrowLeft size={16} />
                <span>Back to Products</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                    <div className="aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden mb-4">
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${activeImage === index ? 'ring-2 ring-primary' : 'opacity-70'
                                        }`}
                                >
                                    <img src={image} alt={`${product.name} - View ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl font-medium mb-2">{product.name}</h1>

                    <div className="flex items-baseline gap-3 mb-4">
                        {product.discountPrice ? (
                            <>
                                <span className="text-primary text-xl font-medium">KSh {product.discountPrice.toLocaleString()}</span>
                                <span className="text-neutral-500 line-through">KSh {product.price.toLocaleString()}</span>
                                <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-medium">KSh {product.price.toLocaleString()}</span>
                        )}
                    </div>

                    <p className="text-neutral-600 mb-6">{product.description}</p>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                        <div className="mb-6">
                            <p className="text-sm text-neutral-600 mb-2">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map(tag => (
                                    <Link
                                        key={tag}
                                        to={`/products?tag=${tag}`}
                                        className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <p className="text-sm text-neutral-600 mb-2">Quantity:</p>
                        <div className="flex items-center border border-neutral-300 rounded-lg w-fit">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="p-2 hover:bg-neutral-100"
                                disabled={quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="p-2 hover:bg-neutral-100"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={18} />
                            Add to Cart
                        </button>

                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-3 border border-neutral-300 rounded-lg"
                            aria-label="Add to favorites"
                        >
                            <Heart
                                size={18}
                                className={isFavorite ? 'fill-red-500 text-red-500' : ''}
                            />
                        </button>

                        <button
                            className="p-3 border border-neutral-300 rounded-lg"
                            aria-label="Share"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>

                    {/* Extra Info */}
                    <div className="space-y-4 text-sm text-neutral-600">
                        <p>Category: <Link to={`/products?category=${product.category}`} className="text-primary">{product.category}</Link></p>
                        <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
                        <p>Shipping: Free delivery in Nairobi, KSh 350 for rest of Kenya</p>
                        <p>Returns: 7-day easy returns</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;