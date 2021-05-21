import * as actionTypes from './actionTypes';
import { addOrRemoveActionCheck, newShoppingCartCheck, clearShoppingCartCheck, retrieveOldShoppingCartCheck } from '../../typeGuards';

const initialState: ShoppingCartState = {
  cartId: '',
  cart: []
};

const increaseQuantity = (product: ShoppingCartProduct, list: ShoppingCartProduct[]): ShoppingCartProduct => {
  const item: ShoppingCartProduct | undefined = list.find(p => p._id === product._id);
  if (!item) {
    return product;
  }
  product.quantity = item.quantity +1;
  return product;
};

const decreaseQuantity = (product: ShoppingCartProduct, list: ShoppingCartProduct[]): ShoppingCartProduct => {
  const item: ShoppingCartProduct | undefined = list.find(p => p._id === product._id);
  if (!item) {
    return product;
  }
  product.quantity = item.quantity -1;
  return product;
};

const reducer = (state: ShoppingCartState = initialState, action: ShoppingCartAction): ShoppingCartState => {

  if (addOrRemoveActionCheck(action)) {
    switch (action.type) {
      case actionTypes.INCREASE_QUANTITY:   
        if (!state.cart.some(p => p._id === action.data._id)) {
          return {
            ...state,
            cartId: action.cartId,
            cart: state.cart.concat(action.data) };
        } 
        const lisattava = increaseQuantity(action.data, state.cart);
        return {
          ...state,
          cartId: action.cartId,
          cart: state.cart.map(p => p._id === lisattava._id ? lisattava : p)
        };
  
      case actionTypes.DECREASE_QUANTITY:
        const uusi = decreaseQuantity(action.data, state.cart);
        return {
          ...state,
          cartId: action.cartId,
          cart: state.cart.map(p => p._id === uusi._id ? uusi : p)
        };
  
      case actionTypes.REMOVE_PRODUCT_FROM_CART:
        return {
          ...state,
          cartId: action.cartId,
          cart: state.cart.filter(p => p._id !== action.data._id)
        };
    }

  }
  if (retrieveOldShoppingCartCheck(action)) {
    return {
      cartId: action.cartId,
      cart: action.data
    };
  }

  if (newShoppingCartCheck(action)) {
    console.log('new shopping cart reducerissa', action);
    switch (action.type) {
      case actionTypes.CREATE_NEW_SHOPPING_CART:
        return {
          ...state,
          cartId: action.cartId,
          cart: state.cart
        };
    }
    
  }
  if (clearShoppingCartCheck(action)) {
    console.log('clear cart reducerissa', action);
    return {
      ...state,
      cartId: '',
      cart: []
    };
  }
  
  return state;
};

export default reducer;