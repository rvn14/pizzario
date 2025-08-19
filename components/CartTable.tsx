"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/cartStore"
import { Minus, Plus, ShoppingCartIcon, Trash } from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "./ui/scroll-area"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { toast } from "sonner"


export function CartSheet() {
    const carStore = useCartStore()
    const items = carStore.items;
    const router = useRouter();
    const sheetCloseRef = useRef<HTMLButtonElement>(null);

    //update quantity
    const add = (id: string) => {
        carStore.updateItemQuantity(id, 1);
    }
    const remove = (id: string) => {
        carStore.updateItemQuantity(id, -1);
    }
    

    const removeItem = (id: string) => {
        carStore.removeItem(id);
    }

    //calculacte subtotal for each item
    const calculateSubtotal = (item: { price?: number, quantity?: number }) => {
        return (item.price || 0) * (item.quantity || 1);
    }
    // Calculate total price
    const totalPrice = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

    //handle checkout
    const handleCheckout = async () => {
        //check if items are present
        if (items.length === 0) {
            toast("Your cart is empty. Please add items to your cart before proceeding to checkout.");
            return;
        }

        // Proceed with checkout logic, e.g., redirect to payment page or show confirmation
        router.push('/checkout');
        //close the cart sheet
        if (sheetCloseRef.current) {
            sheetCloseRef.current.click();
        }
    }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button asChild variant="ghost" className="fixed bottom-0 bg-crown-700 text-crown-100 hover:text-crown-100 w-6 h-6 !p-6 hover:bg-crown-700/90 border-0 rounded-full cursor-pointer">
          <div className="relative">
            <ShoppingCartIcon className="w-6 h-6" />
            {items.length > 0 && <div className="red-dot z-20 absolute top-0 -right-1 w-3 h-3 rounded-full"></div>}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[350px] max-w-[400px] p-0 flex flex-col bg-cocoa-100 shadow-2xl border border-cocoa-800 rounded-2xl z-90">
        <SheetHeader className="bg-crown-700 text-crown-50 px-6 py-4 relative">
          <div className='absolute inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none z-10'>
              <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover" />
          </div>
          <SheetTitle className="text-2xl text-crown font-abriel font-bold tracking-wide ">Ordered Items</SheetTitle>
          <SheetDescription className="text-crown-50/80">Review your selected items and proceed to checkout.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 p-4 relative overflow-y-auto">

          <div className='absolute inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none z-90'>
              <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover" />
          </div>
          <ScrollArea className="h-full w-full rounded-md">
          
          <div className="divide-y divide-cocoa-500">
            {items.length === 0 ? (
              <div className="py-8 text-center text-cocoa-500">Your cart is empty.</div>
            ) : (
              items.map((item, idx) => (
                <div key={ idx} className="flex items-center p-3 bg-cocoa-950">
                  <Image src={item.image || "/images/pizzas/margherita.jpg"} alt={item.name || "Pizza"} width={48} height={48} className="rounded-lg object-cover mr-4" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-cocoa-100">{item.name} {item.size && <span className="text-sm text-cocoa-300">({item.size})</span> }</div>
                    <div className="flex items-center gap-2 text-cocoa-300 text-sm">
                      <div>
                            {/* item count */}
                            <div className='flex items-center gap-2'>
                                <Button
                                    onClick={() => remove(item.id)}
                                    className='bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center focus:ring-offset-0 cursor-pointer p-0 w-6 h-6 text-xs'
                                >
                                    <Minus className="w-3 h-3" />
                                </Button>
                                <span className='text-gray-50 text-sm font-poppin font-light'>{item.quantity}</span>
                                <Button
                                    onClick={() => add(item.id)}
                                    className='bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center focus:ring-offset-0 cursor-pointer p-0 w-6 h-6 text-xs'
                                >
                                    <Plus className="w-3 h-3" />
                                </Button>
                            </div>

                        </div>
                      <div className="text-crown-600 font-bold">${item.price?.toFixed(2) || "0.00"}</div>
                      <div> <span className="text-cocoa-400">x</span> {item.quantity}</div>
                      <div className="font-bold text-green-500">${calculateSubtotal(item).toFixed(2) || "0.00"}</div>
                    </div>
                  </div>
                    <Button 
                      variant={"ghost"}
                      size="icon" 
                      className="text-red-500 hover:text-red-700 shadow hover:bg-transparent focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      <span className=""><Trash/></span>
                    </Button>
                  
                </div>
              ))
            )}
          </div>
          </ScrollArea>
        </div>
        <div className="px-6 py-4 border-t border-gray-500 bg-crown-700 relative">
            <div className='absolute inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none z-10'>
              <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover" />
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg text-crown-100">Total</span>
            <span className="font-bold text-crown-100 text-xl">${totalPrice.toFixed(2)}</span>
          </div>
          <SheetFooter className="flex gap-2">
            <Button onClick={handleCheckout} type="button" className="flex-1 bg-crown-900 text-white hover:bg-crown-900/80 shadow focus:outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer z-20">Checkout</Button>
            <SheetClose asChild>
              <Button
                ref={sheetCloseRef}
                variant="outline"
                className="flex-1 border-cocoa-700 text-cocoa-300 hover:text-white bg-cocoa-900 hover:bg-cocoa-800 focus:ring-0 focus:ring-offset-0 cursor-pointer z-20"
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
