/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */

export const stringCheck = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const stringParser = (text: unknown): string => {
  if (!text || !stringCheck(text)) {
      throw new Error(`Incorrect or missing string `);
  }
  return text;
};

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

export const retrieveOldShoppingCartCheck = (object: ShoppingCartAction): object is RetrieveOldShoppingCartAction => {
  if (object.type === 'RETRIEVE_OLD_SHOPPING_CART') {
    return true;
  }
  return false;
};

export const clearShoppingCartCheck = (object: ShoppingCartAction): object is ClearShoppingCartAction => (object.type === 'CLEAR_SHOPPINGCART');

export const isCredentialsWithTimestamp = (o: any): o is CredentialsWithTimeStamp => {
  return 'firstName' in o && 'lastName' in o && 'userName' in o && 'id' in o && 'userType' in o && 'token' in o && 'timestamp' in o;
};

export const safeJsonParse = <T>(guard: (o: any) => o is T) => (text: string): ParseResult<T> => {
  const parsed = JSON.parse(text);
  return guard(parsed) ? { parsed, hasError: false} : { hasError: true };
};

type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown };
