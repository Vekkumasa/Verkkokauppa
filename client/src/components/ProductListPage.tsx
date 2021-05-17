import React from "react";
import { Product } from './Product';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../store/rootReducer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    paddingLeft: 15
  },
});

const ProductListPage = (): JSX.Element | null => {
  const classes = useStyles();

  const products: Product[] = useAppSelector(
    state => state.productReducer.products
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      {products.map((product: Product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export {ProductListPage};  