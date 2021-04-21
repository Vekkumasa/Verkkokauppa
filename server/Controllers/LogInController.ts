import User from "../models/user";
import config from '../../config';
 import { Credentials } from '../types';
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { StringCheck } from '../utils/StringCheck';
import { UserTypeParser } from '../utils/UserTypeCheck';

const logIn = async (userName: string, passWord: string): Promise<Credentials | null> => {
  const user = await User.findOne({ userName: userName });
  console.log('login user:', user);

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

    if (!UserTypeParser(user.userType)) {
      return null;
    }
  
    const token = jwt.sign(userForToken, config.jwtSecret);
    const credentials: Credentials = {
      token: token,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
    };
    return credentials;
  }

  return null;
};

export default {
  logIn
};