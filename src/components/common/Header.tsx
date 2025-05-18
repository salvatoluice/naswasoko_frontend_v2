// src/components/common/Header.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, ChevronDown, Bell, Sun } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface HeaderProps {
    onOpenCart: () => void;
}

const Header = ({ onOpenCart }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { totalItems } = useCart();
    const location = useLocation();

    // Handle scroll event to change header style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Redirect to search page with query
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
                : 'bg-transparent py-4'
            }`}>
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-full md:hidden transition-colors ${isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/20'
                                }`}
                            aria-label="Toggle menu"
                        >
                            <Menu size={22} className={isScrolled ? 'text-neutral-900' : 'text-white'} />
                        </button>

                        <Link to="/" className={`font-serif font-medium text-xl tracking-tight transition-colors ${isScrolled ? 'text-neutral-900' : 'text-white'
                            }`}>
                            <span className="tracking-wider">N</span>aswasoko
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Shop', path: '/products' },
                            {
                                name: 'Collections',
                                path: '#',
                                dropdown: [
                                    { name: 'Featured', path: '/products?featured=true' },
                                    { name: 'New Arrivals', path: '/products?sort=newest' },
                                    { name: 'Best Sellers', path: '/products?sort=popular' },
                                    { name: 'Discounts', path: '/products?discount=true' },
                                ]
                            },
                            { name: 'About', path: '/about' },
                            { name: 'Contact', path: '/contact' },
                        ].map((item) => (
                            <div key={item.name} className="relative group">
                                <Link
                                    to={item.path}
                                    className={`px-3 py-2 rounded-lg hover:bg-white/10 flex items-center transition-colors ${isScrolled
                                            ? 'text-neutral-800 hover:bg-neutral-100'
                                            : 'text-white hover:bg-white/10'
                                        } ${location.pathname === item.path ? 'font-medium' : ''}`}
                                >
                                    {item.name}
                                    {item.dropdown && <ChevronDown size={16} className="ml-1" />}
                                </Link>

                                {item.dropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-1">
                        {/* Search form */}
                        <div className="relative">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className={`
                    rounded-full transition-all duration-200 border focus:outline-none focus:ring-1 focus:ring-primary
                    ${searchExpanded
                                            ? 'w-44 pl-10 pr-4 py-2 opacity-100 visible border-neutral-200'
                                            : 'w-0 opacity-0 invisible border-transparent'}
                  `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setSearchExpanded(!searchExpanded)}
                                    className={`p-2 rounded-full absolute left-0 transition-colors ${isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/10'
                                        }`}
                                    aria-label="Search"
                                >
                                    <Search size={20} className={isScrolled ? 'text-neutral-700' : 'text-white'} />
                                </button>
                            </form>
                        </div>

                        <Link
                            to="/account"
                            className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/10'
                                }`}
                            aria-label="Account"
                        >
                            <User size={20} className={isScrolled ? 'text-neutral-700' : 'text-white'} />
                        </Link>

                        <Link
                            to="/wishlist"
                            className={`p-2 rounded-full transition-colors relative ${isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/10'
                                }`}
                            aria-label="Wishlist"
                        >
                            <Heart size={20} className={isScrolled ? 'text-neutral-700' : 'text-white'} />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                3
                            </span>
                        </Link>

                        <button
                            onClick={onOpenCart}
                            className={`p-2 rounded-full transition-colors relative ${isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/10'
                                }`}
                            aria-label="Shopping cart"
                        >
                            <ShoppingBag size={20} className={isScrolled ? 'text-neutral-700' : 'text-white'} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Currency/Language selector (simplified) */}
                        <div className="hidden md:block relative group">
                            <button
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${isScrolled
                                        ? 'text-neutral-800 hover:bg-neutral-100'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                <span>KSh</span>
                                <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-xl p-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                                <button className="block w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                                    KSh (KES)
                                </button>
                                <button className="block w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                                    $ (USD)
                                </button>
                                <button className="block w-full text-left px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                                    € (EUR)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md">
                    <div className="container-custom h-full flex flex-col">
                        <div className="py-4 flex justify-between items-center">
                            <Link to="/" className="font-serif font-medium text-xl tracking-tight">
                                Naswasoko
                            </Link>
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-full hover:bg-neutral-100"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Search in mobile menu */}
                        <div className="py-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products..."
                                    className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </form>
                        </div>

                        {/* Mobile menu links */}
                        <nav className="flex-1 overflow-y-auto py-4">
                            <div className="space-y-0.5">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'Shop', path: '/products' },
                                    { name: 'Featured Collections', path: '/products?featured=true' },
                                    { name: 'New Arrivals', path: '/products?sort=newest' },
                                    { name: 'Best Sellers', path: '/products?sort=popular' },
                                    { name: 'About Us', path: '/about' },
                                    { name: 'Contact', path: '/contact' },
                                    { name: 'Help & Support', path: '/support' },
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`block py-3 px-4 rounded-xl transition-colors ${location.pathname === item.path
                                                ? 'bg-primary/10 text-primary font-medium'
                                                : 'hover:bg-neutral-100'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-neutral-200">
                                <Link to="/account" className="flex items-center gap-3 p-4 hover:bg-neutral-100 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <span className="block font-medium">Account</span>
                                        <span className="block text-sm text-neutral-500">Sign in or register</span>
                                    </div>
                                </Link>

                                <Link to="/wishlist" className="flex items-center gap-3 p-4 hover:bg-neutral-100 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                                        <Heart size={18} />
                                    </div>
                                    <div>
                                        <span className="block font-medium">Wishlist</span>
                                        <span className="block text-sm text-neutral-500">3 saved items</span>
                                    </div>
                                </Link>

                                <button onClick={onOpenCart} className="w-full flex items-center gap-3 p-4 hover:bg-neutral-100 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                                        <ShoppingBag size={18} />
                                    </div>
                                    <div>
                                        <span className="block font-medium">Cart</span>
                                        <span className="block text-sm text-neutral-500">{totalItems} items - KSh 14,500</span>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="p-3 rounded-full hover:bg-neutral-100">
                                    <Sun size={20} className="text-neutral-700" />
                                </button>
                                <button className="p-3 rounded-full hover:bg-neutral-100">
                                    <Bell size={20} className="text-neutral-700" />
                                </button>
                                <div className="relative">
                                    <button className="p-3 rounded-full hover:bg-neutral-100">
                                        <span className="font-medium">KSh</span>
                                    </button>
                                </div>
                            </div>
                        </nav>

                        <div className="py-6 border-t border-neutral-200 text-center text-sm text-neutral-500">
                            &copy; {new Date().getFullYear()} Naswasoko. All rights reserved.
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;