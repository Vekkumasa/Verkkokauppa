import * as actionTypes from "./actionTypes";

type Cart = (dispatch: DispatchType) => void;

export const createNewShoppingCart = (cartId: string): Cart => {
  const action: CreateNewShoppingCartAction = {
    type: actionTypes.CREATE_NEW_SHOPPING_CART,
    cartId
  };
  
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const retrieveOldShoppingCart = (cartId: string, products: ShoppingCartProduct[]): Cart => {
  const action: RetrieveOldShoppingCartAction = {
    type: actionTypes.RETRIEVE_OLD_SHOPPING_CART,
    cartId,
    data: products
  };
  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const addNewProductToShoppingCart = (product: Product, cartId: string): Cart => {
  const data: ShoppingCartProduct = { ...product, quantity: 1};
  const action: ShoppingCartAction = {
    type: actionTypes.INCREASE_QUANTITY,
    cartId,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const increaseQuantity = (product: ShoppingCartProduct, cartId: string): Cart => {
  const action: ShoppingCartAction = {
    type: actionTypes.INCREASE_QUANTITY,
    cartId,
    data: {...product, quantity: product.quantity + 1}
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const decreaseQuantity = (product: ShoppingCartProduct, cartId: string): Cart => {
  const action: ShoppingCartAction = {
    type: actionTypes.DECREASE_QUANTITY,
    cartId,
    data: {...product, quantity: product.quantity - 1}
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const removeProduct = (data: ShoppingCartProduct, cartId: string): Cart => {
  const action: ShoppingCartAction = {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    cartId,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const clearShoppingCart = (): Cart => {
  const action: ClearShoppingCartAction = {
    type: actionTypes.CLEAR_SHOPPINGCART,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};