import User from "../models/user";
import { User as UserType } from '../types.d';
import { uuid } from "uuidv4";
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

const modifyUser = async (newUserInfo: UserType) => {
  let password;
  if (newUserInfo.password) password = await bcrypt.hash(newUserInfo.password, 10);
  try {
    const userToModify = await User.findById(newUserInfo._id);

    console.log('usercontroller', userToModify);
    if (!userToModify) return null;

    userToModify.avatar = newUserInfo.avatar;
    userToModify.userName = newUserInfo.userName;
    userToModify.firstName = newUserInfo.firstName;
    userToModify.lastName = newUserInfo.lastName;
    if (password) {
      userToModify.password = password;
    }
    userToModify.email = newUserInfo.email;

    await userToModify.save();
    console.log('jep');
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