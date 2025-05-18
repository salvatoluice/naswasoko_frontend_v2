// src/store/productStore.ts

import { create } from 'zustand';
import { products as dummyProducts } from '../data/products';
import { categories as dummyCategories } from '../data/categories';
import { tags as dummyTags } from '../data/tags';
import type { Product, ProductFilter } from '../types/product';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: typeof dummyCategories;
  tags: string[];
  currentFilter: ProductFilter;
  isLoading: boolean;
  error: string | null;
  
  fetchProducts: () => Promise<void>;
  filterProducts: (filter: ProductFilter) => void;
  getProductById: (id: string) => Product | undefined;
  getRelatedProducts: (id: string) => Product[];
  searchProducts: (query: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: dummyCategories,
  tags: dummyTags,
  currentFilter: {},
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        products: dummyProducts,
        filteredProducts: dummyProducts,
        isLoading: false
      });
    } catch (error) {
      set({
        error: 'Failed to fetch products',
        isLoading: false
      });
    }
  },
  
  filterProducts: (filter) => {
    set({ isLoading: true, currentFilter: filter });
    
    // Simulate filtering delay
    setTimeout(() => {
      const { products } = get();
      
      let filtered = [...products];
      
      // Filter by categories
      if (filter.categories && filter.categories.length > 0) {
        filtered = filtered.filter(product =>
          filter.categories!.includes(product.category)
        );
      }
      
      // Filter by price range
      if (filter.priceRange) {
        const [min, max] = filter.priceRange;
        filtered = filtered.filter(product => {
          const price = product.discountPrice || product.price;
          return price >= min && price <= max;
        });
      }
      
      // Filter by tags
      if (filter.tags && filter.tags.length > 0) {
        filtered = filtered.filter(product =>
          product.tags.some(tag => filter.tags!.includes(tag))
        );
      }
      
      // Search
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Sort
      if (filter.sort) {
        switch (filter.sort) {
          case 'price_asc':
            filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
            break;
          case 'price_desc':
            filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
            break;
          case 'newest':
            // Would use createdAt date in a real app
            filtered.sort((a, b) => b.id.localeCompare(a.id));
            break;
          case 'popular':
            // Would use popularity metric in a real app
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        }
      }
      
      set({
        filteredProducts: filtered,
        isLoading: false
      });
    }, 300);
  },
  
  getProductById: (id) => {
    const { products } = get();
    return products.find(product => product.id === id);
  },
  
  getRelatedProducts: (id) => {
    const { products } = get();
    const product = products.find(p => p.id === id);
    
    if (!product) return [];
    
    // Return products in the same category, excluding the current product
    return products
      .filter(p => p.category === product.category && p.id !== id)
      .slice(0, 4);
  },
  
  searchProducts: (query) => {
    set(state => ({
      currentFilter: { ...state.currentFilter, search: query },
    }));
    
    get().filterProducts(get().currentFilter);
  }
}));