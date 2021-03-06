import mongoose from "mongoose";
import { Image, Tag } from "../types";

export interface ProductInterface extends mongoose.Document {
  name: string;
  stock: number;
  price: number;
  ratings: number[];
  description?: string;
  image?: Image;
  _id?: string;
  tags: Tag[];
}

const ProductSchema: mongoose.Schema = new mongoose.Schema(
{
  name: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  ratings: [{ type: Number }],
  tags: [{ type: String }],
  image: {
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