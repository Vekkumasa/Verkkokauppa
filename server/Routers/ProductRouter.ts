import express, { Request, Response } from 'express';
import productController from '../Controllers/ProductController';
import { ProductInterface } from '../models/product';
import { Product } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const products: ProductInterface[] = await productController.GetProducts();
  return res.status(200).send(products);
});

router.post('/', (req: Request<unknown, unknown, Product>, res: Response) => {
  const product: Product = req.body;
  const added: Promise<ProductInterface | null> = productController.NewProduct(product);
  void added.then((response) => {
    res.status(201).json(response);
  });
});

export default router;