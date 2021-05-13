import { uuid } from "uuidv4";
import Product, { ProductInterface } from "../models/product";
import { Product as ProductType } from '../types';

const GetProducts = async (): Promise<ProductInterface[]> => {
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

const DeleteProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    return null;
  }

  return await product.remove();
};

export default {
  GetProducts,
  NewProduct,
  DeleteProduct,
};

