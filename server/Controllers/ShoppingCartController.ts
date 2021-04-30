import { uuid } from "uuidv4";
import Product from "../models/product";
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
import User from "../models/user";
import { UserId, CartProduct } from '../types';

const GetAllCarts = async (): Promise<ShoppingCartInterface[]> => {
  return await ShoppingCart.find({});
};

const NewCart = async (userId: UserId): Promise<ShoppingCartInterface | null> => {
  try {
    console.log('userid', userId, 'id', userId.id);
    const newCart = new ShoppingCart({
      id: uuid(),
      products: [],
      user: userId.id,
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

const AddProductToCart = async (cartProduct: CartProduct): Promise<null> => {
  try {
    const userId = cartProduct.userId;
    const user = await User.findById(userId);
    const product = await Product.findById(cartProduct.productId);
    let cart = await ShoppingCart.findOne({ user: userId });

    console.log('user', user);
    console.log('Product', product);
    console.log('Cart', cart);

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

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  GetAllCarts,
  NewCart,
  AddProductToCart,
};