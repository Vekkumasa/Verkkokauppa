import express, { Request, Response } from 'express';
import { ShoppingCartInterface } from '../models/shoppingCart';
import shoppingCartController from '../Controllers/ShoppingCartController';
import { CartProduct, CustomRequest } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const carts: ShoppingCartInterface[] = await shoppingCartController.GetAllCarts();
  return res.status(200).send(carts);
});

router.post('/', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.AddProductToCart(req.body);
  void cartProduct.then((response) => {
    res.status(201).json(response);
  });
});

export default router;