import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

const Layout = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();

    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prev => prev + 1);

        setIsCartOpen(false);
    }, [location]);

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onOpenCart={handleOpenCart} />
            <main className="flex-grow" key={key}>
                <Outlet />
            </main>
            <Footer />
            <CartDrawer isOpen={isCartOpen} onClose={handleCloseCart} />
        </div>
    );
};

export default Layout;