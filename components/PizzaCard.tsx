/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/cartStore";
import { Minus, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Pizza {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: { priceReg: number; priceLg: number };
  image: string;
}

export const PizzaCard: React.FC<{ pizza: Pizza }> =  ({ pizza }) => {
  const [selected, setSelected] = useState("regular");
  const [quantity, setQuantity] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cartStore = useCartStore();
  const item = cartStore.items.find((item) => item.id === pizza._id && item.size === selected);

  const add = () => {
    setQuantity(quantity + 1);
  };

  const remove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getPrice = () => {
    if (selected === "regular") {
      return pizza.price.priceReg * quantity;
    } else if (selected === "large") {
      return pizza.price.priceLg * quantity;
    }
    return 0; // Default case, should not happen
  };

  const handleOrder = async () => {
    // Logic to handle order placement
    console.log(
      `Ordering  ${quantity} ${pizza.name} (${selected}) for $${getPrice().toFixed(
        2
      )}`
    );
    //check if pizza is already in cart
    const existingItem = cartStore.items.find((item) => item.id === pizza._id && item.size === selected);
    if (existingItem) {
      console.log("Item already in cart:", existingItem);
      
      // If it exists, update the quantity
      
      cartStore.updateItemQuantity(pizza._id, quantity);
      
      return;
    }

    // Add item to cart
    console.log("Adding item to cart:", {
      id: pizza._id,
      name: pizza.name,
      price: getPrice(),
      quantity: quantity,
      image: pizza.image,
      size: selected,
    });

    cartStore.addItem({
      id: pizza._id,
      name: pizza.name,
      price: getPrice(),
      quantity: quantity,
      image: pizza.image,
      size: selected,
    });
  };

  return (
    <div className="item-card">
      <div className="grid w-[160px] sm:w-[220px] md:w-[250px] justify-items-center rounded-2xl overflow-hidden bg-[#131313]">
        <div className="overflow-hidden relative">
          {!imgLoaded && (
            <Skeleton className="w-[250px] h-[250px] absolute top-0 left-0 z-10" />
          )}
          <Image
            src={pizza && pizza.image}
            alt="Pizza"
            width={250}
            height={250}
            className={`object-cover h-full w-full transition duration-300 ease-in-out transform hover:scale-105 ${
              imgLoaded ? "" : "invisible"
            }`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>
        <div className="flex flex-col justify-center gap-2 px-6 py-1 pb-6 w-full">
          <h1 className="text-gray-50 text-lg line-clamp-1 font-semibold font-inter">
            {pizza && pizza.name}
          </h1>
          <p className="text-gray-50 text-sm font-poppin font-light line-clamp-2">
            {pizza && pizza.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-50 text-xl font-chunkfive">
                {getPrice() > 0 ? `$${getPrice().toFixed(2)}` : "Free"}
              </h1>
            </div>
            <div>
              {/* item count */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={remove}
                  className="bg-crown-50/10 hover:bg-crown-50/20 text-crown-50 rounded-full text-sm flex items-center justify-center cursor-pointer w-8 h-8 p-0"
                  style={{ minWidth: "2rem", minHeight: "2rem" }}
                >
                  {" "}
                  <Minus className="w-3 h-3" />{" "}
                </Button>
                <span className="text-gray-50 text-sm font-poppin font-light">
                  {quantity}
                </span>
                <Button
                  onClick={add}
                  className="bg-crown-50/10 hover:bg-crown-50/20 text-crown-50 rounded-full text-sm flex items-center justify-center cursor-pointer w-8 h-8 p-0"
                  style={{ minWidth: "2rem", minHeight: "2rem" }}
                >
                  {" "}
                  <Plus className="w-3 h-3" />{" "}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Select
              onValueChange={(value) => setSelected(value)}
              defaultValue="regular"
            >
              <SelectTrigger className="w-full text-crown-50 focus:outline-none focus:ring-0 border-2 border-gray-500 rounded-md h-10">
                <SelectValue placeholder="Regular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleOrder}
            className="bg-crown-500 hover:bg-crown-500/80 w-full rounded-md text-md outline-0 mt-2 cursor-pointer transition duration-100 ease-in"
          >
            {item?.quantity ? `Add More (${item?.quantity})` : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};
