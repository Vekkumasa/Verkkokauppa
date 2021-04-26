import { Request, Response } from "express";
import User from "../models/user";
import { User as UserType } from '../types';
import { uuid } from "uuidv4";
import bcrypt from 'bcrypt';

const allUsers = async () => {
  return await User.find({});
};

const findUserById = (req: Request, res: Response) => {
  const user = User.findById(req.params.id, (error: unknown, user: typeof User) => {
    if (error) {
      res.send(error);
    } else {
      res.send(user);
    }
  });
  console.log(user);
};

const addUser = async (user: UserType) => {
  try {
    const password = await bcrypt.hash(user.passwordHash, 10);
    const newUser = new User({
      id: uuid(),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      passwordHash: password,
      email: user.email,
      userType: user.userType
    });
    const response = await newUser.save();
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  addUser,
  findUserById,
  allUsers
};