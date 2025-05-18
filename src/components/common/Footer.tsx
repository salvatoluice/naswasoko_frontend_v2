// src/components/common/Footer.tsx

import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-neutral-200">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link to="/" className="font-serif font-medium text-xl">Naswasoko</Link>
                        <p className="mt-4 text-neutral-600 text-sm">
                            Bringing Kenya's finest artisanal products to the global marketplace.
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <a href="https://instagram.com" className="text-neutral-600 hover:text-primary" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://facebook.com" className="text-neutral-600 hover:text-primary" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="text-neutral-600 hover:text-primary" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-medium mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products?category=fashion" className="text-neutral-600 hover:text-primary">Fashion</Link></li>
                            <li><Link to="/products?category=jewelry" className="text-neutral-600 hover:text-primary">Jewelry</Link></li>
                            <li><Link to="/products?category=home-decor" className="text-neutral-600 hover:text-primary">Home Decor</Link></li>
                            <li><Link to="/products?category=art" className="text-neutral-600 hover:text-primary">Art</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="text-neutral-600 hover:text-primary">About Us</Link></li>
                            <li><Link to="/artisans" className="text-neutral-600 hover:text-primary">Our Artisans</Link></li>
                            <li><Link to="/sustainability" className="text-neutral-600 hover:text-primary">Sustainability</Link></li>
                            <li><Link to="/careers" className="text-neutral-600 hover:text-primary">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact" className="text-neutral-600 hover:text-primary">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-neutral-600 hover:text-primary">FAQs</Link></li>
                            <li><Link to="/shipping" className="text-neutral-600 hover:text-primary">Shipping</Link></li>
                            <li><Link to="/returns" className="text-neutral-600 hover:text-primary">Returns</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
                    <p>© {new Date().getFullYear()} Naswasoko. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-6">
                        <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;