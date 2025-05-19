import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Define types for brands
interface Brand {
    id: string;
    name: string;
    logo: string;
    featured: boolean;
}

interface BrandsSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    viewAllLink?: string;
    brands: Brand[];
    backgroundColor?: string;
}

const Brands = ({
    title = "Trusted Brands",
    subtitle = "Quality Assurance",
    description = "We partner with the world's leading manufacturers to bring you reliable, high-quality products.",
    viewAllLink = "/brands",
    brands,
    backgroundColor = "bg-white"
}: BrandsSectionProps) => {
    const [hasBrandsLoaded, setHasBrandsLoaded] = useState(false);

    // Simulate loading state for brand images
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasBrandsLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Filter to featured brands
    const featuredBrands = brands.filter(brand => brand.featured);

    return (
        <section className={`py-24 bg-white relative overflow-hidden`}>
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                            {subtitle}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            <span className="text-black ">Shop </span>
                            <span className="text-primary">{title}</span>
                        </h2>
                        <p className="text-neutral-600 md:text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <Link
                        to={viewAllLink}
                        className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                        View all brands
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredBrands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/products?brand=${brand.id}`}
                            className="group block"
                        >
                            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md p-6 h-48 flex flex-col items-center justify-center">
                                {hasBrandsLoaded ? (
                                    <img
                                        src={brand.logo || '/api/placeholder/200/80'}
                                        alt={brand.name}
                                        className="h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-32 h-12 bg-neutral-200 rounded animate-pulse"></div>
                                )}
                                <h3 className="mt-4 font-medium text-neutral-600 group-hover:text-primary transition-colors">
                                    {brand.name}
                                </h3>
                                <div className="mt-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>View products</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty state if no brands */}
                {featuredBrands.length === 0 && (
                    <div className="text-center py-12 bg-neutral-50 rounded-2xl">
                        <p className="text-neutral-500">No brands available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Brands;