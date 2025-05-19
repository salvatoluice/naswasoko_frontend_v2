import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ProductType {
    id: string;
    name: string;
    description: string;
    image: string;
    count: number;
    featured: boolean;
}

interface ProductTypeSectionProps {
    title: string;
    subtitle?: string;
    description?: string;
    viewAllLink?: string;
    productTypes: ProductType[];
}

const ProductTypeSection = ({
    title,
    subtitle = "Shop by Category",
    description = "Find exactly what you need from our wide range of home appliances, each selected for quality and performance.",
    viewAllLink = "/categories",
    productTypes
}: ProductTypeSectionProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Filter to featured product types only
    const featuredTypes = productTypes.filter(type => type.featured);

    const scrollToType = (index: number) => {
        setActiveIndex(index);
        scrollContainerRef.current?.scrollTo({
            left: index * 280, // Approximate width of each card
            behavior: 'smooth'
        });
    };

    // Auto scroll product types
    useEffect(() => {
        if (hoveredIndex !== null || featuredTypes.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % featuredTypes.length;
                scrollToType(nextIndex);
                return nextIndex;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [featuredTypes.length, hoveredIndex]);

    return (
        <section className="py-24 bg-neutral-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                            {subtitle}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            <span className="text-black">{title.split(' ')[0]}</span>{' '}
                            <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-neutral-600 md:text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => scrollToType((activeIndex - 1 + featuredTypes.length) % featuredTypes.length)}
                            className="w-12 h-12 rounded-full border border-neutral-200  flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            aria-label="Previous category"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            onClick={() => scrollToType((activeIndex + 1) % featuredTypes.length)}
                            className="w-12 h-12 rounded-full border border-neutral-200  flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            aria-label="Next category"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Product types carousel */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                    >
                        {featuredTypes.map((type, index) => (
                            <Link
                                key={type.id}
                                to={`/products?type=${type.id}`}
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
                                        src={type.image || '/api/placeholder/400/600'}
                                        alt={type.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-bold text-white">{type.name}</h3>
                                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                                                {type.count} items
                                            </span>
                                        </div>
                                        <p className="text-white/80 text-sm mb-4">{type.description}</p>
                                        <div className="flex items-center text-white text-sm font-medium">
                                            <span>Browse Products</span>
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

                {/* View all link */}
                <div className="mt-8 text-center">
                    <Link
                        to={viewAllLink}
                        className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition-colors"
                    >
                        View all categories
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
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

export default ProductTypeSection;