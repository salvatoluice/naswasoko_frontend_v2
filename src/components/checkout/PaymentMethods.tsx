
import { useState } from 'react';
import { CheckCircle, Phone, CreditCard, Building } from 'lucide-react';
import { useCheckout } from '../../hooks/useCheckout';
import type { PaymentMethod } from '../../types/order';

const PaymentMethods = () => {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePaymentChange = (method: PaymentMethod) => {
        setPaymentMethod(method);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-medium">Payment Method</h2>

            <div className="space-y-3">
                <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'hover:bg-neutral-50'
                        }`}
                    onClick={() => handlePaymentChange('mpesa')}
                >
                    <div className="flex items-center gap-3">
                        <div className={`text-primary ${paymentMethod === 'mpesa' ? 'opacity-100' : 'opacity-0'}`}>
                            <CheckCircle size={20} />
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded">
                            <Phone size={16} />
                        </div>
                        <div>
                            <h3 className="font-medium">M-Pesa</h3>
                            <p className="text-sm text-neutral-600">Pay with M-Pesa mobile money</p>
                        </div>
                    </div>
                </div>

                <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-neutral-50'
                        }`}
                    onClick={() => handlePaymentChange('card')}
                >
                    <div className="flex items-center gap-3">
                        <div className={`text-primary ${paymentMethod === 'card' ? 'opacity-100' : 'opacity-0'}`}>
                            <CheckCircle size={20} />
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded">
                            <CreditCard size={16} />
                        </div>
                        <div>
                            <h3 className="font-medium">Credit/Debit Card</h3>
                            <p className="text-sm text-neutral-600">Pay with Visa, Mastercard, or American Express</p>
                        </div>
                    </div>
                </div>

                <div
                    className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'hover:bg-neutral-50'
                        }`}
                    onClick={() => handlePaymentChange('bank')}
                >
                    <div className="flex items-center gap-3">
                        <div className={`text-primary ${paymentMethod === 'bank' ? 'opacity-100' : 'opacity-0'}`}>
                            <CheckCircle size={20} />
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded">
                            <Building size={16} />
                        </div>
                        <div>
                            <h3 className="font-medium">Bank Transfer</h3>
                            <p className="text-sm text-neutral-600">Pay directly from your bank account</p>
                        </div>
                    </div>
                </div>
            </div>

            {paymentMethod === 'mpesa' && (
                <div className="border rounded-lg p-4 bg-neutral-50">
                    <h3 className="font-medium mb-2">M-Pesa Payment Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Click "Place Order" to proceed</li>
                        <li>You will receive an STK push on your phone</li>
                        <li>Enter your M-Pesa PIN to complete the payment</li>
                        <li>Your order will be confirmed immediately</li>
                    </ol>
                </div>
            )}

            {paymentMethod === 'card' && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                            id="cardNumber"
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
                            <input
                                id="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
                            <input
                                id="cvv"
                                type="text"
                                placeholder="000"
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === 'bank' && (
                <div className="border rounded-lg p-4 bg-neutral-50">
                    <h3 className="font-medium mb-2">Bank Transfer Information</h3>
                    <p className="text-sm text-neutral-600 mb-2">Make a transfer to the following account:</p>
                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Bank:</span> Kenya Commercial Bank</p>
                        <p><span className="font-medium">Account Name:</span> Naswasoko Ltd</p>
                        <p><span className="font-medium">Account Number:</span> 1234567890</p>
                        <p><span className="font-medium">Branch Code:</span> 01148</p>
                        <p><span className="font-medium">Reference:</span> Your Order Number</p>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-70"
            >
                {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
};

export default PaymentMethods;