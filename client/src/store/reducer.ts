import * as actionTypes from "./actionTypes";

const initialState: ProductState = {
  products: [
    {
      id: "1",
      name: "Kirves",
      price: 34.22,
      stock: 5
    },
    {
      id: "2",
      name: "Kori kaljaa",
      price: 25.00,
      stock: 12
    },
    {
      id: "3",
      name: "Makkaraa",
      price: 2.99,
      stock: 100
    },
    {
      id: "4",
      name: "Mökki Pihtiputaalla",
      price: 20000,
      stock: 1
    }
  ],
};

const reducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      const newProduct: Product = {
        id: "1", // not really unique
        name: action.product.name,
        price: action.product.price,
        stock: action.product.stock
      };
      return {
        ...state,
        products: state.products.concat(newProduct),
      };
  }
  return state;
};

export default reducer;