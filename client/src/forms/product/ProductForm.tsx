import React from 'react';
import { FormikErrors, FormikTouched, Form, Field } from 'formik';
import { Grid, Select, Chip, Box, MenuItem } from '@material-ui/core/';
import useStyles from '../formStyles';
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
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  tags: Tag[]
}

const ProductForm = ({ errors, touched, setFieldValue, setImage, image, setTags, tags }: Props): JSX.Element => {
  const classes = useStyles();
  const availableTags: Tag[] = ['Kirves', 'Mokki Essential', 'Ruoka/Juoma', 'muut'];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value as Tag[]);
  };

  return (
    <Form>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label>Nimi: <b style={{color: 'red'}}>*</b> </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="Uusi tuote"
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
            <label>Kuvaus: </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="Tuotteen kuvaus (ei pakollinen)"
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
            <label>Hinta: <b style={{color: 'red'}}>*</b> </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="Hinta"
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
            <label>Varastossa: </label>
          </Grid>
          <Grid item xs={9}>
            <Field
              className={classes.field}
              placeholder="Varastossa (optional)"
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
            <label>Tagit: </label>
          </Grid>
          <Grid item xs={9}>
            <Box border={2} className={classes.field}>
              <Select
                className={classes.field}
                multiple
                style={{ backgroundColor: 'rgb(255,255,255)' }}
                disableUnderline
                value={tags}
                onChange={handleChange}
                renderValue={(selected) => (
                  <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    {(selected as Tag[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#5aafe0', marginLeft: 2 }}
                      />
                    ))}
                  </div>
                )}
              >
                {availableTags.map((tag) => (
                  <MenuItem style={{ backgroundColor: 'rgb(255,255,255)' }} key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={1}>
            
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label> Kuva: </label>
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
                Peruuta
              </button>
            }
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={2}>
            <label> Kuvan esikatselu: </label>
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
      <button className={classes.button} type="submit"> Lähetä </button>
    </Form>
  );
};

export default ProductForm;