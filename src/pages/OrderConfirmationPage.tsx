import { Link, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCheckout } from '../hooks/useCheckout';

const OrderConfirmationPage = () => {
    const { currentOrder } = useCheckout();

    if (!currentOrder) {
        return <Navigate to="/" />;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h1 className="text-2xl font-medium mb-2">Order Confirmed!</h1>
                    <p className="text-neutral-600">
                        Your order has been placed successfully. We've sent a confirmation to your email.
                    </p>
                </div>

                <div className="border-t border-b py-4 my-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-neutral-600">Order Number</p>
                            <p className="font-medium">{currentOrder.id.substring(0, 8).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600">Date</p>
                            <p className="font-medium">
                                {new Date(currentOrder.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600">Total Amount</p>
                            <p className="font-medium">KSh {currentOrder.total.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                    {currentOrder.items.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">
                                    KSh {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-3">Shipping Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <p>
                            <span className="text-neutral-600">Name:</span>{' '}
                            {currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}
                        </p>
                        <p>
                            <span className="text-neutral-600">Phone:</span>{' '}
                            {currentOrder.shippingAddress.phone}
                        </p>
                        <p className="col-span-2">
                            <span className="text-neutral-600">Address:</span>{' '}
                            {currentOrder.shippingAddress.address}, {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.county}
                        </p>
                        <p>
                            <span className="text-neutral-600">Postal Code:</span>{' '}
                            {currentOrder.shippingAddress.postalCode}
                        </p>
                        <p>
                            <span className="text-neutral-600">Email:</span>{' '}
                            {currentOrder.shippingAddress.email}
                        </p>
                    </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-3">Payment Information</h3>
                    <p className="text-sm">
                        <span className="text-neutral-600">Payment Method:</span>{' '}
                        {currentOrder.paymentMethod === 'mpesa' ? 'M-Pesa' :
                            currentOrder.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                    </p>
                </div>

                <div className="flex justify-between py-2 border-t">
                    <span className="font-medium">Subtotal</span>
                    <span>KSh {currentOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="font-medium">Shipping</span>
                    <span>{currentOrder.shipping === 0 ? 'Free' : `KSh ${currentOrder.shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="font-medium">Tax</span>
                    <span>KSh {currentOrder.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-medium border-t">
                    <span>Total</span>
                    <span>KSh {currentOrder.total.toLocaleString()}</span>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-white rounded-lg font-medium text-center hover:bg-primary-dark"
                    >
                        Continue Shopping
                    </Link>
                    <button className="px-6 py-3 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-100">
                        Track Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;