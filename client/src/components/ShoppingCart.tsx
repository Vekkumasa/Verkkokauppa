import React from 'react';
import { useAppSelector, useAppDispatch, AppDispatch } from '../store/rootReducer';
import { makeStyles  } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Grid, List, Paper } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';

import ShoppingCartForm from '../forms/shoppingCart/ShoppingCartForm';
import { decreaseQuantity, removeProduct } from '../store/ShoppingCart/actionCreators';

const useStyles = makeStyles({
  box: {
    maxHeight: 350
  },
  shoppingCartAndFormBox: {
    margin: 25,
    borderRadius: 15,
  },
  cart: {
    margin: 25,
    borderRadius: 5,
    height: 300
  },
  container: {
    position: 'relative',
    marginRight: 'auto',
    marginLeft: 0,
    marginTop: 15, 
  },
  card: {
    width: 350,
    maxHeight: 140,
    marginBottom: 15
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    height: 120
  },
  content: {
    width: 150,
    height: 20,
    flex: '1 0 auto',
    backgroundColor: grey[200],
  },
  info: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  image: {
    width: '100%',
  },
  contentAndImage: {
    display: 'flex',
    maxHeight: 120
  },
  deleteButton: {
    display: 'flex',
    backgroundColor: red[400],
    justifyContent: 'center',
  },
  deleteIcon: {
    position: 'relative',
    top: -15
  },
  form: {
    borderWidth: 1,
    marginTop: 75,
    padding: 10,
  }
});

const ShoppingCart: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();

  const products: ShoppingCartProduct[] = useAppSelector(
    state => state.shoppingCartReducer.cart
  );

  const decreaseQuantityFromCart = (prod: ShoppingCartProduct) => {
    dispatch(decreaseQuantity(prod));
  };

  const removeProductFromCart = (prod: ShoppingCartProduct) => {
    dispatch(removeProduct(prod));
  };

  console.log('shopping cart', products);
  return (
    <Box className={classes.box} border={1}>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={5}>
          <Box border={1} className={classes.cart}> 
            {products.length === 0 ?
              <Typography variant='h5'> Your Shopping Cart Is Empty </Typography>
              :
              <Paper style={{maxHeight: 300, overflow: 'auto'}}>
                <List>
                  {products.map(product => {
                    if (product.quantity > 0) {
                      return (
                        <Container className={classes.container} key={product.id} maxWidth="sm">
                          <Card className={classes.card}>
                            <div className={classes.contentAndImage}>
                              <div className={classes.details}>
                                <CardContent className={classes.content}>
                                  <Typography className={classes.info} component="h5" variant="h5">
                                    {product.name}
                                  </Typography>
                                  <Typography className={classes.info} variant="subtitle1" color="textSecondary">
                                    {product.description}
                                  </Typography>
                                  <Typography variant="subtitle1" color="textSecondary">
                                    {product.price}€
                                  </Typography>
                                </CardContent>
                              </div>
                              <CardMedia
                                className={classes.image}
                                image={product.image}
                              />
                            </div>
                            <div>
                              <CardActionArea className={classes.deleteButton} onClick={() => decreaseQuantityFromCart(product)}>
                                Remove item from cart
                              </CardActionArea>
                            </div>        
                          </Card>
                        </Container>
                      );
                    } else {
                      removeProductFromCart(product);
                    }
                    
                  })}
                </List>
              </Paper>
            }
          </Box>
        </Grid>
      
        <Grid item xs={7}>
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