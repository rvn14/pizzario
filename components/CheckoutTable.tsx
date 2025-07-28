"use client"
import { useCartStore } from '@/lib/cartStore'
import React from 'react'
// shadcn table components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import Image from "next/image"
import { redirect } from 'next/navigation'

const CheckoutTable = () => {

    const cartStore = useCartStore();
    const items = cartStore.items || [];

    if (!items || items.length === 0) {
        redirect('/menu')
      }

    // Calculate subtotal for each item and total price
    const totalPrice = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

    return (
        <Table className="bg-zinc-900 rounded-sm overflow-hidden shadow-2xl p-6 w-full text-lg">
            <TableHeader>
                <TableRow className="bg-zinc-800/80 hover:bg-zinc-800/80">
                    <TableHead className="text-zinc-300 text-lg py-4">Image</TableHead>
                    <TableHead className="text-zinc-300 text-lg py-4">Name</TableHead>
                    <TableHead className="text-zinc-300 text-lg py-4">Size</TableHead>
                    <TableHead className="text-zinc-300 text-lg py-4">Quantity</TableHead>
                    <TableHead className="text-zinc-300 text-lg py-4">Price</TableHead>
                    <TableHead className="text-zinc-300 text-lg py-4">Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-zinc-500 py-20 text-xl">
                            <span className="opacity-80">🛒 Your cart is empty.</span>
                        </TableCell>
                    </TableRow>
                ) : (
                    items.map((item, idx) => (
                        <TableRow key={idx} className="hover:bg-zinc-800/60 transition-colors">
                            <TableCell>
                                <Image
                                    src={item.image || "/images/pizzas/margherita.jpg"}
                                    alt={item.name || "Pizza"}
                                    width={64}
                                    height={64}
                                    placeholder='blur'
                                    className="rounded-lg object-cover shadow-lg"
                                />
                            </TableCell>
                            <TableCell className="font-semibold text-white text-lg">{item.name}</TableCell>
                            <TableCell className="text-zinc-400 text-lg">{item.size || "-"}</TableCell>
                            <TableCell className="text-zinc-200 text-lg">{item.quantity}</TableCell>
                            <TableCell className="text-tomato font-semibold text-lg">${item.price?.toFixed(2) || "0.00"}</TableCell>
                            <TableCell className="text-tomato font-semibold text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            <TableFooter>
                <TableRow className="bg-zinc-800 border-t border-zinc-800 pt-6 mt-6 hover:bg-zinc-800">
                    <TableCell colSpan={5} className="text-lg text-zinc-400 font-medium">Subtotal</TableCell>
                    <TableCell className="text-xl text-tomato font-bold">${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CheckoutTable