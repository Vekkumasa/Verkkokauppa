/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
  toObject: {
    transform: (_document, returnedObject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  }
}
);

const Product = mongoose.model<ProductInterface>("Product", ProductSchema);
export default Product;