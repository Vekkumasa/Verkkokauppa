import express, { Response } from 'express';
import loginController from '../Controllers/LogInController';
import { LoginInfo, CustomRequest, Credentials } from '../types';

const router = express.Router();

router.post('/', (req: CustomRequest<LoginInfo>, res: Response) => {
  const { username, password, date }  = req.body;
  const loggedIn: Promise<Credentials | null> = loginController.logIn(username, password, date);
  void loggedIn.then((response) => {
    res.status(201).send(response);
  });
});

export default router;