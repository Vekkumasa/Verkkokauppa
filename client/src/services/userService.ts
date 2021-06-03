import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const signIn = async (username: string, password: string, platformInfo: string):Promise<Credentials> => {
  const request = await axios.post<Credentials>(`${baseURL}/login`, { username, password, platformInfo });
  return request.data;
};

const createUser = async (user: NoIdUser):Promise<User> => {
  const request = await axios.post<User>(`${baseURL}/users`, user);
  return request.data;
};

const modifyUser = async (user: User):Promise<User> => {
  const request = await axios.put<User>(`${baseURL}/users/`, user);
  return request.data;
};

const modifyAvatar = async (image: File, userId: string):Promise<User> => {
  const fd = new FormData();
  fd.append('image', image, image.name);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const request = await axios.put<User>(`${baseURL}/users/${userId}/image`, fd, config);
  return request.data;
};

const getUsersCompletedShoppingcarts = async (userId: string):Promise<ShoppingCart[]> => {
  const request = await axios.get<ShoppingCart[]>(`${baseURL}/users/${userId}`);
  return request.data;
};

const addRatingForProduct = async (userId: string, productId: string, value: number):Promise<Credentials | null> => {
  const request = await axios.put<Credentials | null>(`${baseURL}/users/${userId}`, { productId , value });
  return request.data;
};

export default {
  signIn,
  createUser,
  modifyUser,
  getUsersCompletedShoppingcarts,
  addRatingForProduct,
  modifyAvatar,
};