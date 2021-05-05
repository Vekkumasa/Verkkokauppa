import axios from 'axios';

const addProductToShoppingCart = async (productToAdd: CartProduct):Promise<Product> => {
  const request = await axios.post<Product>('http://localhost:3001/api/shoppingCart', productToAdd);
  console.log('Shopping service', request.data);
  return request.data;
};

export default {
  addProductToShoppingCart
};