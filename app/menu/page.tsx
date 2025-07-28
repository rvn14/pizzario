"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { ItemList, PizzaList } from '@/components/MenuItems';
import { CupSodaIcon, Dessert, Pizza } from "lucide-react";


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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900 px-4 py-12">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed opacity-30" style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
      <div className="relative w-full max-w-6xl z-10 flex flex-col items-center justify-center">
        <h1 className="text-white font-clash-semibold text-5xl md:text-6xl mb-2 drop-shadow-lg tracking-tight">Our Menu</h1>
        <p className="text-zinc-400 font-poppins text-lg mb-10 text-center">Explore our delicious pizzas and more!</p>
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full border-8 border-t-tomato border-b-zinc-800 border-l-zinc-800 border-r-tomato h-20 w-20 mb-6 shadow-lg bg-white/10 flex items-center justify-center">
              <span className="text-tomato text-4xl">
                <Pizza />
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-12">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl shadow-lg p-8">
              <h2 className="text-white/90 font-clash-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="text-tomato"><Pizza/></span> Pizza Collection
              </h2>
              {data && <PizzaList pizzas={data.pizzas} />}
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl shadow-lg p-8">
              <h2 className="text-white/90 font-clash-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="text-tomato"><Dessert/></span> Dessert Collection
              </h2>
              {data && <ItemList items={data.desserts} />}
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl shadow-lg p-8">
              <h2 className="text-white/90 font-clash-semibold text-2xl mb-4 flex items-center gap-2">
                <span className="text-tomato"><CupSodaIcon/></span> Beverages Collection
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