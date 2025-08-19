"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { ItemList, PizzaList } from '@/components/MenuItems';
import { CupSodaIcon, Dessert, Pizza } from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { CartSheet } from "@/components/CartTable";


const Menu = () => {
  interface Pizza {
    _id: string;
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
  

  const [data, setData] = useState<{ pizzas: Pizza[], desserts: Item[], beverages: Item[]  } | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("api/menu/get");
        if (res.status === 200) {
          setData(res.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

    
      
      

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-24 ">
        {<Navbar />}
        <div className='fixed bottom-10 right-10 z-40'>
           <CartSheet />
        </div>
      <div className='fixed inset-0 overflow-hidden mix-blend-screen select-none pointer-events-none'>
          <Image src="/images/bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="object-cover opacity-30" />
      </div>
      
      <div className="relative w-full max-w-6xl z-10 flex flex-col items-center justify-center">
          <div className="max-w-lg mx-auto text-center text-wood-100 select-none mt-8">
            <h2 className="text-4xl md:text-6xl font-bold font-abriel ">OUR</h2>
              <h1 className="text-5xl md:text-8xl font-oi -rotate-3 [text-shadow:0_10px_0_theme(colors.wood.950)]">
              MENU
              </h1>
          </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full border-8 border-t-persimmon-400 border-b-zinc-800 border-l-zinc-800 border-r-persimmon-400 h-20 w-20 mb-6 shadow-lg bg-persimmon-50/10 flex items-center justify-center">
              <span className="text-persimmon-400 text-4xl">
                <Pizza />
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-12">
            <div className=" rounded-xl p-8">
              <h2 className="text-persimmon-50/90 font-clash-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="text-persimmon-400"><Pizza/></span> Pizza Collection
              </h2>
              {data && <PizzaList pizzas={data.pizzas} />}
            </div>
            <div className=" rounded-xl  p-8">
              <h2 className="text-persimmon-50/90 font-clash-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="text-persimmon-400"><Dessert/></span> Dessert Collection
              </h2>
              {data && <ItemList items={data.desserts} />}
            </div>
            <div className="rounded-xl  p-8">
              <h2 className="text-persimmon-50/90 font-clash-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="text-persimmon-400"><CupSodaIcon/></span> Beverages Collection
              </h2>
              {data && <ItemList items={data.beverages} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu