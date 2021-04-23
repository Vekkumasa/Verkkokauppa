import React from 'react';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { makeStyles } from '@material-ui/styles';
import productService from '../../../services/productService';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { addProduct } from '../../../store/Product/actionCreators';

const useStyles = makeStyles({
  label: {
    
  },
  div: {
    display: 'flex',
    width: 600,
    justifyContent: 'flex-end'
  },

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
      <form onSubmit={handleSubmit}>
        <div className={classes.div}>
          <label className={classes.label}>Name: </label>
            <input
              className={classes.field}
              placeholder="My new product"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
        </div>
        <div className={classes.div}>
          <label>Description:</label>
            <input
              className={classes.field}
              placeholder="So useless product that Wish.com should sell these"
              type="textarea"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
        </div>
        <div className={classes.div}>
          <label>Price:</label>
            <input
              className={classes.field}
              type="number"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            />
        </div>
        <div className={classes.div}>
          <label>Stock:</label>
            <input
              className={classes.field}
              type="number"
              name="stock"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stock}
            />
        </div>
        <div className={classes.div}>
          <label>Image:</label> 
            <input
              className={classes.field}
              placeholder="www.example-image.com"
              type="text"
              name="image"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.image}
            />
        </div>
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

const AddProductForm = () => {
  const dispatch: Dispatch<any> = useDispatch();

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
