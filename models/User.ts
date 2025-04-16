import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },          
    password: { type: String, required: true },
    cart: { type: Array, default: [] },
    cartData: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema, "users");