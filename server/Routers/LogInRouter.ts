import express, { Request, Response } from 'express';
import loginController from '../Controllers/LogInController';
import { Credentials, LoginInfo } from '../types';

const router = express.Router();

router.post('/', (req: Request<unknown, unknown, LoginInfo>, res: Response) => {
  const { username, password }  = req.body;
  const loggedIn: Promise<Credentials | null> = loginController.logIn(username, password);
  if (loggedIn != null) {
    void loggedIn.then((response) => {
      res.status(201).send(response);
    });
  }
});

export default router;