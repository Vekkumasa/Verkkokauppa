import * as actionTypes from "./actionTypes";

type Cart = (dispatch: DispatchType) => void;

export const increaseQuantity = (product: Product, cartId: string): Cart => {
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

export const decreaseQuantity = (product: Product, cartId: string): Cart => {
  const data: ShoppingCartProduct = { ...product, quantity: 1};
  const action: ShoppingCartAction = {
    type: actionTypes.DECREASE_QUANTITY,
    cartId,
    data,
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