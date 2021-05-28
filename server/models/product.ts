import mongoose from "mongoose";
import { Image } from "../types";

export interface ProductInterface extends mongoose.Document {
  name: string;
  stock: number;
  price: number;
  description?: string;
  image?: string;
  uusiImage?: Image,
  _id?: string;
}

const ProductSchema: mongoose.Schema = new mongoose.Schema(
{
  name: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  uusiImage: {
    data: Buffer,
    contentType: String
  }
},
{
  toJSON: {
    transform: (_document, returnedObject: ProductInterface) => {
      delete returnedObject.__v;
    }
  },
});

const Product = mongoose.model<ProductInterface>("Product", ProductSchema);
export default Product;