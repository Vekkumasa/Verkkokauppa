import React from "react";
import Product from './Product';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    paddingLeft: 15
  },
});

const ProductListPage: React.FC = () => {
  const classes = useStyles();

  const products: Product[] = useSelector(
    (state: AppState) => state.products.products,
  );

  if (products.length === 0) {
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