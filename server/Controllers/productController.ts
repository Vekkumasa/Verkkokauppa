import { Request, Response } from "express";
import Product from "../models/product";

export const allProducts = (_req: Request, res: Response) => {
  const products = Product.find((err: unknown, products: unknown) => {
    if (err) {
      res.send(err);
    } else {
      res.send(products);
    } 
  });
  console.log(products);
};