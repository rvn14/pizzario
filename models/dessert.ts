import mongoose, { Schema } from "mongoose";

const dessertSchema = new Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
});

const DessertModel = mongoose.models.Dessert || mongoose.model("Dessert", dessertSchema, "desserts");
export default DessertModel;
export type Dessert = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
};