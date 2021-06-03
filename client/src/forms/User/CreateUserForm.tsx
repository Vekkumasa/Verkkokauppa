import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/userService';
import { AppDispatch, useAppDispatch } from '../../store/rootReducer';
import { setNotification } from '../../store/Notification/actionCreators';
import { handleModal } from '../../store/modal/actionCreators';
import UserForm from './UserForm';

const SignupSchema = Yup.object().shape({
  userName: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  firstName: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  lastName: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup
    .string()
    .email('Invalid email')
    .required('Required'),
});

const CreateUserForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          userName: '',
          firstName: '',
          lastName: '',
          password: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const newUser: NoIdUser = { 
            userName: values.userName,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            email: values.email,
            userType: 'User',
          };
          const promise = userService.createUser(newUser);
          promise.then((res) => {
            // TODO: Korjaa backendi palauttamaan mikä kohta lomakkeessa feilaa
            if (!res) {
              dispatch(setNotification("User creation failed",  'error'));
            } else {
              dispatch(handleModal(false, 'CreateUser'));
              dispatch(setNotification("Created user: " + newUser.userName, 'success'));
            }
          }).catch(e => console.log(e));    
        }}
      >
        {({ errors, touched }) => (
          <UserForm errors={errors} touched={touched} />
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;