type Product = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  description?: string
};

type CartProduct = {
  userId: string,
  product: ShoppingCartProduct,
  cartId: string,
};

type NoIdProduct = Omit<Product, 'id'>;
type ShoppingCartProduct = Product & {quantity: number};

type User = {
  id: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  email: string,
  userType: UserType
};

type ShippingInfo = {
  firstName: string,
  lastName: string,
  address: string,
};

type NoIdUser = Omit<User, 'id'>;
type CreateUserInput = Omit<NoIdUser, 'userType'>;

interface SignInInfo {
  userName: string,
  password: string,
}

type Credentials = {
  id: string,
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  userType: UserType
};

type UserType = 'Admin' | 'User';

type NotificationType = 'success' | 'error' | 'info';

declare module "*.jpg" {
  const content: string;
  export = content;
}