import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import { initializeProducts } from './store/Product/actionCreators';
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(initializeProducts());
  },[]);

  const user: Credentials | null = useSelector(
    (state: AppState) => state.user.user,
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