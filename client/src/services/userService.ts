import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const signIn = async (username: string, password: string):Promise<Credentials> => {
  const request = await axios.post<Credentials>(`${baseURL}/login`, { username, password });
  return request.data;
};

const createUser = async (user: CreateUserInput):Promise<User> => {
  const request = await axios.post<User>(`${baseURL}/users`, user);
  return request.data;
};

export default {
  signIn,
  createUser,
};