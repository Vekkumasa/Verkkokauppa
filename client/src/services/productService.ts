import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3001/api/products';

const getAll = ():Promise<Product[]> => {
  const request = axios.get<Product[]>(`${baseURL}`);
  return request.then((response: AxiosResponse<Product[]>) => response.data);
};

const addProduct = async (product: NoIdProduct):Promise<Product> => {
  console.log('service', product);
  const { uusiImage, ...item } = product;

  const request = await axios.post<Product>(`${baseURL}`, item);

  if (uusiImage && request.data !== null) {
    console.log(uusiImage);
    const req = modifyProductImage(request.data._id, uusiImage);
    console.log('Image request', req);
  }
  return request.data;
};

const modifyProductImage = async (productId: string, image: File) => {
  const fd = new FormData();
    fd.append('uusiImage', image, image.name);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  };
  const request = await axios.put<Product>(`${baseURL}/${productId}`, image);
  console.log("modifyProductImage", request.data);
  return request.data;
};

const modifyProduct = async (product: Product):Promise<Product> => {
  const request = await axios.put<Product>(`${baseURL}`, product);
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