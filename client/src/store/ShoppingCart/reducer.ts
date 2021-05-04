import * as actionTypes from './actionTypes';

const initialState: ShoppingCartState = {
  cart: []
};

const convertProductToShoppingCartProduct = (product: Product):ShoppingCartProduct => {
  const shoppingCartProduct: ShoppingCartProduct = {
    name: product.name,
    stock: product.stock,
    description: product.description,
    id: product.id,
    price: product.price,
    quantity: 1,
    image: product.image
  };
  return shoppingCartProduct;
};

const reducer = (state: ShoppingCartState = initialState, action: ShoppingCartAction): ShoppingCartState => {

  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        cart: state.cart.concat(convertProductToShoppingCartProduct(action.data))
      };
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        cart: state.cart
      };
  }

  return state;
};

export default reducer;