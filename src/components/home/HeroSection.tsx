import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const heroImages = [
        "/api/placeholder/1200/800", // Replace with actual high-quality images
        "/api/placeholder/1200/800",
        "/api/placeholder/1200/800"
    ];

    useEffect(() => {
        setIsVisible(true);

        // Auto-rotate hero images
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % heroImages.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

            {/* Hero image carousel */}
            <div className="h-[85vh] bg-neutral-900 flex items-center justify-center relative">
                {heroImages.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${activeImage === index ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={src}
                            alt={`Naswasoko Featured Collection ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}

                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

                {/* Content */}
                <div className="container-custom relative z-10 px-4 md:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-white/20 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                                Artisan Collection
                            </span>
                            <div className="flex items-center text-yellow-400 text-sm">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <span className="ml-1 text-white/80">5.0 (127 reviews)</span>
                            </div>
                        </div>

                        <h1 className={`text-5xl md:text-7xl font-serif font-light text-white mb-6 leading-tight transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}>
                            <span className="block">Kenyan Artistry</span>
                            <span className="block italic text-primary-light">Reimagined</span>
                        </h1>

                        <p className={`text-lg md:text-xl text-white/80 mb-8 max-w-xl transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}>
                            Discover handcrafted treasures that blend centuries of tradition with bold, contemporary design sensibilities.
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}>
                            <Link
                                to="/products"
                                className="group bg-white hover:bg-neutral-100 text-neutral-900 px-8 py-4 rounded-xl font-medium flex items-center justify-center sm:justify-start"
                            >
                                <span>Explore Collection</span>
                                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/about"
                                className="border border-white/30 hover:border-white/80 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium"
                            >
                                Our Story
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`w-12 h-1 rounded-full transition-all ${activeImage === index ? 'bg-white' : 'bg-white/30'
                                }`}
                            aria-label={`View slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;