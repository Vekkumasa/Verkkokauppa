import axios from 'axios';

const signIn = async (username: string, password: string):Promise<Credentials> => {
  const request = await axios.post<Credentials>('http://localhost:3001/api/login', { username, password });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.data;
};

const createUser = async (user: NoIdUser):Promise<User> => {
  const request = await axios.post<User>('http://localhost:3001/api/users', user);
  return request.data;
};

export default {
  signIn,
  createUser,
};