export const formatPrice = (amount: number, currency = 'KSh'): string => {
    return `${currency} ${amount.toLocaleString()}`;
  };
  
  /**
   * Calculate discount percentage
   */
  export const calculateDiscount = (originalPrice: number, discountPrice: number): number => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };
  
  /**
   * Format date to readable string
   */
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  /**
   * Truncate text with ellipsis
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };