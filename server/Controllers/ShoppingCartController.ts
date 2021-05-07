import { v4 as uuid } from 'uuid';
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
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

    await cart.save();
    return cart;
  } catch (e) {
    return null;
  }
};

const DecreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct);

    if (!cart || !product) return null;

    cart.products.map(p => {     
      if (p._id.toString() === product._id) {
        p.quantity -= 1;
        // TODO: jos quantity 0 deletoi producti
      }
    });

    cart.totalPrice -= product.price;
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const IncreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct);

    if (!cart || !product) return null;

    cart.products.map(p => {     
      if (p._id.toString() === product._id) {
        p.quantity += 1;
      }
    });

    console.log(cart);
    cart.totalPrice += product.price;
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const UpdateProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct);

    if (!cart || !product) return null;
    console.log('before', cart.products);
    cart.products.map(p => p.name !== product.name ? p : product);
    console.log('after', cart.products);
    /*
    const quantityBefore = product.quantity;
    let quantityAfter = -5;
    console.log('ennen',product, cart);
    cart.products.map(p => {     
      if (p._id.toString() === product._id) {
        console.log('HEPHEPHEPHEPHEPHEPHEP');
        quantityAfter = p.quantity;
        return product;
      } else {
        return p;
      }
    });

    if (quantityAfter < quantityBefore) {
      cart.totalPrice -= product.price;
    } else {
      cart.totalPrice += product.price;
    }
    console.log('jalkeen', quantityAfter , cart);
    */
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const AddNewProductToCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;

    const cart: ShoppingCartInterface | null = await getCart(cartProduct);
    
    if (!cart || !product || !cart.id) return null;

    const cartId = StringParser(cart.id);

    const lista = cart.products.concat({ _id: product._id, name: product.name, price: product.price, quantity: 1 });
    const karry = await ShoppingCart.findByIdAndUpdate(cartId, { products: lista }, { new: true });
    console.log('Addnewproducttocart', karry);
    cart.totalPrice += product.price;
    await cart.save();

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
  UpdateProductQuantity,
};