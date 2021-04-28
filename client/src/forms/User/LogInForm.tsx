import React from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

import { AppDispatch, useAppDispatch } from '../../store/rootReducer';
import userService from '../../services/userService';
import { logIn } from '../../store/User/actionCreators';
import { setNotification, hideNotification } from '../../store/Notification/actionCreators';
 
const useStyles = makeStyles({
  field: {
    padding: 5,
    left: 10,
    borderColor: '#124eb0',
    position: 'relative',
    marginBottom: 10,
    width: '90%',
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

const SignupSchema = Yup.object().shape({
  userName: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
 
const LogInForm = ():JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
  return (
    <div>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const user = userService.signIn(values.userName, values.password);
          void user.then((res) => {
            if (res.token === undefined) {
              const text = "Invalid username / password";
              const notificationType: NotificationType = 'error';
              dispatch(setNotification(text, notificationType));
              setTimeout(() => {
                dispatch(hideNotification());
              }, 5000);
            } else {
              console.log('res',res);
              const credentials: Credentials = {
                firstName: res.firstName,
                lastName: res.lastName,
                userName: res.userName,
                userType: res.userType,
                token: res.token,
              };
              dispatch(logIn(credentials));
              const text = "Logged in as: " + credentials.userName;
              const notificationType: NotificationType = 'success';
              dispatch(setNotification(text, notificationType));
              setTimeout(() => {
                dispatch(hideNotification());
              }, 5000);
            }
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Username: </label>
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
                  {errors.userName && touched.userName ? (
                    <div>{errors.userName}</div>
                  ) : null}
                </Grid>
              </Grid>
              
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Password: </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={1}>
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
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

 export default LogInForm;