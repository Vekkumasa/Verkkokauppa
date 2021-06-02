import React from "react";
import { Product } from './Product';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../store/rootReducer';
import { Typography } from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    paddingLeft: 15
  },
});

const ProductListPage = (): JSX.Element | null => {
  const classes = useStyles();
  const products: Product[] = useAppSelector(
    state => state.productReducer.products
  );

  const filter = useAppSelector(state => state.filterReducer);

  if (products.length === 0) {
    return null;
  }

  const filteredByName = filter.productFilter.length === 0 ?
    products :
    products.filter(p => p.name.toLowerCase().includes(filter.productFilter.toLowerCase()));
  

  const filteredProducts = filter.tagFilter?
    filteredByName.filter(p => {
      if (filter.tagFilter && p.tags.includes(filter.tagFilter)) return p;
    })
    :
    filteredByName;
    

  console.log('filtered', filteredProducts);
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
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export {ProductListPage};  