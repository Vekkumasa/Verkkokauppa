import * as actionTypes from "./actionTypes";

type Cart = (dispatch: DispatchType) => void;

export const addProductToCart = (data: Product): Cart => {
  const action: AddProductToCartAction = {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const removeProductFromCart = (data: Product): Cart => {
  const action: RemoveProductFromCart = {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};