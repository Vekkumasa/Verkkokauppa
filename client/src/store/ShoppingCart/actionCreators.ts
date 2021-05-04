import * as actionTypes from "./actionTypes";

type Cart = (dispatch: DispatchType) => void;

export const addProductToCart = (product: Product): Cart => {
  const data: ShoppingCartProduct = { ...product, quantity: 1};
  const action: AddProductToCartAction = {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    data
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const removeProductFromCart = (product: Product): Cart => {
  const data: ShoppingCartProduct = { ...product, quantity: 1};
  const action: RemoveProductFromCart = {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};