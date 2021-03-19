import React from 'react';
import { withFormik, FormikProps } from "formik";
import { makeStyles } from '@material-ui/core/styles';

import * as Yup from "yup";

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
      paddingRight: 70,
      left: '38%',
      transform: `translate(-50%, -$50%)`,
      borderWidth: 3,
      borderRadius: 35,      
      width: 75,
      height: 20,
      opacity: 0.95,
      backgroundColor: '#124eb0',
      fontSize: 16,
      fontStyle: 'bold',
      color: 'white'  
  },
});

interface LogInFormValues {
  username: string;
  password: string;
}

interface InitialValues {
  initialUsername?: string;
  initialPassword?: string;
}

const InnerForm = (props: FormikProps<LogInFormValues>): JSX.Element => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            className={classes.field}
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          <br />
          <input
            placeholder="Password"
            className={classes.field}
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <br />
        <button
          className={classes.button}
          type="submit"
          disabled={
            isSubmitting ||
            !!(errors.username && touched.username) ||
            !!(errors.password && touched.password)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const Form = withFormik<InitialValues, LogInFormValues>({
  mapPropsToValues: props => ({
      username: props.initialUsername || "",
      password: props.initialPassword || ""
  }),

  
  validationSchema: Yup.object().shape({
      username: Yup.string()
          .required("Username is required"),
      password: Yup.string()
          .required("Password is required")
  }),

  handleSubmit(
      { username, password, }: LogInFormValues,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { props, setSubmitting, setErrors }
  ) {
      console.log(username, password);
  }
})(InnerForm);

export default Form;
