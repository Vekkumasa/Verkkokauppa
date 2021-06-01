import React from 'react';
import { FormikErrors, FormikTouched, Form, Field } from 'formik';
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

interface Props {
  errors: FormikErrors<{
    name: string;
    description: string;
    price: number;
    stock: number;
}>
  touched: FormikTouched<{
    name: string;
    description: string;
    price: number;
    stock: number;
}>
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any 
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>
  image: File | undefined
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any 
  submitForm: (() => Promise<void>) & (() => Promise<any>)
}

const ProductForm = ({ errors, touched, setFieldValue, setImage, image, submitForm }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Form>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Name: <b style={{color: 'red'}}>*</b> </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="My New Product"
              type="text"
              name="name"
            />
          </Grid>
          <Grid item xs={1}>
            {(errors.name && touched.name) && (
              <div>{errors.name}</div>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Description: </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="So useless product that Wish.com should sell these (optional)"
              type="text"
              name="description"
            />
          </Grid>
          <Grid item xs={1}>
            {(errors.description && touched.description) && (
              <div>{errors.description}</div>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Price: <b style={{color: 'red'}}>*</b> </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="Price"
              type="number"
              name="price"
            />
          </Grid>
          <Grid item xs={1}>
            {(errors.price && touched.price) && (
              <div>{errors.price}</div>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Stock: </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="Stock (optional)"
              type="number"
              name="stock"
            />
          </Grid>
          <Grid item xs={1}>
            {(errors.stock && touched.stock) && (
              <div>{errors.stock}</div>
            )}
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label> Image: </label>
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
            <label> Image preview: </label>
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
  );
};

export default ProductForm;