import React from 'react';
import { Form, Field, FormikErrors, FormikTouched } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

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

interface Props {
  errors: FormikErrors<{
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }>
  touched: FormikTouched<{
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }>
}

const UserForm = ({ errors, touched }: Props) => {
  const classes = useStyles();

  return (
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
            <label>Password: <b style={{color: 'red'}}>*</b> </label>
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
  );
};

export default UserForm;