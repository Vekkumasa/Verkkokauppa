import React from "react";
import { Product as Temp } from './Product';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../store/rootReducer';
import { Typography } from '@material-ui/core/';

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

  const filter: string = useAppSelector(state => state.filterReducer.productFilter);

  if (products.length === 0) {
    return null;
  }

  const filteredProducts: Product[] = filter.length === 0 ?
    products :
    products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  
  if (filteredProducts.length === 0) {
    // TODO: Stylet filtteri ilmotukseen
    return (
      <div>
        <Typography variant="h5"> No results with current filter </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {filteredProducts.map((product: Product) => (
        <Temp key={product._id} product={product} />
      ))}
    </div>
  );
};

export {ProductListPage};  