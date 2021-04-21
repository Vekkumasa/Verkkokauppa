/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import loginController from '../Controllers/LogInController';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { userName, passWord } = req.body;
  const loggedIn = loginController.logIn(userName, passWord);
  if (loggedIn != undefined) {
    void loggedIn.then((response) => {
      res.status(201).json(response);
    });
  } else {
    res.status(201).json({});
  }
});

export default router;