// src/components/common/Footer.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Instagram,
    Facebook,
    Twitter,
    MapPin,
    Mail,
    Phone,
    ChevronRight,
    Send,
    CheckCircle
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Simulate API call
            setTimeout(() => {
                setIsSubscribed(true);
                setEmail('');

                // Reset after 5 seconds
                setTimeout(() => {
                    setIsSubscribed(false);
                }, 5000);
            }, 800);
        }
    };

    const paymentMethods = [
        { name: 'M-Pesa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/120px-M-PESA_LOGO-01.svg.png' },
        { name: 'Visa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png' },
        { name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png' },
        { name: 'PayPal', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/120px-PayPal.svg.png' },
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            {/* Newsletter Section */}
            <div className="bg-neutral-50 py-14">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-serif mb-3">Join Our Community</h2>
                        <p className="text-neutral-600 mb-6">
                            Subscribe to receive updates on new artisanal products, exclusive offers, and cultural stories.
                        </p>

                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                            {isSubscribed ? (
                                <div className="bg-green-50 border border-green-100 text-green-800 rounded-xl p-4 flex items-center">
                                    <CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0" />
                                    <p>Thank you for subscribing! Welcome to the Naswasoko community.</p>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                    >
                                        <span>Subscribe</span>
                                        <Send size={16} />
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-white py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Brand Column */}
                        <div className="md:col-span-3 space-y-6">
                            <Link to="/" className="font-serif font-medium text-2xl inline-block">
                                Naswasoko
                            </Link>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Bringing Kenya's finest artisanal products and household electronics to the global marketplace. Supporting local craftspeople and sustainable practices.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="https://instagram.com"
                                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={18} />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Shop Links Column */}
                        <div className="md:col-span-2">
                            <h3 className="font-medium text-lg mb-5">Shop</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/products?category=fashion" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Fashion</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=jewelry" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Jewelry</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=home-decor" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Home Decor</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=art" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Art</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Electronics Column */}
                        <div className="md:col-span-2">
                            <h3 className="font-medium text-lg mb-5">Electronics</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/products?category=kitchen-appliances" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Kitchen Appliances</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=smart-home" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Smart Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=entertainment" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Entertainment</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=solar-devices" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Solar Devices</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="md:col-span-2">
                            <h3 className="font-medium text-lg mb-5">Company</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/about" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>About Us</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/artisans" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Our Artisans</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sustainability" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Sustainability</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/careers" className="text-neutral-600 hover:text-primary flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary" />
                                        <span>Careers</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="md:col-span-3">
                            <h3 className="font-medium text-lg mb-5">Contact Us</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-neutral-600 leading-relaxed">
                                        Kenyatta Avenue, Nairobi<br />
                                        Kenya, 00100
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-primary flex-shrink-0" />
                                    <a href="tel:+254712345678" className="text-neutral-600 hover:text-primary">
                                        +254 712 345 678
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-primary flex-shrink-0" />
                                    <a href="mailto:info@naswasoko.co.ke" className="text-neutral-600 hover:text-primary">
                                        info@naswasoko.co.ke
                                    </a>
                                </li>
                            </ul>

                            {/* Payment Methods */}
                            <div className="mt-6">
                                <p className="text-sm text-neutral-500 mb-3">Accepted Payment Methods</p>
                                <div className="flex flex-wrap gap-3">
                                    {paymentMethods.map((method) => (
                                        <div key={method.name} className="h-8 bg-white rounded p-1 border border-neutral-200">
                                            <img
                                                src={method.image}
                                                alt={method.name}
                                                className="h-full w-auto object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
                        <p>© {new Date().getFullYear()} Naswasoko. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-6">
                            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
                            <Link to="/shipping" className="hover:text-primary">Shipping Policy</Link>
                            <Link to="/faq" className="hover:text-primary">FAQ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;