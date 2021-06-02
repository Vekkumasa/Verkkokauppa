import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import userService from '../../services/userService';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import { setNotification } from '../../store/Notification/actionCreators';
import { handleModal } from '../../store/modal/actionCreators';
import { logIn } from '../../store/User/actionCreators';
import useStyles from '../formStyles';

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
                platformInfo: loggedUser.platformInfo
              }));
              window.localStorage.setItem(
                'loggedUser', JSON.stringify({ ...modifiedUser, _id: loggedUser._id, userType: loggedUser.userType, token: loggedUser.token })
              );
            }
          }).catch(e => console.log(e));    
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Username: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Username"
                    type="text"
                    name="userName"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.userName && touched.userName) && (
                    <div>{errors.userName}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Firstname: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Firstname"
                    type="text"
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.firstName && touched.firstName) && (
                    <div>{errors.firstName}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Lastname: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Lastname"
                    type="text"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.lastName && touched.lastName) && (
                    <div>{errors.lastName}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Password: </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="If password field is left empty, it will not be changed"
                    type="password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.password && touched.password) && (
                    <div>{errors.password}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Email: <b style={{color: 'red'}}>*</b> </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="example@gmail.com"
                    type="text"
                    name="email"
                  />
                </Grid>
                <Grid item xs={1}>
                  {(errors.email && touched.email) && (
                    <div>{errors.email}</div>
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

 export default ModifyUserForm;