import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import userService from '../../services/userService';
import { logIn } from '../../store/User/actionCreators';
import { setNotification, hideNotification } from '../../store/Notification/actionCreators';
import { handleModal } from '../../store/modal/actionCreators';
import { createNewShoppingCart } from '../../store/ShoppingCart/actionCreators';
import shoppingCartService from '../../services/shoppingCartService';

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
              const notificationType: NotificationType = 'error';
              dispatch(setNotification("Invalid username / password", notificationType));
              setTimeout(() => {
                dispatch(hideNotification());
              }, 5000);
            } else {
              const credentials: Credentials = {
                id: res.id,
                firstName: res.firstName,
                lastName: res.lastName,
                userName: res.userName,
                userType: res.userType,
                token: res.token,
              };
              dispatch(logIn(credentials));
              dispatch(handleModal(false, 'LogIn'));
              const notificationType: NotificationType = 'success';
              dispatch(setNotification("Logged in as: " + credentials.userName, notificationType));
              setTimeout(() => {
                dispatch(hideNotification());
              }, 5000);
              const promise = shoppingCartService.createNewShoppingCart({ products: cartState.cart, userId: res.id });
              void promise.then((res) => {
                console.log('response', res);
                dispatch(createNewShoppingCart(res.id));
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
