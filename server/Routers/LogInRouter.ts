/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import loginController from '../Controllers/LogInController';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { userName, passWord } = req.body;
  const loggedIn = loginController.logIn(userName, passWord);
  if (loggedIn != null) {
    void loggedIn.then((response) => {
      res.status(200).send(response);
    });
  } else {
    res.status(400).json({});
  }
});

export default router;