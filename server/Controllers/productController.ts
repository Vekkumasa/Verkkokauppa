import { Request, Response } from "express";
import { uuid } from "uuidv4";
import Product from "../models/product";
import { Product as ProductType } from '../types';

const AllProducts = (_req: Request, res: Response) => {
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

const NewProduct = (product: ProductType) => {
  try {
    const newProduct = new Product({
      id: uuid(),
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      descripstion: product.description
    });
    void newProduct.save().then((response: unknown) => {
      console.log('product saved!');
      console.log(response);
      });
  } catch (e) {
    console.log(e);
  }
};

export default {
  AllProducts,
  GetProducts,
  NewProduct,
};

