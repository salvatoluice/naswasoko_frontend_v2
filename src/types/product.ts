// src/types/product.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    tags: string[];
    featured: boolean;
    inStock: boolean;
  }
  
  export type ProductCategory = {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
  };
  
  export interface ProductFilter {
    categories?: string[];
    priceRange?: [number, number];
    tags?: string[];
    sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
    search?: string;
  }
  