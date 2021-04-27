type Product = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  description?: string
};

type NoIdProduct = Omit<Product, 'id'>;

type User = {
  id: string,
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  email: string,
  userType: UserType
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
  notification: string,
  visible: boolean
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
  data: string
};

type ProductActions = AddProductAction | GetProductsAction;
type UserActions = LogInAction;
type NotificationActions = SetNotificationAction

type Actions = ProductActions | UserActions | NotificationActions;

type LogInAction = {
  type: string,
  data: Credentials | null,
};

interface AppState {
  products: ProductState,
  user: UserState,
  notification: NotificationState
}

type DispatchType = (args: Actions) => Actions;

declare module "*.jpg" {
  const content: string;
  export = content;
}