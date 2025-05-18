import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PaymentMethods from '../components/checkout/PaymentMethods';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage = () => {
    const { cart } = useCart();
    const { shippingAddress, orderPlaced, placeOrder } = useCheckout();
    const [step, setStep] = useState(1);

    // Redirect if cart is empty
    if (cart.items.length === 0 && !orderPlaced) {
        return <Navigate to="/products" />;
    }

    // Redirect to order confirmation page if order is placed
    if (orderPlaced) {
        return <Navigate to="/order-confirmation" />;
    }

    useEffect(() => {
        // Move to payment step when shipping address is set
        if (shippingAddress && step === 1) {
            setStep(2);
        }
    }, [shippingAddress, step]);

    const handlePlaceOrder = async () => {
        const success = await placeOrder();
        if (success) {
            // Will be redirected to confirmation page
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-medium mb-8">Checkout</h1>

            <div className="flex justify-between mb-8">
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-neutral-200'} flex items-center justify-center`}>
                        1
                    </div>
                    <span className="ml-2 font-medium">Shipping</span>
                </div>
                <div className="h-px w-12 bg-neutral-300 self-center"></div>
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-neutral-200'} flex items-center justify-center`}>
                        2
                    </div>
                    <span className="ml-2 font-medium">Payment</span>
                </div>
                <div className="h-px w-12 bg-neutral-300 self-center"></div>
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-neutral-200'} flex items-center justify-center`}>
                        3
                    </div>
                    <span className="ml-2 font-medium">Confirmation</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {step === 1 && <CheckoutForm />}
                    {step === 2 && <PaymentMethods />}
                </div>

                <div className="md:col-span-1">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
