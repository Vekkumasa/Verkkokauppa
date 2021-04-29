import mongoose from 'mongoose';
import { Product, User } from '../types';
export interface ShoppingCartInterface extends mongoose.Document {
  totalPrice: number;
  products: Product[];
  user: User;
  _id?: string;
}

const ShoppingCartSchema: mongoose.Schema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},
{
  toJSON: {
    transform: (_document: mongoose.Document, returnedObject: ShoppingCartInterface) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
  toObject: {
    transform: (_document: mongoose.Document, returnedObject: ShoppingCartInterface) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  }
});

const ShoppingCart = mongoose.model<ShoppingCartInterface>("ShoppingCart", ShoppingCartSchema);
export default ShoppingCart;