import { uuid } from "uuidv4";
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";

const GetAllCarts = async (): Promise<ShoppingCartInterface[]> => {
  return await ShoppingCart.find({});
};

const NewCart = async (userId: string): Promise<ShoppingCartInterface | null> => {
  try {
    const newCart = new ShoppingCart({
      id: uuid(),
      products: [],
      userId: userId,
      totalPrice: 0
    });
    console.log('controller', newCart);
    const response = newCart.save();
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  GetAllCarts,
  NewCart,
};