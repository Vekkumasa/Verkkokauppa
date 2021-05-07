import mongoose from 'mongoose';
import { ShoppingCartProduct } from '../types';
export interface ShoppingCartInterface extends mongoose.Document {
  totalPrice: number;
  products: ShoppingCartProduct[];
  active: boolean;
  user?: string;
  _id?: string;
}

const ShoppingCartSchema: mongoose.Schema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  products: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number
    }
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