import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import ShoppingCart from './components/ShoppingCart';

import { initializeProducts } from './store/Product/actionCreators';
import { useAppSelector, useAppDispatch, AppDispatch } from './store/rootReducer';
import Notification from './UI/Notification';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  notification: {

  },
});

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(initializeProducts());
  },[]);

  const user: Credentials | null = useAppSelector(
    state => state.userReducer.user
  );

  const notification: NotificationState = useAppSelector(
    state => state.notificationReducer
  );

  return (
    <div>
      <Router>
        <Navibar user={user} />
        <br/>
        {notification.visible ?
        <div>
          <Notification type={notification.type} message={notification.message} />
        </div>
        :
          null
        }
        <Switch>
          <Route path="/shoppingCart" render={() => <ShoppingCart />} />
        </Switch> 

        <Switch>
          <Route path="/products" render={() => <ProductListPage />} />
        </Switch>
   
      </Router>
    </div>
  );
};

export default App;