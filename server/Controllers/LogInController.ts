import User from "../models/user";
import config from '../../config';
// import { User as UserType } from '../types';
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { StringCheck } from '../utils/StringCheck';

const logIn = async (userName: string, passWord: string) => {
  const user = await User.findOne({ userName: userName });
  console.log('user', user);

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(passWord, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return null;
  }

  if (StringCheck(user.id)) {
    const userForToken = {
      username: user.userName,
      id: user.id,
    };
  
    const token = jwt.sign(userForToken, config.jwtSecret);
  
    return { token: token, username: userName, firstname: user.firstName, lastname: user.lastName };
  }

  return null;
};

export default {
  logIn
};