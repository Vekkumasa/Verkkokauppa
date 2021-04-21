/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express';
import productController from '../Controllers/ProductController';
import { Product } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const products = await productController.GetProducts();
  return res.status(200).send(products);
});

router.post('/', (req: Request, res: Response) => {
  const product: Product = req.body;
  const added = productController.NewProduct(product);
  void added.then((response) => {
    res.status(201).json(response);
  });
});

export default router;