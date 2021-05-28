import { Request } from 'express';

type Product = {
  _id: string,
  name: string,
  price: number,
  stock: number,
  description?: string,
  image?: string,
  uusiImage?: File,
};

type ShoppingCartProduct = {
  _id: string,
  name: string,
  quantity: number,
  image: string,
  price: number
};

type ShoppingCartProductDB = {
  productId: string,
  name: string,
  quantity: number,
  image: string,
  price: number
};

type NewShoppingCart = {
  products: ShoppingCartProduct[],
  user: string,
};

type CustomBoolean = {
  data: boolean
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
  avatar?: string,
};

type Credentials = {
  _id: string,
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  userType: UserType,
  avatar?: string,
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
interface CustomRequest<T> extends Request {
  body: T
}

type ProductImage = {
  uusiImage: Image
};

type Image = {
  data: Buffer,
  contentType: string
};