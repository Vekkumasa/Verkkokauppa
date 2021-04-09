import { Request, Response } from "express";
import Product from "../models/product";

const AllProducts = (_req: Request, res: Response) => {
  console.log('testi');
  const products = Product.find((err: unknown, products: typeof Product) => {
    if (err) {
      res.send(err);
    } else {
      res.send(products);
    } 
  });
  console.log(products);
};

const GetProducts = async () => {
  return await Product.find({});
};

export default {
  AllProducts,
  GetProducts
};

