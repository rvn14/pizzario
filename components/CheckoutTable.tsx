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
        <Table className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
            <TableHeader>
                <TableRow className="bg-zinc-800/80">
                    <TableHead className="text-zinc-300">Image</TableHead>
                    <TableHead className="text-zinc-300">Name</TableHead>
                    <TableHead className="text-zinc-300">Size</TableHead>
                    <TableHead className="text-zinc-300">Quantity</TableHead>
                    <TableHead className="text-zinc-300">Price</TableHead>
                    <TableHead className="text-zinc-300">Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-zinc-500 py-16 text-lg">
                            <span className="opacity-80">🛒 Your cart is empty.</span>
                        </TableCell>
                    </TableRow>
                ) : (
                    items.map((item, idx) => (
                        <TableRow key={item.id || idx} className="hover:bg-zinc-800/60 transition-colors">
                            <TableCell>
                                <Image
                                    src={item.image || "/images/pizzas/margherita.jpg"}
                                    alt={item.name || "Pizza"}
                                    width={40}
                                    height={40}
                                    className="rounded-md object-cover shadow"
                                />
                            </TableCell>
                            <TableCell className="font-semibold text-white">{item.name}</TableCell>
                            <TableCell className="text-zinc-400">{item.size || "-"}</TableCell>
                            <TableCell className="text-zinc-200">{item.quantity}</TableCell>
                            <TableCell className="text-tomato font-bold">${item.price?.toFixed(2) || "0.00"}</TableCell>
                            <TableCell className="text-tomato font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            <TableFooter>
                <TableRow className="bg-zinc-800/80">
                    <TableCell colSpan={5} className="text-right font-semibold text-lg text-zinc-200">Total</TableCell>
                    <TableCell className="font-bold text-tomato text-xl">${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CheckoutTable