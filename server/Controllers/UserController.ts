import User from "../models/user";
<<<<<<< HEAD
import { User as UserType } from '../types';
import { v4 as uuid } from 'uuid';
=======
import { User as UserType } from '../types.d';
import { uuid } from "uuidv4";
>>>>>>> 0a0263c0db5c9a9fcd8ea60bd8c374c5a5d7a09f
import bcrypt from 'bcrypt';
import { ShoppingCartInterface } from "../models/shoppingCart";

const allUsers = async () => {
  return await User.find({});
};

const addUser = async (user: UserType) => {
  try {
    const password = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      id: uuid(),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: password,
      email: user.email,
      avatar: user.avatar,
      userType: user.userType,
      recentActivity: [],
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

const getCompletedShoppingCarts = async (userId: string):Promise<ShoppingCartInterface[] | null> => {
  try {
    const user = await User.findById(userId).populate('shoppingCart');
    if (!user) return null;

    return user.shoppingCart.filter(cart => cart.completed === true);
  } catch (e) {
    return null;
  }
};

export default {
  addUser,
  allUsers,
  modifyUser,
  getCompletedShoppingCarts
}; 