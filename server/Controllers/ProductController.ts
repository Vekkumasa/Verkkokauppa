import { v4 as uuid } from 'uuid';
import Product, { ProductInterface } from "../models/product";
import { Product as ProductType, Image } from '../types.d';

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
      description: product.description,
      ratings: [],
      tags: product.tags,
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

  if (product === null) {
    return null;
  }

  return await product.remove();
};

const ModifyProduct = async (product: ProductType) => {
  const productToModify = await Product.findById(product._id);

  if (!productToModify) return null;

  productToModify.name = product.name;
  productToModify.description = product.description;
  productToModify.price = product.price;
  productToModify.stock = product.stock;

  await productToModify.save();

  return productToModify;
};

const ModifyProductImage = async (image: Image, productId: string) => {
  const product = await Product.findById(productId);
  if (product) {
    product.image = image;
    await product.save();
    console.log(product);
    return product;
  } else {
    return null;
  }
};

export default {
  GetProducts,
  NewProduct,
  DeleteProduct,
  ModifyProduct,
  ModifyProductImage,
};