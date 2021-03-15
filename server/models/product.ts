/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose, { Schema, Document } from "mongoose";

export interface ProductInterface extends Document {
  name: string;
  stock: number;
  price: number;
  description?: string;
  image?: string;
}

const ProductSchema: Schema = new Schema({
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

const User = mongoose.model<ProductInterface>("Product", ProductSchema);
export default User;