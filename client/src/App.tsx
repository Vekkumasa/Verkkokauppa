import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navibar } from './components/Navibar';
import { ProductListPage } from './components/ProductListPage';
import ProductInfo  from './components/ProductInfo';
import Account from './components/Account';
import PastOrders from './components/PastOrders';
import ShoppingCart from './components/ShoppingCart';
import shoppingCartService from './services/shoppingCartService';

import { initializeProducts } from './store/Product/actionCreators';
import { createNewShoppingCart, retrieveOldShoppingCart, clearShoppingCart } from './store/ShoppingCart/actionCreators';
import { logIn } from './store/User/actionCreators';
import { useAppSelector, useAppDispatch, AppDispatch } from './store/rootReducer';

import Notification from './UI/Notification';
import { safeJsonParse, isCredentialsWithTimestamp } from './typeGuards';
import { validTimeStamp } from './utils/ValidTimeStamp';

import Sidebar from './components/Sidebar';

const App = (): JSX.Element => {
  const [ redirect, setRedirect ] = useState('');
  const dispatch: AppDispatch = useAppDispatch();

  const user: Credentials | undefined = useAppSelector(
    state => state.userReducer.user
  );

  const notification: NotificationState = useAppSelector(
    state => state.notificationReducer
  );

  const shoppingCart: ShoppingCartState = useAppSelector(
    state => state.shoppingCartReducer
  );

  useEffect(() => {
    void dispatch(initializeProducts());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
      if (loggedUser) {
      const parsedUser = safeJsonParse(isCredentialsWithTimestamp)(loggedUser);
      if (parsedUser.hasError) {
        console.log('error at parsed user');
      } else {
        if (validTimeStamp(parsedUser.parsed.timestamp)) {
          dispatch(logIn(parsedUser.parsed));
          const usersShoppingCart = shoppingCartService.getUsersShoppingCart(parsedUser.parsed._id);
          void usersShoppingCart.then((res) => {
            if (res) {
              dispatch(retrieveOldShoppingCart(res.id, res.products));
            } else {
              void shoppingCartService.createNewShoppingCart({ 
                products: shoppingCart.cart,
                user: parsedUser.parsed._id,
                id: shoppingCart.cartId
              }).then((res => {
                dispatch(createNewShoppingCart(res.id));
              }));
            }
          });
        } else {
          void shoppingCartService.setShoppingCartActivity(shoppingCart.cartId, false);
          dispatch(logIn());
          dispatch(clearShoppingCart());
          window.localStorage.removeItem('loggedUser');
        } 
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setRedirect('');
    } else {
      setRedirect('/');
    }
  }, [user]);
  
  console.log('redirect: ', redirect);
  
  return (
    <div>
      <Router>
        <Navibar redirect={redirect} user={user} />
        <br/>
        {notification.visible && (
          <div>
            <Notification type={notification.type} message={notification.message} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Sidebar />
          <Switch>
            <Route path="/account" render={() => <Account user={user}/>} />
          </Switch>

          <Switch>
            <Route path='/pastOrders' render={() => <PastOrders redirect={redirect} />} />
          </Switch>

          <Switch>
            <Route path="/shoppingCart" render={() => <ShoppingCart />} />
          </Switch>

          <Switch>
            <Route path="/product" render={() => <ProductInfo />} />
          </Switch>

          <Switch>
            <Route exact path="/" render={() => <ProductListPage />} />
          </Switch>
        </div>
      </Router> 

    </div>
    
  );
};

export default App;