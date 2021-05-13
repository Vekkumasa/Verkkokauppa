import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import { setNotification, hideNotification } from '../../store/Notification/actionCreators';
import { userCheck } from '../../typeGuards';

const useStyles = makeStyles({
  field: {
    padding: 5,
    borderColor: '#124eb0',
    position: 'relative',
    marginBottom: 10,
    width: '90%',
    maxWidth: 700
  },
  
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    padding: 20,
    paddingRight: 75,
    marginTop: 10,
    paddingBottom: 20,
    transform: `translate(-50%, -$50%)`,
    borderWidth: 3,
    borderRadius: 10,      
    width: 92,
    height: 20,
    opacity: 0.95,
    backgroundColor: '#124eb0',
    fontSize: 16,
    fontStyle: 'bold',
    color: 'white'  
  },

  logInText: {
    position: 'relative',
    marginLeft: 20,
    marginTop: 20,
  }
});

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

  const user: Credentials | null = useAppSelector(state => state.userReducer.user);
  const products: ShoppingCartProduct[] = useAppSelector(state => state.shoppingCartReducer.cart);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          address: '',
        }}
        validationSchema={ShippingSchema}
        onSubmit={values => {
          const { firstName, lastName, address } = values;
          const shippingInfo: ShippingInfo = { firstName, lastName, address };

          if (userCheck(user)) {
            const text = "Delivering products to " + shippingInfo.address;
            const type: NotificationType = 'success';
            dispatch(setNotification(text, type));
            setTimeout(() => {
              dispatch(hideNotification());
            }, 5000);
          }    
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>First name: </label>
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
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Last name: </label>
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
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Address: </label>
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
                  {errors.address && touched.address ? (
                    <div>{errors.address}</div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button disabled={user === null} className={classes.button} type="submit"> Submit </button>
                {user === null ?
                  <Typography variant="subtitle1" className={classes.logInText}> Please sign in first </Typography>
                  :
                  null
                }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShoppingCartForm;