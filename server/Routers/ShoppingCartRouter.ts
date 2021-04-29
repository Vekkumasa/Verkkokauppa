import express, { Request, Response } from 'express';
import { ShoppingCartInterface } from '../models/shoppingCart';
import shoppingCartController from '../Controllers/ShoppingCartController';
import { CustomRequest } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const carts: ShoppingCartInterface[] = await shoppingCartController.GetAllCarts();
  return res.status(200).send(carts);
});

router.post('/', (req: CustomRequest<string>, res: Response) => {
  const userId: string = req.body;
  console.log('router', userId);
  const added: Promise<ShoppingCartInterface | null> = shoppingCartController.NewCart(userId);
  void added.then((response) => {
    res.status(201).json(response);
  });
});

export default router;