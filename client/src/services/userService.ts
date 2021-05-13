import axios from 'axios';

const signIn = async (username: string, password: string):Promise<Credentials> => {
  const request = await axios.post<Credentials>('http://localhost:3001/api/login', { username, password });
  return request.data;
};

const createUser = async (user: CreateUserInput):Promise<User> => {
  const request = await axios.post<User>('http://localhost:3001/api/users', user);
  return request.data;
};

export default {
  signIn,
  createUser,
};