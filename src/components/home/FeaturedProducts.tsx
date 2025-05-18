import { useProducts } from '../../hooks/useProducts';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = () => {
    const { featuredProducts, isLoading } = useProducts();
    const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Debug logging to check featured products
    useEffect(() => {
        console.log("Featured Products:", featuredProducts);
    }, [featuredProducts]);

    // Set up the observer AFTER the component has rendered
    useEffect(() => {
        if (isLoading) return;

        // This timeout ensures DOM elements are available
        const timeoutId = setTimeout(() => {
            observerRef.current?.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const productIndex = parseInt(entry.target.getAttribute('data-index') || '0');
                        setVisibleProducts(prev => {
                            if (prev.includes(productIndex)) return prev;
                            return [...prev, productIndex];
                        });
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.product-item').forEach(el => {
                if (observerRef.current) observerRef.current.observe(el);
            });

            // Force visibility after a delay if intersection observer fails
            const forceTimeout = setTimeout(() => {
                if (visibleProducts.length === 0) {
                    const indices = Array.from({ length: featuredProducts.length }, (_, i) => i);
                    setVisibleProducts(indices);
                }
            }, 1000);

            return () => clearTimeout(forceTimeout);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            observerRef.current?.disconnect();
        };
    }, [isLoading, featuredProducts]);

    useEffect(() => {
        if (import.meta.env.NODE_ENV === 'development') {
            const indices = Array.from({ length: featuredProducts.length }, (_, i) => i);
            setVisibleProducts(indices);
        }
    }, [featuredProducts]);

    return (
        <section ref={sectionRef} className="py-24 bg-neutral-50 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
            <div className="absolute -top-48 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={16} className="text-primary" />
                            <span className="text-primary font-medium">Handpicked Selection</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            Our <span className="italic text-primary">Featured</span> Products
                        </h2>
                        <p className="text-neutral-600 md:text-lg leading-relaxed">
                            Discover our carefully curated collection of premium artisanal products, showcasing the exceptional craftsmanship and cultural heritage of Kenya.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                            <TrendingUp size={16} className="text-primary" />
                            <span className="text-sm font-medium">Best Sellers</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                            <Award size={16} className="text-primary" />
                            <span className="text-sm font-medium">Award Winning</span>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                                    <div className="bg-neutral-200 aspect-[3/4]"></div>
                                    <div className="p-6 space-y-3">
                                        <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                                        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                                        <div className="h-10 bg-neutral-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {featuredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-neutral-600">No featured products found. Please check your data source.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                                {featuredProducts.slice(0, 4).map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`product-item transition-all duration-700 transform ${visibleProducts.includes(index)
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-12 opacity-0'
                                            }`}
                                        data-index={index}
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        <ProductCard product={product} featured={index === 0} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="mt-16 text-center">
                    <Link
                        to="/products"
                        className="group inline-flex items-center gap-2 bg-white px-8 py-4 rounded-xl font-medium shadow-sm border border-neutral-100 hover:shadow-md transition-all"
                    >
                        <span>View All Products</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;