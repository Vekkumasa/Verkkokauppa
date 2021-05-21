import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch } from '../../store/rootReducer';
import productService from '../../services/productService';
import { addProduct } from '../../store/Product/actionCreators';
import { setNotification } from '../../store/Notification/actionCreators';

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
  name: Yup
    .string()
    .required("Required"),
  description: Yup
    .string(),
  price: Yup
    .number()
    .required("Required"),
  stock: Yup
    .number(),
  image: Yup
    .string()
 });
 
 const AddProductForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
    return (
      <div>
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: 0,
            stock: 0,
            image: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            const { name, description, price, stock, image } = values;
            const product: NoIdProduct = { name, description, price, stock, image};
            const promise = productService.addProduct(product);
            void promise.then((res) => {
              const addedProduct: Product = {
                name: res.name,
                description: res.description,
                price: res.price,
                stock: res.stock,
                image: res.image,
                _id: res._id
              };
              dispatch(addProduct(addedProduct));
              const text = "Product " + product.name + " added";
              const type: NotificationType = 'success';
              dispatch(setNotification(text, type));
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={2}>
                    <label>Name: <b style={{color: 'red'}}>*</b> </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      className={classes.field}
                      placeholder="My New Product"
                      type="text"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {(errors.name && touched.name) && (
                      <div>{errors.name}</div>
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={2}>
                    <label>Description: </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      className={classes.field}
                      placeholder="So useless product that Wish.com should sell these (optional)"
                      type="text"
                      name="description"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {(errors.description && touched.description) && (
                      <div>{errors.description}</div>
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={2}>
                    <label>Price: <b style={{color: 'red'}}>*</b> </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      className={classes.field}
                      placeholder="Price"
                      type="number"
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {(errors.price && touched.price) && (
                      <div>{errors.price}</div>
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={2}>
                    <label>Stock: </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      className={classes.field}
                      placeholder="Stock (optional)"
                      type="number"
                      name="stock"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {(errors.stock && touched.stock) && (
                      <div>{errors.stock}</div>
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={2}>
                    <label>Image: </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      className={classes.field}
                      placeholder="www.image.com (optional)"
                      type="text"
                      name="image"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {(errors.image && touched.image) && (
                      <div>{errors.image}</div>
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

 export default AddProductForm;