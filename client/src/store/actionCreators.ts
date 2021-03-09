import * as actionTypes from "./actionTypes";

export function addProduct(product: Product) {
  const action: ProductAction = {
    type: actionTypes.ADD_PRODUCT,
    product,
  };

  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ProductAction) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}