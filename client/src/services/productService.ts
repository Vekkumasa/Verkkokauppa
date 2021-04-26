import axios from 'axios';

const getAll = ():Promise<Product[]> => {
  const request = axios.get<Product[]>('http://localhost:3001/api/products');
  return request.then(response => response.data);
};

const addProduct = async (product: NoIdProduct):Promise<Product> => {
  const request = await axios.post<Product>('http://localhost:3001/api/products', product);
  return request.data;
};

export default {
  getAll,
  addProduct,
};