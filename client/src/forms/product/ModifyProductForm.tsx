import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import productService from '../../services/productService';
import { initializeProducts } from '../../store/Product/actionCreators';
import { setActiveProduct } from '../../store/ActiveProduct/actionCreators';
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
    .string()
 });
 
 const ModifyProductForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const item = useAppSelector(state => state.activeProductReducer.product);
  if (!item) return <div></div>;

    return (
      <div>
        <Formik
          initialValues={{
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            image: item.image,
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            const { name, description, price, stock, image } = values;
            const product: Product = { name, description, price, stock, image, _id: item._id };
            const promise = productService.modifyProduct(product);
            void promise.then((res) => {
              if (!res) {
                dispatch(setNotification("Unexpected error", 'error'));
              }
              console.log('modify product response:', res);
              void dispatch(setActiveProduct(res));
              void dispatch(initializeProducts());
              dispatch(setNotification("Product " + product.name + " modified", 'success'));
            });
          }}
        >
          {({ errors, touched }) => (
          //  <ProductForm errors={errors} touched={touched} />
          <div></div>
          )}
        </Formik>
      </div>
  );
};

 export default ModifyProductForm;