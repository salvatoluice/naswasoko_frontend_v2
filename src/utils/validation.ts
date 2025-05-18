export const isValidEmail = (email: string): boolean => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };
  
  export const isValidPhone = (phone: string): boolean => {
    // Kenyan phone number validation (formats: 07XXXXXXXX, 01XXXXXXXX, +254XXXXXXXXX)
    const pattern = /^(?:(?:\+254)|(?:0))[17][0-9]{8}$/;
    return pattern.test(phone);
  };
  
  export const isStrongPassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return pattern.test(password);
  };
  
  export const isValidPostalCode = (postalCode: string): boolean => {
    // Kenyan postal code format (5 digits)
    const pattern = /^\d{5}$/;
    return pattern.test(postalCode);
  };