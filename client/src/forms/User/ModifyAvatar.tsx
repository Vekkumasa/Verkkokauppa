import React, { useState } from 'react';
import userService from '../../services/userService';
import { logIn } from '../../store/User/actionCreators';
import { Form, Field, Formik} from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';

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

 const ModifyImageSchema = Yup.object().shape({
  image: Yup
    .mixed()
 });

 const ModifyAvatar = ():JSX.Element => {
  const classes = useStyles();
  const [ image, setImage ] = useState<File>();
  const user = useAppSelector(state => state.userReducer.user);
  const userId = user? user._id : '';
  const dispatch: AppDispatch = useAppDispatch();
    return (
      <div>
        <Formik
          initialValues={{
            image: '' as unknown as File
          }}
          validationSchema={ModifyImageSchema}
          onSubmit={values => {
            const { image } = values;
            console.log(image);
            void userService.modifyAvatar(image, userId)
              .then((res) => {
                console.log('modify avatar response', res);
                if (res.avatar && user) {
                  void dispatch(logIn({ ...user, avatar: res.avatar }));
                }
            });
          }}
        >
          {({ setFieldValue, submitForm }) => (
            <Form>
            <Grid container spacing={1}>
              
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label> Avatar: </label>
                </Grid>
                <Grid item xs={9}>
                  <Field
                    className={classes.field}
                    type="File"
                    name="image"
                    value={undefined}
                    style={{ color: 'rgba(0,0,0,0)'}}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('image', event.currentTarget.files? event.currentTarget.files[0] : undefined);
                      setImage(event.currentTarget.files? event.currentTarget.files[0] : undefined);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  {image && 
                    <button type="button" onClick={() => {
                      setFieldValue('image', undefined);
                      setImage(undefined);
                    }}> 
                      Cancel
                    </button>
                  }
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label> Avatar preview: </label>
                </Grid>
                <Grid item xs={9}>
                  {image ? 
                    <img height={100} width={100} src={ URL.createObjectURL(image) } alt="Preview to upload" />
                  :
                    <img height={100} width={100} src={'https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg'} alt="Preview to upload" />
                  }
                </Grid>
              </Grid>
            </Grid>
            <button className={classes.button} onClick={submitForm} type="submit">Submit</button>
          </Form>
          )}
        </Formik>
      </div>
  );
};

 export default ModifyAvatar;