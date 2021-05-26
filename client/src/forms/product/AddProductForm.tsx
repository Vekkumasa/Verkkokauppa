import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch } from '../../store/rootReducer';
import productService from '../../services/productService';
import { addProduct } from '../../store/Product/actionCreators';
import { setNotification } from '../../store/Notification/actionCreators';
import ProductForm from './Form';

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
            <ProductForm errors={errors} touched={touched} />
          )}
        </Formik>
      </div>
  );
};

 export default AddProductForm;