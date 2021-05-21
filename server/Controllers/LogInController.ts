import User from "../models/user";
 import { Credentials } from '../types.d';
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { StringCheck } from '../utils/StringCheck';
import { UserTypeCheck } from '../utils/UserTypeCheck';

const logIn = async (userName: string, passWord: string, platformInfo: string): Promise<Credentials | null> => {
  const user = await User.findOne({ userName: userName });

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

    if (!UserTypeCheck(user.userType)) {
      return null;
    }

    user.recentActivity.push(new Date);
    user.platformInfo.push(platformInfo);

    if (user.recentActivity.length > 4) {
      user.recentActivity.splice(0, 1);
      user.platformInfo.splice(0, 1);
    }

    await user.save();
    const secret = process.env.JWTSECRET;
    if (secret) {
      const token = jwt.sign(userForToken, secret);
      const credentials: Credentials = {
        id: user.id,
        token: token,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,
        recentActivity: user.recentActivity,
        platformInfo: user.platformInfo,
      };
      return credentials;
    }
  }

  return null;
};

export default {
  logIn
};