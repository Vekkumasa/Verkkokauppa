import mongoose from 'mongoose';
import { Product } from '../types';
export interface ShoppingCartInterface extends mongoose.Document {
  totalPrice: number;
  products: Product[];
  active: boolean;
  user?: string;
  _id?: string;
}

const ShoppingCartSchema: mongoose.Schema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, required: true }
},
{
  toJSON: {
    transform: (_document: mongoose.Document, returnedObject: ShoppingCartInterface) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const ShoppingCart = mongoose.model<ShoppingCartInterface>("ShoppingCart", ShoppingCartSchema);
export default ShoppingCart;