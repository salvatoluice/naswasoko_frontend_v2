import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';

interface HeaderProps {
    onOpenCart: () => void;
}

const Header = ({ onOpenCart }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full hover:bg-neutral-100 md:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <Link to="/" className="ml-2 md:ml-0 font-serif font-medium text-xl tracking-tight">
                            Naswasoko
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="hover:text-neutral-600 text-sm font-medium">Home</Link>
                        <Link to="/products" className="hover:text-neutral-600 text-sm font-medium">Shop</Link>
                        <Link to="/collections" className="hover:text-neutral-600 text-sm font-medium">Collections</Link>
                        <Link to="/about" className="hover:text-neutral-600 text-sm font-medium">About</Link>
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/search" className="p-2 rounded-full hover:bg-neutral-100">
                            <Search size={20} />
                        </Link>
                        <Link to="/account" className="p-2 rounded-full hover:bg-neutral-100">
                            <User size={20} />
                        </Link>
                        <button
                            onClick={onOpenCart}
                            className="p-2 rounded-full hover:bg-neutral-100 relative"
                        >
                            <ShoppingBag size={20} />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                2
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white">
                    <div className="p-4 flex justify-between items-center border-b">
                        <h2 className="font-serif font-medium text-xl">Menu</h2>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-neutral-100">
                            <X size={20} />
                        </button>
                    </div>
                    <nav className="p-4 space-y-4">
                        <Link to="/" className="block py-2 px-4 hover:bg-neutral-100 rounded-lg">Home</Link>
                        <Link to="/products" className="block py-2 px-4 hover:bg-neutral-100 rounded-lg">Shop</Link>
                        <Link to="/collections" className="block py-2 px-4 hover:bg-neutral-100 rounded-lg">Collections</Link>
                        <Link to="/about" className="block py-2 px-4 hover:bg-neutral-100 rounded-lg">About</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;