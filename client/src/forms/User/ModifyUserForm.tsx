import React from 'react';
import { Formik, Form, Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import userService from '../../services/userService';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import { setNotification } from '../../store/Notification/actionCreators';
import { handleModal } from '../../store/modal/actionCreators';
import { logIn } from '../../store/User/actionCreators';
import useStyles from '../formStyles';
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
      .string(),

    email: Yup
      .string()
      .email('Invalid email')
      .required('Required'),
 });
 
 const ModifyUserForm = ():JSX.Element => {
   const classes = useStyles();
   const dispatch: AppDispatch = useAppDispatch();
   const loggedUser: Credentials | undefined = useAppSelector(state => state.userReducer.user);
   if (!loggedUser) return <div></div>;
   return (
    <div>
      <Formik
        initialValues={{
          userName: loggedUser.userName,
          firstName: loggedUser.firstName,
          lastName: loggedUser.lastName,
          password: '',
          email: loggedUser.email,
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const modifiedUser: User = { 
            _id: loggedUser._id,
            userName: values.userName,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            email: values.email,
          };
          console.log(modifiedUser);
          const promise = userService.modifyUser(modifiedUser);
          promise.then((res) => {
            // TODO: Korjaa backendi palauttamaan mikä kohta lomakkeessa feilaa
            if (!res) {
              dispatch(setNotification("User modification failed",  'error'));
            } else {
              dispatch(handleModal(false, 'ModifyUser'));
              dispatch(logIn({
                ...modifiedUser,
                _id: loggedUser._id,
                userType: loggedUser.userType,
                token: loggedUser.token,
                recentActivity: loggedUser.recentActivity,
                platformInfo: loggedUser.platformInfo,
                avatar: res.avatar
              }));
              window.localStorage.setItem(
                'loggedUser', JSON.stringify({ ...modifiedUser, _id: loggedUser._id, userType: loggedUser.userType, token: loggedUser.token })
              );
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

 export default ModifyUserForm;