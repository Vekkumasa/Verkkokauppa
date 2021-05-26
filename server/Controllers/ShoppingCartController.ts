import { v4 as uuid } from 'uuid';
import Product from '../models/product';
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
import User from '../models/user';
import { CartProduct, ShoppingCartProduct, ShoppingCartProductDB } from '../types.d';
import Mailer from '../utils/Mailer';

const getAllCarts = async (): Promise<ShoppingCartInterface[]> => {
  return await ShoppingCart.find({});
};

const getCart = async (cartId: string): Promise<ShoppingCartInterface | null> => {
  try {
    let cart;

    if (cartId) cart = await ShoppingCart.findById(cartId);   
    if (!cart) {
      return null;
    }

    return cart;
  } catch (e) {
    return null;
  }
};

const listOfProducts = async (products: ShoppingCartProduct[]) => {
  const lista: unknown[] = await Promise.all(products.map(async (item): Promise<unknown> => {
    const product = await Product.findById(item._id);
    if (product) {
      return {
        productId: product._id,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
      };
    }
    return;
  }));
  return lista;
};

const createNewShoppingCart = async (products: ShoppingCartProduct[], userId: string): Promise<ShoppingCartInterface> => {
  const totalPrice = products.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  const list = await listOfProducts(products);
  const cart = new ShoppingCart({
    id: uuid(),
    products: list,
    user: userId,
    active: true,
    completed: false,
    totalPrice
  });
  await cart.save();
  const user = await User.findById(userId);
  if (user) {
    user.shoppingCart.push(cart);
    await user.save();
  }
  console.log('create new shopping cart', products, cart);
  return cart;
};

const decreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);

    if (!cart || !product) return null;

    cart.products.map(p => {    
      if (p.productId === product._id) {
        p.quantity -= 1;
      }
    });

    cart.totalPrice -= product.price;
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const increaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);

    if (!cart || !product) return null;

    cart.products.map(p => {     
      if (p.productId === product._id) {
        p.quantity += 1;
      }
    });

    cart.totalPrice += product.price;
    await cart.save();

    return cart;
  } catch (e) {
    return null;
  }
};

const removeProductFromCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);

    if (!cart || !product || !cart.id) return null;
    let totalPriceOfRemovedObjects = 0;
    const lista = cart.products.filter(p => {
      if (p.productId === product._id) {
        totalPriceOfRemovedObjects = product.price * product.quantity;
      }
      return p.productId !== product._id;
    });

    cart.products = lista;
    cart.totalPrice -= totalPriceOfRemovedObjects;
    
    await cart.save();
    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const addNewProductToCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;

    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);
    
    console.log('add new, cart:', cart, ' product: ', product);
    if (!cart || !product || !cart._id) return null;

    const lista = cart.products.concat({ productId: product._id, name: product.name, image: product.image, price: product.price, quantity: 1 });
    cart.products = lista;
    cart.totalPrice += product.price;
    await cart.save();

    return cart;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const findUsersShoppingCart = async (userId: string):Promise<ShoppingCartInterface | null> => {
  try {
    const cart = await ShoppingCart.findOne({ user: userId, completed: false });
    if (!cart) return null;
    
    return cart;
  } catch (e) {
    return null;
  }
};

const removeShoppingCart = async (userId: string): Promise<ShoppingCartInterface | null> => {
  try {
    const cart = await ShoppingCart.findOneAndDelete({ user: userId, active: false, completed: false });
    if (!cart) return null;
    return cart;
  } catch (e) {
    return null;
  }
};

const setActivity = async (cartId: string, data: boolean):Promise<ShoppingCartInterface | null> => {
  try {
    const cart = await ShoppingCart.findByIdAndUpdate(cartId, { active: data }, { new: true });
    if (!cart) return null;
    console.log('(shopping cart controller) setActivity cart:', cart);
    return cart;
  } catch (e) {
    return null;
  }
};

const setCompleted = async (cartId: string):Promise<ShoppingCartInterface | null> => {
  try {
    const cart = await ShoppingCart.findByIdAndUpdate(cartId, { completed: true, active: false, completionDate: new Date }, { new: true });
    if (!cart) return null;
    console.log('(Shopping cart controller) setCompleted cart', cart, cart.user);
    
    if (cart.user) {
      const user = await User.findById(cart.user);
      if (user) {
        sendMailToUser(user.email, cart.products);
      }
    }
    
    return cart;
  } catch (e) {
    return null;
  }
};

const sendMailToUser = (to: string, products: ShoppingCartProductDB[]) => {

  let shoppingList = '';
  products.map(p => {
    shoppingList += p.name + '\n';
  });

  const message = {
    from: 'verkkisposti@gmail.com',
    to,
    subject: 'Confirmation message',
    text: 'You have ordered these products from verkkokauppa: \n ' + shoppingList
  };
  Mailer(message);
};

export default {
  getAllCarts,
  addNewProductToCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  createNewShoppingCart,
  removeProductFromCart,
  findUsersShoppingCart,
  removeShoppingCart,
  setActivity,
  setCompleted,
};