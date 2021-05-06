import mongoose from "mongoose";

export interface ShoppingCartProductInterface extends mongoose.Document {
  name: string;
  price: number;
  quantity: number;
  productId: string;
  shoppingCartId: string;
  _id?: string;
}

const ShoppingCartProductSchema: mongoose.Schema = new mongoose.Schema(
{
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  shoppingCartId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart', required: true },
},
{
  toJSON: {
    transform: (_document, returnedObject: ShoppingCartProductInterface) => {
      returnedObject.id = returnedObject._id?.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const ShoppingCartProduct = mongoose.model<ShoppingCartProductInterface>("ShoppingCartProduct", ShoppingCartProductSchema);
export default ShoppingCartProduct;