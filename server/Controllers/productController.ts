import { uuid } from "uuidv4";
import Product from "../models/product";
import { Product as ProductType } from '../types';

const GetProducts = async () => {
  return await Product.find({});
};

const NewProduct = async (product: ProductType) => {
  try {
    const newProduct = new Product({
      id: uuid(),
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      description: product.description
    });
    const response = await newProduct.save();
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  GetProducts,
  NewProduct,
};

