import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Instagram,
    Facebook,
    Twitter,
    MapPin,
    Mail,
    Phone,
    ChevronRight,
    Send,
    CheckCircle,
    Zap,
    CreditCard,
    Shield,
    Truck,
    Sparkles
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Simulate API call
            setTimeout(() => {
                setIsSubscribed(true);
                setEmail('');

                // Reset after 5 seconds
                setTimeout(() => {
                    setIsSubscribed(false);
                }, 5000);
            }, 800);
        }
    };

    const paymentMethods = [
        { name: 'M-Pesa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/120px-M-PESA_LOGO-01.svg.png' },
        { name: 'Visa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png' },
        { name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png' },
        { name: 'PayPal', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/120px-PayPal.svg.png' },
    ];

    const features = [
        { icon: <Truck size={20} />, title: "Fast Delivery", text: "Free delivery for orders over KSh 10,000" },
        { icon: <Shield size={20} />, title: "2-Year Warranty", text: "Extended protection on all electronics" },
        { icon: <CreditCard size={20} />, title: "Secure Payments", text: "Multiple payment options available" },
    ];

    return (
        <footer className="relative overflow-hidden bg-neutral-950 text-white">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDUgTCAyMCA1IE0gNSAwIEwgNSAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="relative border-b border-white/10">
                <div className="container-custom py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                            >
                                <div className="p-3 rounded-xl bg-primary/20 text-primary-light group-hover:bg-primary/30 transition-colors">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg text-white mb-1">{feature.title}</h3>
                                    <p className="text-white/70 text-sm">{feature.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="relative border-b border-white/10">
                <div className="container-custom py-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} className="text-primary-light" />
                            <span className="text-primary-light text-sm font-medium">Join Our Community</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-light mb-3">
                            Get <span className="text-primary-light font-medium">exclusive deals</span> on the latest tech
                        </h2>

                        <p className="text-white/70 mb-8 max-w-xl">
                            Subscribe to our newsletter for updates on new electronics, special promotions, and tech tips to maximize your devices.
                        </p>

                        <form onSubmit={handleSubscribe}>
                            {isSubscribed ? (
                                <div className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm text-white rounded-2xl p-4 flex items-center">
                                    <CheckCircle size={20} className="text-emerald-400 mr-3 flex-shrink-0" />
                                    <p>Thank you for subscribing! You'll receive exclusive deals and tech updates.</p>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="flex-1 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-dark text-white px-5 py-3.5 rounded-2xl font-medium flex items-center gap-2 transition-colors group shadow-lg shadow-primary/10"
                                    >
                                        <span>Subscribe</span>
                                        <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="container-custom py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-3 space-y-6">
                            <Link to="/" className="font-sans font-medium text-2xl flex items-center gap-1.5">
                                <Zap size={24} className="text-primary-light" />
                                <span>TechElectro</span>
                            </Link>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Your premier destination for cutting-edge electronics and modern home appliances. Offering the latest technology products with expert service and competitive prices.
                            </p>
                            <div className="flex space-x-3">
                                <a
                                    href="https://instagram.com"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-transparent transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={18} />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-transparent transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={18} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-transparent transition-colors"
                                    aria-label="Twitter"
                                >
                                    <Twitter size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Products Column */}
                        <div className="md:col-span-2">
                            <h3 className="font-medium text-lg mb-5">Products</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/products?category=tv-displays" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>TVs & Displays</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=audio" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Audio Systems</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=kitchen" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Kitchen Appliances</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=computers" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Computers</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Categories Column */}
                        <div className="md:col-span-2">
                            <h3 className="font-medium text-lg mb-5">Categories</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/products?category=smartphones" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Smartphones</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=smart-home" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Smart Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=gaming" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Gaming</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products?category=wearables" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Wearables</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div className="md:col-span-2">
                            <h3 className="font-medium text-lg mb-5">Company</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/about" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>About Us</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/brands" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Brands</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/warranty" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Warranty Info</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/careers" className="text-white/60 hover:text-primary-light flex items-center gap-1 hover:gap-2 transition-all">
                                        <ChevronRight size={14} className="text-primary-light" />
                                        <span>Careers</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="md:col-span-3">
                            <h3 className="font-medium text-lg mb-5">Contact Us</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-primary-light flex-shrink-0 mt-0.5" />
                                    <span className="text-white/60 leading-relaxed">
                                        Kenyatta Avenue, Nairobi<br />
                                        Kenya, 00100
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-primary-light flex-shrink-0" />
                                    <a href="tel:+254712345678" className="text-white/60 hover:text-primary-light transition-colors">
                                        +254 712 345 678
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-primary-light flex-shrink-0" />
                                    <a href="mailto:info@techelectro.co.ke" className="text-white/60 hover:text-primary-light transition-colors">
                                        info@techelectro.co.ke
                                    </a>
                                </li>
                            </ul>

                            {/* Payment Methods */}
                            <div className="mt-6">
                                <p className="text-sm text-white/50 mb-3">Accepted Payment Methods</p>
                                <div className="flex flex-wrap gap-3">
                                    {paymentMethods.map((method) => (
                                        <div key={method.name} className="h-8 backdrop-blur-sm rounded-lg p-1 bg-white/5 border border-white/10">
                                            <img
                                                src={method.image}
                                                alt={method.name}
                                                className="h-full w-auto object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
                        <p>© {new Date().getFullYear()} TechElectro. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-6">
                            <Link to="/privacy" className="hover:text-primary-light transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="hover:text-primary-light transition-colors">Terms of Service</Link>
                            <Link to="/shipping" className="hover:text-primary-light transition-colors">Shipping Policy</Link>
                            <Link to="/faq" className="hover:text-primary-light transition-colors">FAQ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;