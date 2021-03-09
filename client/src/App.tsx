import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const App: React.FC = () => {

  const products: readonly Product[] = useSelector(
    (state: ProductState) => state.products,
    shallowEqual
  );

  console.log(products);
  return (
    <div>
      <h1> Verkkokauppa </h1>
    </div>
  );
};

export default App;