import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Newsletter from '../components/home/Newsletter';
import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductTypeSection from '../components/home/ProductType';
import SpecialDeals from '../components/home/SpecialDeals';
import Brands from '../components/home/Brands';
import ProductGrid from '../components/home/ProductGrid';

const HomePage = () => {
    const { fetchProducts } = useProducts();
    const productTypes = [
        {
            id: 'refrigerators',
            name: 'Refrigerators',
            description: 'Keep your food fresh longer',
            image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800',
            count: 48,
            featured: true
        },
        {
            id: 'cookers',
            name: 'Cookers & Ovens',
            description: 'For perfect meals every time',
            image: 'https://images.unsplash.com/photo-1556911261-6bd341186b2f?auto=format&fit=crop&q=80&w=800',
            count: 36,
            featured: true
        },
        {
            id: 'washing-machines',
            name: 'Washing Machines',
            description: 'Efficient laundry solutions',
            image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800',
            count: 24,
            featured: true
        },
        {
            id: 'tvs',
            name: 'Televisions',
            description: 'Immersive entertainment',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
            count: 65,
            featured: true
        },
        {
            id: 'air-conditioners',
            name: 'Air Conditioners',
            description: 'Stay cool all summer',
            image: 'https://images.unsplash.com/photo-1581275288776-bdf0d95c930b?auto=format&fit=crop&q=80&w=800',
            count: 29,
            featured: true
        }
    ];

    const brandsData = [
        {
            id: 'samsung',
            name: 'Samsung',
            logo: 'https://images.unsplash.com/photo-1662219708489-dd8f9ce099b9?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'lg',
            name: 'LG',
            logo: 'https://images.unsplash.com/photo-1652796900151-58988cf59ab4?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'phillips',
            name: 'Phillips',
            logo: 'https://images.unsplash.com/photo-1661347334036-d484f970b1b1?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'sony',
            name: 'Sony',
            logo: 'https://images.unsplash.com/photo-1617459510286-ab9d42e0c9cc?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'hisense',
            name: 'Hisense',
            logo: 'https://images.unsplash.com/photo-1651602694163-3869471385ec?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'toshiba',
            name: 'Toshiba',
            logo: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'bosch',
            name: 'Bosch',
            logo: 'https://images.unsplash.com/photo-1657216328535-e981d5922943?auto=format&fit=crop&q=80&w=400',
            featured: true
        },
        {
            id: 'whirlpool',
            name: 'Whirlpool',
            logo: 'https://images.unsplash.com/photo-1603946877690-d410437c29aa?auto=format&fit=crop&q=80&w=400',
            featured: true
        }
    ];

    const dealsData = [
        {
            id: 1,
            title: "Upgrade Your Kitchen",
            description: "Up to 40% off premium kitchen appliances",
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
            backgroundColor: "bg-amber-50",
            textColor: "text-amber-900",
            buttonColor: "bg-amber-600 hover:bg-amber-700",
            link: "/products?deal=kitchen-upgrade"
        },
        {
            id: 2,
            title: "Smart Home Bundle",
            description: "Save 25% when you buy 3 or more smart devices",
            image: "https://images.unsplash.com/photo-1585771273209-a191bce3217f?auto=format&fit=crop&q=80&w=800",
            backgroundColor: "bg-blue-50",
            textColor: "text-blue-900",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            link: "/products?deal=smart-bundle"
        },
        {
            id: 3,
            title: "Entertainment Essentials",
            description: "Special prices on TVs, sound systems & more",
            image: "https://images.unsplash.com/photo-1601944179066-29b8f7e29c3a?auto=format&fit=crop&q=80&w=800",
            backgroundColor: "bg-purple-50",
            textColor: "text-purple-900",
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            link: "/products?deal=entertainment"
        }
    ];

    const trendingProducts = [
        {
            id: 1,
            name: "Samsung 25 Cu. Ft. French Door Refrigerator",
            price: 129999,
            discountPrice: 109999,
            rating: 4.8,
            reviews: 234,
            image: "https://images.unsplash.com/photo-1628091152301-6a7284f3f878?auto=format&fit=crop&q=80&w=800",
            category: "refrigerators",
            categoryName: "Refrigerators",
            isNew: true,
            isBestSeller: true
        },
        {
            id: 2,
            name: "LG 65\" 4K UHD Smart TV",
            price: 89999,
            discountPrice: 74999,
            rating: 4.7,
            reviews: 186,
            image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800",
            category: "tvs",
            categoryName: "Televisions",
            isNew: false,
            isBestSeller: true
        },
        {
            id: 3,
            name: "Bosch 8kg Front Load Washing Machine",
            price: 64999,
            discountPrice: null,
            rating: 4.6,
            reviews: 142,
            image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=800",
            category: "washing-machines",
            categoryName: "Washing Machines",
            isNew: true,
            isBestSeller: false
        },
        {
            id: 4,
            name: "Philips Air Fryer XXL",
            price: 24999,
            discountPrice: 19999,
            rating: 4.9,
            reviews: 320,
            image: "https://images.unsplash.com/photo-1648124907695-966074b209a1?auto=format&fit=crop&q=80&w=800",
            category: "small-appliances",
            categoryName: "Small Appliances",
            isNew: false,
            isBestSeller: true
        }
    ];

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div>
            <HeroSection />
            <FeaturedCategories />
            <FeaturedProducts />
            <ProductTypeSection
                title="Product Types"
                subtitle="Essential Appliances"
                description="Find exactly what you need from our wide range of home appliances, each selected for quality and performance."
                productTypes={productTypes}
            />
            <SpecialDeals
                title="Special Deals & Promotions"
                subtitle="Limited Time Offers"
                description="Take advantage of our current sales and bundle offers on popular products."
                deals={dealsData}
            />
            <Brands
                title="Trusted Brands"
                subtitle="Quality Assurance"
                description="We partner with the world's leading manufacturers to bring you reliable, high-quality products."
                brands={brandsData}
                backgroundColor="bg-neutral-50 dark:bg-neutral-900"
            />
            <ProductGrid
                title="Trending Products"
                subtitle="Customer Favorites"
                description="See what other customers are loving right now - our most popular and highest rated items."
                products={trendingProducts}
                showPagination={true}
            />
            <Newsletter />
        </div>
    );
};

export default HomePage;