import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import { makeStyles } from '@material-ui/styles';
 import Grid from '@material-ui/core/Grid';
 import * as Yup from 'yup';

 import userService from '../../../services/userService';
 
 const useStyles = makeStyles({

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
      paddingRight: 75,
      marginTop: 10,
      left: '42%',
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
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),

    password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),

    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
 });
 
 const NewCreateUserForm = ():JSX.Element => {
   const classes = useStyles();
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
            userType: 'User' 
          };
          void userService.createUser(newUser);
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
                  <label>Firstname: </label>
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
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Lastname: </label>
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
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
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
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label>Email: </label>
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
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
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

 export default NewCreateUserForm;