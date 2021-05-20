import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navibar } from './components/Navibar';
import { ProductListPage } from './components/ProductListPage';
import Account from './components/Account';
import PastOrders from './components/PastOrders';
import ShoppingCart from './components/ShoppingCart';
import shoppingCartService from './services/shoppingCartService';

import { initializeProducts } from './store/Product/actionCreators';
import { retrieveOldShoppingCart } from './store/ShoppingCart/actionCreators';
import { logIn } from './store/User/actionCreators';
import { safeJsonParse, isCredentials } from './typeGuards';

import { useAppSelector, useAppDispatch, AppDispatch } from './store/rootReducer';
import Notification from './UI/Notification';

const App = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const user: Credentials | undefined = useAppSelector(
    state => state.userReducer.user
  );

  const notification: NotificationState = useAppSelector(
    state => state.notificationReducer
  );

  useEffect(() => {
    void dispatch(initializeProducts());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
      if (loggedUser) {
      const parsedUser = safeJsonParse(isCredentials)(loggedUser);
      if (parsedUser.hasError) {
        console.log('error at parsed user');
      } else {
        dispatch(logIn(parsedUser.parsed));
        const usersShoppingCart = shoppingCartService.getUsersShoppingCart(parsedUser.parsed.id);
        void usersShoppingCart.then((res) => {
          dispatch(retrieveOldShoppingCart(res.id, res.products));
        });
      }
    }
  }, []);
  
  return (
    <div>
      <Router>
        <Navibar user={user} />
        <br/>
        {notification.visible && (
          <div>
            <Notification type={notification.type} message={notification.message} />
          </div>
        )}
        <Switch>
          <Route path="/account" render={() => <Account user={user}/>} />
        </Switch>

        <Switch>
          <Route path='/pastOrders' render={() => <PastOrders />} />
        </Switch>

        <Switch>
          <Route path="/shoppingCart" render={() => <ShoppingCart />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={() => <ProductListPage />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;