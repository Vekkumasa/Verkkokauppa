import { Request, Response } from "express";
import User from "../models/user";

export const allUsers = (_req: Request, res: Response) => {
  const users = User.find((err: unknown, users: typeof User) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    } 
  });
  console.log(users);
};

/*
export const showUser = (req: Request, res: Response) => {
  const user = User.findById(req.params.id, (err: any, user: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

export const addUser = (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

*/