import express, { Request, Response } from 'express';
import Product from '../models/product';
//import ProductController from '../Controllers/productController';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const products = await Product.find({});
  return res.status(200).send(products);
});

router.post('/', (_req, res) => {
  res.send('Saving a product!');
});

export default router;