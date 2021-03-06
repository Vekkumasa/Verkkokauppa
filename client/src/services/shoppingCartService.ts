import axios from 'axios';

const baseURL = '/api/shoppingCart';

const createNewShoppingCart = async (products: ShoppingCart): Promise<ShoppingCart> => {
  const request = await axios.post<ShoppingCart>(baseURL, products);
  return request.data;
};

const getUsersShoppingCart = async (userId: string):Promise<ShoppingCart | null> => {
  const request = await axios.get<ShoppingCart | null>(`${baseURL}/${userId}`);
  return request.data;
};

const addProductToShoppingCart = async (productToAdd: CartProduct):Promise<ShoppingCart> => {
  const request = await axios.post<ShoppingCart>(`${baseURL}/${productToAdd.cartId}/addProduct`, productToAdd);
  return request.data;
};
  
const removeProductFromShoppingCart = async (productToRemove: CartProduct): Promise<ShoppingCart> => {
  const request = await axios.put<ShoppingCart>(`${baseURL}/${productToRemove.cartId}/remove`, productToRemove);
  return request.data;
};

const increaseProductQuantity = async (product: CartProduct):Promise<ShoppingCart> => {
  const request = await axios.put<ShoppingCart>(`${baseURL}/${product.cartId}/increase`, product);
  return request.data;
};

const decreaseProductQuantity = async (product: CartProduct):Promise<ShoppingCart> => {
  const request = await axios.put<ShoppingCart>(`${baseURL}/${product.cartId}/decrease`, product);
  return request.data;
};

const setShoppingCartActivity = async (cartId: string, data: boolean):Promise<ShoppingCart> => {
  const request = await axios.put<ShoppingCart>(`${baseURL}/${cartId}/activity`, { data: data });
  return request.data;
};

const setShoppingCartCompleted = async (cartId: string):Promise<ShoppingCart | null> => {
  const request = await axios.put<ShoppingCart | null>(`${baseURL}/${cartId}/completed`);
  return request.data;
};

const removeShoppingCart = async (userId: string):Promise<ShoppingCart> => {
  const request = await axios.delete<ShoppingCart>(`${baseURL}/${userId}`);
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
  setShoppingCartCompleted,
};