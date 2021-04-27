import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import { initializeProducts } from './store/Product/actionCreators';
import { useAppSelector, useAppDispatch, AppDispatch } from './store/rootReducer';
import Notification from './UI/Notification';

const App: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(initializeProducts());
  },[]);

  const user: Credentials | null = useAppSelector(
    state => state.userReducer.user
  );

  const type: NotificationType = 'success';
  const message = "testi";

  return (
    <div>
      <Router>
        <Navibar user={user} />
        <br/>
        <Switch>
          <Route path="/" render={() => <ProductListPage />} />
        </Switch>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Notification type={type} message={message} />
      </Router>
    </div>
  );
};

export default App;