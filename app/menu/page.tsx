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
    <div className='antialiased relative w-full min-h-screen flex items-center justify-center bg-primary px-4 sm:px-8 md:px-16 lg:px-28 py-8'>
      <div className='absolute inset-0 w-full h-full bg-cover bg-center bg-fixed opacity-40' style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
      <div className="w-full h-full left-0 flex flex-col items-center justify-center z-10 mt-16">
        <h1 className="text-white font-ragas text-6xl md:text-7xl">Our Menu</h1>
        <p className="text-white/50 font-poppin text-lg mb-8">Explore our delicious pizzas and more!</p>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="animate-spin rounded-full border-8 border-t-tomato border-b-gray-300 border-l-gray-300 border-r-tomato h-24 w-24 mb-6 shadow-lg bg-white/10 flex items-center justify-center">
              <span className="text-tomato text-5xl">
                <Pizza />
              </span>
            </div>
            
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-white/80 font-poppins text-2xl mb-4 flex items-center gap-2"><span className="text-tomato"><Pizza/></span> Pizza Collection</h1>
              {data && <PizzaList pizzas={data.pizzas} />}
            </div>
            <div className="mt-12">
              <h1 className="text-white/80 font-poppins text-2xl mb-4 flex items-center gap-2"><span className="text-tomato"><Dessert/></span> Dessert Collection</h1>
              {data && <ItemList items={data.desserts} />}
            </div>
            <div className="mt-12">
              <h1 className="text-white/80 font-poppins text-2xl mb-4 flex items-center gap-2"><span className="text-tomato"><CupSodaIcon/></span> Beverages Collection</h1>
              {data && <ItemList items={data.beverages} />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Menu