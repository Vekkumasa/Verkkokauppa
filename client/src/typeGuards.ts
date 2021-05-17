export const notificationTypeCheck = (object: unknown): object is NotificationType => {
  if (object === 'error' || object === 'info' || object === 'success') {
    return true;
  }
  return false;
};

export const userCheck = (object: Credentials | null): object is Credentials => {
  if (object === null) return false;
  return true;
};

export const addOrRemoveActionCheck = (object: ShoppingCartAction): object is AddOrRemoveShoppingCartAction => {
  if (object.type === 'INCREASE_QUANTITY' || object.type === 'DECREASE_QUANTITY' || object.type === 'REMOVE_PRODUCT_FROM_CART') {
    return true;
  }
  return false;
};

export const newShoppingCartCheck = (object: ShoppingCartAction): object is CreateNewShoppingCartAction => {
  if (object.type === 'CREATE_NEW_SHOPPING_CART') {
    return true;
  }
  return false;
};

export const clearShoppingCartCheck = (object: ShoppingCartAction): object is ClearShoppingCartAction => {
  if (object.type === 'CLEAR_SHOPPINGCART') {
    return true;
  }
  return false;
};

export const retrieveOldShoppingCartCheck = (object: ShoppingCartAction): object is RetrieveOldShoppingCartAction => {
  if (object.type === 'RETRIEVE_OLD_SHOPPING_CART') {
    return true;
  }
  return false;
};