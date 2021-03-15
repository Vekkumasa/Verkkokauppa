import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import ProductForm from './components/forms/product/AddProduct';

const App: React.FC = () => {

  const [ modalOpen, setModalOpen ] = useState(false);

  console.log(modalOpen);
  return (
    <div>
      <Router>
        <Navibar setModalOpen={setModalOpen} />
        <br/>
        <Switch>
          <Route path="/" render={() => <ProductListPage />} />
        </Switch>
        <ProductForm />
      </Router>
    </div>
  );
};

export default App;