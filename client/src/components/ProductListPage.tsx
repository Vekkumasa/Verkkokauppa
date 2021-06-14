import React from "react";
import { Product } from './Product';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../store/rootReducer';
import { Typography, Grid } from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    paddingLeft: 15,
    maxWidth: 1200
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

  const createNewRow = (index: number) => {
    return (
      <Grid key={index} style={{ marginTop: 10 }} item xs={12}></Grid>
    );
  };

  const filteredByName = filter.productFilter.length === 0 ?
      products 
    :
      products.filter(p => p.name.toLowerCase().includes(filter.productFilter.toLowerCase()));
  

  const filteredProducts = filter.tagFilter?
    filteredByName.filter(p => {
      if (filter.tagFilter && p.tags.includes(filter.tagFilter)) return p;
    })
    :
    filteredByName;
    
  if (filteredProducts.length === 0) {
    // TODO: Stylet filtteri ilmotukseen
    return (
      <div>
        <Typography variant="h5"> No results with current filter </Typography>
      </div>
    );
  }

  return (
    <Grid container className={classes.root}>
      {filteredProducts.map((product: Product, index) => (
        index % 5 === 0? 
          <React.Fragment key={index}> {createNewRow(index)} <Product key={product._id} product={product} /> </React.Fragment> 
        : 
          <Product key={product._id} product={product} />
      ))}
    </Grid>
  );
};

export {ProductListPage};  