import * as actionTypes from "./actionTypes";

const initialState: ProductState = {
  products: []
};

const AddProductActionCheck = (obj: Actions): obj is AddProductAction => {
  if((obj as AddProductAction).type){
    return true;
  }
  return false;
};

const reducer = (state: ProductState = initialState, action: GetProductsAction): ProductState => {

  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.data as Product[]
      };
  }
  
  return state;
};

export default reducer;