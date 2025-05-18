import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Newsletter from '../components/home/Newsletter';
import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

const HomePage = () => {
    const { fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div>
            <HeroSection />
            <FeaturedCategories />
            <FeaturedProducts />
            <Newsletter />
        </div>
    );
};

export default HomePage;