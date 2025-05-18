import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { filteredProducts, isLoading, searchProducts } = useProducts();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            searchProducts(query);
            setSearchValue(query);
        }
    }, [searchParams, searchProducts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            searchProducts(searchValue);
            setSearchParams({ q: searchValue });
        }
    };

    const clearSearch = () => {
        setSearchValue('');
        setSearchParams({});
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-medium mb-6">Search Products</h1>

                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search for products, categories, or tags..."
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />

                        {searchValue && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {searchParams.has('q') && (
                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-1">
                        Search Results for "{searchParams.get('q')}"
                    </h2>
                    <p className="text-neutral-600">
                        {filteredProducts.length} products found
                    </p>
                </div>
            )}

            <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
    );
};

export default SearchPage;
