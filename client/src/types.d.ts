type Product = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  description?: string
};

type ProductState = {
  products: Product[]
};

type ProductAction = {
  type: string,
  product: Product
};

type DispatchType = (args: ProductAction) => ProductAction;

declare module "*.jpg" {
  const content: string;
  export = content;
}