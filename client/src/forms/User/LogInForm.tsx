import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import userService from '../../services/userService';
import { logIn } from '../../store/User/actionCreators';
import { setNotification } from '../../store/Notification/actionCreators';
import { handleModal } from '../../store/modal/actionCreators';
import { createNewShoppingCart } from '../../store/ShoppingCart/actionCreators';
import shoppingCartService from '../../services/shoppingCartService';
import { retrieveOldShoppingCart } from '../../store/ShoppingCart/actionCreators'; 

const useStyles = makeStyles({
  field: {
    padding: 5,
    left: 10,
    borderColor: '#124eb0',
    position: 'relative',
    marginBottom: 10,
    width: '90%',
  },

  button: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    padding: 20,
    paddingRight: 5,
    left: '38%',
    transform: `translate(-50%, -$50%)`,
    borderWidth: 3,
    borderRadius: 35,      
    width: 92,
    height: 20,
    opacity: 0.95,
    backgroundColor: '#124eb0',
    fontSize: 16,
    fontStyle: 'bold',
    color: 'white'  
  },
});

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

  const usePreviousShoppingCart = (res: ShoppingCart) => { 
    void swal({
      title: 'Use unfinished shopping cart?',
      text: 'Previous unfinished shopping cart found, do you want to use that one or create new one? Old will be removed permanently if new is created',
      icon: 'info',
      buttons: ['Create new!', 'Use previous!'],
    })
    .then((findPrevious) => {
      if (findPrevious) {
        dispatch(retrieveOldShoppingCart(res.id, res.products));
        void shoppingCartService.setShoppingCartActivity(res.id, true);
        void swal({
          title: 'Success',
          text: 'Retrieved previous shopping cart, happy shopping',
          icon: 'success',
        });
      } else {
        const promise = shoppingCartService.createNewShoppingCart({ products: cartState.cart, user: res.user, id: '' });
          void promise.then((response) => {            
            console.log('response', response);
            const removed = shoppingCartService.removeShoppingCart(res.user);
            void removed.then((removedResponse) => {
              console.log('removedresponse', removedResponse);
            });
            dispatch(createNewShoppingCart(response.id));
            void swal({
              title: 'New Cart',
              text: 'Created new shopping cart, happy shopping',
              icon: 'success',
            });
          });
      }
    });
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
          const user = userService.signIn(values.userName, values.password);
          void user.then((res) => {
            if (!res.token) {
              dispatch(setNotification("Invalid username / password", 'error'));
            } else {
              const credentials: Credentials = {
                id: res.id,
                firstName: res.firstName,
                lastName: res.lastName,
                userName: res.userName,
                email: res.email,
                userType: res.userType,
                avatar: res.avatar,
                token: res.token,
              };
              window.localStorage.setItem(
                'loggedUser', JSON.stringify(credentials)
              );
              dispatch(logIn(credentials));
              dispatch(handleModal(false, 'LogIn'));
              dispatch(setNotification("Logged in as: " + credentials.userName, 'success'));
              
              const usersShoppingCart = shoppingCartService.getUsersShoppingCart(credentials.id);
              void usersShoppingCart.then((res) => {
                console.log('LoginForm get users shopping cart:', res);
                if (res) {
                  usePreviousShoppingCart(res);      
                } else {
                  const promise = shoppingCartService.createNewShoppingCart({ products: cartState.cart, user: credentials.id, id: '' });
                  void promise.then((res) => {
                    console.log('response', res);
                    dispatch(createNewShoppingCart(res.id));
                    // TODO: Deletoi vanha kärry kannasta
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
                <Grid item xs={2}>
                  <label>Username: </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Username"
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
                <Grid item xs={2}>
                  <label>Password: </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Password"
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
