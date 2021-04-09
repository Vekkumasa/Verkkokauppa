import React from "react";
import Product from './Product';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, shallowEqual } from "react-redux";

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

  if (!products) {
    return <div></div>;
  }

  return (
    <div className={classes.root}>
      {products.map((product: Product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListPage;  