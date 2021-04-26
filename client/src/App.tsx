import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import { initializeProducts } from './store/Product/actionCreators';
import { useAppSelector, useAppDispatch, AppDispatch } from './store/rootReducer';

const App: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(initializeProducts());
  },[]);

  const user: Credentials | null = useAppSelector(
    state => state.userReducer.user
  );

  return (
    <div>
      <Router>
        <Navibar user={user} />
        <br/>
        <Switch>
          <Route path="/" render={() => <ProductListPage />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;