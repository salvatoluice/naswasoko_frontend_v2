// src/components/home/Newsletter.tsx

import { useState, useRef, useEffect } from 'react';
import { Send, Mail, CheckCircle, X } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Animation on scroll into view
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulated submission
        setTimeout(() => {
            setIsSubmitted(true);
            // Auto-reset after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 5000);
        }, 500);
    };

    return (
        <section
            ref={sectionRef}
            className="py-28 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-white to-neutral-50 z-0"></div>

            {/* Decorative elements */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute w-full h-px top-0 bg-gradient-to-r from-transparent via-neutral-300 to-transparent"></div>

            {/* Floating elements */}
            <div className="absolute w-24 h-24 rounded-full border border-neutral-200 top-20 left-1/4 opacity-20 animate-float-slow"></div>
            <div className="absolute w-16 h-16 rounded-xl border border-primary/20 bottom-20 right-1/4 opacity-30 animate-spin-slow"></div>
            <div className="absolute w-8 h-8 bg-primary/10 rounded-full top-40 right-1/3 opacity-50 animate-pulse"></div>

            <div className="container-custom relative z-10">
                <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Mail size={24} className="text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                        Join Our <span className="italic text-primary">Community</span>
                    </h2>

                    <p className="text-neutral-600 md:text-lg mb-8 leading-relaxed">
                        Subscribe to our newsletter for exclusive offers, new arrivals, inspiring stories of Kenyan artisans, and insider access to special collections.
                    </p>

                    {isSubmitted ? (
                        <div className="bg-green-50 border border-green-100 text-green-800 rounded-2xl p-6 flex items-center justify-between max-w-lg mx-auto shadow-sm">
                            <div className="flex items-center">
                                <CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0" />
                                <p className="font-medium">Thank you for subscribing! Check your inbox soon for updates and a special welcome gift.</p>
                            </div>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="p-1 hover:bg-green-100 rounded-full"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className={`relative max-w-lg mx-auto transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            <div className={`
                flex flex-col sm:flex-row gap-2 p-1 rounded-2xl transition-all duration-300
                ${isFocused ? 'bg-white shadow-lg ring-1 ring-primary/30' : 'bg-white/50 shadow'}
              `}>
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="Your email address"
                                        required
                                        className="w-full px-5 py-4 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-0"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-4 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 group"
                                >
                                    <span>Subscribe</span>
                                    <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <p className="text-neutral-500 text-sm mt-4">
                                By subscribing, you agree to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and receive periodic updates.
                            </p>
                        </form>
                    )}
                </div>

                {/* Testimonial */}
                <div className={`
          mt-16 max-w-2xl mx-auto rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-sm border border-neutral-100
          transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `} style={{ transitionDelay: '400ms' }}>
                    <div className="flex gap-4 items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="/api/placeholder/100/100" alt="Customer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-medium">Amara Okafor</h4>
                            <p className="text-neutral-500 text-sm">Loyal customer since 2023</p>
                        </div>
                    </div>
                    <blockquote className="text-neutral-700 italic">
                        "Naswasoko's newsletter has introduced me to incredible artisans whose stories inspire me. The exclusive discounts are a wonderful bonus, but it's the rich cultural heritage behind each piece that keeps me coming back."
                    </blockquote>
                </div>
            </div>

            <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default Newsletter;