/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import loginController from '../Controllers/LogInController';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const loggedIn = loginController.logIn(username, password);
  if (loggedIn != null) {
    void loggedIn.then((response) => {
      res.status(201).send(response);
    });
  }
});

export default router;