import mongoose, { Schema } from "mongoose";

const pizzaSchema = new Schema({
  name: String,
  description: String,
  category: String,
  price: {
    priceReg: Number,
    priceLg: Number,
  },
  image: String,
});

const PizzaModel = mongoose.models.Pizza || mongoose.model("Pizza", pizzaSchema, "pizzas");
export default PizzaModel;
export type Pizza = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: {
    priceReg: number;
    priceLg: number;
  };
  image: string;
};