// src/pages/Register.tsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Shield,
    ArrowRight,
    AlertTriangle,
    Zap,
    Loader2,
    User,
    Phone,
    Check
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [step, setStep] = useState(1); // Form step (1: basic info, 2: password)

    const navigate = useNavigate();
    const { register, isAuthenticated, error, clearError } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            // navigate('/account', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Handle errors from auth context
    useEffect(() => {
        if (error) {
            setFormError(error);
            clearError();
        }
    }, [error, clearError]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate first step
    const validateStep1 = () => {
        if (!formData.firstName.trim()) {
            setFormError('First name is required');
            return false;
        }

        if (!formData.lastName.trim()) {
            setFormError('Last name is required');
            return false;
        }

        if (!formData.email.trim()) {
            setFormError('Email is required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError('Please enter a valid email address');
            return false;
        }

        // Phone is optional, but validate format if provided
        if (formData.phone && !/^(\+\d{1,3})?[0-9]{9,12}$/.test(formData.phone)) {
            setFormError('Please enter a valid phone number');
            return false;
        }

        return true;
    };

    // Handle next step
    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (validateStep1()) {
            setStep(2);
        }
    };

    // Handle back to step 1
    const handleBackStep = () => {
        setStep(1);
        setFormError(null);
    };

    // Handle final form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Password validation
        if (!formData.password) {
            setFormError('Password is required');
            return;
        }

        if (formData.password.length < 8) {
            setFormError('Password must be at least 8 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        if (!agreeTerms) {
            setFormError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }

        setIsSubmitting(true);

        try {
            const success = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            if (success) {
                // Registration successful - redirect will happen via useEffect
            }
        } catch (err) {
            setFormError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        const { password } = formData;
        if (!password) return { score: 0, text: 'Weak', color: 'bg-neutral-200' };

        let score = 0;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score === 0) return { score, text: 'Weak', color: 'bg-red-500' };
        if (score === 1) return { score, text: 'Weak', color: 'bg-red-500' };
        if (score === 2) return { score, text: 'Medium', color: 'bg-yellow-500' };
        if (score === 3) return { score, text: 'Good', color: 'bg-green-500' };
        return { score: 4, text: 'Strong', color: 'bg-green-600' };
    };

    const passwordStrength = getPasswordStrength();

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

                    <h1 className="text-2xl md:text-3xl font-medium mb-2">Create an account</h1>
                    <p className="text-neutral-600 mb-8">
                        Join TechElectro for exclusive deals and a personalized shopping experience
                    </p>

                    {formError && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                            <AlertTriangle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{formError}</p>
                        </div>
                    )}

                    {/* Step indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-neutral-200 -z-10"></div>
                            <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-neutral-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-neutral-300 bg-white'
                                    }`}>
                                    {step > 1 ? <Check size={16} /> : '1'}
                                </div>
                                <span className="text-xs">Account</span>
                            </div>

                            <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-neutral-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-neutral-300 bg-white'
                                    }`}>
                                    2
                                </div>
                                <span className="text-xs">Security</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Basic information */}
                    {step === 1 && (
                        <form onSubmit={handleNextStep} className="space-y-6">
                            {/* First Name field */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                    First Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                        <User size={18} />
                                    </div>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* Last Name field */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                        <User size={18} />
                                    </div>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

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
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* Phone field (optional) */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                    Phone Number <span className="text-neutral-500 font-normal">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+254712345678"
                                        className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-neutral-500">
                                    For order updates and shipping notifications
                                </p>
                            </div>

                            {/* Next button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/10"
                            >
                                <span>Continue</span>
                                <ArrowRight size={18} />
                            </button>

                            {/* Sign in link */}
                            <p className="text-center text-sm text-neutral-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    )}

                    {/* Step 2: Password setup */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Password field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                    Create Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

                                {/* Password strength indicator */}
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex space-x-1 flex-1">
                                            {[1, 2, 3, 4].map((segment) => (
                                                <div
                                                    key={segment}
                                                    className={`h-1.5 flex-1 rounded-full ${segment <= passwordStrength.score
                                                        ? passwordStrength.color
                                                        : 'bg-neutral-200'
                                                        }`}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className="text-xs ml-2 text-neutral-600">{passwordStrength.text}</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">
                                        Use 8+ characters with a mix of letters, numbers & symbols
                                    </p>
                                </div>
                            </div>

                            {/* Confirm Password field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* Terms agreement */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
                                    />
                                </div>
                                <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-primary hover:text-primary-dark">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-primary hover:text-primary-dark">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={handleBackStep}
                                    className="flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-700 py-3.5 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-lg shadow-primary/10"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Sign in link */}
                            <p className="text-center text-sm text-neutral-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    )}

                    {/* Security badge */}
                    <div className="mt-16 flex items-center justify-center gap-2 text-xs text-neutral-500">
                        <Shield size={14} />
                        <span>Your information is encrypted and secure</span>
                    </div>
                </div>
            </div>

            {/* Right panel - image/banner */}
            <div className="hidden md:block w-1/2 relative overflow-hidden bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-neutral-950/90 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000"
                    alt="Premium electronics"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12 z-20">
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl font-medium text-white mb-4">
                            Join our tech community
                        </h2>
                        <p className="text-white/80">
                            Create an account to unlock member-only deals, fast checkout, personalized recommendations, and early access to new product releases.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;