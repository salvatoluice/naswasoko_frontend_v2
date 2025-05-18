import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ShoppingBag,
    Search,
    User,
    Menu,
    X,
    Heart,
    ChevronDown,
    Bell,
    Zap,
    Sparkles,
    Laptop,
    Home as HomeIcon,
    Settings,
    HelpCircle,
    Headphones,
    TabletSmartphone,
    LogOut
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface HeaderProps {
    onOpenCart: () => void;
    transparentInitial?: boolean;
}

const Header = ({ onOpenCart, transparentInitial = false }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { totalItems } = useCart();
    const location = useLocation();

    const isHomePage = location.pathname === '/';
    const shouldBeTransparent = transparentInitial || isHomePage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const getTextColorClass = (scrolled: boolean, transparent: boolean) => {
        if (scrolled) {
            return 'text-neutral-800';
        }
        if (!transparent) {
            return 'text-neutral-800';
        }
        return 'text-white';
    };

    const getHoverBgClass = (scrolled: boolean, transparent: boolean) => {
        if (scrolled) {
            return 'hover:bg-neutral-100';
        }
        if (!transparent) {
            return 'hover:bg-neutral-100';
        }
        return 'hover:bg-white/10';
    };

    const getBgClass = (scrolled: boolean, transparent: boolean) => {
        if (scrolled) {
            return 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-100';
        }
        if (!transparent) {
            return 'bg-white shadow-sm';
        }
        return 'bg-transparent';
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getBgClass(isScrolled, shouldBeTransparent)} ${isScrolled ? 'py-2' : 'py-4'}`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleMenu}
                            className={`p-2.5 rounded-full md:hidden transition-colors ${getHoverBgClass(isScrolled, shouldBeTransparent)}`}
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} className={getTextColorClass(isScrolled, shouldBeTransparent)} />
                        </button>

                        <Link to="/" className={`font-sans font-medium text-xl transition-colors flex items-center gap-1.5 ${getTextColorClass(isScrolled, shouldBeTransparent)}`}>
                            <Zap size={20} className={`${isScrolled || !shouldBeTransparent ? 'text-primary' : 'text-primary-light'}`} />
                            <span className="tracking-tight">TechElectro</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-1">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Shop', path: '/products' },
                            {
                                name: 'Categories',
                                path: '#',
                                dropdown: [
                                    { name: 'TVs & Displays', path: '/products?category=tv-displays' },
                                    { name: 'Audio Systems', path: '/products?category=audio' },
                                    { name: 'Kitchen Appliances', path: '/products?category=kitchen' },
                                    { name: 'Smart Home', path: '/products?category=smart-home' },
                                    { name: 'Computers & Tablets', path: '/products?category=computers' },
                                    { name: 'Smartphones', path: '/products?category=smartphones' },
                                ]
                            },
                            {
                                name: 'Collections',
                                path: '#',
                                dropdown: [
                                    { name: 'New Arrivals', path: '/products?sort=newest' },
                                    { name: 'Best Sellers', path: '/products?sort=popular' },
                                    { name: 'Premium Series', path: '/products?collection=premium' },
                                    { name: 'Energy Efficient', path: '/products?tag=energy-efficient' },
                                ]
                            },
                            { name: 'Support', path: '/support' },
                        ].map((item) => (
                            <div key={item.name} className="relative group">
                                <Link
                                    to={item.path}
                                    className={`px-3 py-2 rounded-lg flex items-center transition-colors ${getTextColorClass(isScrolled, shouldBeTransparent)} ${getHoverBgClass(isScrolled, shouldBeTransparent)} ${location.pathname === item.path ? 'font-medium' : ''}`}
                                >
                                    {item.name}
                                    {item.dropdown && <ChevronDown size={16} className="ml-1" />}
                                </Link>

                                {item.dropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-xl shadow-lg rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 border border-neutral-100">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                className="block px-4 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-1">
                        <div className="relative">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className={`
                    rounded-full transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-primary
                    ${searchExpanded
                                            ? 'w-44 pl-10 pr-4 py-2 opacity-100 visible border-neutral-200'
                                            : 'w-0 opacity-0 invisible border-transparent'}
                  `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setSearchExpanded(!searchExpanded)}
                                    className={`p-2.5 rounded-full absolute left-0 transition-colors ${getHoverBgClass(isScrolled, shouldBeTransparent)}`}
                                    aria-label="Search"
                                >
                                    <Search size={18} className={getTextColorClass(isScrolled, shouldBeTransparent)} />
                                </button>
                            </form>
                        </div>

                        <Link
                            to="/account"
                            className={`p-2.5 rounded-full transition-colors ${getHoverBgClass(isScrolled, shouldBeTransparent)}`}
                            aria-label="Account"
                        >
                            <User size={18} className={getTextColorClass(isScrolled, shouldBeTransparent)} />
                        </Link>

                        <Link
                            to="/wishlist"
                            className={`p-2.5 rounded-full transition-colors relative ${getHoverBgClass(isScrolled, shouldBeTransparent)}`}
                            aria-label="Wishlist"
                        >
                            <Heart size={18} className={getTextColorClass(isScrolled, shouldBeTransparent)} />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                                3
                            </span>
                        </Link>

                        <button
                            onClick={onOpenCart}
                            className={`p-2.5 rounded-full transition-colors relative ${getHoverBgClass(isScrolled, shouldBeTransparent)}`}
                            aria-label="Shopping cart"
                        >
                            <ShoppingBag size={18} className={getTextColorClass(isScrolled, shouldBeTransparent)} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with iOS-style glassmorphism */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-xl transition-opacity duration-300">
                    <div className="h-full w-full md:w-80 ml-auto bg-white shadow-xl flex flex-col">
                        <div className="p-4 flex justify-between items-center border-b border-neutral-100">
                            <Link to="/" className="font-sans font-medium text-xl flex items-center gap-1.5">
                                <Zap size={20} className="text-primary" />
                                <span>TechElectro</span>
                            </Link>
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products..."
                                    className="w-full px-4 py-3 pl-11 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary bg-neutral-50/50"
                                />
                                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </form>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-2 px-3">
                            <div className="space-y-0.5">
                                <div className="px-2 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                    Menu
                                </div>

                                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <HomeIcon size={18} className="text-neutral-500" />
                                    <span>Home</span>
                                </Link>

                                <Link to="/products" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <Zap size={18} className="text-neutral-500" />
                                    <span>All Electronics</span>
                                </Link>

                                <div className="px-2 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider mt-4">
                                    Categories
                                </div>

                                <Link to="/products?category=tv-displays" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <Laptop size={18} className="text-neutral-500" />
                                    <span>TVs & Displays</span>
                                </Link>

                                <Link to="/products?category=audio" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <Headphones size={18} className="text-neutral-500" />
                                    <span>Audio Systems</span>
                                </Link>

                                <Link to="/products?category=smart-home" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <HomeIcon size={18} className="text-neutral-500" />
                                    <span>Smart Home</span>
                                </Link>

                                <Link to="/products?category=computers" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <Laptop size={18} className="text-neutral-500" />
                                    <span>Computers & Tablets</span>
                                </Link>

                                <Link to="/products?category=smartphones" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <TabletSmartphone size={18} className="text-neutral-500" />
                                    <span>Smartphones</span>
                                </Link>

                                <div className="px-2 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider mt-4">
                                    Account
                                </div>

                                <Link to="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <User size={18} className="text-neutral-500" />
                                    <span>Profile</span>
                                </Link>

                                <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <Heart size={18} className="text-neutral-500" />
                                    <span>Wishlist</span>
                                    <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">3</span>
                                </Link>

                                <button onClick={onOpenCart} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <ShoppingBag size={18} className="text-neutral-500" />
                                    <span>Cart</span>
                                    {totalItems > 0 && (
                                        <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{totalItems}</span>
                                    )}
                                </button>

                                <div className="px-2 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider mt-4">
                                    Support
                                </div>

                                <Link to="/support" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <HelpCircle size={18} className="text-neutral-500" />
                                    <span>Help Center</span>
                                </Link>

                                <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 text-neutral-700">
                                    <Settings size={18} className="text-neutral-500" />
                                    <span>Settings</span>
                                </Link>
                            </div>
                        </nav>

                        <div className="p-4 border-t border-neutral-100">
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-colors">
                                <LogOut size={18} className="text-neutral-500" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;