import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import ProductForm from './components/forms/product/AddProduct';
import { initializeProducts } from './store/actionCreators';
//import axios from 'axios';

const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(initializeProducts());
  },[]);

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