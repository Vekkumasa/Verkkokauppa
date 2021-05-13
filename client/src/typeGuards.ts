export const notificationTypeCheck = (object: unknown): object is NotificationType => (
  object === 'error'
  || object === 'info'
  || object === 'success'
);

export const userCheck = (object?: Credentials): object is Credentials => !!object;

export const addOrRemoveActionCheck = (object: ShoppingCartAction): object is AddOrRemoveShoppingCartAction => (
  object.type === 'INCREASE_QUANTITY'
  || object.type === 'DECREASE_QUANTITY'
  || object.type === 'REMOVE_PRODUCT_FROM_CART'
);

export const newShoppingCartCheck = (object: ShoppingCartAction): object is CreateNewShoppingCartAction => (object.type === 'CREATE_NEW_SHOPPING_CART');

export const clearShoppingCart = (object: ShoppingCartAction): object is ClearShoppingCartAction => (object.type === 'CLEAR_SHOPPINGCART');