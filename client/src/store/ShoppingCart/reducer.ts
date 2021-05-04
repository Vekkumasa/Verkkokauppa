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
    case actionTypes.ADD_PRODUCT_TO_CART:
      const lisattava = increaseQuantity(action.data, state.cart);
      if (state.cart.length === 0) {
        return  { cart: [lisattava] };
      }
      return {
        cart: state.cart.map(p => p.id === lisattava.id ? p : lisattava)
      };
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      const uusi = decreaseQuantity(action.data, state.cart);
      return {
        cart: state.cart.map(p => p.id === uusi.id ? p : uusi)
      };
  }

  console.log('cart state', state);
  return state;
};

export default reducer;