import * as actionTypes from "./actionTypes";

type Cart = (dispatch: DispatchType) => void;

export const increaseQuantity = (product: Product): Cart => {
  const data: ShoppingCartProduct = { ...product, quantity: 1};
  const action: ShoppingCartAction = {
    type: actionTypes.INCREASE_QUANTITY,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const decreaseQuantity = (product: Product): Cart => {
  const data: ShoppingCartProduct = { ...product, quantity: 1};
  const action: ShoppingCartAction = {
    type: actionTypes.DECREASE_QUANTITY,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const removeProduct = (data: ShoppingCartProduct): Cart => {
  const action: ShoppingCartAction = {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};