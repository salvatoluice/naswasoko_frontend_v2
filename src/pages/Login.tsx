// src/pages/Login.tsx

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Shield,
    ArrowRight,
    AlertTriangle,
    Zap,
    Loader2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, error, clearError } = useAuth();

    // Get redirect URL from location state or default to account dashboard
    const from = (location.state as any)?.from?.pathname || '/account';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    // Handle errors from auth context
    useEffect(() => {
        if (error) {
            setFormError(error);
            clearError();
        }
    }, [error, clearError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Basic form validation
        if (!email.trim()) {
            setFormError('Email is required');
            return;
        }

        if (!password) {
            setFormError('Password is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const success = await login(email, password);
            if (success) {
                // Login successful - navigate will happen via the useEffect above
            }
        } catch (err) {
            setFormError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // For demo purposes
    const handleDemoLogin = async () => {
        setEmail('demo@example.com');
        setPassword('password');
        setIsSubmitting(true);

        try {
            await login('demo@example.com', 'password');
        } catch (err) {
            setFormError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            {/* Left panel - form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-12 lg:p-16">
                <div className="max-w-md mx-auto w-full">
                    {/* Logo/branding */}
                    <div className="mb-8">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <Zap size={24} className="text-primary" />
                            <span className="font-medium text-xl">TechElectro</span>
                        </Link>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-medium mb-2">Welcome back</h1>
                    <p className="text-neutral-600 mb-8">
                        Sign in to your account to continue your shopping experience
                    </p>

                    {formError && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <AlertTriangle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{formError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                                    Password
                                </label>
                                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me checkbox */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
                                disabled={isSubmitting}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                                Remember me
                            </label>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-lg shadow-primary/10"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        {/* Demo account button */}
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-700 py-3.5 rounded-xl font-medium hover:bg-neutral-50 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
                        >
                            Demo Account
                        </button>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-8 text-center text-sm text-neutral-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
                            Create an account
                        </Link>
                    </p>

                    {/* Security badge */}
                    <div className="mt-16 flex items-center justify-center gap-2 text-xs text-neutral-500">
                        <Shield size={14} />
                        <span>Secure login with 256-bit encryption</span>
                    </div>
                </div>
            </div>

            {/* Right panel - image/banner */}
            <div className="hidden md:block w-1/2 relative overflow-hidden bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-neutral-950/90 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1000"
                    alt="Modern electronics setup"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12 z-20">
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl font-medium text-white mb-4">
                            Your Gateway to Premium Electronics
                        </h2>
                        <p className="text-white/80">
                            Access exclusive deals, track your orders, and get personalized recommendations when you sign in to your TechElectro account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;