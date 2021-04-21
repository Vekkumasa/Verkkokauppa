import * as actionTypes from "./actionTypes";
import productService from '../../services/productService';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addProduct = (data: Product) => {
  const action: AddProductAction = {
    type: actionTypes.ADD_PRODUCT,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const initializeProducts = () => {
  return async (dispatch: (arg0: { type: string; data: Product[]; }) => void) => {
    const data = await productService.getAll();
    dispatch({
      type: 'GET_PRODUCTS',
      data
    });
  };
};