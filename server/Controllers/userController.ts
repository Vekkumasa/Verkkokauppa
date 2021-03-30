import { Request, Response } from "express";
import User from "../models/user";
// import { StringParser } from '../utils/StringCheck';

export const allUsers = (_req: Request, res: Response) => {
  const users = User.find((error: unknown, users: typeof User) => {
    if (error) {
      res.send(error);
    } else {
      res.send(users);
    } 
  });
  console.log(users);
};

export const findUserById = (req: Request, res: Response) => {
  const user = User.findById(req.params.id, (error: unknown, user: typeof User) => {
    if (error) {
      res.send(error);
    } else {
      res.send(user);
    }
  });
  console.log(user);
};

export const addUser = (req: Request, res: Response) => {
//  const password: string = StringParser(req.body);
//  console.log(password);
  const user = new User(req.body);
  user.save((error: unknown) => {
    if (error) {
      res.send(error);
    } else {
      res.send(user);
    }
  });
};