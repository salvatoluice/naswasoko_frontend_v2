import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCheckout } from '../../hooks/useCheckout';
import type { ShippingAddress } from '../../types/order';

const CheckoutForm = () => {
    const { setShippingAddress } = useCheckout();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddress>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            county: '',
            postalCode: '',
            phone: '',
            email: ''
        }
    });

    const onSubmit = (data: ShippingAddress) => {
        setIsSubmitting(true);
        setTimeout(() => {
            setShippingAddress(data);
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-medium">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                <input
                    id="address"
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City/Town</label>
                    <input
                        id="city"
                        type="text"
                        {...register('city', { required: 'City is required' })}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="county" className="block text-sm font-medium mb-1">County</label>
                    <select
                        id="county"
                        {...register('county', { required: 'County is required' })}
                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="">Select County</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Nakuru">Nakuru</option>
                        {/* Add other Kenyan counties */}
                    </select>
                    {errors.county && (
                        <p className="mt-1 text-sm text-red-600">{errors.county.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                    id="postalCode"
                    type="text"
                    {...register('postalCode', { required: 'Postal code is required' })}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
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
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
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
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-70"
            >
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </button>
        </form>
    );
};

export default CheckoutForm;