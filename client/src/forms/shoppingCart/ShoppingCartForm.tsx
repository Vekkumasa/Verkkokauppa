import React from 'react';
import { Formik, Form, Field } from 'formik';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import { setNotification } from '../../store/Notification/actionCreators';
import { userCheck } from '../../typeGuards';
import shoppingCartService from '../../services/shoppingCartService';
import { clearShoppingCart } from '../../store/ShoppingCart/actionCreators';
import useStyles from '../formStyles';

const ShippingSchema = Yup.object().shape({
  firstName: Yup
    .string()
    .required("Required"),
  lastName: Yup
    .string()
    .required("Required"),
  address: Yup
    .string()
    .required("Required")
});
 
const ShoppingCartForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();

  const user: Credentials | undefined = useAppSelector(state => state.userReducer.user);
  const cartState: ShoppingCartState = useAppSelector(state => state.shoppingCartReducer);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: user ? user.firstName : '',
          lastName: user ? user.lastName : '',
          address: '',
        }}
        validationSchema={ShippingSchema}
        onSubmit={values => {
          const { firstName, lastName, address } = values;      
          const shippingInfo: ShippingInfo = { firstName, lastName, address };
          // TODO: Checkaa ettei kärry ole tyhjä
          if (userCheck(user)) {
            void shoppingCartService.setShoppingCartCompleted(cartState.cartId)
              .then((response) => {
                if (!response) {
                  console.log(response);
                  dispatch(setNotification('Unexpected error', 'error'));
                  // TODO: ??
                } else {
                  console.log(response);
                  dispatch(clearShoppingCart());
                  dispatch(setNotification('Delivering products to ' + shippingInfo.address, 'success'));
                }
            });
          }    
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>First name: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="First name"
                    type="text"
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.firstName && touched.firstName) && (
                    <div>{errors.firstName}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Last name: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Last name"
                    type="text"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.lastName && touched.lastName) && (
                    <div>{errors.lastName}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Address: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Address"
                    type="text"
                    name="address"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.address && touched.address) && (
                    <div>{errors.address}</div>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button disabled={!user} className={classes.button} style={{ left: '0%' }} type="submit"> Submit </button>
                {!user &&
                  <Typography variant="subtitle1" className={classes.logInText}> Please sign in first </Typography>
                }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShoppingCartForm;