/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import productController from '../Controllers/productController';
import ProductController from '../Controllers/productController';
import { Product } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const products = await ProductController.GetProducts();
  return res.status(200).send(products);
});

router.post('/', (req: Request, res: Response) => {
  const product: Product = req.body;
  productController.NewProduct(product);
  res.json(product);
});

export default router;