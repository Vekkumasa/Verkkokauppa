import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BaseUrl } from './constants';
import { Product } from './types';

const App: React.FC = () => {

  const [ products, setProducts ] = useState<Product[]>([]);

  useEffect(() => {
    void axios.get<void>(`${BaseUrl}/ping`);
    
    void axios.get<Product[]>(`${BaseUrl}/products`).then(response => {
      console.log('promise fulfilled');
      setProducts(response.data);
    });
  }, []);
  
  console.log('product', products);
  
  return (
    <div>
      <h1> Verkkokauppa </h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));