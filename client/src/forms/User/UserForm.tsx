import React from 'react';
import { Form, Field, FormikErrors, FormikTouched } from 'formik';
import Grid from '@material-ui/core/Grid';
import useStyles from '../formStyles';

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