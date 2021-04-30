import * as actionTypes from './actionTypes';

const initialState: ShoppingCartState = {
  cart: []
};

const reducer = (state: ShoppingCartState = initialState, action: ShoppingCartAction): ShoppingCartState => {

  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      console.log('hep');
      return {
        ...state,
        cart: state.cart.concat(action.data)
      };
  }
  console.log('shopping cart state', state);
  return state;
};

export default reducer;