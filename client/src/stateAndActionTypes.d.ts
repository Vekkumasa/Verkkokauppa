// STATES
interface AppState {
  products: ProductState,
  user: UserState,
  notification: NotificationState,
  cart: ShoppingCartState,
  modal: ModalState,
  filter: FilterState,
  activeProduct: ActiveProductState,
}

type FilterState = {
  productFilter: string
  tagFilter?: Tag
};

type ActiveProductState = {
  product?: Product
};

type ModalState = {
  addProductModal: boolean,
  logInModal: boolean,
  createUserModal: boolean,
  modifyUserInfoModal: boolean,
  modifyProductModal: boolean,
  modifyUserAvatarModal: boolean;
};

type ProductState = {
  products: Product[]
};

type UserState = {
  user?: Credentials
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

type Actions = ProductActions | UserActions | NotificationActions | ShoppingCartAction | ModalAction | FilterActions;

type ProductActions = AddProductAction | GetProductsAction;

type AddProductAction = {
  type: string,
  data: Product,
};

type GetProductsAction = {
  type: string,
  data: Product[]
};

type UserActions = LogInAction;

type LogInAction = {
  type: string,
  data?: Credentials,
};

type NotificationActions = SetNotificationAction;

type SetNotificationAction = {
  type: string,
  notificationType: NotificationType,
  data: string
};

type ShoppingCartAction = AddOrRemoveShoppingCartAction | ClearShoppingCartAction | CreateNewShoppingCartAction | RetrieveOldShoppingCartAction;

type AddOrRemoveShoppingCartAction = {
  type: string,
  cartId: string,
  data: ShoppingCartProduct
};

type CreateNewShoppingCartAction = {
  type: string,
  cartId: string,
};

type ClearShoppingCartAction = {
  type: string,
};

type RetrieveOldShoppingCartAction = {
  type: string,
  cartId: string,
  data: ShoppingCartProduct[]
};

type ModalAction = {
  type: string,
  modal: Modal,
  data: boolean,
};

type FilterActions = SetFilterAction | SetTagAction;

type SetFilterAction = {
  type: string,
  data: string,
};

type SetTagAction = {
  type: string,
  data?: Tag
};

type SetActiveProductAction = {
  type: string,
  data: Product
};

type DispatchType = (args: Actions) => Actions;