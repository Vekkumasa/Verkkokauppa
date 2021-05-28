import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch } from '../../store/rootReducer';
import productService from '../../services/productService';
import { addProduct } from '../../store/Product/actionCreators';
import { setNotification } from '../../store/Notification/actionCreators';
import ProductForm from './ProductForm';

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
    .string(),
  uusiImage: Yup
    .mixed()
 });
 
 const AddProductForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
    return (
      <div>
        <Formik
          initialValues={{
            name: 'asd',
            description: '',
            price: 0,
            stock: 0,
            image: '',
            uusiImage: '' as unknown as File
          }}
          
          validationSchema={SignupSchema}
          onSubmit={values => {
            const { name, description, price, stock, image, uusiImage } = values;

            const product: NoIdProduct = { name, description, price, stock, image };
            const promise = productService.addProduct(product, uusiImage);
            void promise.then((res) => {
              if (res !== null) {
                const addedProduct: Product = {
                  name: res.name,
                  description: res.description,
                  price: res.price,
                  stock: res.stock,
                  image: res.image,
                  uusiImage: res.uusiImage,
                  _id: res._id
                };
                console.log('added product', addedProduct);
                dispatch(addProduct(addedProduct));
                dispatch(setNotification("Product " + product.name + " added", 'success'));
              } else {
                dispatch(setNotification("Erroria pukkaa", 'error'));
              }
            });
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <ProductForm errors={errors} touched={touched} setFieldValue={setFieldValue}  />
          )}
        </Formik>
      </div>
  );
};

 export default AddProductForm;