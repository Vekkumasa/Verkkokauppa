import axios from 'axios';

// TODO: FIX RETURN TYPES

const baseURL = 'http://localhost:3001/api/shoppingCart';

const createNewShoppingCart = async (products: ShoppingCart): Promise<ShoppingCartProduct> => {
  const request = await axios.post<ShoppingCartProduct>(baseURL, products);
  return request.data;
};

const getUsersShoppingCart = async (userId: string):Promise<ShoppingCart> => {
  const request = await axios.get<ShoppingCart>(`http://localhost:3001/api/shoppingCart/${userId}`);
  console.log('Shoppingcartservice request.data:', request.data);
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

const setShoppingCartActivity = async (cartId: string, data: boolean):Promise<ShoppingCart> => {
  console.log('cartID:', cartId, 'data', data);
  const request = await axios.put<ShoppingCart>(`http://localhost:3001/api/shoppingCart/${cartId}/activity`, { data: data });
  return request.data;
};

const removeShoppingCart = async (userId: string):Promise<ShoppingCart> => {
  const request = await axios.delete<ShoppingCart>(`http://localhost:3001/api/shoppingCart/${userId}`);
  return request.data;
};

export default {
  createNewShoppingCart,
  addProductToShoppingCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromShoppingCart,
  getUsersShoppingCart,
  removeShoppingCart,
  setShoppingCartActivity,
};