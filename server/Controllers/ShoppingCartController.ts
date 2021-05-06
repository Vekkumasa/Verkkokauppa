import { v4 as uuid } from 'uuid';
import Product from "../models/product";
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
import ShoppingCartProduct from "../models/shoppingCartProduct";
import { CartProduct } from '../types';
import { StringParser } from '../utils/StringCheck';

const GetAllCarts = async (): Promise<ShoppingCartInterface[]> => {
  return await ShoppingCart.find({});
};

const getCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { userId, cartId } = cartProduct;
    let cart;

    if (cartId) cart = await ShoppingCart.findById(cartId);   
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

    return cart;
  } catch (e) {
    return null;
  }
};

const DecreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { productId } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct);
    const product = await Product.findById(productId);

    if (!cart || !product) return null;
    const cartId = StringParser(cart.id);
    const shoppingCartProduct = await ShoppingCartProduct.findOne({ productId: productId, shoppingCartId: cartId });
    if (!shoppingCartProduct) return null;
    shoppingCartProduct.quantity -= 1;
    cart.totalPrice -= shoppingCartProduct.price;

    await shoppingCartProduct.save();
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const IncreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { productId } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct);
    const product = await Product.findById(productId);

    if (!cart || !product) return null;
    const cartId = StringParser(cart.id);
    const shoppingCartProduct = await ShoppingCartProduct.findOne({ productId: productId, shoppingCartId: cartId });

    if (!shoppingCartProduct) return null;

    shoppingCartProduct.quantity += 1;    
    cart.totalPrice += shoppingCartProduct.price;

    await shoppingCartProduct.save();
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const AddNewProductToCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { productId } = cartProduct;

    const cart: ShoppingCartInterface | null = await getCart(cartProduct);
    
    const product = await Product.findById(productId);
    
    if (!cart || !product || !cart.id) return null;

    const cartId = StringParser(cart.id);
    const shoppingCartProduct = new ShoppingCartProduct({
      id: uuid(),
      name: product.name,
      price: product.price,
      quantity: 1,
      productId: productId,
      shoppingCartId: cartId
    });

    console.log('addproduct:', shoppingCartProduct);
    await shoppingCartProduct.save();
    cart.products.push(shoppingCartProduct.id);
    cart.totalPrice += product.price;
    await cart.save();

    console.log('CART', cart);
    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  GetAllCarts,
  AddNewProductToCart,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
};