// src/pages/CategoriesPage.tsx

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Search,
    Zap,
    Laptop,
    Tv,
    Headphones,
    Phone,
    Watch,
    Home as HomeIcon,
    Camera,
    Speaker,
    Gamepad2,
    Coffee,
    Tablets,
    LayoutGrid,
    SquareStack,
    Filter,
    CloudDownload
} from 'lucide-react';

const electronicsCategories = [
    {
        id: 'tvs-displays',
        name: 'TVs & Displays',
        slug: 'tvs-displays',
        description: 'Smart TVs, OLED, 4K, and monitors for immersive viewing experience',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000',
        count: 42,
        icon: <Tv size={24} />,
        featured: true,
        color: 'from-blue-500/20 to-purple-500/20'
    },
    {
        id: 'audio',
        name: 'Audio Systems',
        slug: 'audio',
        description: 'Premium speakers, soundbars, and home theater systems',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000',
        count: 36,
        icon: <Speaker size={24} />,
        featured: true,
        color: 'from-amber-500/20 to-red-500/20'
    },
    {
        id: 'smartphones',
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones with cutting-edge features and technology',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000',
        count: 53,
        icon: <Phone size={24} />,
        featured: true,
        color: 'from-sky-500/20 to-indigo-500/20'
    },
    {
        id: 'computers',
        name: 'Computers & Laptops',
        slug: 'computers',
        description: 'Powerful laptops, desktops, and accessories for work and play',
        image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1000',
        count: 47,
        icon: <Laptop size={24} />,
        featured: true,
        color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
        id: 'kitchen',
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        description: 'Modern kitchen essentials from refrigerators to coffee makers',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000',
        count: 39,
        icon: <Coffee size={24} />,
        featured: false,
        color: 'from-cyan-500/20 to-blue-500/20'
    },
    {
        id: 'smart-home',
        name: 'Smart Home',
        slug: 'smart-home',
        description: 'Connected devices for the modern automated home',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000',
        count: 28,
        icon: <HomeIcon size={24} />,
        featured: true,
        color: 'from-violet-500/20 to-purple-500/20'
    },
    {
        id: 'wearables',
        name: 'Wearable Tech',
        slug: 'wearables',
        description: 'Smartwatches, fitness trackers, and wearable innovation',
        image: 'https://images.unsplash.com/photo-1617043786394-ae546b128675?q=80&w=1000',
        count: 31,
        icon: <Watch size={24} />,
        featured: false,
        color: 'from-pink-500/20 to-rose-500/20'
    },
    {
        id: 'refrigeration',
        name: 'Refrigeration',
        slug: 'refrigeration',
        description: 'Energy-efficient refrigerators and freezers in various sizes',
        image: 'https://images.unsplash.com/photo-1631512320095-4db783e8c3bd?q=80&w=1000',
        count: 18,
        icon: <CloudDownload size={24} />,
        featured: false,
        color: 'from-blue-500/20 to-indigo-500/20'
    },
    {
        id: 'gaming',
        name: 'Gaming',
        slug: 'gaming',
        description: 'Gaming consoles, accessories, and immersive gaming gear',
        image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1000',
        count: 34,
        icon: <Gamepad2 size={24} />,
        featured: false,
        color: 'from-red-500/20 to-orange-500/20'
    },
    {
        id: 'cameras',
        name: 'Cameras & Photo',
        slug: 'cameras',
        description: 'Digital cameras, drones, and photography equipment',
        image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1000',
        count: 22,
        icon: <Camera size={24} />,
        featured: false,
        color: 'from-gray-500/20 to-neutral-500/20'
    },
    {
        id: 'headphones',
        name: 'Headphones',
        slug: 'headphones',
        description: 'Premium wireless headphones, earbuds, and audio accessories',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
        count: 27,
        icon: <Headphones size={24} />,
        featured: false,
        color: 'from-amber-500/20 to-yellow-500/20'
    },
    {
        id: 'tablets',
        name: 'Tablets & E-readers',
        slug: 'tablets',
        description: 'Tablets, e-readers, and digital note-taking devices',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000',
        count: 19,
        icon: <Tablets size={24} />,
        featured: false,
        color: 'from-teal-500/20 to-green-500/20'
    }
];

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'name' | 'count';

const CategoriesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [categories, setCategories] = useState(electronicsCategories);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter and sort categories
    useEffect(() => {
        let filteredCategories = [...electronicsCategories];

        // Apply search filter
        if (searchQuery) {
            filteredCategories = filteredCategories.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply active filters
        if (activeFilters.length > 0) {
            // Example of some filters that could be applied
            // For now, let's just simulate filtering
            if (activeFilters.includes('featured')) {
                filteredCategories = filteredCategories.filter(cat => cat.featured);
            }
        }

        // Apply sorting
        switch (sortBy) {
            case 'featured':
                filteredCategories.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'name':
                filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'count':
                filteredCategories.sort((a, b) => b.count - a.count);
                break;
        }

        setCategories(filteredCategories);
    }, [searchQuery, sortBy, activeFilters]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero section */}
            <div className="relative bg-neutral-950 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDUgTCAyMCA1IE0gNSAwIEwgNSAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md mb-6">
                            <Zap size={16} className="text-primary-light" />
                            <span className="text-white/90 text-sm font-medium">Browse Categories</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                            <span className="block font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-cyan-400 to-blue-500">
                                Find Your Perfect Tech
                            </span>
                        </h1>

                        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                            Explore our comprehensive range of electronics and appliances categories, featuring the latest technology and innovative devices for your modern lifestyle.
                        </p>

                        {/* Search bar */}
                        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search categories or products..."
                                className="w-full py-4 px-6 pl-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Categories section */}
            <div className="container-custom py-12">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-neutral-100">
                    <div>
                        <h2 className="text-2xl font-medium mb-1">All Categories</h2>
                        <p className="text-neutral-500">
                            {categories.length} {categories.length === 1 ? 'category' : 'categories'} of electronics and appliances
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* View mode toggle */}
                        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                                aria-label="Grid view"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                                aria-label="List view"
                            >
                                <SquareStack size={18} />
                            </button>
                        </div>

                        {/* Sort dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none bg-white border border-neutral-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="featured">Featured First</option>
                                <option value="name">Name (A-Z)</option>
                                <option value="count">Number of Products</option>
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <ArrowRight size={16} className="rotate-90" />
                            </div>
                        </div>

                        {/* Filter button */}
                        <button
                            onClick={() => toggleFilter('featured')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${activeFilters.includes('featured')
                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                    : 'border-neutral-200 hover:bg-neutral-50'
                                }`}
                        >
                            <Filter size={16} />
                            <span>Featured</span>
                        </button>
                    </div>
                </div>

                {/* Categories grid */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.slug}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-md transition-all h-full flex flex-col">
                                    <div className={`aspect-video relative overflow-hidden bg-gradient-to-r ${category.color}`}>
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                                            {category.icon}
                                        </div>
                                        {category.featured && (
                                            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                                        <p className="text-neutral-600 text-sm mb-4 flex-1">{category.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-neutral-500 text-sm">{category.count} products</span>
                                            <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                                <span>Explore</span>
                                                <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    // List view
                    <div className="space-y-4">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.slug}`}
                                className="group"
                            >
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-md transition-all p-1">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className={`w-full sm:w-48 h-32 sm:h-auto relative overflow-hidden rounded-lg bg-gradient-to-r ${category.color}`}>
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {category.featured && (
                                                <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs font-medium">
                                                    Featured
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 p-3 sm:py-4 flex flex-col justify-center">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 bg-neutral-100 rounded-md">
                                                            {category.icon}
                                                        </div>
                                                        <h3 className="text-lg font-medium">{category.name}</h3>
                                                    </div>
                                                    <p className="text-neutral-600 text-sm mt-2">{category.description}</p>
                                                </div>
                                                <span className="bg-neutral-100 px-2 py-1 rounded-md text-neutral-600 text-sm whitespace-nowrap">
                                                    {category.count} products
                                                </span>
                                            </div>
                                            <div className="mt-3 flex justify-end">
                                                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                                    <span>Explore Category</span>
                                                    <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Featured collections section */}
            <div className="bg-neutral-50 py-16 mt-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3">Popular Collections</h2>
                        <p className="text-neutral-600 max-w-2xl mx-auto">
                            Discover our curated collections of electronics and appliances, carefully selected to enhance your digital lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Premium Audio",
                                description: "High-fidelity sound systems for audiophiles",
                                image: "https://images.unsplash.com/photo-1575996386847-29e6dd05ceaa?q=80&w=1000",
                                slug: "premium-audio"
                            },
                            {
                                title: "Smart Home Essentials",
                                description: "Connected devices for the modern home",
                                image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000",
                                slug: "smart-home"
                            },
                            {
                                title: "Work & Productivity",
                                description: "Tech to boost your workflow and efficiency",
                                image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1000",
                                slug: "productivity"
                            }
                        ].map((collection, index) => (
                            <Link
                                key={index}
                                to={`/collections/${collection.slug}`}
                                className="group"
                            >
                                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-neutral-900/10 z-10"></div>
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                        <h3 className="text-xl font-medium text-white mb-1">{collection.title}</h3>
                                        <p className="text-white/80 text-sm mb-3">{collection.description}</p>
                                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium group-hover:bg-white/30 transition-colors">
                                            <span>View Collection</span>
                                            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tech advice section */}
            <div className="container-custom py-16">
                <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-3xl p-8 md:p-12">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl md:text-3xl font-medium mb-4">Need Help Choosing?</h2>
                        <p className="text-neutral-700 mb-6">
                            Our tech experts are available to help you find the perfect electronics and appliances for your needs. Get personalized recommendations and technical advice.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/tech-advisor"
                                className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/10 hover:bg-primary-dark transition-colors"
                            >
                                <Zap size={18} />
                                <span>Get Expert Advice</span>
                            </Link>
                            <Link
                                to="/buying-guides"
                                className="bg-white text-neutral-900 px-6 py-3 rounded-xl flex items-center gap-2 border border-neutral-200 hover:bg-neutral-50 transition-colors"
                            >
                                <span>Read Buying Guides</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;