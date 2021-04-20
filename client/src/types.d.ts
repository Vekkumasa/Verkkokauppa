type Product = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  description?: string
};

type NoIdProduct = Omit<Product, 'id'>

type ProductState = {
  products: Product[]
};

type AddProductAction = {
  type: string,
  data: Product,
};

type GetProductsAction = {
  type: string,
  data: Product[]
}


type Actions = AddProductAction | GetProductsAction

type DispatchType = (args: Actions) => Actions;

declare module "*.jpg" {
  const content: string;
  export = content;
}