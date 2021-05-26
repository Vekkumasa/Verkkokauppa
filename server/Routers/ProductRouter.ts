import express, { Request, Response } from 'express';
import productController from '../Controllers/ProductController';
import { ProductInterface } from '../models/product';
import { Product, CustomRequest } from '../types';

const router = express.Router();

router.get('/', [] , async (_req: Request, res: Response) => {
  const products: ProductInterface[] = await productController.GetProducts();
  return res.status(200).send(products);
});

router.post('/', (req: CustomRequest<Product>, res: Response) => {
  const product: Product = req.body;
  const added: Promise<ProductInterface | null> = productController.NewProduct(product);
  void added.then((response) => {
    res.status(201).json(response);
  });
});

router.put('/', (req: CustomRequest<Product>, res: Response) => {
  const modified: Promise<ProductInterface | null> = productController.ModifyProduct(req.body);
  void modified.then((response) => {
    if (!response) {
      res.status(400).json({ error: 'Something unexpected happened' });
    } else {
      res.status(201).json(response);
    }
  });
});

router.delete('/:id', (req: CustomRequest<Product>, res: Response) => {
  const deleted: Promise<ProductInterface | null> = productController.DeleteProduct(req.params.id);
  void deleted.then(() => {
    res.status(204).end();
  });
});

export default router;