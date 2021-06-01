import User from "../models/user";
import { User as UserType, Product as ProductType, Image } from '../types.d';
import { uuid } from "uuidv4";
import bcrypt from 'bcrypt';
import { ShoppingCartInterface } from "../models/shoppingCart";
import Product from "../models/product";

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

    userToModify.userName = newUserInfo.userName;
    userToModify.firstName = newUserInfo.firstName;
    userToModify.lastName = newUserInfo.lastName;
    if (password) {
      userToModify.password = password;
    }
    userToModify.email = newUserInfo.email;

    await userToModify.save();
    return userToModify;
  } catch (e) {
    return null;
  }
};

const modifyUserAvatar = async (image: Image, userId: string) => {
  const user = await User.findById(userId);
  if (user) {
    user.avatar = image;
    await user.save();
    console.log('modify user avatar contorller', user);
    return user;
  } else {
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

const rateProduct = async (userId: string, productId: string, value: number) => {
  const user = await User.findById(userId).populate('ratings');
  const productInterface = await Product.findById(productId);

  console.log('user', user);
  if (!user || !productInterface) return null;
  
  const rated = user.ratings.some(product => {
    return product._id?.toString() === productId;
  });

  const array = productInterface.ratings.concat(value);
  const product: ProductType = {
    _id: productId,
    name: productInterface.name,
    price: productInterface.price,
    stock: productInterface.stock,
    description: productInterface.description,
    image: productInterface.image,
    ratings: array 
  };

  console.log(productInterface, value, rated);
  if (!rated) {
    user.ratings.push(product);
    productInterface.ratings.push(value);
  } else {
    return null;
  }

  await user.save();
  await productInterface.save();

  return user;
};

export default {
  addUser,
  allUsers,
  modifyUser,
  getCompletedShoppingCarts,
  rateProduct,
  modifyUserAvatar,
}; 