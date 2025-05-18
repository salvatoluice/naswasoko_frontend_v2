import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
    resetPassword: (email: string) => Promise<boolean>;
    error: string | null;
    clearError: () => void;
}

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = 'tech-electro-user';
const TOKEN_STORAGE_KEY = 'tech-electro-token';

const SAMPLE_USERS = [
    {
        id: 'user1',
        email: 'demo@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+254712345678',
        avatar: 'https://i.pravatar.cc/150?u=user1',
        isVerified: true,
        createdAt: new Date('2025-01-15')
    }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedUser = localStorage.getItem(USER_STORAGE_KEY);
                const token = localStorage.getItem(TOKEN_STORAGE_KEY);

                if (storedUser && token) {
                    const userData = JSON.parse(storedUser);
                    setUser({
                        ...userData,
                        createdAt: new Date(userData.createdAt)
                    });
                }
            } catch (err) {
                console.error('Auth error:', err);
                setError('Authentication error. Please log in again.');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            if (email === 'demo@example.com' && password === 'password') {
                const user = SAMPLE_USERS[0];

                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
                localStorage.setItem(TOKEN_STORAGE_KEY, 'mock-jwt-token');

                setUser(user);
                return true;
            } else {
                setError('Invalid email or password');
                return false;
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (userData.email === 'demo@example.com') {
                setError('Email already in use');
                return false;
            }

            const newUser: User = {
                id: `user${Date.now()}`,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                isVerified: false,
                createdAt: new Date()
            };

            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            localStorage.setItem(TOKEN_STORAGE_KEY, 'mock-jwt-token');

            setUser(newUser);
            return true;
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
    };

    const updateProfile = async (data: Partial<User>): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            if (user) {
                const updatedUser = {
                    ...user,
                    ...data
                };

                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
                setUser(updatedUser);
                return true;
            }
            return false;
        } catch (err) {
            console.error('Update profile error:', err);
            setError('Failed to update profile. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const userExists = SAMPLE_USERS.some(u => u.email === email);

            if (userExists) {
                console.log(`Password reset email sent to ${email}`);
                return true;
            } else {
                setError('Email not found');
                return false;
            }
        } catch (err) {
            console.error('Password reset error:', err);
            setError('Password reset failed. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
        error,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;