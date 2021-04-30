import * as actionTypes from "./actionTypes";

type AddToCart = (dispatch: DispatchType) => void;

export const addProductToCart = (data: Product): AddToCart => {
  const action: AddProductToCartAction = {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};