type Product = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  description?: string
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
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  userType: UserType
};

type UserType = 'Admin' | 'User';

type NotificationType = 'success' | 'error' | 'info';

type ProductState = {
  products: Product[]
};

type UserState = {
  user: Credentials | null
};

type NotificationState = {
  message: string,
  type: NotificationType,
  visible: boolean
};

type ShoppingCartState = {
  cart: ShoppingCartProduct[]
};

type AddProductAction = {
  type: string,
  data: Product,
};

type GetProductsAction = {
  type: string,
  data: Product[]
};

type SetNotificationAction = {
  type: string,
  notificationType: NotificationType,
  data: string
};

type ProductActions = AddProductAction | GetProductsAction | RemoveProductAction ;
type UserActions = LogInAction
type NotificationActions = SetNotificationAction
type ShoppingCartAction = AddProductToCartAction | RemoveProductFromCart

type Actions = ProductActions | UserActions | NotificationActions | ShoppingCartAction;

type LogInAction = {
  type: string,
  data: Credentials | null,
};

type AddProductToCartAction = {
  type: string,
  data: Product,
};

type RemoveProductFromCart = {
  type: string,
  data: Product
};

interface AppState {
  products: ProductState,
  user: UserState,
  notification: NotificationState,
  cart: ShoppingCartState
}

type DispatchType = (args: Actions) => Actions;

declare module "*.jpg" {
  const content: string;
  export = content;
}