/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React, { useEffect, useState } from "react";
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

import ImageForm from './forms/image/AddImageForm';
import axios from 'axios';

const App = (): JSX.Element => {
  const [ data, setData ] = useState('');
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    const testi = axios.get('http://localhost:3001/api/images');
    void testi.then((res) => {
      console.log('testi',res);
      console.log('data', res.data.data.data.toString());
    });
  }, []);
  
  

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
          console.log('valid timestamp');
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
          console.log('invalid timestamp');
          void shoppingCartService.setShoppingCartActivity(shoppingCart.cartId, false);
          dispatch(logIn());
          dispatch(clearShoppingCart());
          window.localStorage.removeItem('loggedUser');
        } 
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
          <Route path="/product" render={() => <ProductInfo />} />
        </Switch>

        <Switch>
          <Route exact path="/" render={() => <ProductListPage />} />
        </Switch>
      </Router> 
      <div>
      {data && 
        <img src={`${data}`} />
      }
      
      <ImageForm />
    </div>
    </div>
    
  );
};

export default App;