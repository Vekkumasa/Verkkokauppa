interface Product {
  id: string,
  name: string,
  price: number,
  stock: number
}

type ProductState = {
  products: Product[]
};

type ProductAction = {
  type: string,
  product: Product
};

type DispatchType = (args: ProductAction) => ProductAction;