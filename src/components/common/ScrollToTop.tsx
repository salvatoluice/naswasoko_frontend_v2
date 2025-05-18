import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    const prevPathRef = useRef<string>('');

    useEffect(() => {
        if (prevPathRef.current !== '' && prevPathRef.current !== pathname) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        prevPathRef.current = pathname;
    }, [pathname]);

    return null;
}

export default ScrollToTop;