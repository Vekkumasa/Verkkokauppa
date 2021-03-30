import { Request, Response } from "express";
import ProductModel from "../models/product";

const AllProducts = (_req: Request, res: Response) => {
  console.log('testi');
  const products = ProductModel.find((err: unknown, products: typeof ProductModel) => {
    if (err) {
      res.send(err);
    } else {
      res.send(products);
    } 
  });
  console.log(products);
};


export default {
  AllProducts,
};

/*
void promise.then(promise => {
    promise.map(product => {
    //  console.log(product);
      const newProduct: noIdProduct = {
        name: product.name,
        stock: product.stock,
        price: product.price,
        description: product.description,
        image: product.image
      };  
      products.push(newProduct);
      console.log('push', products.length);
    });
    
  });
  */