import React from 'react';
import { useAppDispatch, AppDispatch, useAppSelector } from '../store/rootReducer';
import { makeStyles  } from '@material-ui/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { grey, red } from '@material-ui/core/colors';

import { decreaseQuantity, removeProduct, increaseQuantity } from '../store/ShoppingCart/actionCreators';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row'
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
  iconButtons: {
    position: 'relative',
    top: 50,
  },
});

interface props {
  product: ShoppingCartProduct
}

const ShoppingCartCard: React.FC<props> = ({ product }): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  
  const cartId = useAppSelector(state => state.shoppingCartReducer.cartId);

  const removeProductFromCart = (item: ShoppingCartProduct) => {
    dispatch(removeProduct(item, cartId));
  };

  const decreaseQuantityFromCart = (item: ShoppingCartProduct) => {
    dispatch(decreaseQuantity(item, cartId));
  };

  const increaseQuantityFromCart = (item: ShoppingCartProduct) => {
    dispatch(increaseQuantity(item, cartId));
  };
  
  const quantity = () => {
    if (product.quantity > 1) return 'x' + product.quantity.toString();
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.contentAndImage}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.info} component="h5" variant="h5">
                {product.name} {quantity()}
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
          <CardActionArea className={classes.deleteButton} onClick={() => removeProductFromCart(product)}>
            Remove item(s) from cart
          </CardActionArea>
        </div>        
      </Card>
      <div className={classes.iconButtons}>
        <IconButton onClick={() => decreaseQuantityFromCart(product)}>
          <Remove />
        </IconButton>
        <IconButton onClick={() => increaseQuantityFromCart(product)}>
          <Add style={{ marginLeft: -10 }}/>
        </IconButton>
      </div>
    </div>
  );
};

export default ShoppingCartCard;