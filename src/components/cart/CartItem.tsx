// src/components/cart/CartItem.tsx

import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types/cart';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    return (
        <div className="flex gap-4 py-4 border-b border-neutral-200 last:border-0">
            <div className="flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg"
                />
            </div>

            <div className="flex-1">
                <h3 className="font-medium text-neutral-900">{item.name}</h3>

                <div className="mt-1">
                    {item.discountPrice ? (
                        <div className="flex items-baseline gap-2">
                            <span className="text-primary font-medium">KSh {item.discountPrice.toLocaleString()}</span>
                            <span className="text-neutral-500 text-sm line-through">KSh {item.price.toLocaleString()}</span>
                        </div>
                    ) : (
                        <span className="font-medium">KSh {item.price.toLocaleString()}</span>
                    )}
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-neutral-500 hover:text-red-500 p-1"
                        aria-label="Remove item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
