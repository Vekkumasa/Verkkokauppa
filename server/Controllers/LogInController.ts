import User from "../models/user";
 import { Credentials } from '../types';
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { StringCheck } from '../utils/StringCheck';
import { UserTypeParser } from '../utils/UserTypeCheck';

const logIn = async (userName: string, passWord: string): Promise<Credentials | null> => {
  const user = await User.findOne({ userName: userName });
  console.log('login user:', user);

  if (!user?.password) {
    return null;
  }

  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(passWord, user.password);

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

    const secret = process.env.JWTSECRET;
    if (secret) {
      const token = jwt.sign(userForToken, secret);
      const credentials: Credentials = {
        id: user.id,
        token: token,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      };
      return credentials;
    }
  }

  return null;
};

export default {
  logIn
};