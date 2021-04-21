import React from 'react';
import { withFormik, FormikProps } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import userService from '../../../services/userService';
import { logIn } from '../../../store/User/actionCreators';

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
          Log in
        </button>
      </form>
    </div>
  );
};

const LoginForm = () => {
  const dispatch: Dispatch<any> = useDispatch();

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

    handleSubmit({ username, password, }: LogInFormValues) {
        const user = userService.signIn(username, password);
        void user.then((res) => {
          if (res.token === undefined) {
            console.log('');
          }
          const credentials: Credentials = {
            firstName: res.firstName,
            lastName: res.lastName,
            userName: res.userName,
            userType: res.userType,
            token: res.token,
          };
          dispatch(logIn(credentials));
        });
    }
  })(InnerForm);

  return <Form></Form>;
};

export default LoginForm;
