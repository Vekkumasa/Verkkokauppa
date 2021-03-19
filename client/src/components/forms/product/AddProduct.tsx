import React from 'react';
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";

interface ProductFormValues {
  name: string;
  price: string;
  stock: string;
  image: string;
}

interface Description {
  description?: string;
}

interface InitialValues {
  initialName?: string;
  initialPrice?: string;
  initialStock?: string;
  initialImage?: string;
}

const InnerForm = (props: Description & FormikProps<ProductFormValues>): JSX.Element => {
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

const Form = withFormik<InitialValues, ProductFormValues>({
  mapPropsToValues: props => ({
      name: props.initialName || "",
      price: props.initialPrice || "",
      stock: props.initialStock || "",
      image: props.initialImage || ""
  }),


  validationSchema: Yup.object().shape({
    name: Yup.string()
          .required("Product name is required"),
    price: Yup.number()
          .required("Product price is required"),
    stock: Yup.number(),
    image: Yup.string()
  }),


  handleSubmit(
      { name, price, stock, image }: ProductFormValues,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { props, setSubmitting, setErrors }
  ) {
      console.log(name, price, stock, image);
  }
})(InnerForm);

export default Form;
