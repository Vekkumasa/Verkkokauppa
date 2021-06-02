import express, { Response } from 'express';
import { ShoppingCartInterface } from '../models/shoppingCart';
import shoppingCartController from '../Controllers/ShoppingCartController';
import { CartProduct, CustomRequest, NewShoppingCart, CustomBoolean } from '../types.d';

const router = express.Router();

router.get('/:id', (req: CustomRequest<string>, res: Response) => {
  const usersShoppingCart: Promise<ShoppingCartInterface | null> = shoppingCartController.findUsersShoppingCart(req.params.id);
  void usersShoppingCart.then((response) => {
    res.status(200).json(response);
  });
});

router.post('/', (req: CustomRequest<NewShoppingCart>, res: Response) => {
  const { products, user } = req.body;
  const newCart: Promise<ShoppingCartInterface> = shoppingCartController.createNewShoppingCart(products, user);
  void newCart.then((response) => {
    return res.status(201).json(response);
  });
});

router.post('/:id/addProduct', (req: CustomRequest<CartProduct>, res: Response) => {
  console.log('add product body', req.body);
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.addNewProductToCart(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(201).json(response);
    }
  });
});

router.put('/:id/remove', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.removeProductFromCart(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(201).json(response);
    }
  });
});

router.put('/:id/increase', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.increaseProductQuantity(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(201).json(response);
    }
  });
});

router.put('/:id/decrease', (req: CustomRequest<CartProduct>, res: Response) => {
  const cartProduct: Promise<ShoppingCartInterface | null> = shoppingCartController.decreaseProductQuantity(req.body);
  void cartProduct.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(201).json(response);
    }
  });
});

router.put('/:id/activity', (req: CustomRequest<CustomBoolean>, res: Response) => {
  const { data } = req.body;
  console.log('router', data);
  const shoppingCart: Promise<ShoppingCartInterface | null> = shoppingCartController.setActivity(req.params.id, data);
  void shoppingCart.then((response) => {
    if (!response) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(200).json(response);
    }
  });
});

router.put('/:id/completed', (req: CustomRequest<boolean>, res: Response) => {
  const shoppingCart: Promise<ShoppingCartInterface | null> = shoppingCartController.setCompleted(req.params.id);
  void shoppingCart.then((response) => {
    if (!response) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(200).json(response);
    }
  });
});

router.delete('/:id', (req: CustomRequest<string>, res: Response) => {
  const cart: Promise<ShoppingCartInterface | null> = shoppingCartController.removeShoppingCart(req.params.id);
  void cart.then((response) => {
    res.status(200).json(response);
  });
});

export default router;