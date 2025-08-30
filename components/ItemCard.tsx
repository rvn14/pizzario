/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

interface Item {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const ItemCard: React.FC<{item: Item; type?: "dessert" | "beverage"}> = ({item, type}) => {
    const [quantity, setQuantity] = useState(1);
    const cartStore = useCartStore();

    const add = () => setQuantity(quantity + 1);
    const remove = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const getPrice = () => item.price * quantity;

    const cartEntry = cartStore.items.find(cartItem => cartItem.id === item._id);

    const handleOrder = () => {
        const existingItem = cartStore.items.find(cartItem => cartItem.id === item._id);
        if (existingItem) {
            // pass only the selected quantity (delta) so the store increments correctly
            cartStore.updateItemQuantity(item._id, quantity);
            return;
        }
        cartStore.addItem({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: quantity,
            image: item.image,
        });
    };

    return (
        <div className='item-card'>
            <div className='grid w-[160px] sm:w-[220px] md:w-[250px] justify-items-center rounded-2xl overflow-hidden bg-[#131313]'>
                <div className='overflow-hidden'>
                    <Image src={item && item.image} alt="Item" width={250} height={150} className='object-cover h-full w-full transition duration-300 ease-in-out transform hover:scale-105' />
                </div>
                <div className='flex flex-col justify-center gap-2 px-6 py-1 pb-6 w-full'>
                    <h1 className='text-gray-50 text-lg line-clamp-1 font-semibold font-inter'>{item && item.name}</h1>
                    <p className='text-gray-50 text-sm font-poppin font-light line-clamp-2'>{item && item.description}</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className='text-gray-50 text-xl font-chunkfive'>
                                {getPrice() > 0 ? `$${getPrice().toFixed(2)}` : "Free"}
                            </h1>
                        </div>
                        <div>
                            {/* item count */}
                            <div className='flex items-center gap-2'>
                                <Button
                                    onClick={remove}
                                    className='bg-persimmon-50/10 hover:bg-persimmon-50/20 text-persimmon-50 rounded-full flex items-center justify-center cursor-pointer w-6 h-6 p-0'
                                ><Minus className="w-3 h-3" /></Button>
                                <span className='text-gray-50 text-sm font-poppin font-light'>{quantity}</span>
                                <Button
                                    onClick={add}
                                    className='bg-persimmon-50/10 hover:bg-persimmon-50/20 text-persimmon-50 rounded-full flex items-center justify-center cursor-pointer w-6 h-6 p-0'
                                ><Plus className="w-3 h-3" /></Button>
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleOrder} className='bg-persimmon-500 hover:bg-persimmon-500/80 w-full rounded-md text-md outline-0 mt-2 cursor-pointer transition duration-100 ease-in'>
                        {cartEntry?.quantity ? `Add More (${cartEntry.quantity})` : "Order Now"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
