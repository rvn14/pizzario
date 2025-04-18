"use client"
import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  interface Pizza {
    _id: {
      $oid: string;  // MongoDB ObjectId as a string
    };
    name: string;
    description: string;
    category: string;
    price: {
      priceReg: number;  // Regular price
      priceLg: number;   // Large price
    };
    image: string;  // Image URL
  }

  interface Item {
    _id: string;  // MongoDB ObjectId as a string
    name: string;
    description: string;
    category: string;
    price: number;  // Price of the dessert
    image: string;  // Image URL
  }
  

  
  

const PizzaList: React.FC<{ pizzas: Pizza[] }> = ({ pizzas }) => {

    

    return(
        <div className=''>
            <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center'>
                {pizzas.map((pizza, index) => (
                    <PizzaCard key={index} pizza={pizza} />
                ))}
            </div>
        </div>
    )

}

const PizzaCard: React.FC<{ pizza: Pizza }> = ({ pizza }) => {
    const [selected, setSelected] = useState("regular");


  return (
    <div className='item-card'>
        <div className='grid w-[160px] sm:w-[220px] md:w-[250px] justify-items-center rounded-2xl overflow-hidden bg-[#131313]'>
                  <div className='overflow-hidden'>
                    <Image src={pizza && pizza.image} alt="Pizza" width={250} height={250} className='object-cover h-full w-full transition duration-300 ease-in-out transform hover:scale-105' />
                  </div>
                  <div className='flex flex-col justify-center gap-2 px-6 py-1 pb-6 w-full'>
                    <h1 className='text-gray-50 text-lg line-clamp-1 font-semibold font-inter'>{pizza && pizza.name}</h1>
                    <p className='text-gray-50 text-sm font-poppin font-light line-clamp-2'>{pizza && pizza.description}</p>
                    <h1 className='text-gray-50 text-xl font-chunkfive'>{selected=="regular"? `$${pizza.price.priceReg}`:`$${pizza.price.priceLg}` }</h1>
                    <div className='w-full'>
                        <Select onValueChange={(value) => setSelected(value)} defaultValue="regular">
                        <SelectTrigger className="w-full text-white focus:outline-none focus:ring-0 border-2 border-gray-500 rounded-md h-10">
                            <SelectValue placeholder="Regular" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                        
                      
                    <Button className='bg-tomato hover:bg-tomato/80 w-full rounded-md text-md outline-0 mt-2 cursor-pointer transition duration-100 ease-in'>Order Now</Button>
                  </div>
              </div>
    </div>
  )
}

const ItemList: React.FC<{ items: Item[] }> = ({ items }) => {

    

    return(
        <div className=''>
            <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center'>
                {items.map((item, index) => (
                    <ItemCard key={index} item={item} />
                ))}
            </div>
        </div>
    )

}

const ItemCard: React.FC<{item: Item}> = ({item}) => {
    return (
        <div className='itemcard'>
            <div className='grid w-[160px] sm:w-[220px] md:w-[250px] justify-items-center rounded-2xl overflow-hidden bg-[#131313]'>
                <div className='overflow-hidden'>
                    <Image src={item && item.image} alt="Pizza" width={250} height={150} className='object-cover h-full w-full transition duration-300 ease-in-out transform hover:scale-105' />
                </div>
                <div className='flex flex-col justify-center gap-2 px-6 mt-3 w-full'>
                    <h1 className='text-gray-50 text-lg line-clamp-1 font-semibold font-inter'>{item && item.name}</h1>
                    <p className='text-gray-50 text-sm font-poppin font-light line-clamp-2'>{item && item.description}</p>
                    <h1 className='text-gray-50 text-xl font-chunkfive'>${item && item.price}</h1>
                    <Button className='bg-tomato hover:bg-tomato/80 w-full rounded-md text-md outline-0 mt-2 cursor-pointer transition duration-100 ease-in'>Order Now</Button>`
                </div>
            </div>
        </div>
    )
    }



export {PizzaCard, ItemCard, PizzaList, ItemList}
export type { Pizza, Item }