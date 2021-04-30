import * as actionTypes from './actionTypes';

const initialState: ShoppingCartState = {
  cart: []
};

const reducer = (state: ShoppingCartState = initialState, action: ShoppingCartAction): ShoppingCartState => {

  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.data)
      };
  }

  return state;
};

export default reducer;