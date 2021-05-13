import { Request } from 'express';

type Product = {
  _id: string,
  name: string,
  price: number,
  stock: number,
  description?: string,
  image?: string
};

type ShoppingCartProduct = {
  id: string,
  name: string,
  quantity: number,
  price: number
};

type ShoppingCartProductDB = {
  productId: string,
  name: string,
  quantity: number,
  price: number
};

type NewShoppingCart = {
  products: ShoppingCartProduct[],
  userId: string,
};

type User = {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  userType: string
};

type CartProduct = {
  userId: string,
  product: ShoppingCartProduct,
  cartId: string,
};

type LoginInfo = {
  username: string,
  password: string
};

type ShoppingCart = {
  _id: string,
  products: Product[],
  user: string,
  totalPrice: number
};

type UserType = 'Admin' | 'User';

interface CustomRequest<T> extends Request {
  body: T
}

type Credentials = {
  id: string,
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  userType: UserType
};