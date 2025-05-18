import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const heroImages = [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03", 
        "https://images.unsplash.com/photo-1551644158-5ce86b943223",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6", 
        "https://images.unsplash.com/photo-1588599837624-01b15123b956"
    ];

    const categories = [
        "Smart Home",
        "Kitchen Appliances",
        "Entertainment",
        "Premium Audio"
    ];

    useEffect(() => {
        setIsVisible(true);

        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div className="relative overflow-hidden bg-neutral-950">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-blue-500/20 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-48 right-1/4 w-96 h-96 bg-gradient-to-l from-primary/20 to-cyan-400/20 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDUgTCAyMCA1IE0gNSAwIEwgNSAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="h-[90vh] flex items-center justify-center relative">
                {heroImages.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${activeImage === index
                                ? 'opacity-70 scale-100'
                                : 'opacity-0 scale-105'
                            }`}
                    >
                        <img
                            src={src}
                            alt={categories[index]}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/70 to-neutral-950/90"></div>

                <div className="container-custom relative z-10 px-6 md:px-8">
                    <div className="max-w-3xl">
                        <div
                            className={`inline-flex items-center gap-2 py-2 pl-3 pr-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                                }`}
                        >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/80 backdrop-blur-md">
                                <Sparkles size={12} className="text-white" />
                            </span>
                            <span className="text-white/90 text-sm font-medium tracking-wide">
                                {categories[activeImage]}
                            </span>
                        </div>

                        <h1
                            className={`text-5xl md:text-7xl font-sans font-light text-white mb-8 leading-tight tracking-tight transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                        >
                            <span className="block font-extralight">Premium</span>
                            <span className="block font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-cyan-400 to-blue-500">
                                Electronics & Appliances
                            </span>
                        </h1>

                        <p
                            className={`text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                        >
                            Experience the future of home technology with our curated selection of innovative electronics and smart appliances for the modern Kenyan lifestyle.
                        </p>

                        <div
                            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                        >
                            <Link
                                to="/products"
                                className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all duration-300"
                            >
                                <Zap size={18} className="text-white" />
                                <span>Explore Products</span>
                                <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/categories"
                                className="backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300"
                            >
                                Browse Categories
                            </Link>
                        </div>

                        <div
                            className={`mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                        >
                            {['TVs & Audio', 'Kitchen', 'Smart Home', 'Computing'].map((category, index) => (
                                <Link
                                    key={index}
                                    to={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                                    className="flex items-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300"
                                >
                                    <span className="text-white/80 text-sm font-medium">{category}</span>
                                    <ChevronRight size={14} className="text-white/60" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImage === index
                                    ? 'bg-white w-8'
                                    : 'bg-white/30'
                                }`}
                            aria-label={`View ${categories[index]}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;