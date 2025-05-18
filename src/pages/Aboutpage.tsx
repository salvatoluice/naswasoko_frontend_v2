// src/pages/AboutPage.tsx

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Award,
    Heart,
    Globe,
    ShieldCheck,
    CheckCircle
} from 'lucide-react';

const AboutPage = () => {
    const [activeValue, setActiveValue] = useState(0);
    const [visibleSections, setVisibleSections] = useState<string[]>([]);
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Company values
    const values = [
        {
            id: 'authenticity',
            icon: <ShieldCheck size={24} className="text-primary" />,
            title: 'Authenticity',
            description: 'We ensure every product is genuinely handcrafted by skilled Kenyan artisans, preserving traditional techniques while embracing innovation.'
        },
        {
            id: 'sustainability',
            icon: <Globe size={24} className="text-primary" />,
            title: 'Sustainability',
            description: 'Our business practices prioritize environmental responsibility, ethical sourcing, and supporting sustainable production methods.'
        },
        {
            id: 'community',
            icon: <Heart size={24} className="text-primary" />,
            title: 'Community',
            description: 'We foster direct relationships with artisans and their communities, ensuring fair compensation and investment in local growth.'
        },
        {
            id: 'quality',
            icon: <Award size={24} className="text-primary" />,
            title: 'Quality',
            description: 'Every product meets our rigorous standards for craftsmanship, durability, and attention to detail before reaching our customers.'
        }
    ];

    // Team members
    const team = [
        {
            name: 'David Kimani',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            bio: 'David founded Naswasoko in 2018 with a vision to connect Kenyan artisans with the global marketplace.'
        },
        {
            name: 'Amina Ochieng',
            role: 'Head of Artisan Relations',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
            bio: 'With over 15 years in community development, Amina builds strong relationships with our artisan partners.'
        },
        {
            name: 'Thomas Mwangi',
            role: 'Technology Director',
            image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919',
            bio: 'Thomas leads our technology initiatives, ensuring our platform provides a seamless experience for customers and artisans alike.'
        },
        {
            name: 'Grace Mutua',
            role: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
            bio: 'Grace works directly with artisans to develop products that honor tradition while appealing to contemporary tastes.'
        }
    ];

    // Timeline events
    const timeline = [
        {
            year: '2018',
            title: 'Humble Beginnings',
            description: 'Naswasoko started as a small pop-up shop in Nairobi, featuring items from just five local artisans.'
        },
        {
            year: '2019',
            title: 'Digital Marketplace',
            description: 'We launched our first e-commerce platform, allowing us to reach customers across Kenya and East Africa.'
        },
        {
            year: '2020',
            title: 'Artisan Network Growth',
            description: 'Our network expanded to over 50 artisans, and we implemented our comprehensive quality standards system.'
        },
        {
            year: '2021',
            title: 'International Shipping',
            description: 'We began shipping internationally, bringing Kenyan craftsmanship to customers worldwide.'
        },
        {
            year: '2023',
            title: 'Electronics Integration',
            description: 'We expanded our product line to include carefully selected household electronics that meet our sustainability standards.'
        },
        {
            year: '2024',
            title: 'Artisan Development Program',
            description: 'We launched our formal training program to help artisans scale their businesses and develop new skills.'
        }
    ];

    // Animation on scroll for sections
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setVisibleSections((prev) => {
                            if (!prev.includes(entry.target.id)) {
                                return [...prev, entry.target.id];
                            }
                            return prev;
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            Object.values(sectionRefs.current).forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    // Auto-rotate company values
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveValue((prev) => (prev + 1) % values.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [values.length]);

    return (
        <div className="pt-16 bg-white">
            {/* Hero Section */}
            <section className="relative bg-neutral-900 text-white py-20 md:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
                        alt="Kenyan artisans at work"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                            Connecting <span className="text-primary">Artisans</span> with <span className="text-primary">Global</span> Markets
                        </h1>
                        <p className="text-xl text-white/80 mb-8 leading-relaxed">
                            Naswasoko bridges the gap between talented Kenyan craftspeople and customers worldwide who value authenticity, quality, and cultural heritage.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/products"
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Explore Products
                            </Link>
                            <Link
                                to="/artisans"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Meet Our Artisans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section
                id="our-story"
                ref={(el) => { sectionRefs.current.ourStory = el as HTMLDivElement | null; }}
                className={`py-20 transition-opacity duration-1000 ${visibleSections.includes('our-story') ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2 relative">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1547471080-3cc5b18d773a"
                                    alt="Naswasoko founder with artisans"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-primary-light/20 -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary/10 -z-10"></div>
                        </div>

                        <div className="md:w-1/2">
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Our Story
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                                From Local Markets to Global Presence
                            </h2>
                            <div className="space-y-4 text-neutral-600">
                                <p>
                                    Founded in 2018, Naswasoko began with a simple mission: to showcase the extraordinary craftsmanship of Kenya's talented artisans to the world. What started as a small pop-up shop in Nairobi has grown into a thriving marketplace connecting hundreds of artisans with customers worldwide.
                                </p>
                                <p>
                                    Our name, "Naswasoko," combines "Naswa" (artistry) and "Soko" (marketplace) in Swahili, reflecting our commitment to creating a platform where traditional craftsmanship meets modern commerce.
                                </p>
                                <p>
                                    In 2023, we expanded our vision to include carefully selected household electronics that align with our values of quality, sustainability, and innovation, allowing us to serve more of our customers' needs while maintaining our commitment to excellence.
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-1">200+</div>
                                    <div className="text-sm text-neutral-600">Artisans</div>
                                </div>
                                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-1">18</div>
                                    <div className="text-sm text-neutral-600">Counties</div>
                                </div>
                                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-1">45+</div>
                                    <div className="text-sm text-neutral-600">Countries Served</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section
                id="our-values"
                ref={(el) => { sectionRefs.current.ourValues = el as HTMLDivElement | null; }}
                className={`py-20 bg-neutral-50 transition-opacity duration-1000 ${visibleSections.includes('our-values') ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            Our Values
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            Principles That Guide Us
                        </h2>
                        <p className="text-neutral-600">
                            At Naswasoko, our values shape every decision we make, from selecting artisans to curating products and developing our platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={value.id}
                                className={`bg-white p-6 rounded-xl border border-neutral-100 shadow-sm transition-all duration-500 ${activeValue === index ? 'scale-105 border-primary shadow-md' : 'hover:shadow-md'
                                    }`}
                                onMouseEnter={() => setActiveValue(index)}
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                                <p className="text-neutral-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section
                id="our-team"
                ref={(el) => { sectionRefs.current.ourTeam = el as HTMLDivElement | null; }}
                className={`py-20 transition-opacity duration-1000 ${visibleSections.includes('our-team') ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            Our Team
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            The People Behind Naswasoko
                        </h2>
                        <p className="text-neutral-600">
                            Our diverse team brings together expertise in craftsmanship, technology, design, and community development.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="group">
                                <div className="relative overflow-hidden rounded-xl mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-sm">{member.bio}</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-medium">{member.name}</h3>
                                <p className="text-primary text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section
                id="timeline"
                ref={(el) => { sectionRefs.current.timeline = el as HTMLDivElement | null; }}
                className={`py-20 bg-neutral-50 transition-opacity duration-1000 ${visibleSections.includes('timeline') ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            Our Journey
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">
                            The Naswasoko Story
                        </h2>
                        <p className="text-neutral-600">
                            From our founding to today, we've continuously evolved while staying true to our mission.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 transform md:translate-x-px"></div>

                        <div className="space-y-12">
                            {timeline.map((event, index) => (
                                <div key={event.year} className="relative">
                                    <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                        }`}>
                                        {/* Year marker */}
                                        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                                            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                                                {event.year}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                                                <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                                                <p className="text-neutral-600">{event.description}</p>
                                            </div>
                                        </div>

                                        {/* Spacer for alternative layout */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Electronics Focus Section */}
            <section
                id="electronics"
                ref={(el) => { sectionRefs.current.electronics = el as HTMLDivElement | null; }}
                className={`py-20 transition-opacity duration-1000 ${visibleSections.includes('electronics') ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                Electronics Division
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                                Quality Electronics for the Modern Home
                            </h2>
                            <div className="space-y-4 text-neutral-600">
                                <p>
                                    In 2023, Naswasoko expanded to include premium household electronics that complement our artisanal offerings. We've carefully selected products that embody our values of quality, sustainability, and thoughtful design.
                                </p>
                                <p>
                                    Our electronics collection focuses on sustainable options, energy-efficient appliances, and products that integrate beautifully into homes while reducing environmental impact.
                                </p>

                                <div className="space-y-3 mt-6">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-medium">Energy Efficiency</h4>
                                            <p className="text-sm text-neutral-500">All electronics meet or exceed industry standards for energy conservation.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-medium">Sustainable Materials</h4>
                                            <p className="text-sm text-neutral-500">We prioritize products with recycled or sustainable materials in their construction.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-medium">Ethical Manufacturing</h4>
                                            <p className="text-sm text-neutral-500">We partner with brands that ensure fair labor practices and responsible supply chains.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/products?category=electronics"
                                className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Explore Electronics Collection
                            </Link>
                        </div>

                        <div className="md:w-1/2 grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
                                    alt="Kitchen Appliances"
                                    className="w-full rounded-lg shadow-md"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571"
                                    alt="Smart Home Devices"
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                            <div className="space-y-4 pt-6">
                                <img
                                    src="https://images.unsplash.com/photo-1551775871-700d2212540e"
                                    alt="Entertainment Systems"
                                    className="w-full rounded-lg shadow-md"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1630116516293-cb9c2628e410"
                                    alt="Solar-powered Devices"
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-neutral-900 text-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                            Join Us in Supporting Kenyan Craftsmanship
                        </h2>
                        <p className="text-xl text-white/80 mb-8">
                            Every purchase supports artisans, preserves traditional techniques, and helps build sustainable livelihoods.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/products"
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Shop Our Collection
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;