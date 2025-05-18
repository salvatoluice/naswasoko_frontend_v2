import { useState, useRef } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    CheckCircle,
    Facebook,
    Instagram,
    Twitter,
    ChevronDown,
    MessageSquare,
    Users,
    ShoppingBag
} from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const mapRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    type: 'general'
                });
            }, 5000);
        }, 1500);
    };

    // Toggle accordion
    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // Contact information
    const contactInfo = [
        {
            icon: <MapPin size={24} className="text-primary" />,
            title: 'Our Location',
            details: [
                'Kenyatta Avenue, Nairobi',
                'Kenya, 00100'
            ]
        },
        {
            icon: <Phone size={24} className="text-primary" />,
            title: 'Phone',
            details: [
                '+254 712 345 678 (Customer Support)',
                '+254 723 456 789 (Business Inquiries)'
            ]
        },
        {
            icon: <Mail size={24} className="text-primary" />,
            title: 'Email',
            details: [
                'info@naswasoko.co.ke',
                'support@naswasoko.co.ke'
            ]
        },
        {
            icon: <Clock size={24} className="text-primary" />,
            title: 'Working Hours',
            details: [
                'Monday - Friday: 8:00 AM - 6:00 PM',
                'Saturday: 9:00 AM - 4:00 PM'
            ]
        }
    ];

    const faqItems = [
        {
            question: 'How do I track my order?',
            answer: 'You can track your order by logging into your account and viewing the order details. Alternatively, you can use the tracking number provided in your shipping confirmation email. For any issues with tracking, please contact our customer support team.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept multiple payment methods including M-Pesa, Visa, Mastercard, and PayPal. All payments are processed securely through our payment partners to ensure your financial information remains protected.'
        },
        {
            question: 'How long does shipping take?',
            answer: 'Shipping times vary depending on your location. Within Nairobi, deliveries typically arrive within 1-2 business days. For other parts of Kenya, delivery takes 3-5 business days. International shipping times range from 7-14 business days depending on the destination country and customs processing.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 14-day return policy for most items. Products must be returned in their original condition and packaging. Custom-made items cannot be returned unless they are damaged or defective. Please visit our Returns page for detailed information on the return process.'
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship our products internationally to over 45 countries. Shipping costs and delivery times vary by location. Import taxes and duties may apply based on your country\'s regulations and are the responsibility of the customer.'
        }
    ];

    return (
        <div className="pt-16 bg-white">
            <section className="relative bg-neutral-900 text-white py-16 md:py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1521566652839-697aa473761a"
                        alt="Customer service"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
                        Get in <span className="text-primary">Touch</span> With Us
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        We're here to help with any questions about our products, artisans, or services. Reach out to our team for assistance.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                                <div className="text-neutral-600 space-y-1">
                                    {item.details.map((detail, i) => (
                                        <p key={i}>{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-neutral-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="order-2 lg:order-1">
                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-serif mb-2">Send Us a Message</h2>
                                <p className="text-neutral-600">
                                    Fill out the form below and our team will get back to you as soon as possible.
                                </p>
                            </div>

                            {isSubmitted ? (
                                <div className="bg-green-50 border border-green-100 text-green-800 rounded-xl p-6 flex items-start gap-4">
                                    <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-medium text-lg mb-1">Message Sent Successfully!</h3>
                                        <p>Thank you for reaching out. One of our team members will contact you shortly.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm">
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium mb-1">
                                            Inquiry Type
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="product">Product Information</option>
                                            <option value="order">Order Support</option>
                                            <option value="artisan">Artisan Partnership</option>
                                            <option value="electronics">Electronics Support</option>
                                            <option value="business">Business Development</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Your message here..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Map */}
                        <div className="order-1 lg:order-2">
                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-serif mb-2">Visit Our Store</h2>
                                <p className="text-neutral-600">
                                    Explore our products in person at our flagship store in Nairobi.
                                </p>
                            </div>

                            <div ref={mapRef} className="h-96 bg-neutral-200 rounded-xl overflow-hidden shadow-sm">
                                {/* This would be replaced with an actual map component */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176241298815!2d36.81663!3d-1.284349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d21f938fd1%3A0xdce528b055580c59!2sKenyatta%20Ave%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1621331346289!5m2!1sen!2ske"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Naswasoko store location"
                                ></iframe>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-serif mb-2">Frequently Asked Questions</h2>
                        <p className="text-neutral-600">
                            Find quick answers to common questions about our products, shipping, and more.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-neutral-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                                >
                                    <span className="font-medium">{item.question}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-primary transition-transform ${activeAccordion === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${activeAccordion === index
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-5 pt-0 text-neutral-600 bg-neutral-50">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Categories */}
            <section className="py-16 bg-neutral-900 text-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-serif mb-2">Specialized Support</h2>
                        <p className="text-white/80">
                            Get help from teams dedicated to specific areas of our business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                <MessageSquare size={20} className="text-primary-light" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">Customer Support</h3>
                            <p className="text-white/80 mb-4">
                                Get help with orders, returns, product questions, and general assistance.
                            </p>
                            <a
                                href="mailto:support@naswasoko.co.ke"
                                className="text-primary-light hover:underline flex items-center gap-1"
                            >
                                support@naswasoko.co.ke
                            </a>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                <Users size={20} className="text-primary-light" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">Artisan Relations</h3>
                            <p className="text-white/80 mb-4">
                                Information for artisans looking to join our marketplace or existing partners.
                            </p>
                            <a
                                href="mailto:artisans@naswasoko.co.ke"
                                className="text-primary-light hover:underline flex items-center gap-1"
                            >
                                artisans@naswasoko.co.ke
                            </a>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                <ShoppingBag size={20} className="text-primary-light" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">Electronics Support</h3>
                            <p className="text-white/80 mb-4">
                                Technical assistance, warranty information, and help with electronic products.
                            </p>
                            <a
                                href="mailto:electronics@naswasoko.co.ke"
                                className="text-primary-light hover:underline flex items-center gap-1"
                            >
                                electronics@naswasoko.co.ke
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;