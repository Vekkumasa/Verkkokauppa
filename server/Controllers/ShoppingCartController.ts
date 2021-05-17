import { v4 as uuid } from 'uuid';
import Product from '../models/product';
import ShoppingCart, { ShoppingCartInterface } from "../models/shoppingCart";
import { CartProduct, ShoppingCartProduct } from '../types.d';

const GetAllCarts = async (): Promise<ShoppingCartInterface[]> => {
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
    const product = await Product.findById(item.id);
    if (product) {
      return {
        productId: product._id,
        name: item.name,
        quantity: item.quantity,
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
    totalPrice
  });
  await cart.save();
  return cart;
};

const DecreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);

    if (!cart || !product) return null;

    cart.products.map(p => {    
      if (p.productId === product.id) {
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

const IncreaseProductQuantity = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);

    if (!cart || !product) return null;

    console.log('product,', product);
    cart.products.map(p => {     
      if (p.productId === product.id) {
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

const RemoveProductFromCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;
    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);

    if (!cart || !product || !cart.id) return null;
    let totalPriceOfRemovedObjects = 0;
    const lista = cart.products.filter(p => {
      if (p.productId === product.id) {
        totalPriceOfRemovedObjects = product.price * product.quantity;
      }
      return p.productId !== product.id;
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

const AddNewProductToCart = async (cartProduct: CartProduct): Promise<ShoppingCartInterface | null> => {
  try {
    const { product } = cartProduct;

    const cart: ShoppingCartInterface | null = await getCart(cartProduct.cartId);
    
    if (!cart || !product || !cart.id) return null;

    const lista = cart.products.concat({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    cart.products = lista;
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
  createNewShoppingCart,
  RemoveProductFromCart,
};