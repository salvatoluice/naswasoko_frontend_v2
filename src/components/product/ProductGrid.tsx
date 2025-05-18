import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-neutral-200 aspect-[3/4] rounded-lg mb-4"></div>
                        <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="py-8 text-center">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-neutral-600 mt-1">Try adjusting your filters or search term.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;