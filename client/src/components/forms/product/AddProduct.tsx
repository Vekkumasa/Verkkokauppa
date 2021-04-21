import React from 'react';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import productService from '../../../services/productService';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { addProduct } from '../../../store/actionCreators';

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
        <label>Description</label>
          <input
            type="textarea"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        <label>Price</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
          />
        <label>Stock</label>
          <input
            type="number"
            name="stock"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.stock}
          />
        <label>Image</label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.image}
          />
        <button
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

const Testi = () => {
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
  

export default Testi;
