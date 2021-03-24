import * as actionTypes from "./actionTypes";
import * as kirves from '../images/kirves.jpg';
import * as koppa from '../images/koppa.jpg';
import * as mokki from '../images/mokki.jpg';
import * as maggara from '../images/maggara.jpg';

const initialState: ProductState = {
  products: [
    {
      id: "1",
      name: "Kirves",
      price: 34.22,
      stock: 5,
      image: kirves,
      description: "Huippu kirves"
    },
    {
      id: "2",
      name: "Kori kaljaa",
      price: 25.00,
      stock: 12,
      image: koppa,
      description: "Koppa kalajaa"
    },
    {
      id: "3",
      name: "Makkaraa",
      price: 2.99,
      stock: 100,
      image: maggara,
      description: "Maggaraa"
    },
    {
      id: "4",
      name: "Mökki Pihtiputaalla",
      price: 20000,
      stock: 1,
      image: mokki,
      description: "Mökki Jumalan selän takaa"
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
        id: "1",
        name: action.product.name,
        price: action.product.price,
        stock: action.product.stock,
        image: ''
      };
      return {
        ...state,
        products: state.products.concat(newProduct),
      };
  }
  return state;
};

export default reducer;