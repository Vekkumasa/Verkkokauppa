import axios from 'axios';

const getAll = () => {
  const request = axios.get<Product[]>('http://localhost:3001/api/products');
  return request.then(response => response.data);
};

const addProduct = async (product: NoIdProduct) => {
  const request = await axios.post<Product>('http://localhost:3001/api/products', product);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.data;
};

export default {
  getAll,
  addProduct,
};