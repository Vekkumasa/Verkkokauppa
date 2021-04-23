type Product = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  description?: string
};

type NoIdProduct = Omit<Product, 'id'>

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

type Credentials = {
  token: string,
  userName: string,
  firstName: string,
  lastName: string,
  userType: UserType
};

type UserType = 'Admin' | 'User';

type ProductState = {
  products: Product[]
};

type AddProductAction = {
  type: string,
  data: Product,
};

type GetProductsAction = {
  type: string,
  data: Product[]
}

type ProductActions = AddProductAction | GetProductsAction
type UserActions = LogInAction
type Actions = ProductActions | UserActions

type UserState = {
  user: Credentials | null
};

type LogInAction = {
  type: string,
  data: Credentials | null,
};

interface AppState {
  products: ProductState,
  user: UserState
}

type DispatchType = (args: Actions) => Actions;

declare module "*.jpg" {
  const content: string;
  export = content;
}