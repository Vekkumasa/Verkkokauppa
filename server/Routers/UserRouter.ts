import express, { Request, Response } from 'express';
import userController from '../Controllers/UserController';
import { UserInterface } from '../models/user';
import { User, CustomRequest } from '../types.d';

const router = express.Router();

router.get('/', [] ,  async  (_req: Request, res: Response) => {
  const users: UserInterface[] = await userController.allUsers();
  return res.status(200).send(users);
});

router.post('/', (req: CustomRequest<User>, res: Response) => {
  const user: User = req.body;
  const added: Promise<UserInterface | null> = userController.addUser(user);
  if (added != null) {
    void added.then((response) => {
      res.status(201).json(response);
    });
  } else {
    res.status(400).json({ error: "Creating user failed" });
  }
});

router.put('/', (req: CustomRequest<User>, res: Response) => {
  const user: User = req.body;
  const modified: Promise<UserInterface | null> = userController.modifyUser(user);
  if (modified != null) {
    void modified.then((response) => {
      res.status(201).json(response);
    });
  } else {
    res.status(400).json({ error: "User modifying failed" });
  }
});

export default router;