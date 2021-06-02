type Image = {
  data: Buffer,
  contentType: string
};

type Tag = 'Kirves' | 'Mokki Essential' | 'Ruoka/Juoma' | 'muut';

type Product = {
  _id: string,
  name: string,
  price: number,
  stock: number,
  image?: Image,
  description?: string,
  ratings: number[],
  tags: Tag[],
};

type NoIdProduct = Omit<Product, '_id'>;
type ShoppingCartProduct = Product & { quantity: number };

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

type User = {
  _id: string,
  token?: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  email: string,
  userType?: UserType,
  avatar?: Image,
};

type ShippingInfo = {
  firstName: string,
  lastName: string,
  address: string,
};

type NoIdUser = Omit<User, '_id'>;
type CreateUserInput = Omit<NoIdUser, 'userType'>;

interface SignInInfo {
  userName: string,
  password: string,
}

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

type CredentialsWithTimeStamp = Credentials & { timestamp: Date };

type UserType = 'Admin' | 'User';

type NotificationType = 'success' | 'error' | 'info';

type Modal = 'LogIn' | 'CreateUser' | 'AddProduct' | 'ModifyUser' | 'ModifyProduct' | 'ModifyUserAvatar';
