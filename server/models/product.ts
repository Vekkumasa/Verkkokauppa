/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from "mongoose";

export interface ProductInterface extends mongoose.Document {
  name: string;
  stock: number;
  price: number;
  description?: string;
  image?: string;
}

const ProductSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }
},
{
  toJSON: {
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
  toObject: {
    versionKey: false,
  }
}
);

const Product = mongoose.model<ProductInterface>("Product", ProductSchema);
export default Product;