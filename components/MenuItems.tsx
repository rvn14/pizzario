import { ItemCard } from "./ItemCard";
import { PizzaCard } from "./PizzaCard";



// --- Types ---
interface Pizza {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: { priceReg: number; priceLg: number };
  image: string;
}
interface Item {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

// --- Pizza List ---
export const PizzaList: React.FC<{ pizzas: Pizza[] }> = ({ pizzas }) => (
  <div>
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center">
      {pizzas.map((pizza, index) => (
        <PizzaCard key={index} pizza={pizza} />
      ))}
    </div>
  </div>
);

// --- Dessert/Beverage List ---
export const ItemList: React.FC<{ items: Item[]; type?: "dessert" | "beverage" }> = ({
  items,
  type = "dessert",
}) => (
  <div>
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 justify-items-center">
      {items.map((item, index) => (
        <ItemCard key={index} item={item} type={type} />
      ))}
    </div>
  </div>
);



export type { Pizza, Item };
