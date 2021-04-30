import express, { Request, Response } from 'express';
import { ShoppingCartInterface } from '../models/shoppingCart';
import shoppingCartController from '../Controllers/ShoppingCartController';
import { CartProduct, CustomRequest, UserId } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const carts: ShoppingCartInterface[] = await shoppingCartController.GetAllCarts();
  return res.status(200).send(carts);
});

router.post('/', (req: CustomRequest<UserId>, res: Response) => {
  const id: UserId = req.body;
  console.log('router', id);
  const added: Promise<ShoppingCartInterface | null> = shoppingCartController.NewCart(id);
  void added.then((response) => {
    res.status(201).json(response);
  });
});

router.post('/AddProductToCart', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<null> = shoppingCartController.AddProductToCart(req.body);
  void cartProduct.then((response) => {
    res.status(201).json(response);
  });
});

export default router;