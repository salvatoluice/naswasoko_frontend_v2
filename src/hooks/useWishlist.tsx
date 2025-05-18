// src/hooks/useWishlist.tsx

import { useState, useEffect, createContext, useContext } from 'react';

// Define the type for wishlist items
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  description?: string;
  image: string;
  category?: string;
  inStock?: boolean;
  dateAdded: Date;
}

// Define the context type
interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Omit<WishlistItem, 'id' | 'dateAdded'>) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

// Create the context with a default value
const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
  totalItems: 0
});

// Storage key for localStorage
const STORAGE_KEY = 'wishlist-items';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          dateAdded: new Date(item.dateAdded)
        }));
        setWishlistItems(itemsWithDates);
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  // Add a product to wishlist
  const addToWishlist = (product: Omit<WishlistItem, 'id' | 'dateAdded'>) => {
    // Check if product is already in wishlist
    if (wishlistItems.some(item => item.productId === product.productId)) {
      return; // Product already in wishlist
    }
    
    // Generate a unique ID and add the new item
    const newItem: WishlistItem = {
      ...product,
      id: `wish_${Date.now()}`,
      dateAdded: new Date()
    };
    
    setWishlistItems(prev => [...prev, newItem]);
  };

  // Remove an item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Calculate the total number of items
  const totalItems = wishlistItems.length;

  // Context value
  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    totalItems
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default useWishlist;