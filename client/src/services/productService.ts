import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3001/api/products';

const getAll = ():Promise<Product[]> => {
  const request = axios.get<Product[]>(`${baseURL}`);
  return request.then((response: AxiosResponse<Product[]>) => response.data);
};

const addProduct = async (product: NoIdProduct, image: File | undefined):Promise<Product> => {

  console.log('addproduct');
  const request = await axios.post<Product>(`${baseURL}`, product);

  if (image && request.data !== null) {
    const req = modifyProductImage(request.data._id, image);
    console.log('Image request', req);
    return req;
  }
  return request.data;
};

const modifyProductImage = async (productId: string, image: File) => {
  const fd = new FormData();
  fd.append('image', image, image.name);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const request = await axios.put<Product>(`${baseURL}/${productId}`, fd, config);
  console.log("modifyProductImage", request.data);
  return request.data;
};

const modifyProduct = async (product: Product, image: File | undefined):Promise<Product> => {

  console.log('modify product', product);
  const request = await axios.put<Product>(`${baseURL}`, product);
  if (request.data !== null && image) {
    const req = modifyProductImage(product._id, image);
    console.log('req', req);
    return req;
  }
  console.log('data',request.data);
  return request.data;
};

const deleteProduct = async (product: Product): Promise<Product> => {
  const request = await axios.delete<Product>(`${baseURL}/${product._id}`);
  return request.data;
};

export default {
  getAll,
  addProduct,
  deleteProduct,
  modifyProduct,
};