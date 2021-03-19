import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import ProductForm from './components/forms/product/AddProduct';

const App: React.FC = () => {

  return (
    <div>
      <Router>
        <Navibar />
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