import * as actionTypes from './actionTypes';

const initialState: ShoppingCartState = {
  cart: []
};

const increaseQuantity = (product: ShoppingCartProduct, list: ShoppingCartProduct[]): ShoppingCartProduct => {
  const item: ShoppingCartProduct | undefined = list.find(p => p.id === product.id);
  if (item === undefined) {
    return product;
  }
  product.quantity = item.quantity +1;
  return product;
};

const decreaseQuantity = (product: ShoppingCartProduct, list: ShoppingCartProduct[]): ShoppingCartProduct => {
  const item: ShoppingCartProduct | undefined = list.find(p => p.id === product.id);
  if (item === undefined) {
    return product;
  }
  product.quantity = item.quantity -1;
  return product;
};


const reducer = (state: ShoppingCartState = initialState, action: ShoppingCartAction): ShoppingCartState => {

  switch (action.type) {
    case actionTypes.INCREASE_QUANTITY:   
      if (!state.cart.some(p => p.id === action.data.id)) {
        console.log('data:', action.data, ' cart: ', state.cart[0]);
        return { cart: state.cart.concat(action.data) };
      } 
      const lisattava = increaseQuantity(action.data, state.cart);
      return {
        cart: state.cart.map(p => p.id === lisattava.id ? lisattava : p)
      };

    case actionTypes.DECREASE_QUANTITY:
      const uusi = decreaseQuantity(action.data, state.cart);
      return {
        cart: state.cart.map(p => p.id === uusi.id ? uusi : p)
      };

    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        cart: state.cart.filter(p => p.id !== action.data.id)
      };
  }

  console.log('cart state', state);
  return state;
};

export default reducer;