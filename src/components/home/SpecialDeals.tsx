import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SpecialDeal {
    id: number;
    title: string;
    description: string;
    image: string;
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    link: string;
}

interface SpecialDealsSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    viewAllLink?: string;
    deals: SpecialDeal[];
}

const SpecialDeals = ({
    title = "Special Deals & Promotions",
    subtitle = "Limited Time Offers",
    description = "Take advantage of our current sales and bundle offers on popular products.",
    viewAllLink = "/promotions",
    deals
}: SpecialDealsSectionProps) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                            {subtitle}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            <span className="text-black ">{title.split(' ')[0]} </span>
                            <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-neutral-600 md:text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <Link
                        to={viewAllLink}
                        className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                        View all deals
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deals.map((deal) => (
                        <Link
                            key={deal.id}
                            to={deal.link}
                            className="group block"
                        >
                            <div className={`${deal.backgroundColor} rounded-2xl overflow-hidden transition-all hover:shadow-lg h-full`}>
                                <div className="p-8">
                                    <h3 className={`text-2xl font-bold mb-2 ${deal.textColor} `}>
                                        {deal.title}
                                    </h3>
                                    <p className="text-neutral-600  mb-6">
                                        {deal.description}
                                    </p>
                                    <button
                                        className={`px-6 py-2.5 text-white rounded-lg ${deal.buttonColor} transition-colors`}
                                    >
                                        Shop Now
                                    </button>
                                </div>
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img
                                        src={deal.image || '/api/placeholder/600/450'}
                                        alt={deal.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {deals.length === 0 && (
                    <div className="text-center py-12 bg-neutral-50  rounded-2xl">
                        <p className="text-neutral-500 ">No special deals available at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SpecialDeals;