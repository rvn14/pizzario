/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useCartStore } from '@/lib/cartStore'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useFormStore } from '@/lib/formStore'
import { toast } from 'sonner'

const CheckoutTable = () => {
    const cartStore = useCartStore();
    const formStore = useFormStore();
    const items = cartStore.items || [];
    const router = useRouter();

    // redirect after render to avoid "Cannot update during render" errors
    useEffect(() => {
        if ((!items || items.length === 0) && typeof window !== 'undefined') {
            router.push('/menu');
        }
    }, [items, router]);

    if (!items || items.length === 0) {
        return null;
    }

    const subtotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
    const taxes = 0.00; 
    const totalPrice = subtotal + taxes;

    const formatPrice = (n: number) => `$ ${n.toFixed(2)} USD`;

    function validateFormValues(values: any) {
        const required = ['email', 'fullName', 'address', 'city', 'zip', 'paymentMethod'];
        if (!values) return required;
        const missing = required.filter((key) => {
            const v = values[key];
            if (v === undefined || v === null) return true;
            if (typeof v === 'string' && v.trim() === '') return true;
            return false;
        });

        if (!missing.length && values.paymentMethod === 'online') {
            const cardRequired = ['cardNumber', 'expiration', 'cvc'];
            const missingCard = cardRequired.filter((key) => {
                const v = values[key];
                if (v === undefined || v === null) return true;
                if (typeof v === 'string' && v.trim() === '') return true;
                return false;
            });
            return missingCard;
        }

        return missing;
    }

    async function handlePlaceOrder() {
        
        const missing = validateFormValues(formStore.formValues);
        if (missing.length > 0) {
            toast.error(`Please complete: ${missing.join(', ')}`);
            if (typeof window !== 'undefined') router.push('/checkout');
            return;
        }

        const orderData = {
            items,
            subtotal,
            taxes,
            totalPrice,
            formValues: formStore.formValues
        };
        
        try {
            
            if (formStore.formValues.paymentMethod === 'online') {
                alert('Online payment is not implemented yet. Please select Cash on Delivery.');
                return;
            }

            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                console.log('Order placed and email sent successfully');
                toast.success('Order placed successfully! A confirmation email has been sent.');
                cartStore.clearCart();
                formStore.setFormValues({
                    email: '',
                    fullName: '',
                    address: '',
                    street: '',
                    city: '',
                    zip: '',
                    paymentMethod: 'cod',
                    cardNumber: '',
                    expiration: '',
                    cvc: '',
                    billingSame: true,
                });
                router.push('/');
            } else {
                toast.error('Failed to place order. Please try again.');
                console.error('Failed to send order email');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <section className="space-y-6">
            {/* ITEMS IN ORDER */}
            <div className="rounded-md  overflow-hidden">
                <div className="bg-wood-900 text-wood-100 px-6 py-3 font-bold text-xl">ITEM(S) IN ORDER</div>
                <div className="bg-wood-300 p-6">
                    {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 mb-4 last:mb-0">
                            {/* image */}
                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-pink-300">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name || 'item'} width={80} height={80} className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-wood-900 font-bold">
                                        Image
                                    </div>
                                )}
                            </div>

                            {/* details */}
                            <div className="flex-1">
                                <div className="text-wood-900 font-bold uppercase">{item.name || 'Item name'}</div>
                                <div className="text-wood-900 text-sm mt-1">{item.size || ''}</div>
                                <div className="text-wood-900 text-sm mt-1">QUANTITY: {item.quantity || 1}</div>
                            </div>

                            {/* price */}
                            <div className="w-28 text-right text-wood-900 font-semibold">
                                {formatPrice((item.price || 0) * (item.quantity || 1))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="rounded-md overflow-hidden">
                <div className="bg-wood-900 text-amber-100 px-6 py-3 font-bold text-xl">ORDER SUMMARY</div>
                <div className="bg-wood-300 p-6">
                    <div className="flex justify-between mb-2 text-wood-900">
                        <div>SUBTOTAL</div>
                        <div>{formatPrice(subtotal)}</div>
                    </div>
                    <div className="flex justify-between mb-4 text-wood-900">
                        <div>TAXES</div>
                        <div>{formatPrice(taxes)}</div>
                    </div>
                    <div className="flex justify-between items-center text-wood-900 font-bold text-lg">
                        <div>TOTAL</div>
                        <div className="text-2xl">{formatPrice(totalPrice)}</div>
                    </div>
                </div>
            </div>

            
            <div>
                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-wood-300 text-wood-900 font-bold py-4 rounded-full shadow-inner hover:opacity-90 cursor-pointer"
                >
                    PLACE ORDER
                </button>
            </div>
        </section>
    )
}

export default CheckoutTable