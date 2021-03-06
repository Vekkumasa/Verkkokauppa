import React, { useState } from 'react';
import userService from '../../services/userService';
import { logIn } from '../../store/User/actionCreators';
import { Form, Field, Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../store/rootReducer';
import { handleModal } from '../../store/modal/actionCreators';
import useStyles from '../formStyles';

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
            void userService.modifyAvatar(image, userId)
              .then((res) => {
                if (res.avatar && user) {
                  void dispatch(logIn({ ...user, avatar: res.avatar }));
                  void dispatch(handleModal(false, 'ModifyUserAvatar'));     
                }
            });
          }}
        >
          {({ setFieldValue, submitForm }) => (
            <Form>
            <Grid container spacing={1}>
              
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={2}>
                  <label> Kuvake: </label>
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
                  <label> Kuvakkeen esikatselu: </label>
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
            <button className={classes.button} onClick={submitForm} type="submit">Lähetä</button>
          </Form>
          )}
        </Formik>
      </div>
  );
};

 export default ModifyAvatar;