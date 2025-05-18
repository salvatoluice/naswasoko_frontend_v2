import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { useProducts } from '../hooks/useProducts';
import type { ProductFilter } from '../types/product';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const { filteredProducts, isLoading, filterProducts } = useProducts();
    const [initialFilters, setInitialFilters] = useState<ProductFilter>({});

    // Use useCallback to create a stable effect callback
    const processUrlParams = useCallback(() => {
        // Process URL parameters to set initial filters
        const category = searchParams.get('category');
        const tag = searchParams.get('tag');
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') as ProductFilter['sort'];

        const filters: ProductFilter = {};

        if (category) {
            filters.categories = [category];
        }

        if (tag) {
            filters.tags = [tag];
        }

        if (search) {
            filters.search = search;
        }

        if (sort) {
            filters.sort = sort;
        }

        setInitialFilters(filters);
        return filters;
    }, [searchParams]);

    // Split the effect to avoid dependencies on filterProducts
    useEffect(() => {
        const filters = processUrlParams();
        filterProducts(filters);
        // Only depend on searchParams, not filterProducts
    }, [searchParams, processUrlParams]);

    const handleFilterChange = (filters: ProductFilter) => {
        filterProducts(filters);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <ProductFilters onFilterChange={handleFilterChange} />
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
    );
};

export default ProductsPage;