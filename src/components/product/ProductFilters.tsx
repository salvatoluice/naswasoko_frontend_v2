// src/components/product/ProductFilters.tsx

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import type { ProductFilter } from '../../types/product';

interface ProductFiltersProps {
    onFilterChange: (filters: ProductFilter) => void;
}

const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
    const { categories, tags } = useProducts();
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<ProductFilter>({
        categories: [],
        priceRange: [0, 10000],
        tags: [],
        sort: 'newest'
    });

    const handleCategoryChange = (category: string) => {
        setFilters(prev => {
            const updatedCategories = prev.categories?.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...(prev.categories || []), category];

            return { ...prev, categories: updatedCategories };
        });
    };

    const handleTagChange = (tag: string) => {
        setFilters(prev => {
            const updatedTags = prev.tags?.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...(prev.tags || []), tag];

            return { ...prev, tags: updatedTags };
        });
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
        const value = parseInt(event.target.value);
        setFilters(prev => {
            const priceRange = [...(prev.priceRange || [0, 10000])];
            priceRange[index] = value;
            return { ...prev, priceRange: priceRange as [number, number] };
        });
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({
            ...prev,
            sort: event.target.value as ProductFilter['sort']
        }));
    };

    const applyFilters = () => {
        onFilterChange(filters);
        setIsOpen(false);
    };

    const resetFilters = () => {
        const resetFilters: ProductFilter = {
            categories: [],
            priceRange: [0, 10000],
            tags: [],
            sort: 'newest'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Products</h2>

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-lg"
                >
                    <Filter size={16} />
                    <span>Filter</span>
                </button>

                {/* Desktop Sort Dropdown */}
                <div className="hidden md:block">
                    <select
                        value={filters.sort}
                        onChange={handleSortChange}
                        className="border border-neutral-300 rounded-lg px-3 py-2 bg-white text-sm"
                    >
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="popular">Popularity</option>
                    </select>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                    <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-medium">Filters</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Categories</h4>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <label key={category.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.categories?.includes(category.slug) || false}
                                                onChange={() => handleCategoryChange(category.slug)}
                                                className="mr-2"
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Price Range</h4>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={filters.priceRange?.[0] || 0}
                                        onChange={e => handlePriceChange(e, 0)}
                                        min={0}
                                        max={filters.priceRange?.[1] || 10000}
                                        className="border border-neutral-300 rounded w-full p-2"
                                        placeholder="Min"
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        value={filters.priceRange?.[1] || 10000}
                                        onChange={e => handlePriceChange(e, 1)}
                                        min={filters.priceRange?.[0] || 0}
                                        max={100000}
                                        className="border border-neutral-300 rounded w-full p-2"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagChange(tag)}
                                            className={`px-3 py-1 rounded-full text-sm ${filters.tags?.includes(tag)
                                                ? 'bg-primary text-white'
                                                : 'bg-neutral-100 text-neutral-700'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-2">Sort By</h4>
                                <select
                                    value={filters.sort}
                                    onChange={handleSortChange}
                                    className="border border-neutral-300 rounded w-full p-2"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="popular">Popularity</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 border-t space-y-2">
                            <button
                                onClick={applyFilters}
                                className="w-full bg-primary text-white py-3 rounded-lg font-medium"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={resetFilters}
                                className="w-full bg-white border border-neutral-300 hover:bg-neutral-100 py-3 rounded-lg font-medium"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden md:flex mt-4 items-center space-x-4">
                {/* Category Filter */}
                <div className="relative group">
                    <button className="px-3 py-2 border border-neutral-300 rounded-lg flex items-center gap-2 text-sm">
                        Categories
                        <ChevronDown size={16} />
                    </button>

                    <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-2 hidden group-hover:block z-10">
                        {categories.map(category => (
                            <label key={category.id} className="flex items-center p-2 hover:bg-neutral-100 rounded">
                                <input
                                    type="checkbox"
                                    checked={filters.categories?.includes(category.slug) || false}
                                    onChange={() => handleCategoryChange(category.slug)}
                                    className="mr-2"
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="relative group">
                    <button className="px-3 py-2 border border-neutral-300 rounded-lg flex items-center gap-2 text-sm">
                        Price
                        <ChevronDown size={16} />
                    </button>

                    <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block z-10">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label>Min:</label>
                                <input
                                    type="number"
                                    value={filters.priceRange?.[0] || 0}
                                    onChange={e => handlePriceChange(e, 0)}
                                    min={0}
                                    max={filters.priceRange?.[1] || 10000}
                                    className="border border-neutral-300 rounded w-20 p-1 text-sm"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label>Max:</label>
                                <input
                                    type="number"
                                    value={filters.priceRange?.[1] || 10000}
                                    onChange={e => handlePriceChange(e, 1)}
                                    min={filters.priceRange?.[0] || 0}
                                    max={100000}
                                    className="border border-neutral-300 rounded w-20 p-1 text-sm"
                                />
                            </div>
                            <button
                                onClick={applyFilters}
                                className="w-full bg-primary text-white py-1 rounded text-sm"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 5).map(tag => (
                        <button
                            key={tag}
                            onClick={() => {
                                handleTagChange(tag);
                                applyFilters();
                            }}
                            className={`px-3 py-1 rounded-full text-sm ${filters.tags?.includes(tag)
                                ? 'bg-primary text-white'
                                : 'bg-neutral-100 text-neutral-700'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}

                    {tags.length > 5 && (
                        <div className="relative group">
                            <button className="px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700">
                                More...
                            </button>

                            <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-2 hidden group-hover:block z-10">
                                {tags.slice(5).map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            handleTagChange(tag);
                                            applyFilters();
                                        }}
                                        className={`block w-full text-left p-2 text-sm rounded ${filters.tags?.includes(tag)
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-neutral-100'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
