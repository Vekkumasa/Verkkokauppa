type Product = {
  _id: string,
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

type ShoppingCart = {
  products: ShoppingCartProduct[],
  user: string,
  id: string,
  completionDate?: Date,
};

type NoIdProduct = Omit<Product, '_id'>;
type ShoppingCartProduct = Product & { quantity: number };

type User = {
  id: string,
  token?: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  email: string,
  userType?: UserType,
  avatar?: string,
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
  email: string,
  userType: UserType,
  avatar?: string,
  recentActivity: Date[],
  platformInfo: string[],
};

type CredentialsWithTimeStamp = Credentials & { timestamp: Date };

type UserType = 'Admin' | 'User';

type NotificationType = 'success' | 'error' | 'info';

type Modal = 'LogIn' | 'CreateUser' | 'AddProduct' | 'ModifyUser';
declare module "*.jpg" {
  const content: string;
  export = content;
}