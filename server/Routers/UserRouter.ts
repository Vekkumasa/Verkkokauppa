/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import userController from '../Controllers/UserController';
import { UserInterface } from '../models/user';
import { User } from '../types';

const router = express.Router();

router.get('/', [] ,  async  (_req: Request, res: Response) => {
  const users: UserInterface[] = await userController.allUsers();
  return res.status(200).send(users);
});

router.post('/', (req: Request<unknown, unknown, User>, res: Response) => {
  const user: User = req.body;
  console.log(user);
  const added: Promise<UserInterface | null> = userController.addUser(user);
  if (added != undefined) {
    void added.then((response) => {
      res.status(201).json(response);
    });
  }
});

export default router;