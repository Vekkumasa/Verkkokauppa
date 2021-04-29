import * as actionTypes from "./actionTypes";

const initialState: ProductState = {
  products: []
};

const reducer = (state: ProductState = initialState, action: GetProductsAction | AddProductAction): ProductState => {
    
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.data as Product[]
      };

    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.data)
      };

    case actionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product !== action.data)
      };
  }
  
  return state;
};

export default reducer;