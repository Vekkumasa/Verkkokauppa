import express, { Request, Response } from 'express';
import userController from '../Controllers/UserController';
import { ShoppingCartInterface } from '../models/shoppingCart';
import { UserInterface } from '../models/user';
import { User, CustomRequest, Image } from '../types.d';
import upload from '../utils/Multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', [] ,  async  (_req: Request, res: Response) => {
  const users: UserInterface[] = await userController.allUsers();
  return res.status(200).send(users);
});

router.get('/:id/', (req: Request, res: Response) => {
  const shoppingCarts: Promise<ShoppingCartInterface[] | null> = userController.getCompletedShoppingCarts(req.params.id);
  void shoppingCarts.then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(201).json(response);
    }
  });
});

router.post('/', (req: CustomRequest<User>, res: Response) => {
  const user: User = req.body;
  const added: Promise<UserInterface | null> = userController.addUser(user);
  if (added != null) {
    void added.then((response) => {
      res.status(201).json(response);
    });
  } else {
    res.status(400).json({ error: "Creating user failed" });
  }
});

router.put('/', (req: CustomRequest<User>, res: Response) => {
  const user: User = req.body;
  console.log('router', user);
  const modified: Promise<UserInterface | null> = userController.modifyUser(user);
  if (modified != null) {
    void modified.then((response) => {
      res.status(201).json(response);
    });
  } else {
    res.status(400).json({ error: "User modifying failed" });
  }
});

router.put('/:id/', (req: CustomRequest<{ productId: string, value: number}>, res: Response) => {
  console.log('params', req.params.id);
  const { productId, value } = req.body;
  console.log('body', productId, ' ', value);
  const rated = userController.rateProduct(req.params.id, productId, value);
  if (rated != null) {
    void rated.then((response) => {
      res.status(201).json(response);
    });
  } else {
    res.status(400).json({ error: "Rating failed" });
  }
});

router.put('/:id/image', upload.single('image'), (req: CustomRequest<File>, res: Response) => {
  const obj: Image = {
        data: fs.readFileSync(path.join(__dirname+'../../../Uploads/' + req.file.filename)),
        contentType: 'image/png' 
  };
  console.log('router', obj);
  const modified: Promise<UserInterface | null> = userController.modifyUserAvatar(obj, req.params.id);
  void modified.then((response) => {
    if (response === null) {
      console.log('Error imagessa');
    } else {
      res.status(201).json(response);
    }
  });
});

export default router;