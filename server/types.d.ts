import { Request } from 'express';

type ProductImage = {
  image: Image
};

type Image = {
  data: Buffer,
  contentType: string
};

export type Tag = 'Kirves' | 'Mokki Essential' | 'Ruoka/Juoma' | 'muut';

type Product = {
  _id: string,
  name: string,
  price: number,
  stock: number,
  description?: string,
  image?: Image,
  ratings: number[],
  tags: Tag[],
};

type ShoppingCartProduct = {
  _id: string,
  name: string,
  quantity: number,
  image: Image,
  price: number
};

type ShoppingCartProductDB = {
  productId: string,
  name: string,
  quantity: number,
  image: Image,
  price: number
};

type NewShoppingCart = {
  products: ShoppingCartProduct[],
  user: string,
};

type User = {
  _id: string,
  token?: string,
  email: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  userType: string,
  avatar?: Image,
};

type Credentials = {
  _id: string,
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  userType: UserType,
  avatar?: Image,
  ratings?: Product[],
  recentActivity: Date[],
  platformInfo: string[],
};

type CartProduct = {
  userId: string,
  product: ShoppingCartProduct,
  cartId: string,
};

type LoginInfo = {
  username: string,
  password: string,
  platformInfo: string,
};

type ShoppingCart = {
  _id: string,
  products: Product[],
  user: string,
  totalPrice: number
};

type UserType = 'Admin' | 'User';

type Email = {
  from: string,
  to: string,
  subject: string,
  text: string,
};

type CustomBoolean = {
  data: boolean
};
interface CustomRequest<T> extends Request {
  body: T
}