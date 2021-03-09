import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import Product from './Product';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    paddingLeft: 15
  },
});

const ProductListPage: React.FC = () => {
  const classes = useStyles();

  const products: Product[] = useSelector(
    (state: ProductState) => state.products,
    shallowEqual
  );

  return (
    <div className={classes.root}>
      {products.map((product: Product) => (
        // eslint-disable-next-line
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListPage;  