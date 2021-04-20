import React from "react";
import Product from './Product';
import { makeStyles } from '@material-ui/core/styles';
import ProductForm from './forms/product/AddProduct';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    paddingLeft: 15
  },
});

const AddProductPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductForm />
    </div>
  );
};

export default AddProductPage;  