export const NotificationTypeCheck = (object: unknown): object is NotificationType => {
  if (object === 'error' || object === 'info' || object === 'success') {
    return true;
  }
  return false;
};

export const UserCheck = (object: Credentials | null): object is Credentials => {
  if (object === null) return false;
  return true;
};

export const AddOrRemoveActionCheck = (object: ShoppingCartAction): object is AddOrRemoveShoppingCartAction => {
  if (object.type === 'CLEAR_SHOPPINGCART') {
    return false;
  }
  return true;
};