import express, { Request, Response } from 'express';
import { ShoppingCartInterface } from '../models/shoppingCart';
import shoppingCartController from '../Controllers/shoppingCartController';
import { CartProduct, CustomRequest, NewShoppingCart } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const carts: ShoppingCartInterface[] = await shoppingCartController.GetAllCarts();
  return res.status(200).send(carts);
});

router.post('/', (req: CustomRequest<NewShoppingCart>, res: Response) => {
  const { products, userId } = req.body;
  const newCart: Promise<ShoppingCartInterface> = shoppingCartController.createNewShoppingCart(products, userId);
  void newCart.then((response) => {
    return res.status(201).json(response);
  });
});

router.post('/:id/addProduct', (req: CustomRequest<CartProduct>, res: Response) => {
  console.log('req body', req.body);
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.AddNewProductToCart(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something happened' });
    }
    res.status(201).json(response);
  });
});

router.put('/:id/remove', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.RemoveProductFromCart(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something happened' });
    }
    res.status(201).json(response);
  });
});

router.put('/:id/increase', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.IncreaseProductQuantity(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something happened' });
    }
    res.status(201).json(response);
  });
});

router.put('/:id/decrease', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.DecreaseProductQuantity(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something happened' });
    }
    res.status(201).json(response);
  });
});

export default router;