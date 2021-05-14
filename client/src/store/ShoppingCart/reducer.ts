import * as actionTypes from './actionTypes';
import { addOrRemoveActionCheck, newShoppingCartCheck, clearShoppingCartCheck, retrieveOldShoppingCartCheck } from '../../typeGuards';

const initialState: ShoppingCartState = {
  cartId: '',
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

  if (addOrRemoveActionCheck(action)) {
    switch (action.type) {
      case actionTypes.INCREASE_QUANTITY:   
        if (!state.cart.some(p => p.id === action.data.id)) {
          return {
            cartId: action.cartId,
            cart: state.cart.concat(action.data) };
        } 
        const lisattava = increaseQuantity(action.data, state.cart);
        return {
          cartId: action.cartId,
          cart: state.cart.map(p => p.id === lisattava.id ? lisattava : p)
        };
  
      case actionTypes.DECREASE_QUANTITY:
        const uusi = decreaseQuantity(action.data, state.cart);
        return {
          cartId: action.cartId,
          cart: state.cart.map(p => p.id === uusi.id ? uusi : p)
        };
  
      case actionTypes.REMOVE_PRODUCT_FROM_CART:
        return {
          cartId: action.cartId,
          cart: state.cart.filter(p => p.id !== action.data.id)
        };
    }

  }
  if (retrieveOldShoppingCartCheck(action)) {
    console.log('Reducer', action);
    return {
      cartId: action.cartId,
      cart: action.data
    };
  }

  if (newShoppingCartCheck(action)) {
    
    switch (action.type) {
      case actionTypes.CREATE_NEW_SHOPPING_CART:
        return {
          // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
          cartId: action.cartId,
          cart: state.cart
        };
    }
    
  }
  if (clearShoppingCartCheck(action)) {
    return {
      cartId: '',
      cart: []
    };
  }
  
  return state;
};

export default reducer;