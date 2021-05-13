import axios from 'axios';

const signIn = async (username: string, password: string):Promise<Credentials> => {
  const request = await axios.post<Credentials>('http://verkkis.herokuapp.com/api/login', { username, password });
  return request.data;
};

const createUser = async (user: CreateUserInput):Promise<User> => {
  const request = await axios.post<User>('http://verkkis.herokuapp.com/api/users', user);
  return request.data;
};

export default {
  signIn,
  createUser,
};