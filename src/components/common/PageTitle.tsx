import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
    '/': 'Naswasoko | Premium Electronics & Appliances',
    '/products': 'Shop All Products | Naswasoko',
    '/categories': 'Browse Categories | Naswasoko',
    '/search': 'Search Results | Naswasoko',
    '/checkout': 'Secure Checkout | Naswasoko',
    '/order-confirmation': 'Order Confirmed | Naswasoko',
    '/about': 'About Us | Naswasoko',
    '/contact': 'Contact Us | Naswasoko',
    '/404': 'Page Not Found | Naswasoko',
};

const PageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        let title = 'Naswasoko | Premium Electronics & Appliances';

        if (pageTitles[location.pathname]) {
            title = pageTitles[location.pathname];
        }
        else if (location.pathname.startsWith('/products/')) {
            title = 'Product Details | Naswasoko';
        }

        document.title = title;
    }, [location]);

    return null;
};

export default PageTitle;