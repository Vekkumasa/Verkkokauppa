import { Request } from 'express';

export type Product = {
    _id: string,
    name: string,
    price: number,
    stock: number,
    description?: string,
    image?: string
};

export type User = {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  userType: string
};

export type CartProduct = {
  userId: string,
  productId: string,
  cartId: string,
};

export type LoginInfo = {
  username: string,
  password: string
};

export type ShoppingCart = {
  _id: string,
  products: Product[],
  user: string,
  totalPrice: number
};

export type UserType = 'Admin' | 'User';

export interface CustomRequest<T> extends Request {
  body: T
}

export type Credentials = {
  id: string,
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  userType: UserType
};