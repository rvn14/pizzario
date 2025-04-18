"use client"
import { useState } from 'react';
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const MenuCard = () => {
    const [selected, setSelected] = useState("regular");

  

  return (
    <div className='item-card'>
        <div className='grid grid-rows-2 h-[600px] w-[300px] justify-items-center rounded-2xl overflow-hidden bg-[#131313]'>
                  <div className='overflow-hidden'>
                    <div className='bg-red-600 w-[300px] h-[300px] hover:scale-105 transition duration-200 ease-in'></div>
                  </div>
                  <div className='flex flex-col justify-center gap-2 px-8 w-full'>
                    <h1 className='text-gray-50 text-2xl font-chunkfive'>Hot & Spicy Chicken pizza</h1>
                    <p className='text-gray-50 text-md font-poppin font-light'>Spicy chicken, onions, green peppers, jalapenos, hot sauce...</p>
                    <h1 className='text-gray-50 text-2xl font-chunkfive'>{selected=="regular"? "$8.99":"$15.99" }</h1>
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
                        
                      
                    <Button className='bg-tomato hover:bg-tomato/80 w-full h-10 rounded-md text-lg outline-0 mt-2 cursor-pointer transition duration-100 ease-in'>Order Now</Button>
                  </div>
              </div>
    </div>
  )
}

export default MenuCard