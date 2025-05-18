// src/components/home/FeaturedCategories.tsx

import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const FeaturedCategories = () => {
    const { categories } = useProducts();
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToCategory = (index: number) => {
        setActiveIndex(index);
        scrollContainerRef.current?.scrollTo({
            left: index * 280, // Approximate width of each category card
            behavior: 'smooth'
        });
    };

    // Auto scroll categories
    useEffect(() => {
        if (hoveredIndex !== null) return; // Don't auto-scroll when user is hovering

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % categories.length;
                scrollToCategory(nextIndex);
                return nextIndex;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [categories.length, hoveredIndex]);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-r from-neutral-200 to-neutral-100"></div>
            <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-l from-neutral-200 to-neutral-100"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                            Curated Selection
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            Shop by <span className="italic text-primary">Category</span>
                        </h2>
                        <p className="text-neutral-600 md:text-lg leading-relaxed">
                            Explore our thoughtfully curated categories, each representing the finest craftsmanship from different regions of Kenya.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => scrollToCategory((activeIndex - 1 + categories.length) % categories.length)}
                            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            aria-label="Previous category"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            onClick={() => scrollToCategory((activeIndex + 1) % categories.length)}
                            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            aria-label="Next category"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Categories carousel */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                    >
                        {categories.map((category, index) => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.slug}`}
                                className="snap-start"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className={`
                  w-64 h-96 rounded-2xl overflow-hidden relative group transition-all duration-500
                  ${activeIndex === index ? 'ring-2 ring-primary shadow-xl' : 'ring-1 ring-neutral-200'}
                `}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                                    <img
                                        src={category.image || '/api/placeholder/400/600'}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                        <h3 className="text-2xl font-serif text-white mb-2">{category.name}</h3>
                                        <p className="text-white/80 text-sm mb-4">Explore unique {category.name.toLowerCase()} pieces crafted by skilled artisans</p>
                                        <div className="flex items-center text-white text-sm font-medium">
                                            <span>Discover</span>
                                            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <div className={`h-1 mx-auto rounded-full transition-all duration-500 ${activeIndex === index ? 'w-8 bg-primary' : 'w-2 bg-neutral-300'}`}></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};

export default FeaturedCategories;