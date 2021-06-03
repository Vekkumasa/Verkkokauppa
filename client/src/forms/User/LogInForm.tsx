import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import swal from 'sweetalert';
import platform from 'platform';

import { platformParser } from '../../utils/platformParser';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import userService from '../../services/userService';
import { logIn } from '../../store/User/actionCreators';
import { setNotification } from '../../store/Notification/actionCreators';
import { handleModal } from '../../store/modal/actionCreators';
import { createNewShoppingCart } from '../../store/ShoppingCart/actionCreators';
import shoppingCartService from '../../services/shoppingCartService';
import { retrieveOldShoppingCart } from '../../store/ShoppingCart/actionCreators'; 
import useStyles from '../formStyles';

const SignupSchema = Yup.object().shape({
  userName: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LogInForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const cartState: ShoppingCartState = useAppSelector(state => state.shoppingCartReducer);
  const classes = useStyles();
  
  const platformInfo = platformParser(platform.name, platform.os?.family, platform.os?.version); 

  const usePreviousShoppingCart = (res: ShoppingCart) => { 
    if (res.products.length !== 0) {
      void swal({
        title: 'Keskeneräinen ostoskori havaittu',
        text: 'Keskeneräinen ostoskori löydetty, haluatko jatkaa siitä mihin jäit viime kerralla vai luodaanko uusi? Vanha ostoskori poistetaan kokonaan mikäli halutaan luoda uusi',
        icon: 'info',
        buttons: ['Luo uusi!', 'Jatketaan edellistä!'],
      })
      .then((findPrevious) => {
        if (findPrevious) {
          dispatch(retrieveOldShoppingCart(res.id, res.products));
          void shoppingCartService.setShoppingCartActivity(res.id, true);
        } else {
          const promise = shoppingCartService.createNewShoppingCart({ products: cartState.cart, user: res.user, id: '' });
          void promise.then((response) => {            
            const removed = shoppingCartService.removeShoppingCart(res.user);
            void removed.then(() => {
              console.log('removed shopping cart');
            });
            dispatch(createNewShoppingCart(response.id));
          });
        }
      });
    } else {
      dispatch(retrieveOldShoppingCart(res.id, res.products));
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const user = userService.signIn(values.userName, values.password, platformInfo);
          void user.then((res) => {
            if (!res.token) {
              dispatch(setNotification("Virheellinen käyttäjänimi / salasana", 'error'));
            } else {
              const credentials: Credentials = {
                _id: res._id,
                firstName: res.firstName,
                lastName: res.lastName,
                userName: res.userName,
                email: res.email,
                userType: res.userType,
                avatar: res.avatar,
                token: res.token,
                recentActivity: res.recentActivity,
                platformInfo: res.platformInfo,
                ratings: res.ratings,
              };
              const storeInfo: CredentialsWithTimeStamp = { ...credentials, timestamp: new Date };
              window.localStorage.setItem(
                'loggedUser', JSON.stringify(storeInfo)
              );
              dispatch(logIn(credentials));
              dispatch(handleModal(false, 'LogIn'));
              dispatch(setNotification("Kirjauduttu sisään: " + credentials.userName, 'success'));
              
              const usersShoppingCart = shoppingCartService.getUsersShoppingCart(credentials._id);
              void usersShoppingCart.then((res) => {
                if (res) {
                  usePreviousShoppingCart(res);      
                } else {
                  const promise = shoppingCartService.createNewShoppingCart({ products: cartState.cart, user: credentials._id, id: '' });
                  void promise.then((res) => {
                    dispatch(createNewShoppingCart(res.id));
                  });
                }
              });
            }
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={3}>
                  <label>Käyttäjänimi: </label>
                </Grid>
                <Grid item xs={8}>
                  <Field
                    className={classes.field}
                    placeholder="Käyttäjänimi"
                    type="text"
                    name="userName"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.userName && touched.userName) && (
                    <div>{errors.userName}</div>
                  )}
                </Grid>
              </Grid>
              
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={3}>
                  <label>Salasana: </label>
                </Grid>
                <Grid item xs={8}>
                  <Field
                    className={classes.field}
                    placeholder="Salasana"
                    type="password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.password && touched.password) && (
                    <div>{errors.password}</div>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <button className={classes.button} type="submit">Submit</button>
          </Form>
        )}
      </Formik>      
    </div>
 );
};

 export default LogInForm;
