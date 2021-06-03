import React from 'react';
import { useAppSelector, useAppDispatch, AppDispatch } from '../store/rootReducer';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Grid } from '@material-ui/core';

import ShoppingCartForm from '../forms/shoppingCart/ShoppingCartForm';
import ShoppingCartCard from './ShoppingCartCard';
import { removeProduct } from '../store/ShoppingCart/actionCreators';
import shoppingCartService from '../services/shoppingCartService';

const useStyles = makeStyles({
  box: {
    maxHeight: 350
  },
  shoppingCartAndFormBox: {
    margin: 25,
    marginLeft: -10,
    height: 300,
    borderRadius: 15,
  },
  cart: {
    margin: 25,
    borderRadius: 15,
    height: 300
  },
  container: {
    marginTop: 15, 
  },
  deleteIcon: {
    position: 'relative',
    top: -15
  },
  form: {
    borderWidth: 1,
    marginTop: 75,
    padding: 10,
  },
  empty: {
    position: 'relative',
    top: '50%',
    left: '25%',
  }
});

const ShoppingCart: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();

  const products: ShoppingCartProduct[] = useAppSelector(
    state => state.shoppingCartReducer.cart
  );

  const user: Credentials | undefined = useAppSelector(
    state => state.userReducer.user
  );
  const userId = user?._id || '';

  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);

  const removeProductFromCart = (product: ShoppingCartProduct) => {
    if (!user) {
      dispatch(removeProduct(product, cartId));
    } else {
      const promise = shoppingCartService.removeProductFromShoppingCart({ cartId, userId, product });
      promise.then(() => {
        dispatch(removeProduct(product, cartId));
      }).catch(e => console.log(e));
    }
  };

  const totalPrice = () => {
    return products.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  };
  
  return (
    <Box className={classes.box} border={1}>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={6}>
          <Box border={1} className={classes.cart}> 
            {products.length === 0 ?
              <Typography variant='h5' className={classes.empty}> Ostoskorisi on tyhjä </Typography>
              :
              <div style={{ height: 300, overflow: 'auto' }}>
                {products.map(product => {
                  if (product.quantity > 0) {
                    return (
                      <Container key={product._id} className={classes.container} maxWidth="sm">
                        <ShoppingCartCard key={product._id} product={product} />
                      </Container>
                    );
                  } else {
                    removeProductFromCart(product);
                  }
                })}
                <Typography variant='h5' style={{ marginLeft: 20 }}>
                  Kokonaishinta: {totalPrice()}€
                </Typography>  
              </div>
              
            }
          </Box>
        </Grid>  
        <Grid item xs={6}>
          <Box border={1} className={classes.shoppingCartAndFormBox}>
            <div className={classes.form}> 
              <ShoppingCartForm />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;