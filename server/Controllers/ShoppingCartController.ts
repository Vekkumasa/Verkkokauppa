import { uuid } from "uuidv4";
import Product from "../models/product";
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
import User from "../models/user";
import { CartProduct } from '../types';

const GetAllCarts = async (): Promise<ShoppingCartInterface[]> => {
  return await ShoppingCart.find({});
};

const AddProductToCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const userId = cartProduct.userId;
    const user = await User.findById(userId);
    const product = await Product.findById(cartProduct.productId);
    let cart = await ShoppingCart.findOne({ user: userId });

    if (!user || !product) {
      return null;
    }

    if (!cart) {
      cart = new ShoppingCart({
        id: uuid(),
        products: [],
        user: userId,
        totalPrice: 0
      });
    }

    cart.products.push(product.id);
    cart.totalPrice += product.price;
    void cart.save();

    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  GetAllCarts,
  AddProductToCart,
};