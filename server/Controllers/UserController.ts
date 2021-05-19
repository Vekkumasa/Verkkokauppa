import User from "../models/user";
import { User as UserType } from '../types.d';
import { uuid } from "uuidv4";
import bcrypt from 'bcrypt';

const allUsers = async () => {
  return await User.find({});
};

const addUser = async (user: UserType) => {
  try {
    const password = await bcrypt.hash(user.password, 10);
    const date = new Date();
    const newUser = new User({
      id: uuid(),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: password,
      email: user.email,
      avatar: user.avatar,
      userType: user.userType,
      recentActivity: [ date ],
    });
    const response = await newUser.save();
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const modifyUser = async (user: UserType) => {
  let password;
  if (user.password) password = await bcrypt.hash(user.password, 10);
  try {
    const userToModify = await User.findOne({ email: user.email });

    if (!userToModify) return null;

    userToModify.avatar = user.avatar;
    userToModify.userName = user.userName;
    userToModify.firstName = user.firstName;
    userToModify.lastName = user.lastName;
    if (password) {
      userToModify.password = password;
    } else {
      userToModify.password = user.password;
    }
    userToModify.email = user.email;

    await userToModify.save();

    return userToModify;
  } catch (e) {
    return null;
  }
};

export default {
  addUser,
  allUsers,
  modifyUser
}; 