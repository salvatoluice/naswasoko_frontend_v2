import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Star,
    Heart,
    ShoppingCart,
    Eye,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    discountPrice: number | null;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    categoryName?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    isFeatured?: boolean;
}

interface ProductGridSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    viewAllLink?: string;
    viewAllText?: string;
    products: Product[];
    backgroundColor?: string;
    showPagination?: boolean;
    itemsPerPage?: number;
    layout?: 'grid' | 'slider';
}

const ProductGrid = ({
    title = "Featured Products",
    subtitle = "Customer Favorites",
    description = "Our best-selling products loved by customers across the country.",
    viewAllLink = "/products",
    viewAllText = "View all products",
    products,
    showPagination = false,
    itemsPerPage = 4,
}: ProductGridSectionProps) => {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const currentProducts = products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const formatPrice = (price: number) => {
        return `KSh ${price.toLocaleString()}`;
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <section className={`py-24 bg-white relative overflow-hidden`}>
            <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                            {subtitle}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            <span className="text-black ">{title.split(' ')[0]} </span>
                            <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-neutral-600  md:text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {showPagination && totalPages > 1 && (
                            <div className="hidden sm:flex items-center mr-4">
                                <span className="text-sm text-neutral-500  mr-3">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={goToPrevPage}
                                    className="w-8 h-8 rounded-full border border-neutral-200  flex items-center justify-center hover:bg-neutral-100  transition-colors"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={goToNextPage}
                                    className="w-8 h-8 rounded-full border border-neutral-200  flex items-center justify-center hover:bg-neutral-100  transition-colors ml-2"
                                    aria-label="Next page"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}

                        <Link
                            to={viewAllLink}
                            className="inline-flex items-center text-primary font-medium hover:underline"
                        >
                            {viewAllText}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${itemsPerPage === 3 ? '3' : '4'} gap-6`}>
                    {currentProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="group block"
                        >
                            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md h-full">
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={product.image || '/api/placeholder/400/400'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.isNew && (
                                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                                                New Arrival
                                            </span>
                                        )}
                                        {product.isBestSeller && (
                                            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                                                Best Seller
                                            </span>
                                        )}
                                        {product.discountPrice && (
                                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                                                {Math.round((1 - product.discountPrice / product.price) * 100)}% Off
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute right-4 top-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="w-10 h-10 rounded-full bg-white  shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Heart className="h-5 w-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white  shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Eye className="h-5 w-5" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-white  shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <span className="text-sm text-neutral-500  mb-2 block">
                                        {product.categoryName || product.category}
                                    </span>

                                    <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center mb-3">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-neutral-500  ml-2">
                                            ({product.reviews})
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center">
                                            {product.discountPrice ? (
                                                <>
                                                    <span className="font-bold text-lg text-primary">
                                                        {formatPrice(product.discountPrice)}
                                                    </span>
                                                    <span className="text-neutral-500 line-through text-sm ml-2">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="font-bold text-lg text-primary">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="w-10 h-10 rounded-full bg-neutral-100  flex items-center justify-center group-hover:bg-primary transition-colors">
                                            <ShoppingCart className="h-5 w-5 text-neutral-700 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {showPagination && totalPages > 1 && (
                    <div className="mt-8 flex justify-center sm:hidden">
                        <div className="flex items-center">
                            <button
                                onClick={goToPrevPage}
                                className="w-10 h-10 rounded-full border border-neutral-200  flex items-center justify-center hover:bg-neutral-100  transition-colors"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <span className="mx-4 text-sm text-neutral-600 ">
                                Page {currentPage + 1} of {totalPages}
                            </span>

                            <button
                                onClick={goToNextPage}
                                className="w-10 h-10 rounded-full border border-neutral-200  flex items-center justify-center hover:bg-neutral-100  transition-colors"
                                aria-label="Next page"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {products.length === 0 && (
                    <div className="text-center py-12 bg-neutral-50 rounded-2xl">
                        <p className="text-neutral-500 ">No products available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;