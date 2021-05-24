import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3001/api/products';

const getAll = ():Promise<Product[]> => {
  const request = axios.get<Product[]>(`${baseURL}`);
  return request.then((response: AxiosResponse<Product[]>) => response.data);
};

const addProduct = async (product: NoIdProduct):Promise<Product> => {
  const request = await axios.post<Product>(`${baseURL}`, product);
  return request.data;
};

const deleteProduct = async (product: Product): Promise<Product> => {
  const request = await axios.delete<Product>(`${baseURL}/${product._id}`);
  return request.data;
};

export default {
  getAll,
  addProduct,
  deleteProduct
};