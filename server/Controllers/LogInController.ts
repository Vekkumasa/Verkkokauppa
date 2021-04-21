import User from "../models/user";
// import { User as UserType } from '../types';
import bcrypt from 'bcrypt';

const logIn = async (userName: string, passWord: string) => {
  const user = await User.findOne({ userName: userName });
  console.log('user', user);

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(passWord, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return null;
  }

  

  return await User.find({});
};

export default {
  logIn
};