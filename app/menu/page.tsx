"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { ItemList, PizzaList } from '@/components/MenuItems';
import { CupSodaIcon, Dessert, Pizza } from "lucide-react";


const Menu = () => {
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
  

  const [data, setData] = useState<{ pizzas: Pizza[], desserts: Item[], beverages: Item[]  } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("api/menu/get")
      if (res.status === 200) {
        setData(res.data)
        console.log("Fetched data: ", res.data)
      } else {
        console.error("Failed to fetch data")
      }
    }
    fetchData()
    
  }, [])
  

    
      
      

  return (
    <div className='antialiased relative w-full min-h-screen flex items-center justify-center bg-primary px-4 sm:px-8 md:px-16 lg:px-28 py-8'>
        <div className='fixed top-0 left-0 w-full h-full bg-cover bg-center opacity-30 z-0' style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
        <div className="w-full h-full left-0 flex flex-col items-center justify-center z-10 mt-16">
          <h1 className="text-white font-ragas text-6xl md:text-7xl">Our Menu</h1>
          <p className="text-white/50 font-poppin text-lg mb-8">Explore our delicious pizzas and more!</p>

          <div>
            <h1 className="text-white/80 font-poppins text-2xl mb-4 flex items-center gap-2"><span className="text-tomato"><Pizza/></span> Pizza Collection</h1>
            {data && <PizzaList pizzas = {data.pizzas} />}
          </div>
          <div className="mt-12">
            <h1 className="text-white/80 font-poppins text-2xl mb-4 flex items-center gap-2"><span className="text-tomato"><Dessert/></span> Dessert Collection</h1>
            {data && <ItemList items = {data.desserts} />}
          </div>
          <div className="mt-12">
            <h1 className="text-white/80 font-poppins text-2xl mb-4 flex items-center gap-2"><span className="text-tomato"><CupSodaIcon/></span> Beverages Collection</h1>
            {data && <ItemList items = {data.beverages} />}
          </div>
        </div>
         
    </div>
  )
}

export default Menu