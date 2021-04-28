import * as actionTypes from "./actionTypes";
import productService from '../../services/productService';

type ProductDispatch = (dispatch: DispatchType) => void;

export const addProduct = (data: Product): ProductDispatch => {
  const action: AddProductAction = {
    type: actionTypes.ADD_PRODUCT,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const removeProduct = (data: Product): ProductDispatch => {
  const action: AddProductAction = {
    type: actionTypes.REMOVE_PRODUCT,
    data,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
};

export const initializeProducts = () => {
  
  return async (dispatch: (arg0: { type: string; data: Product[]; }) => void): Promise<void> => {
    const data = await productService.getAll();
    const action: GetProductsAction = {
      type: actionTypes.GET_PRODUCTS,
      data,
    };
    
    dispatch(action);
  };
};