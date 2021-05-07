import axios from 'axios';

// TODO: FIX RETURN TYPES

const addProductToShoppingCart = async (productToAdd: CartProduct):Promise<Product> => {
  const request = await axios.post<Product>('http://localhost:3001/api/shoppingCart', productToAdd);
  console.log('Shopping service addProductToShoppingCart:', request.data);
  return request.data;
};

const increaseProductQuantity = async (productToAdd: CartProduct):Promise<Product> => {
  const request = await axios.put<Product>(`http://localhost:3001/api/shoppingCart/${productToAdd.cartId}/increase`, productToAdd);
  console.log('Shopping service increaseProductQuantity:', request.data);
  return request.data;
};

const DecreaseProductQuantity = async (productToAdd: CartProduct):Promise<Product> => {
  const request = await axios.put<Product>(`http://localhost:3001/api/shoppingCart/${productToAdd.cartId}/decrease`, productToAdd);
  console.log('Shopping service decreaseProductQuantity:', request.data);
  return request.data;
};

export default {
  addProductToShoppingCart,
  increaseProductQuantity,
  DecreaseProductQuantity
};