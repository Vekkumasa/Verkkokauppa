import axios from 'axios';

// TODO: FIX RETURN TYPES

const baseURL = 'http://localhost:3001/api/shoppingCart';

const createNewShoppingCart = async (products: NewShoppingCart): Promise<ShoppingCartProduct> => {
  const request = await axios.post<ShoppingCartProduct>(baseURL, products);
  return request.data;
};

const addProductToShoppingCart = async (productToAdd: CartProduct):Promise<ShoppingCartProduct> => {
  const request = await axios.post<ShoppingCartProduct>(`${baseURL}/${productToAdd.cartId}/addProduct`, productToAdd);
  return request.data;
};

const removeProductFromShoppingCart = async (productToRemove: CartProduct): Promise<ShoppingCartProduct> => {
  const request = await axios.put<ShoppingCartProduct>(`${baseURL}/${productToRemove.cartId}/remove`, productToRemove);
  return request.data;
};

const increaseProductQuantity = async (product: CartProduct):Promise<ShoppingCartProduct> => {
  const request = await axios.put<ShoppingCartProduct>(`${baseURL}/${product.cartId}/increase`, product);
  return request.data;
};

const decreaseProductQuantity = async (product: CartProduct):Promise<ShoppingCartProduct> => {
  const request = await axios.put<ShoppingCartProduct>(`${baseURL}/${product.cartId}/decrease`, product);
  return request.data;
};

export default {
  createNewShoppingCart,
  addProductToShoppingCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromShoppingCart,
};