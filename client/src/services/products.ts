import axios from 'axios';
import { BaseUrl } from '../constants';
import { Product } from '../types';

const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BaseUrl}/products`);
  return response.data;
};

export default { getAllProducts };
