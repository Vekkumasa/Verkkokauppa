import { uuid } from "uuidv4";
import Product from "../models/product";
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
import { CartProduct } from '../types';

const GetAllCarts = async (): Promise<ShoppingCartInterface[]> => {
  return await ShoppingCart.find({});
};

const AddProductToCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { userId, productId, cartId } = cartProduct;
    let cart;

    if (cartId) cart = await ShoppingCart.findById(cartId);
    const product = await Product.findById(productId);
    console.log('cart', cart);
    if (!product) return null;
    if (!cart) {
      if (userId) {
        cart = new ShoppingCart({
          id: uuid(),
          products: [],
          user: userId,
          active: true,
          totalPrice: 0
        });
      } else {
        cart = new ShoppingCart({
          id: uuid(),
          products: [],
          active: true,
          totalPrice: 0
        });
      } 
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