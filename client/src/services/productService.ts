import axios from 'axios';

const getAll = () => {
  console.log('service');
  const request = axios.get<Product[]>('http://localhost:3001/api/products');
  return request.then(response => response.data);
};

export default { getAll };