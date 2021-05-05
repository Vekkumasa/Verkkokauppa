// STATES
interface AppState {
  products: ProductState,
  user: UserState,
  notification: NotificationState,
  cart: ShoppingCartState
}

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
  cartId: string,
  cart: ShoppingCartProduct[]
};

// ACTIONS
type Actions = ProductActions | UserActions | NotificationActions | ShoppingCartAction;

type ProductActions = AddProductAction | GetProductsAction | RemoveProductAction ;
type UserActions = LogInAction
type NotificationActions = SetNotificationAction
type ShoppingCartAction = AddOrRemoveShoppingCartAction | ClearShoppingCartAction

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

type LogInAction = {
  type: string,
  data: Credentials | null,
};

type AddOrRemoveShoppingCartAction = {
  type: string,
  cartId: string,
  data: ShoppingCartProduct
}

type ClearShoppingCartAction = {
  type: string,
};

type DispatchType = (args: Actions) => Actions;