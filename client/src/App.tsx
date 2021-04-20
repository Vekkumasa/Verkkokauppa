import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import AddProductPage from './components/AddProductPage';
import { initializeProducts } from './store/actionCreators';

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
        <AddProductPage />
      </Router>
    </div>
  );
};

export default App;