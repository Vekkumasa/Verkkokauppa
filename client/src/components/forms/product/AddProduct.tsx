import React from 'react';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import { AppDispatch, useAppDispatch } from '../../../store/rootReducer';
import productService from '../../../services/productService';
import { addProduct } from '../../../store/Product/actionCreators';

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

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
interface InitialValues {
  initialName?: string;
  initialDescription?: string;
  initialPrice?: number;
  initialStock?: number;
  initialImage?: string;
}

const InnerForm = (props: FormikProps<ProductFormValues>): JSX.Element => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Name: </label>
          </Grid>
          <Grid item xs={10}>
          <input
            className={classes.field}
            placeholder="My new product"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Description: </label>
          </Grid>
          <Grid item xs={10}>
          <input
            className={classes.field}
            placeholder="So useless product that Wish.com should sell these"
            type="text"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Price: </label>
          </Grid>
          <Grid item xs={10}>
          <input
            className={classes.field}
            type="number"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
          />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Stock: </label>
          </Grid>
          <Grid item xs={10}>
          <input
            className={classes.field}
            type="number"
            name="stock"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.stock}
          />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Image: </label>
          </Grid>
          <Grid item xs={10}>
          <input
            className={classes.field}
            placeholder="www.example-image.com"
            type="text"
            name="image"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.image}
          />
          </Grid>
        </Grid>
      </Grid>
        <form onSubmit={handleSubmit}>
          <button
            className={classes.button}
            type="submit"
            disabled={
              isSubmitting ||
              !!(errors.name && touched.name) ||
              !!(errors.description && touched.description) ||
              !!(errors.price && touched.price) ||
              !!(errors.stock && touched.stock) ||
              !!(errors.image && touched.image) 
            }
          >
            Add Product
          </button>
        </form>
    </div>
  );
};

const AddProductForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const Form = withFormik<InitialValues, ProductFormValues>({
    mapPropsToValues: props => ({
        name: props.initialName || "",
        description: props.initialDescription || "",
        price: props.initialPrice || 0,
        stock: props.initialStock || 0,
        image: props.initialImage || ""
    }),


    validationSchema: Yup.object().shape({
      name: Yup.string()
            .required("Product name is required"),
      description: Yup.string(),
      price: Yup.number()
            .required("Product price is required"),
      stock: Yup.number(),
      image: Yup.string()
    }),


    handleSubmit(
        { name, description, price, stock, image }: ProductFormValues,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { props, setSubmitting, setErrors }
    ) {
        const product: NoIdProduct = { name, description, price, stock, image};
        const promise = productService.addProduct(product);
        void promise.then((res) => {
          const addedProduct: Product = {
            name: res.name,
            description: res.description,
            price: res.price,
            stock: res.stock,
            image: res.image,
            id: res.id
          };
          dispatch(addProduct(addedProduct));
        });
    }
  })(InnerForm);

  return <Form />;
};
  

export default AddProductForm;
