/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import userController from '../Controllers/UserController';
import { User } from '../types';

const router = express.Router();

router.get('/', [] ,  async  (_req: Request, res: Response) => {
  const users = await userController.allUsers();
  return res.status(200).send(users);
});

router.post('/', (req: Request, res: Response) => {
  const user: User = req.body;
  console.log(user);
  const added = userController.addUser(user);
  if (added != undefined) {
    void added.then((response) => {
      res.status(201).json(response);
    });
  }
});

export default router;