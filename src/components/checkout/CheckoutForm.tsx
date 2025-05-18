import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCheckout } from '../../hooks/useCheckout';
import type { ShippingAddress } from '../../types/order';
import {
    MapPin,
    Truck,
    ChevronRight,
    CreditCard,
    User,
    Mail,
    Phone,
    Check,
    Shield,
    Info,
    Building,
    Navigation
} from 'lucide-react';

const CheckoutForm = () => {
    const { setShippingAddress } = useCheckout();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { register, handleSubmit, formState: { errors, touchedFields, isValid } } = useForm<ShippingAddress>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            county: '',
            postalCode: '',
            phone: '',
            email: ''
        },
        mode: 'onChange'
    });

    const onSubmit = (data: ShippingAddress) => {
        setIsSubmitting(true);
        setTimeout(() => {
            setShippingAddress(data);
            setIsSubmitting(false);
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);
        }, 800);
    };

    const getInputClassName = (fieldName: keyof ShippingAddress) => {
        const baseClasses = "w-full px-4 py-3.5 rounded-xl border bg-white transition-all duration-200 focus:outline-none";

        if (errors[fieldName]) {
            return `${baseClasses} border-red-300 focus:ring-2 focus:ring-red-200 text-red-900 bg-red-50`;
        }

        if (touchedFields[fieldName]) {
            return `${baseClasses} border-green-300 focus:ring-2 focus:ring-primary/20 text-neutral-900`;
        }

        return `${baseClasses} border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-900`;
    };

    return (
        <div className="relative bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <div className="mb-8">
                <div className="flex items-center justify-between max-w-sm mx-auto relative">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-neutral-200 -z-10"></div>

                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm mb-1.5 font-medium shadow-sm shadow-primary/20">
                            <User size={15} />
                        </div>
                        <span className="text-xs font-medium text-primary">Information</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm mb-1.5 font-medium">
                            <Truck size={15} />
                        </div>
                        <span className="text-xs text-neutral-500">Shipping</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm mb-1.5 font-medium">
                            <CreditCard size={15} />
                        </div>
                        <span className="text-xs text-neutral-500">Payment</span>
                    </div>
                </div>
            </div>

            {showSuccessMessage ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-start gap-4 mb-6 animate-fadeIn">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full">
                        <Check size={18} />
                    </div>
                    <div>
                        <h3 className="font-medium text-green-800 mb-1">Shipping information saved!</h3>
                        <p className="text-sm text-green-700">Proceeding to payment method selection...</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-primary" />
                        <h2 className="text-xl font-medium">Shipping Information</h2>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                            <Shield size={16} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-800 font-medium">Secure Checkout</p>
                            <p className="text-xs text-blue-600 mt-0.5">Your information is encrypted and never shared with third parties</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                            <User size={16} className="text-neutral-500" />
                            <h3 className="font-medium text-neutral-800">Personal Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-1.5 text-neutral-700">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    {...register('firstName', { required: 'First name is required' })}
                                    className={getInputClassName('firstName')}
                                />
                                {errors.firstName && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <Info size={14} />
                                        <span>{errors.firstName.message}</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-1.5 text-neutral-700">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    {...register('lastName', { required: 'Last name is required' })}
                                    className={getInputClassName('lastName')}
                                />
                                {errors.lastName && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <Info size={14} />
                                        <span>{errors.lastName.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-neutral-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                        className={`${getInputClassName('email')} pl-10`}
                                        placeholder="example@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <Info size={14} />
                                        <span>{errors.email.message}</span>
                                    </p>
                                )}
                                <p className="mt-1.5 text-xs text-neutral-500">
                                    We'll send your receipt and order updates to this email
                                </p>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-neutral-700">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                                        <Phone size={16} />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^(07|01)[0-9]{8}$/,
                                                message: 'Please enter a valid Kenyan phone number'
                                            }
                                        })}
                                        placeholder="07XXXXXXXX"
                                        className={`${getInputClassName('phone')} pl-10`}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <Info size={14} />
                                        <span>{errors.phone.message}</span>
                                    </p>
                                )}
                                <p className="mt-1.5 text-xs text-neutral-500">
                                    For delivery updates and shipping notifications
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                            <MapPin size={16} className="text-neutral-500" />
                            <h3 className="font-medium text-neutral-800">Delivery Address</h3>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-1.5 text-neutral-700">Street Address</label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                                    <Building size={16} />
                                </div>
                                <input
                                    id="address"
                                    type="text"
                                    {...register('address', { required: 'Address is required' })}
                                    className={`${getInputClassName('address')} pl-10`}
                                    placeholder="Building, street, apartment, or floor"
                                />
                            </div>
                            {errors.address && (
                                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                    <Info size={14} />
                                    <span>{errors.address.message}</span>
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium mb-1.5 text-neutral-700">City/Town</label>
                                <div className="relative">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                                        <Navigation size={16} />
                                    </div>
                                    <input
                                        id="city"
                                        type="text"
                                        {...register('city', { required: 'City is required' })}
                                        className={`${getInputClassName('city')} pl-10`}
                                    />
                                </div>
                                {errors.city && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <Info size={14} />
                                        <span>{errors.city.message}</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="county" className="block text-sm font-medium mb-1.5 text-neutral-700">County</label>
                                <select
                                    id="county"
                                    {...register('county', { required: 'County is required' })}
                                    className={getInputClassName('county')}
                                >
                                    <option value="">Select County</option>
                                    <option value="Nairobi">Nairobi</option>
                                    <option value="Mombasa">Mombasa</option>
                                    <option value="Kisumu">Kisumu</option>
                                    <option value="Nakuru">Nakuru</option>
                                    <option value="Kiambu">Kiambu</option>
                                    <option value="Uasin Gishu">Uasin Gishu</option>
                                    <option value="Machakos">Machakos</option>
                                    <option value="Kajiado">Kajiado</option>
                                    {/* Add other Kenyan counties */}
                                </select>
                                {errors.county && (
                                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                        <Info size={14} />
                                        <span>{errors.county.message}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium mb-1.5 text-neutral-700">Postal Code</label>
                            <input
                                id="postalCode"
                                type="text"
                                {...register('postalCode', { required: 'Postal code is required' })}
                                className={getInputClassName('postalCode')}
                            />
                            {errors.postalCode && (
                                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                                    <Info size={14} />
                                    <span>{errors.postalCode.message}</span>
                                </p>
                            )}
                        </div>

                        {/* Delivery notes */}
                        <div>
                            <label htmlFor="deliveryNotes" className="block text-sm font-medium mb-1.5 text-neutral-700">
                                Delivery Instructions <span className="text-neutral-500 font-normal">(Optional)</span>
                            </label>
                            <textarea
                                id="deliveryNotes"
                                rows={2}
                                placeholder="Special instructions for delivery, landmarks, or gate codes"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="flex items-center mb-5">
                            <input
                                id="installation"
                                type="checkbox"
                                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="installation" className="ml-2 text-sm text-neutral-700">
                                Request installation service for eligible appliances (+KSh 2,500)
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="old-appliance"
                                type="checkbox"
                                className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="old-appliance" className="ml-2 text-sm text-neutral-700">
                                Schedule pickup of old appliances for recycling
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark disabled:opacity-70 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 transition-colors"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>Continue to Shipping</span>
                                <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            )}

            <div className="mt-8 flex items-center justify-center gap-1 text-xs text-neutral-500">
                <Shield size={14} />
                <span>Your personal data is protected with 256-bit encryption</span>
            </div>
        </div>
    );
};

export default CheckoutForm;