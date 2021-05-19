import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const signIn = async (username: string, password: string):Promise<Credentials> => {
  const date = new Date;
  console.log(date.getDate());
  const request = await axios.post<Credentials>(`${baseURL}/login`, { username, password, date });
  return request.data;
};

const createUser = async (user: NoIdUser):Promise<User> => {
  const request = await axios.post<User>(`${baseURL}/users`, user);
  return request.data;
};

const modifyUser = async (user: CreateUserInput):Promise<User> => {
  const request = await axios.put<User>(`${baseURL}/users/`, user);
  return request.data;
};

export default {
  signIn,
  createUser,
  modifyUser,
};