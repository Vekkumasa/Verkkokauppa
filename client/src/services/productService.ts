import axios from 'axios';

const getAll = () => {
  const request = axios.get<Product[]>('http://localhost:3001/api/products');
  return request.then(response => response.data);
};

const addProduct = (product: NoIdProduct) => {
  console.log(product);
  const request = axios.post<NoIdProduct>('http://localhost:3001/api/products', product);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.then(response => response.data);
};

export default {
  getAll,
  addProduct,
};