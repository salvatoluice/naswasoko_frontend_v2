import { useEffect, useCallback } from 'react';
import type { ProductFilter } from '../types/product';
import { useProductStore } from '../store/productStore';

export const useProducts = () => {
  const {
    products,
    filteredProducts,
    categories,
    tags,
    currentFilter,
    isLoading,
    fetchProducts,
    filterProducts: storeFilterProducts,
    getProductById,
    getRelatedProducts,
    searchProducts
  } = useProductStore();
  
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);
  
  // Use useCallback to maintain stable function reference
  const filterProducts = useCallback((filter: ProductFilter) => {
    storeFilterProducts(filter);
  }, [storeFilterProducts]);
  
  const featuredProducts = products.filter(product => product.featured);
  
  return {
    products,
    filteredProducts,
    featuredProducts,
    categories,
    tags,
    currentFilter,
    isLoading,
    fetchProducts,
    filterProducts,
    getProductById,
    getRelatedProducts,
    searchProducts
  };
};