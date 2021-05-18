import mongoose from 'mongoose';
import { ShoppingCartProductDB } from '../types.d';
export interface ShoppingCartInterface extends mongoose.Document {
  totalPrice: number;
  products: ShoppingCartProductDB[];
  active: boolean;
  completed: boolean;
  user?: string;
  _id?: string;
}

const ShoppingCartSchema: mongoose.Schema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  products: [
    {
      productId: String,
      name: String,
      image: String,
      quantity: Number,
      price: Number
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, required: true },
  completed: { type: Boolean, required: true }
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